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


    displayRooms: function (rooms) {
        let roomsHtml = '';

        rooms.forEach(room => roomsHtml += About.getHtmlForOneRoom(room));

        $('.zone-holder .zone-holder-border ').html(roomsHtml);
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

    displayTemperatures: function (temperatures) {
        let temperaturesHtml = '';

        temperatures.forEach(temperature => temperaturesHtml += About.getHtmlForOneTemperature(temperature));

        $('.zone-holder .zone-holder-border .zone-holder-temperature').html(temperaturesHtml);
    },

    updateTemperature: function (id) {
        let temperaturesbody = {
            targetvalue: targetValueValue
        };
        $.ajax({
            url: About.API_URL + "?id=" + id,
            method: "PUT",
            contentType: "application/json",
            data: JSON.stringify(temperaturesbody)
        }).done(function () {
            About.getTemperatures(id);
        })
    },

    bindEvents: function () {
        $("#zone-holder-temperature").delegate(".button", "click", function (event) {
            event.preventDefault();
            let dataId = $(this).data("id");
            About.updateTemperature();
        });
    },


    getHtmlForOneRoom: function (room) {
        return `<div class="zone-holder">
    <div class="zone-holder-border2 ">
        <h1>${room.name}</h1>
    </div>
    </div> `
    },

    getHtmlForOneTemperature: function (temperature) {
        return `
        <div class="zone-holder">
            <div class="zone-holder-temperature">
                <button> ${temperature.targetValue}  </button>
            </div>
        </div>
        </div>`
    }


};
About.getRooms();
About.getTemperatures();
