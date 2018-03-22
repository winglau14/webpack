const utils = {
    fromJson: obj => JSON.parse(obj),//字符串转json
    toJson: obj => JSON.stringify(obj),//json转字符串
    regPhone: /^(13|15|18|14|17)[0-9]{9}$/g,//手机号正则匹配
    regSixCode: /^\d{6}$/g,//六位验证码正则匹配
    regIntegral: /^[0-9]*$/g,//积分数字正则匹配
    //日期格式化
    dateFormat(val) {
        const time = val.split('-');
        time.map((item, index) => {
            if (item < 10) {
                time[index] = '0' + item
            }
        });
        return `${time[0]}-${time[1]}-${time[2]}`
    },
    //判断是否有值
    valueFormat(val, type){
        type = !type ? '' : type;
        return val ? val : type;
    },
    //函数节流
    throttle(method, wait) {
        /***
         创建并返回一个像节流阀一样的函数，当重复调用函数的时候，最多每隔 wait毫秒调用一次该函数。对于想控制一些触发频率较高的事件有帮助
         默认情况下，throttle将在你调用的第一时间尽快执行这个function，并且，如果你在wait周期内调用任意次数的函数，都将尽快的被覆盖。如果你想禁用第一次首先执行的话，传递{leading: false}，还有如果你想禁用最后一次执行的话，传递{trailing: false}
         ***/
        clearTimeout(method.tId);
        method.tId = setTimeout(function(){
            return method.call();
        },wait);
    },
    //禁止or运行body滚动
    lockBody(tarClass){
        document.body.className = tarClass;
        document.documentElement.className = tarClass;
    },
    //微信api方法调用
    wxApiFn(callBack){
        if (typeof WeixinJSBridge === "undefined") {
            if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', function () {
                    callBack();
                }, false);
            } else if (document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', function () {
                    callBack();
                });
                document.attachEvent('onWeixinJSBridgeReady', function () {
                    callBack();
                });
            }
        }else{
            callBack();
        }
    }
};
export default utils;



