/**
 * 热门点击
 **/

var hotArticle = {
    init : function () {
        this.getList();
    },

    getList : function () {
        $.ajax({
            type: 'GET',
            url: requestUrl+"/hotArticle/getList",
            data: {},
            dataType: "json",
            success: function (data) {
                console.log(data);
                var list = data.data;
                hotArticle.setList(list);
            },
            error : function () {

            }
        });
    },

    setList : function (list) {
        var htmlContent = "<h2>热门文章</h2>\n" +
            "        <ol>";

        var len = list.length;

        for (var index = 0; index < len; index++) {
            var id=list[index].id;
            var title = list[index].title;
            var showKind = list[index].show_kind;
            htmlContent += "<li><span><a>"+showKind+"</a></span><a href=\"/view.html#"+id+"\">"+title+"</a></li>";
        }

        htmlContent += "</ol>";

        $("#hot-article").html(htmlContent);
    }
};

hotArticle.init();