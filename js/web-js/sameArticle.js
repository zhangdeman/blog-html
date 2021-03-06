/**
 * 相似文章推荐
 **/

var sameArticle = {
    init : function () {
        var reqParams = {};
        var requestUri = "/article/getArticleList";
        var requestMethod = "GET";
        var callBackFunc = {
            succCallBackFunc : sameArticle.setLikeArticle,
            failCallBackFunc : sameArticle.requestFail,
        };
        var curlInstance = new Curl(reqParams, requestUri, requestMethod, requestUrl, 'json', callBackFunc);
        curlInstance.sendCurlReq(callBackFunc);
    },
    
    setLikeArticle : function () {
        var data = arguments[0];
        var html = sameArticle.getArticleHtml(data);
        $("#same-article").html(html);
    },
    
    getArticleHtml : function (data) {
        html = "<h2>相关文章</h2><ul>";
        var list = data.article_list;
        var len = list.length;
        for (var index = 0; index < len; index++) {
            html += "<li><a href=\"/"+"\" title=\""+list[index].title+"\">"+list[index].title+"</a></li>\n";
        }
        html += "</ul>";
        return html;
    },

    requestFail : function () {
        var data = arguments[0];
        if (data == undefined) {
            console.log("request_error");
        }
        console.log(data);
    }
};

sameArticle.init();