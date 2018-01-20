import Vue from 'vue';
const randomPath = (name, size = '') => {
  const n = Math.floor(Math.random() * 5) + 1;
  return `http://${n}.img.dianjiangla.com/jdAssets/${name}${size}`;
};
let filters = { randomPath };
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});
export default filters;
// Vue.filter('randomPath', randomPath);
