import axios from 'axios'; // 引入axios
import QS from "qs"// 引入QS强转换
import router from '@/router';// 引入路由
// 基地址
axios.defaults.baseURL = 'https://api.cjkt.com'
// 设置默认的请求超时时间
axios.defaults.timeout = 10000;
// post请求头的设置 -- 不是长文件流
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// 添加请求拦截器
axios.interceptors.request.use(
  config => {
  // const token = store.state.token;
  // token && (config.headers.Authorization = token);
  return config;
},
  error => {
    return Promise.error(error);
  })
// 添加响应拦截器
axios.interceptors.response.use(
  response => {
  //统一对token或者token过期 进行拦截并跳转到登录！ （code值为 res.code === 40001 || res.code === 50000未判断）
  const {data: res} = response
  if(res.code == 40000 || res.code == 40003 || res.code == 40004 || res.code == 40005){
    response.data.msg = '未登录或登录已过期'
    router.push({ path: 'login'})
  }
  return response;
},
  error => {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

// get方法，对应get请求
export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    }).then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err.data)
    })
  });
}
// post方法，对应post请求
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, QS.stringify(params))
      // axios.post(url, params)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  });
}