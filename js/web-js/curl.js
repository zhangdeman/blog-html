/**
 * 请求服务端数据接口，获取数据
 * @param reqParams 请求参数
 * @param requestUri 请求uri
 * @param requestMethod 请求方法
 * @param requestHost 请求主机
 * @param dataType 返回数据类型
 * @param callBackFunc 各种回调处理
 *  successCallBack 请求成功时，回调函数
 *  failCallBack 请求成功，但是返回错误码时的回调函数
 *  errorCallBack 请求失败时的回调函数，如404 500等
 */

function Curl(reqParams, requestUri, requestMethod, requestHost, dataType, callBackFunc) {
    this.reqParams = reqParams;
    this.requestUri = requestUri;
    this.requestHost = requestHost == undefined ? requestUrl : requestHost;
    this.fullReqUrl = this.requestHost + this.requestUri;
    this.requestMethod = requestMethod;
    this.dataType = dataType == undefined ? "json" : dataType;
    this.callBackFunc = callBackFunc;
    this.errorCode = undefined;
    this.erorMsg = '';
}

Curl.prototype = {
    /**
     * 发送 Curl 请求
     */
    sendCurlReq : function () {
        $.ajax({
            type: this.requestMethod,
            url: this.fullReqUrl,
            data: this.reqParams,
            dataType: this.dataType,
            success: function (data) {
                console.log("this_request");
                console.log(data);
                this.errorCode = data.error_code;
                this.errorMsg = data.error_msg;
                this.responseData = data.data;
                if (this.errorCode == 0) {
                    //请求成功
                    this.callBackFunc.succCallBackFunc(this.responseData);
                } else {
                    console.log(this.callBackFunc);
                    //请求成功，返回错误码
                    this.callBackFunc.failCallBackFunc(data);
                }
            },
            error : function () {
                this.callbackfunc.errorCallbackFunc();
            }
        });
    },
};