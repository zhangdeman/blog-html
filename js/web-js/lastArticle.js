/**
 * 获取最近文章信息
 **/

var lastArticle = {
    init : function () {
        this.getList();
    },
    
    getList : function () {
        $.ajax({
            type: 'GET',
            url: requestUrl+"/article/lastArticle",
            data: {},
            dataType: "json",
            success: function (data) {
                console.log(data);
                lastArticle.setHtml(data.data);
            },
            error : function () {

            }
        });
    },
    
    setHtml : function (data) {
        var html = "<h2>最新发布</h2>";
        var len = data.length;
        for (var index = 0; index < len; index++) {
            html += "<dl>\n" +
                "        <dt><img src=\"images/s6.jpg\">\n" +
                "        <dt>\n" +
                "        <dd>"+data[index].title+"\n" +
                "          <time>"+data[index].has_publish_time+" 前</time>\n" +
                "        </dd>\n" +
                "        <dd>发布文章 <a href=\""+"http://www.deman.club/view.html#"+data[index].id+"\" class=\"title\">"+data[index].title+" </a></dd>\n" +
                "        <dd>"+data[index].text_content+"</dd>\n" +
                "      </dl>";
        }
        $("#last-article").html(html);
    }
};

lastArticle.init();