import axios from 'axios';
// import Router from 'vue-router';

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

// instance.baseURL = '/api';

// let goLogin = () => {
//   // MessageBox('提示','您还没有登录，请先登录');
//   // let router = new Router();
//   // router.push({name: 'login'});
//   location.href = '/';
// };
// // 添加一个请求拦截器
// instance.interceptors.request.use(function (config) {
//   // Do something before request is sent
//   return config;
// }, function (error) {
//   // Do something with request error
//   return Promise.reject(error);
// });

// // 添加一个响应拦截器
// instance.interceptors.response.use(function (res) {
//   // console.log(res);

//   if (res.data && res.data.status === 401) {
//     goLogin();
//   }
//   if (res && res.data && res.data.status !== 200) {
//     res.data.data = {

//     };
//   }
//   return res;
// }, function (error) {
//   // Do something with response error
//   return Promise.reject(error);
// });

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
  config[isPost ? 'data' : 'params'] = data;
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
