import Vue from 'vue';
import Vuex from 'vuex';
import Pub from './public';
import Lists from './lists';
import user from './user';

Vue.use(Vuex);
let Store = () =>
  new Vuex.Store({
    modules: {
      Pub,
      Lists,
      user
    }
  });
export default Store;
