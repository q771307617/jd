import * as t from './mutation-types.js';
import api from './../../plugins/api';

export default {
  fetchUserData({ commit }) {
    api.get('user/info', {}).then(e => {
      if (e.status !== 200) return;
      commit(t.SET_USER_DATA, e.data);
    });
  },
  islogin({ commit, dispatch }) {
    api.get('auth/login/status', { timestamp: Date.now() }).then(e => {
      if (e.status !== 200) {
        commit(t.SET_USER_DATA, {});
        return;
      }
      dispatch('fetchUserData');
      dispatch('customServiceinfo');
    });
  },
  // employerIslogin({ commit, dispatch }) {
  //   api.get("auth/login/status", { timestamp: Date.now() }).then(e => {
  //     if (e.status !== 200) {
  //       location.href = "/user/login";
  //       commit(t.SET_USER_DATA, {});
  //       return;
  //     }
  //     dispatch("fetchUserData");
  //     dispatch("customServiceinfo");
  //   });
  // },
  // designerIsType({ commit, dispatch }) {
  //   api.get("auth/login/status", { timestamp: Date.now() }).then(e => {
  //     if (e.status !== 200) {
  //       location.href = "/user/login";
  //       commit(t.SET_USER_DATA, {});
  //       return;
  //     }
  //     api.get("user/info", {}).then(e => {
  //       if (e.status !== 200) return;
  //       if (e.data.type != 2) {
  //         // 登出
  //         commit(t.SET_USER_DATA, {});
  //         api.post("auth/logout").then(e => {});
  //         location.href = "/user/login";
  //         return;
  //       }
  //       dispatch("fetchUserData");
  //       dispatch("customServiceinfo");
  //     });
  //   });
  // },
  // customServiceinfo({ commit }) {
  //   api
  //     .get("common/config/gets", {
  //       keys: "supermanage_qq,supermanage_phone,supermanage_wechat"
  //     })
  //     .then(e => {
  //       if (e.status !== 200) return;
  //       commit(t.CUSTOM_SERVICE_INFO, e.data);
  //     });
  // },
  // 退出
  exitUser({ commit, dispatch }) {
    commit(t.SET_USER_DATA, {});
    api.post('user/logout').then(e => {});
    location.href = '/login/adminLogin';
  }
};
