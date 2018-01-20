/**
 * 请求服务端数据接口，获取数据
 * @param reqParams 请求参数
 * @param requestUri 请求uri
 * @param requestMethod 请求方法
 * @param requestHost 请求主机
 * @param dataType 返回数据类型
 * @param successCallBack 请求成功时，回调函数
 * @param failCallBack 请求成功，但是返回错误码时的回调函数
 * @param errorCallBack 请求失败时的回调函数，如404 500等
 */

function Curl(reqParams, requestUri, requestMethod, requestHost, dataType, successCallBack, failCallBack, errorCallBack) {
    this.reqParams = reqParams;
    this.requestUri = requestUri;
    this.requestHost = requestHost == undefined ? requestUrl : requestHost;
    this.fullReqUrl = this.requestHost + this.requestUri;
    this.requestMethod = requestMethod;
    this.dataType = dataType == undefined ? "json" : dataType;
    this.successCallback = successCallBack;
    this.failCallBack = failCallBack;
    this.errorCallback = errorCallBack;

    /**
     * 发送 curl 请求
     */
    this.sendCurlReq = function () {
        $.ajax({
            type: Curl.requestMethod,
            url: Curl.fullReqUrl,
            data: Curl.reqParams,
            dataType: Curl.dataType,
            success: function (data) {
                Curl.errorCode = data.error_code;
                Curl.errorMsg = data.error_msg;
                Curl.responseData = data.data;
                if (Curl.errorCode == 0) {
                    //请求成功
                    Curl.successCallback(curl.responseData);
                } else {
                    //请求成功，返回错误码
                    Curl.failCallBack();
                }
            },
            error : function () {
                Curl.errorCallback();
            }
        });
    };
}