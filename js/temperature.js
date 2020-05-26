window.About = {
    API_URL: "http://localhost:8083",

    getTemperatures: function () {

        $.ajax({
            url: About.API_URL + "/temperatures",
            method: "GET"
        }).done(function (response) {
            console.log(response);
        })
    }
};
About.getTemperatures();