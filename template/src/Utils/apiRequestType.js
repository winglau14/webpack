import qs from 'qs'
import ajaxInterceptors from '../Utils/ajaxInterceptors'
import AjaxPlugin from 'axios'
import Vue from 'vue'
import lotusApiUrl from '../lotusPlugins/lotusApiUrl'

//检测请求状态
function checkStatus(response) {
    try {
        // 如果 http 状态码正常, 则直接返回数据
        if (response.status === 200 || response.status === 304) {
            return response
        }
        // 异常状态下, 把错误信息返回去
        // 因为前面我们把错误扶正了, 不然像 404, 500 这样的错误是走不到这里的
        return {
            data: {
                code: response.status,
                message: response.data.Error.Message,
                data: response.data.Error,
            }
        }
    } catch (error) {
        return {
            data: {
                errorMessage: '网络异常'
            }
        }
    }

}

//检测状态码
function checkCode(res) {
    // 如果状态 code 异常(这里已经包括网络错误, 服务器错误, 后端抛出的错误), 可以弹出一个错误提示, 告诉用户
    if (res.data.code && res.data.code !== 200) {
        Vue.$lotus.toast.show({
            text: res.data.message,
            show: true,
            type: 'text'
        });
    } else {
        if (res.data.errorMessage) {
            Vue.$lotus.toast.show({
                text: res.data.errorMessage,
                show: true,
                type: 'text'
            });
        }
    }
    return res
}

//获取token
function getToken() {
    //第一次请求token
    if(!sessionStorage.accessToken){
        return AjaxPlugin({
            method: 'post', // 请求协议
            url: lotusApiUrl.$lotusApiUrl.Auth, // 请求的地址
            data: qs.stringify({
                "client_id": "NXPlfsmzc7jwq4xanhu",
                "client_secret": "u82e9lys6icpjw04gtn1rahfzqb3mdkx",
                "grant_type": "client_credentials"
            }), // post 请求的数据
            timeout: 30000, // 超时时间, 单位毫秒
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then((response) => {
            const result = response.data;
            if (result) {
                if (result.access_token && result.refresh_token) {
                    sessionStorage.accessToken = response.data.access_token;
                    sessionStorage.refreshToken = response.data.refresh_token;
                    sessionStorage.resultToken = JSON.stringify(result);
                    return result;
                }
            }
        });
    }else{
        //缓存token
        return new Promise((resolve,reject)=>{
            //获取缓存token并return result
            if(sessionStorage.resultToken){
                const result = JSON.parse(sessionStorage.resultToken);
                resolve(result);
            }
        })
    }
}

//get方法
function getFetch(url, params, contentType, accessToken) {
    return AjaxPlugin({
        method: 'get',
        url: url,
        params, // get 请求时带的参数
        timeout: 30000,
        headers: {
            'Content-Type': contentType || 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${(accessToken)}`
        }
    }).then(checkStatus).then(checkCode);
}

//post方法
function postFetch(url, data, contentType, accessToken) {
    const postData = contentType ? data : qs.stringify(data);
    return AjaxPlugin({
        method: 'post', // 请求协议
        url: url, // 请求的地址
        data: postData, // post 请求的数据
        timeout: 30000, // 超时时间, 单位毫秒
        headers: {
            'Content-Type': contentType || 'application/x-www-form-urlencoded; charset=UTF-8',
            'Authorization': `Bearer ${(accessToken)}`
        }
    }).then(checkStatus).then(checkCode);
}

//get or post请求封装
export default {
    async get(url, params, contentType){
        //获取token
        const result = await getToken();
        ajaxInterceptors();
        return await getFetch(url, params, contentType, result.access_token);
    },
    async post(url, data, contentType){
        //获取token
        const result = await getToken();
        ajaxInterceptors();
        return await postFetch(url, data, contentType, result.access_token);
    }
}