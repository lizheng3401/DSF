
import cookie from '../utils/cookie'

const mutations = {
  setInfo(state) {
    state.userInfo = {
      name: cookie.getCookie('name'),
      token: cookie.getCookie('token')
    }
    console.log(state.userInfo);
  },
};

export default mutations