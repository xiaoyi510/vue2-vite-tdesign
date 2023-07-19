import axios from 'axios';



// 创建axios实例
const request = axios.create({
  timeout: 1000 * 30,
  baseURL:import.meta.env.VITE_APP_API_URL,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
})

request.interceptors.retry = 3;

// request拦截器
request.interceptors.request.use(
  (config) => {
    // 添加头
    // config.headers['xxx'] = ''
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// response拦截器
request.interceptors.response.use(
  (response) => {
 
      const { data } = response;
      if (data.code === 0) {
        return data;
      }
      if (data && data.code === 401) {
        // 跳转到登录页面

      }
      // 其他都是错误的
      return response;
    
  },
  (err) => {
    const { config } = err;

    if (!config || !config.retry) return Promise.reject(err);

    config.retryCount = config.retryCount || 0;

    if (config.retryCount >= config.retry) {
      return Promise.reject(err);
    }

    config.retryCount += 1;

    const backoff = new Promise((resolve) => {
      setTimeout(() => {
        resolve({});
      },  1);
    });

    return backoff.then(() => request(config));
  },
)

export default request
