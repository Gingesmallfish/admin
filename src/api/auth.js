import axios from 'axios';

// 登录请求
export const login = (data) => {
    return axios.post('/api/login', data);
};

// 注册请求
export const register = (data) => {
    return axios.post('/api/register', data);
};

// 获取验证码请求
export const getCaptcha = () => {
    return `/api/captcha?timestamp=${new Date().getTime()}`;
};

