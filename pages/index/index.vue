<template>
  <div>
    <div id="mapDiv" style=""></div>
    <div class="seach">
      <!-- <input  type="text">
      <span></span> -->
      <el-input placeholder="请输入企业名称" v-model="seachInput" class="input-with-select">
        <!-- <el-select v-model="select" slot="prepend" placeholder="请选择">
          <el-option label="餐厅名" value="1"></el-option>
          <el-option label="订单号" value="2"></el-option>
          <el-option label="用户电话" value="3"></el-option>
        </el-select> -->
        <el-button  slot="append" style="background:#1c7bef;" icon="el-icon-search"></el-button>
      </el-input>
      <div class="seachJl">
        <el-button><i class="el-icon-location" style="color:#1c7bef;"></i>建德市</el-button>
        <el-select class="xz" v-model="select1" slot="prepend" placeholder="乡镇">
            <el-option label="餐厅名" value="1"></el-option>
            <el-option label="订单号" value="2"></el-option>
            <el-option label="用户电话" value="3"></el-option>
        </el-select>
        <el-select class="hy" v-model="select2" slot="prepend" placeholder="行业分类">
            <el-option label="餐厅名" value="1"></el-option>
            <el-option label="订单号" value="2"></el-option>
            <el-option label="用户电话" value="3"></el-option>
        </el-select>
      </div>
    </div>
    <div class="right">
        <p class="p" @click="rmShow"><i class="el-icon-caret-right" style="color:#1c7bef;"></i></p>
        <div class="rm">
          <p><span></span> 热门企业</p>
          <ul>
            <li>1</li>
            <li>2</li>
            <li>1</li>
            <li>2</li>
            <li>1</li>
            <li>2</li>
          </ul>
        </div>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      seachInput: '',
      select1: '',
      select2: ''
    };
  },
  head: {
    script: [
      {src: 'http://api.tianditu.com/api?v=4.0'},
      {src: 'http://lbs.tianditu.com/api/js4.0/opensource/openlibrary/ImageOverlay.js'}
    ]
  },
  mounted() {
    /* 地图 */
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
    /** 热门企业 **/
    // window.$('.p').on('click',function() {
    //   console.log('aaa')
    // })
  },
  methods: {
    rmShow() {
      // alert('A');
      console.log(window.$('.rm').css('width'));
      if (window.$('.rm').css('width') === '0px') {
        window.$('.rm').animate({width: '356px'});
        window.$('.p i').removeClass('el-icon-caret-left').addClass('el-icon-caret-right');
        window.$('.p').animate({right: '356px'});
        return;
      }
      window.$('.rm').animate({width: '0px'});
      window.$('.p i').removeClass('el-icon-caret-right').addClass('el-icon-caret-left');
      window.$('.p').animate({right: '0'});
    }
  }
};
</script>
<style lang="scss" scoped>
body #mapDiv{
  width:100%;
  min-width: 1200px;
  min-height:600px;
  position:absolute;
  top:140px;
  left:0;
  bottom:0px;
}
.seach{
  position:absolute;
  top:147px;
  left:100px;
  z-index:999;
  width: 800px;
  .input-with-select{
    width:250px;
    float: left;
    margin-right:50px;
  }
  .seachJl{
    // float: left;
    el-button{
    }
    .xz{
      width:120px
    }
    .hy{width:120px}
  }
  
}
.right{
  overflow: hidden;
  position:absolute;
  top:140px;
  right:0px;
  bottom:0px;
  z-index:999;
  width: 376px;
  min-height:600px; 
  .p{
    position:absolute;
    display: inline-block;
    height: 40px;
    width: 20px;
    background: #f2f8ff;
    margin-top: 100%;
    border-radius:5px 0 0 5px; 
    i{
      height: 20px;
      width: 20px;
      margin-top:10px;
      text-align: center;
    }
  }
  .rm{
    float:right;
    background: #f2f8ff;
    width: 356px; 
    height:100%;  
    p{height:18px;line-height:18px;
      font-family:MicrosoftYaHei-Bold;
      font-size:16px;
      font-weight:600;
      color:#333333;
      width: 346px;
      padding: 14px 5px;
      span{
        display: inline-block;
        background:#f2ba55;
        width:4px;
        height:18px;
        margin-bottom:-3px; 
        margin-right: 5px;
      }
    }
    ul{
      float:left;
      padding: 0 5px;
      
      li{

      }
    }
  }
  
}

</style>
