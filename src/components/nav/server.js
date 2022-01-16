import { sendPost } from '../../lib/fetch';


// export const login = () => sendPost('/user/login', { userName: 'root', password: 'xinhuo123'});
//登录接口
export const login = (param) => sendPost('/user/login', param);
//验证登录状态
export const regIslogin = () => sendPost('/user/validate_login', null);

