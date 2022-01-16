import axios from 'axios';

export const sendPost = async (url, param) => {
    try {
        const r = await axios.post(`http://localhost:7001${url}`, param, {
            // const r = await axios.post(`https://www.xinhuochian.com/xh/front${url}`, param, {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            withCredentials: true,
        });
        return r.data;
    } catch (e) {
        const { response } = e;
        if (response.status === 302) {
            window.location.href = '#/login';
        }
    }
};