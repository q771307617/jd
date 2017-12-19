import api from './../../plugins/api';
export default {
  LIST_GET({ state, commit }) {
    // townShip获取所有乡镇
    api.get('common/getalltown').then(e => {
      if (e.status !== 200) return;
      commit('ALL_TOWN_SHIP', e.data);
    });
    // industry获取到所有行业类型
    api.get('common/getalltrade').then(e => {
      if (e.status !== 200) return;
      commit('ALL_INDUSTRY', e.data);
    });
  }
};
