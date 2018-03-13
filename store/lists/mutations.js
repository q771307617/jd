export default {
  ALL_TOWN_SHIP(state, data) {
    state.AllTownShip = data;
    state.AllTownShipS = [{id: 17, name: '开发区', lng: 119.22, lat: 29.36}, {id: 18, name: '高铁新区', lng: 119.37, lat: 29.54}].concat(data);
  },
  ALL_INDUSTRY(state, data) {
    state.AllIndustry = data;
  }
};
