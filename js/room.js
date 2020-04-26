window.Smart = {
    API_URL: "http://localhost:8083",

    getRooms: function () {

        $.ajax({
            url: Smart.API_URL + "/ rooms ",
            method: "GET"
        }).done(function (response) {
            console.log(response);
        })

    }

};

Smart.getRooms();