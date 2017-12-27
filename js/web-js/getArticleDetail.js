var articleDetail = {
    requestUrl : "http://127.0.0.1:8080/article/getArticleDetail",
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
                    var author = article.admin_id;
                    var createTime = article.create_time;
                    var content = article.html_content;
                    $("#article-title").html(title);
                    $("#article-content").html(content);
                    $("#article-create-time").html("create_time:" + createTime);
                } else {

                }
            },
            error : function () {

            }
        });
    }
};
