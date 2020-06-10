window.About = {
    API_URL: "http://localhost:8083",

    getRooms: function () {
        $.ajax({
            url: About.API_URL + "/rooms",
            method: "GET"
        }).done(function (response) {
            console.log(response);

            About.displayRooms(response.content);
        })
    },

    createRoom: function () {
        let nameValue = $("#room-field").val();
        let targetValueValue = $("#target-field").val();

        let requestBody = {
            name: nameValue,
            targetValue: targetValueValue
        };
        $.ajax({
            url: About.API_URL + "/rooms",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(requestBody)
        }).done(function () {
            About.getRooms();
        })
    },


    deleteRoom: function (id) {
        $.ajax({
            url: About.API_URL + "/rooms" + "/"+ id,
            method: "DELETE",
            contentType: "application/json"
        }).done(function () {
            About.getRooms();
        })
    },

    getTemperatures: function () {
        $.ajax({
            url: About.API_URL + "/temperatures",
            method: "GET"
        }).done(function (response) {
            console.log(response);
            About.displayTemperatures(response.content);
        })
    },

    displayRooms: function (rooms) {
        let roomsHtml = '';

        rooms.forEach(room => roomsHtml += About.getHtmlForOneRoom(room));

        $('#rooms-table tbody').html(roomsHtml);
    },

    displayTemperatures: function (temperatures) {
        let temperaturesHtml = '';

        temperatures.forEach(temperature => temperaturesHtml += About.getHtmlForOneTemperature(temperature));

        $('.temperatureControl').html(temperaturesHtml);
    },


    updateTemperature: function (id) {
        let temperaturebody = {
            targetValue: targetValueValue
        };
        $.ajax({
            url: About.API_URL + "?id=" + id,
            method: "PUT",
            contentType: "application/json",
            data: JSON.stringify(temperaturebody)
        }).done(function () {
            About.getTemperatures(id);
        })
    },

    bindEvents: function () {
        $("#new-room-form").submit(function (event) {
            event.preventDefault();
            About.createRoom();
        });

            $("#rooms-table ").delegate(".delete-room ", "click", function (event) {
            event.preventDefault();
            let roomId = $(this).data("id");
            About.deleteRoom(roomId);
        });



            // $("#temperatureControl").delegate(".button", "click", function (event) {
            //     event.preventDefault();
            //     let dataId = $(this).data("id");
            //     About.updateTemperature();
            // });




    },



    getHtmlForOneRoom: function (room) {
        return ` <tr>
            <td>${room.name}</td>
            <td>20</td>
            <td>${room.targetValue}</td>
            <td><a href="#" data-id=${room.id} class="delete-room">Delete room</a></td>
            <td>delete</td>
        </tr>`
    },



    getHtmlForOneTemperature: function (temperature) {
        return ` <div class="temperatureControl">
        <button>${temperature.targetValue}</button>
    </div>`
    }

};
About.getRooms();
// About.getTemperatures();
About.bindEvents();
