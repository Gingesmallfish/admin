// src/api/axios.js
import axios from 'axios';

const service = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
  // 携带cookie
  withCredentials: true
});

// 添加请求拦截器
service.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        window.location.href = '/login';
        break;
      case 404:
        console.error('请求资源未找到');
        break;
      case 500:
        console.error('服务器内部错误');
        break;
      default:
        console.error('请求出错，请稍后重试');
    }
  }
  return Promise.reject(error);
});

export default service;
