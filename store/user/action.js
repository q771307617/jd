import api from './../../plugins/api';

export default {
  USER_GET({ commit }) {
    api.get('user/info', {}).then(e => {
      if (e.status !== 200) return;
      commit('SET_USER_DATA', e.data);
    });
  }
};
