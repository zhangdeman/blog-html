/**
 * 相似文章推荐
 **/

var sameArticle = {
    init : function () {
        var reqParams = {};
        var requestUri = "/article/getArticleList";
        var requestMethod = "GET";
        var curlInstance = new Curl(reqParams, requestUri, requestMethod, requestUrl, 'json', sameArticle.setLikeArticle(data));
        curlInstance.sendCurlReq();
    },
    
    setLikeArticle : function (data) {
        var html = sameArticle.getArticleHtml(data);
        $("#same-article").html(html);
    },
    
    getArticleHtml : function (data) {
        html = "<h2>相关文章</h2><ul>"
        var len = data.length;
        for (var index = 0; index < len; index++) {
            html += "<li><a href=\"/"+"\" title=\""+data[index].title+"\">"+data[index].title+"</a></li>\n";
        }
        html += "</ul>";
    },
};

sameArticle.init();