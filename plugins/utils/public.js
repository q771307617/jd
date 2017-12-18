let util = {};
util.getName = function (arr = [], key = '') {
  let name = '';
  if (key === undefined || key == null) {
    return '';
  }
  arr.map(function (e) {
    if (e.key === key) {
      name = e.name;
    }
  });
  return name;
};
util.getTitle = function (arr = [], key = '') {
  let title = '';
  if (key === undefined || key == null) {
    return '';
  }
  arr.map(function (e) {
    if (e.key === key) {
      title = e.title;
    }
  });
  return title;
};
export default util;
