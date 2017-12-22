import axios from 'axios';
import qs from 'qs';
import Vue from 'vue';
import Element from 'element-ui';
Vue.use(Element);
// let baseURL = ;

// if (process.server) {
//   baseURL = `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}` + '/api';
// }
var instance = axios.create({
  baseURL: '/api',
  timeout: 5000,
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
});

instance.baseURL = '/api';

let goLogin = () => {
  // let router = new Router();
  // router.push({name: 'login'});
  Vue.prototype.$alert('当前账号已登出，请重新登录', '错误', {
    confirmButtonText: '确定',
    callback: action => {
      this.$message({
        type: 'info',
        message: `action: $ { action }`
      });
    }
  });
};
// 添加一个请求拦截器
instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// 添加一个响应拦截器
instance.interceptors.response.use(function (res) {
  if (res.data && res.data.status === 401) {
    goLogin();
    location.href = '/login';
  }
  if (res.data && res.data.status === 402) {
    goLogin();
    location.href = 'login/adminLogin';
  }
  if (res && res.data && res.data.status !== 200) {
    res.data.data = {

    };
  }
  return res;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});

let api = {};

api.request = function () {
  var isPost = arguments[0];
  var method = arguments[1];
  var url = arguments[2];
  var data = arguments[3];
  var config = {
    method,
    url,
    responseType: 'json'
  };
  config[isPost ? 'data' : 'params'] = qs.stringify(data);
  return new Promise(function (resolve, reject) {
    instance.request(config).then(result => {
      resolve(result.data);
    }).catch(result => {
      reject(result.response.data);
    });
  });
};

let likeGet = ['delete', 'get', 'head', 'options'];

let likePost = ['post', 'put', 'patch'];

likeGet.forEach(method => {
  api[method] = function () {
    return api.request(false, method, ...arguments);
  };
});

likePost.forEach(method => {
  api[method] = function () {
    return api.request(true, method, ...arguments);
  };
});

export default api;
