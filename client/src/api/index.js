import axios from 'axios';

const config = {
  timeout: 30000,
  headers: {
    Authorization: process.env.TOKEN, // 请替换成您的认证密钥
  },
};

class Service {
  service;
  constructor(config) {
    this.service = axios.create(config);
    this.service.interceptors.request.use(
      (config) => {
        return config;
      },
      (err) => {
        Promise.reject(err);
      },
    );
    this.service.interceptors.response.use(
      (res) => {
        return res.data;
      },
      (err) => {
        Promise.reject(err);
      },
    );
  }
  get(url, config = {}) {
    return this.service.get(url, config);
  }
  post(url, data, config = {}) {
    return this.service.post(url, data, config);
  }
}

export default new Service(config);
