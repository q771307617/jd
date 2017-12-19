import Vue from 'vue';
import Vuex from 'vuex';
import Pub from './public';
import Lists from './lists';

Vue.use(Vuex);
let Store = () =>
  new Vuex.Store({
    modules: {
      Pub,
      Lists
    }
  });
export default Store;
