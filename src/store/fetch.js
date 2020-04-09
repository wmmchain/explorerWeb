import axios from 'axios';
import router from '../router/index';
// let token=window.localStorage.getItem("token");
import {
  Message
} from 'element-ui'
function errorLog(err){
  Message({
    message:err.message,
    type:'error',
    duration:3000
  })
}
// 请求超时时间
axios.defaults.timeout = 30000;
axios.defaults.withCredentials = true;
// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// 请求拦截器
axios.interceptors.request.use(
  config => {
      // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
      // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
      const token = window.localStorage.getItem('token');
      token && (config.headers.Authorization = "Bearer "+token);
      return config;
  },
  error => {
      return Promise.error(error);
  })


  axios.interceptors.response.use(
  response => {
    // dataAxios 是 axios 返回数据中的 data
    const dataAxios = response.data
    if (response.config.url == '/ad/ldap/login') {
      if (response.headers['access-token']) {
        response.data.token = response.headers['access-token']
      }
    }

    // 这个状态码是和后端约定的
    const {
      code
    } = dataAxios
    // 根据 code 进行判断
    if (code === undefined) {
      // 如果没有 code 代表这不是项目后端开发的接口 比如可能是 Admin 请求最新版本
      return dataAxios
    } else {
      // 有 code 代表这是一个后端接口 可以进行进一步的判断
      switch (code) {
        case 0:
          // [ 示例 ] code === 0 代表没有错误
          return dataAxios.data
        case 'xxx':
          // [ 示例 ] 其它和后台约定的 code
          errorCreate(`[ code: xxx ] ${dataAxios.msg}: ${response.config.url}`)
          break
        default:
          // 不是正确的 code
          errorCreate(`${dataAxios.msg}: ${response.config.url}`)
          break
      }
    }
  },
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = error.response.data.msg;
          break
        case 401: {
          error.message = '未授权，请登录';
          router.replace({
            path: 'login',
            query: {
              redirect: router.currentRoute.path
            },
          })
          break
        }

        case 403:
          error.message = '没有权限，拒绝访问';
          break
        case 404:
          error.message = `请求地址出错`;
          break
        case 408:
          error.message = '请求超时';
          break
        case 500:
          error.message = '服务器内部错误';
          break
        case 501:
          error.message = '服务未实现';
          break
        case 502:
          error.message = '网关错误';
          break
        case 503:
          error.message = '服务不可用';
          break
        case 504:
          error.message = '网关超时';
          break
        case 505:
          error.message = 'HTTP版本不受支持';
          break
        default:
          break
      }
    }
    errorLog(error)
    return Promise.reject(error)
  }
)
export default axios;

