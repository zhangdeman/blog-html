/**
 * 相似文章推荐
 **/

var sameArticle = {
    init : function () {
        var reqParams = {};
        var requestUri = "/article/getArticleList";
        var requestMethod = "GET";
        var callBackFunc = {
            succCallBack : sameArticle.setLikeArticle(data),
        };
        var curlInstance = new Curl(reqParams, requestUri, requestMethod, requestUrl, 'json', callBackFunc);
        curlInstance.sendCurlReq();
    },
    
    setLikeArticle : function (data) {
        var html = sameArticle.getArticleHtml(data);
        $("#same-article").html(html);
    },
    
    getArticleHtml : function () {
        html = "<h2>相关文章</h2><ul>"
        var data = arguments[0];
        if (data == undefined) {
            return html += "</ul>";
        }
        var len = data.length;
        for (var index = 0; index < len; index++) {
            html += "<li><a href=\"/"+"\" title=\""+data[index].title+"\">"+data[index].title+"</a></li>\n";
        }
        html += "</ul>";
    },
};

sameArticle.init();