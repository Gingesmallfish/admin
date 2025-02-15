import axios from './axios';

// 登录请求
export const login = (data) => {
    return axios.post('/api/user/login', data);
};

// 注册请求
export const register = (data) => {
    return axios.post('/api/user/register', data);
};

// 获取验证码
export const getCaptcha = () => {
    return axios.get('/api/user/captcha', {
        responseType: 'arraybuffer'
    });
};

