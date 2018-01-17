var articleDetail = {
    requestUrl : requestUrl+"/article/getArticleDetail",
    init : function () {
        var currentUrl = location.href;
        var paramStr = currentUrl.split("#");
        var articleId = paramStr[1];
        requestData = {
            "article_id" : articleId
        };
        $.ajax({
            type: 'GET',
            url: articleDetail.requestUrl,
            data: requestData,
            dataType: "json",
            success: function (data) {
                console.log(data);
                var errorCode = data.error_code;
                var article = data.data;
                if (errorCode == 0) {
                    var title = article.title;
                    var author = article.author_name;
                    var createTime = article.create_time;
                    var content = article.html_content;
                    var readCount = article.read_count;
                    $("#article-title").html(title);
                    $("#article-content").html(content);
                    var underTitleHtml = "<span>发布时间："+createTime+"</span>"
                    +"<span>作者："+author+"</span>"
                    +"<span>阅读：("+readCount+")</span>";
                    $("#article-extra").html(underTitleHtml);
                } else {

                }
            },
            error : function () {

            }
        });
    }
};

articleDetail.init();