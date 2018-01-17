var developer = {

    init : function () {
        this.getDevelopInfo()
    },

    getDevelopInfo : function () {
        $.ajax({
            type: 'GET',
            url: requestUrl+"/developer/getDevelopInfo",
            data: {},
            dataType: "json",
            success: function (data) {
                console.log(data);
                developInfo = data.data;
                developer.setDevelopInfo(developInfo);
            },
            error : function () {

            }
        });
    },

    setDevelopInfo : function (developerInfo) {
        var htmlContent = "<h1>我的名片</h1>\n" +
            "<p>姓名："+developerInfo.real_name+"</p>" +
            "      <p>网名："+developerInfo.nick_name+"</p>\n" +
            "      <p>职业："+developerInfo.job+"</p>\n" +
            "      <p>电话："+developerInfo.tel+"</p>\n" +
            "      <p>QQ："+developerInfo.qq+"</p>\n" +
            "      <p>Email："+developerInfo.mail+"</p>\n" +
            "      <!--ul class=\"linkmore\">\n" +
            "        <li><a href=\"#\" class=\"talk\" title=\"给我留言\"></a></li>\n" +
            "        <li><a href=\"#\" class=\"address\" title=\"联系地址\"></a></li>\n" +
            "        <li><a href=\"#\" class=\"email\" title=\"给我写信\"></a></li>\n" +
            "        <li><a href=\"#\" class=\"photos\" title=\"生活照片\"></a></li>\n" +
            "        <li><a href=\"#\" class=\"heart\" title=\"关注我\"></a></li>\n" +
            "      </ul-->";
        $("#developer-info").html(htmlContent);
    }
};

developer.init();