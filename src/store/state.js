import cookie from '../utils/cookie'

const userInfo = {
  name:cookie.getCookie('name')||'',
  token:cookie.getCookie('token')||''
}

const state = {
  userInfo
};

export default state