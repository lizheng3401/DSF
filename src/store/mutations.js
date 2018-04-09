
import cookie from '../utils/cookie'

const mutations = {
  setInfo(state) {
    state.userInfo = {
      name: cookie.getCookie('name'),
      token: cookie.getCookie('token')
    }
    console.log(state.userInfo);
  },
  delInfo(state) {
    state.userInfo = {
      name: cookie.setCookie(null),
      token: cookie.setCookie(null)
    }
  }
};

export default mutations