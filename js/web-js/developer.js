var developer = {

    init : function () {

    },

    getDevelopInfo : function () {
        $.ajax({
            type: 'GET',
            url: "/developer/getDevelopInfo",
            data: {},
            dataType: "json",
            success: function (data) {
                console.log(data);
                developInfo = data.data;
            },
            error : function () {

            }
        });
    },

    setDevelopInfo : function (developerInfo) {

    }
};

developer.init();