/**
 * 文章推荐
 **/

var recommend = {
    init : function () {
        this.getList();
    },

    getList : function () {
        $.ajax({
            type: 'GET',
            url: requestUrl+"/recommend/getList",
            data: {},
            dataType: "json",
            success: function (data) {
                console.log(data);
                var list = data.data;
                recommend.setList(list);
            },
            error : function () {

            }
        });
    },

    setList : function (list) {
        var htmlContent = "<h2>推荐文章</h2>\n" +
            "        <ol>";

        var len = list.length;

        for (var index = 0; index < len; index++) {
            var id=list[index].id;
            var title = list[index].title;
            var num = index+1;
            htmlContent += " <li><span><strong>"+num+"</strong></span><a href=\""+"/view.html#"+id+"\">"+title+"</a></li>\n";
        }

        htmlContent += "</ol>";

        $("#recommend-article").html(htmlContent);
    }
};

recommend.init();