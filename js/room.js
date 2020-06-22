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


    updateRoom: function (id, name) {
        let nameValue = $("#room-field").val();
        let targetValueValue = $("#target-field").val();

        let requestBody = {
            name: nameValue,
            targetValue:targetValueValue
        };
        $.ajax({
            url: About.API_URL + '/rooms/' + id,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(requestBody),
            dataType: 'json'
        }).done(function(data) {console.log(data)}).fail(function(xhr, status, error) {console.log(status); console.log(error)})
},

    deleteRoom: function (id) {
        $.ajax({
            url:About.API_URL + "/rooms/" + id,
            method: "DELETE",
            contentType: "application/json"
        }).done(function () {
            About.getRooms();
        })
    },

    displayRooms: function (rooms) {
        let roomsHtml = '';

        rooms.forEach(room => roomsHtml += About.getHtmlForOneRoom(room));

        $('#rooms-table tbody').html(roomsHtml);
    },


    bindEvents: function () {
        $("#new-room-form").submit(function (event) {
            event.preventDefault();
            About.createRoom();
        });

        $("#rooms-table").delegate(".delete-room ", "click", function (event) {
            event.preventDefault();
            let roomId = $(this).data("id");
            About.deleteRoom(roomId);
        });
        $("#rooms-table").delegate(".edit-room", "click", function (event) {
            event.preventDefault();
            let roomId = $(this).data("id");

            $(this).replaceWith($(` <input type="text" data-id="${roomId}" placeholder="Enter new room name"/>`),
                        `<input type="submit" value="Save" id=${roomId}  class="submitroomName-mark">`);


                    // $("#rooms-table").delegate(".targetRoom", "click", function (event) {
                    //     event.preventDefault();
                    //     let roomId = $(this).data("id");
                    //     let targetValue = $(this).siblings(".temperature-update").val();
                    //     if (targetValue == null || targetValue=== "") {
                    //         console.log("Cannot update with null value");
                    //         $(this).siblings(".temperature-update").val("");
                    //     }
                    //     else



                About.updateRoom(roomId);
        });
    },


    getHtmlForOneRoom: function (room) {
        return ` <tr>
            <td>${room.name}</td>
            <td>20</td>
            <td><input type="button" value="${room.targetValue}" data-id=${room.id}  class="target value"></td>
            <td><a href="#" data-id=${room.id} class="delete-room">Delete room</a></td>
            <td><a href="#" data-id=${room.id} class="edit-room">Edit</a></td>
        </tr>`
    },


};
About.getRooms();
// About.getTemperatures();
About.bindEvents();
