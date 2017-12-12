/**
 * 获取文章列表
 * @type {{}}
 * url : http://www.deman.club:8081/article/getArticleList
 */
var getArticleList = {

    //父级文章类型
    parentKind : -1,

    //初始化
    init : function () {
        var params = {

        };
        this.getList(params)
    },

    //获取文章列表
    getList : function (requestData) {
        $.ajax({
            type: 'GET',
            url: 'http://www.deman.club:8081/article/getArticleList',
            data: requestData,
            dataType: "json",
            success: function (data) {
                var errorCode = data.error_code;
                if (errorCode == 0) {
                    var list = data.data;
                    var totalCount = list.total_count;
                    var currentPage= list.current_page;
                    var pageSize = list.page_limit;
                    var totalPage = list.total_page;
                    var articleList = list.article_list;
                    //设置列表
                    getArticleList.setListHtml(articleList);
                    //设置分页
                    getArticleList.setPageHtml(totalPage, currentPage, pageSize, totalCount);
                } else {

                }
            },
            error : function () {

            }
        });
    },

    //导航栏点击事件
    navClickEvent : function () {
        $("#nav").click(function () {
            var currentUrl = location.href;
            var paramStr = currentUrl.split("#");
            var trueParam = paramStr[1].replace(/(^\/*)/g, "").split("/");
            var parentKind = trueParam[1];
            getArticleList.parentKind = parentKind;
            var articleParam = {
                'parent_type' : parentKind
            };
            getArticleList.getList(articleParam);
        });
    },

    //设置列表样式
    setListHtml : function (articleList) {
        var html = "";
        var len = articleList.length;
        for (var index = 0; index < len; index++) {
            html += "<li>\n" +
                "        <div class=\"arrow_box\">\n" +
                "          <div class=\"ti\"></div>\n" +
                "          <!--三角形-->\n" +
                "          <div class=\"ci\"></div>\n" +
                "          <!--圆形-->\n" +
                "          <h2 class=\"title\"><a href=\"/\" target=\"_blank\">"+
                articleList[index].title+
                "</a></h2>\n" +
                "          <ul class=\"textinfo\">\n" +
                "            <a href=\"/\"><img src=\"images/s1.jpg\"></a>\n" +
                articleList[index].text_content+
                "          </ul>\n" +
                "          <ul class=\"details\">\n" +
                "            <li class=\"likes\"><a href=\"#\">10</a></li>\n" +
                "            <li class=\"comments\"><a href=\"#\">34</a></li>\n" +
                "            <li class=\"icon-time\"><a href=\"#\">" +
                articleList[index].create_time +
                "</a></li>\n" +
                "          </ul>\n" +
                "        </div>\n" +
                "        <!--arrow_box end--> \n" +
                "      </li>";
        }
        $("#blog-list").html(html);
    },

    //设置分页样式
    setPageHtml : function (totalPage, currentPage, pageSize, totalCount) {
        var pageHtml = "";
        if (currentPage > 1) {
            pageHtml += "<li><a href=\"#/page/1\">首页</a></li>";
            var lastPage = currentPage - 1;
            pageHtml += "<li><a href=\"#/page/"+lastPage+"\">上一页</a></li>";
        }

        for (var index = 1; index <= totalPage; index++) {
            var kind = "";
            if (getArticleList.parentKind >= 0) {
                kind = "/parent_kind/"+getArticleList.parentKind;
            }
            if (index == currentPage) {
                pageHtml += "<li><a href=\"#\">"+index+"</a></li>";
            } else {
                pageHtml += "<li><a href=\"#"+kind+"/page/"+index+"\">"+index+"</a></li>";
            }
        }

        if (currentPage < totalPage) {
            pageHtml += "<li><a href=\"#/page/"+totalPage+"\">尾页</a></li>";
            var nextPage = currentPage + 1;
            pageHtml += "<li><a href=\"#/page/"+nextPage+"\">下一页</a></li>";
        }

        pageHtml += "<li><a href=\"#/page\">"+pageSize+"条/页</a></li>\n" +
            "            <li><a href=\"#/page\">当前第"+currentPage+"页</a></li>\n" +
            "            <li><a href=\"#/page\">总计 "+totalCount+" 条</a></li>";
        $("#page-list").html(pageHtml);
    },

    //设置页码点击事件
    setPageClickEvent : function () {
        $("#page-list").click(function () {
            alert(getArticleList.parentKind)
        });
    }
};


getArticleList.init();
getArticleList.navClickEvent();
getArticleList.setPageClickEvent();