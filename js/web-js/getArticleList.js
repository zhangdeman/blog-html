/**
 * 获取文章列表
 * @type {{}}
 * url : http://www.deman.club:8080/article/getArticleList
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
            url: 'http://www.deman.club:8080/article/getArticleList',
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
                    var parentKind = requestData.parent_type;
                    parentKind = undefined == parentKind ? -1 : parentKind;

                    var sonKind = requestData.son_type;
                    sonKind = undefined == sonKind ? -1 : sonKind;

                    //设置分页
                    getArticleList.setPageHtml(totalPage, currentPage, pageSize, totalCount, parentKind, sonKind);
                } else {

                }
            },
            error : function () {

            }
        });
    },

    //导航栏点击事件
    navClickEvent : function (parentKindId) {
        getArticleList.parentKind = parentKindId;
        var articleParam = {
            'parent_type' : parentKindId
        };
        getArticleList.getList(articleParam);
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
                "          <h2 class=\"title\"><a href=\"http://www.deman.club/view.html#"+articleList[index].id+"\" target=\"_blank\">"+
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
    setPageHtml : function (totalPage, currentPage, pageSize, totalCount, parentKind, sonKind) {
        var pageHtml = "";
        if (currentPage > 1) {
            pageHtml += "<li><a href=\"#\" onclick='pageOnclick("+parentKind+","+sonKind+","+1+")'>首页</a></li>";
            var lastPage = parseInt(currentPage) - 1;
            pageHtml += "<li><a href=\"#\" onclick='pageOnclick("+parentKind+","+sonKind+","+lastPage+")'>上一页</a></li>";
        }

        for (var index = 1; index <= totalPage; index++) {
            if (index == currentPage) {
                pageHtml += "<li><a href=\"#\">"+index+"</a></li>";
            } else {
                pageHtml += "<li><a href=\"#\" onclick='pageOnclick("+parentKind+","+sonKind+","+index+")'>"+index+"</a></li>";
            }
        }

        if (currentPage < totalPage) {
            pageHtml += "<li><a href=\"#\"  onclick='pageOnclick("+parentKind+ "," + sonKind + "," + totalPage + ")'>尾页</a></li>";
            var nextPage = parseInt(currentPage) + 1;
            pageHtml += "<li><a href=\"#\" onclick='pageOnclick("+parentKind+ "," + sonKind + "," + nextPage + ")'>下一页</a></li>";
        }

        pageHtml += "<li><a href=\"#\">"+pageSize+"条/页</a></li>\n" +
            "            <li><a href=\"#\">当前第"+currentPage+"页</a></li>\n" +
            "            <li><a href=\"#\">总计 "+totalCount+" 条</a></li>";
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

getArticleList.setPageClickEvent();
function articleList(parentKindId)
{
    getArticleList.navClickEvent(parentKindId);
}

function pageOnclick(parentKindId, sonKindId, current_page) {
    var articleParam = {
        'parent_type' : parentKindId,
        'son_type'  : sonKindId,
        'current_page' : current_page
    };

    articleParam.parent_type = parentKindId >= 0 ? parentKindId : undefined;
    articleParam.son_type = sonKindId >= 0 ? sonKindId : undefined;
    articleParam.current_page = current_page >= 1 ? current_page : 1;
    console.log(articleParam);
    getArticleList.getList(articleParam);
}