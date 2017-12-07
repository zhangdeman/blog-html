/**
 * 获取导航栏信息
 * @type {{init: getNavList.init}}
 * http://127.0.0.1:4899/article/getNavList
 */
var getNavList = {

    //初始化方法
    init : function () {
        $.ajax({
            type: 'GET',
            url: 'http://127.0.0.1:4899/article/getNavList',
            data: {

            },
            dataType: "json",
            success: function (data) {
                var errorCode = data.error_code;
                if (errorCode == 0) {
                    var list = data.data;
                    getNavList.setNav(list);
                } else {

                }
            },
            error : function () {

            }
        });
    },

    //设置导航栏
    setNav : function (navList) {
        var navHtml = "<ul>\n" +
            "      <li><a href=\"#\" id=\"web-index\">网站首页</a></li>";

        var listLen = navList.length;
        for (var index = 0; index < listLen; index++) {
            var name = navList[index].name;
            var value = navList[index].value;
            navHtml += "<li><a href=\"#\" target=\"_blank\" value=\""+value+"\" title=\""+name+"\">"+name+"</a></li>";
        }
        navHtml += "</ul>";
        $("#nav").html(navHtml);
        //alert(navHtml)
    }
};

getNavList.init();