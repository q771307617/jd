<template>
  <div>
    <div id="mapDiv" style=""></div>
    
  </div>
</template>
<script>

export default {
  head: {
    script: [
      {src: 'http://api.tianditu.com/api?v=4.0'},
      {src: 'http://lbs.tianditu.com/api/js4.0/opensource/openlibrary/ImageOverlay.js'}
    ]
  },
  methods: {
  },
  mounted() {
    window.$('.ddd').text('aaaa');
    var map;
    var zoom = 11;
    // var img;
    var img1;
    map = new window.T.Map('mapDiv');
    map.centerAndZoom(new window.T.LngLat(119.286105, 29.470681), zoom);
    var bd = new window.T.LngLatBounds(
      new window.T.LngLat(118.8940912546568, 29.20439576265778),
      new window.T.LngLat(120.32081607375262, 30.155545642054992));
    // img = new window.T.ImageOverlay('http://1.img.dianjiangla.com/jdAssets/jdCity.png', bd, {opacity: '.3', alt: '建德市'}, {minZoom: '1', maxZoom: '13'});
    img1 = new window.T.ImageOverlay('http://chuantu.biz/t6/173/1512980653x-1404793565.png', bd, {opacity: '.5', alt: '建德市'}, {minZoom: '13', maxZoom: '20'});
    // map.addOverLay(img);
    map.addOverLay(img1);
  }
};
</script>
<style lang="scss" scoped>
body #mapDiv{
  width:100%;
  min-height:600px;
  position:absolute;
  top:140px;
  left:0;
  bottom:0px;
}


</style>
