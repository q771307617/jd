import Vue from 'vue';
import Vuex from 'vuex';
import Pub from './public';

// 文件导出内容
Vue.use(Vuex);
let Store = () => new Vuex.Store({
  modules: {
    Pub
  }
});
export default Store;
