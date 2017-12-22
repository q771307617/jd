import * as t from './mutation-types.js';
export default {
  // 退出登录
  [t.OUT_LOGIN](state) {
    state.userInfo = { name: '' };
    state.login = false;
  },
  [t.RECORD_USERINFO](state, info) {
    state.userInfo = info;
    state.login = true;
  },
  [t.SET_USER_DATA](state, data) {
    state.info = data;
  },
  [t.VERIFYINFO](state, { code, phone }) {
    state.code = code;
    state.phone = phone;
  }
};
