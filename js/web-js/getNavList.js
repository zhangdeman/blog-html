/**
 * 获取导航栏信息
 * @type {{init: getNavList.init}}
 * http://www.deman.club:8080/article/getNavList
 */
var getNavList = {

    //初始化方法
    init : function () {
        $.ajax({
            type: 'GET',
            url: requestUrl+'/article/getNavList',
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
        var navHtml = "<ul id=\"nav-list\">\n" +
            "      <li><a href=\"http://www.deman.club\">网站首页</a></li>";

        var listLen = navList.length;
        for (var index = 0; index < listLen; index++) {
            var name = navList[index].title;
            var value = navList[index].id;
            var id = "web-index-"+index;
            navHtml += "<li><a title=\""+name+"\" onclick='articleList("+value+")'>"+name+"</a></li>";
        }
        navHtml += "</ul>";

        if (listLen == 0){
            navHtml = "<ul>\n" +
                "      <li><a href=\"http://www.deman.club\" id=\"web-index\" onclick=''>网站首页</a></li>\n" +
                "      <li><a href=\"#\" target=\"_blank\" title=\"个人博客模板\">个人博客</a></li>\n" +
                "      <li><a href=\"#\" target=\"_blank\" title=\"图书推荐\">图书推荐</a></li>\n" +
                "      <li><a href=\"#\" target=\"_blank\" title=\"网站建设\">网站建设</a></li>\n" +
                "      <li><a href=\"#\" target=\"_blank\" title=\"HTML5 / CSS3\">HTML5 / CSS3</a></li>\n" +
                "      <li><a href=\"#\" target=\"_blank\" title=\"技术探讨\">技术探讨</a></li>\n" +
                "      <li><a href=\"#\" target=\"_blank\" title=\"慢生活\">慢生活</a></li>\n" +
                "      <li><a href=\"#\" target=\"_blank\" title=\"碎言碎语\">碎言碎语</a></li>\n" +
                "      <li><a href=\"#\" target=\"_blank\" title=\"JS 实例代码演示\">JS实例</a></li>\n" +
                "    </ul>";
        }
        $("#nav").html(navHtml);
    }
};

getNavList.init();