<template>
  <div>
    <div id='mapDiv' style=''></div>
    <div class='seach'>
      <!-- <input  type='text'>
      <span></span> -->
      <el-input placeholder='请输入企业名称' v-model='seachInput' class='input-with-select'>
        <!-- <el-select v-model='select' slot='prepend' placeholder='请选择'>
          <el-option label='企业' value='1'></el-option>
          <el-option label='项目' value='2'></el-option>
        </el-select> -->
        <el-button  slot='append' style='background:#1c7bef;' icon='el-icon-search' class="searchBtn" @click="searchList"></el-button>
      </el-input>
      <ul class="searchList">
        <li>四喜信息技术有限公司</li>
        <li>四喜信息技术有限公司</li>
        <li class="ellipisice">四喜信息技术四喜信息技术有限公司四喜信息技术有限公司四喜信息技术有限公司有限公司</li>
        <li>四喜信息技术有限公司</li>
        <li>四喜信息技术有限公司</li>
        <li>四喜信息技术有限公司</li>
      </ul>
      <div class='seachJl'>
        <el-button><i class='el-icon-location' style='color:#1c7bef;'></i>建德市</el-button>
        <el-select class='xz' v-model='select1' slot='prepend' placeholder='乡镇'>
            <el-option label='餐厅名' value='1'></el-option>
            <el-option label='订单号' value='2'></el-option>
            <el-option label='用户电话' value='3'></el-option>
        </el-select>
        <el-select class='hy' v-model='select2' slot='prepend' placeholder='行业分类'>
            <el-option label='餐厅名' value='1'></el-option>
            <el-option label='订单号' value='2'></el-option>
            <el-option label='用户电话' value='3'></el-option>
        </el-select>
      </div>
    </div>
    <div class='right'>
        <p class='p' @click='rmShow'><i class='el-icon-caret-right' style='color:#1c7bef;'></i></p>
        <div class='rm'>
          <p class="rmTitle"><span></span> 热门企业</p>
          <ul>
            <li>
              <p>
                <img src='./../../assets/img/bgAdminLogin.png' alt=''>
              </p>
              <ul>
                <li class='ellipsis'>企业名称：<a>四喜信息技术有限公司</a></li>
                <li class='ellipsis'>所属乡镇：<span>西湖镇</span></li>
                <li class='ellipsis'>地　　址：<span >四喜信息技术有限公司四喜信息技术有限公司</span></li>
                <li class='ellipsis'>联系方式：<span>1008610010110</span></li>
              </ul>
            </li>          
          </ul>
        </div>
    </div>
  </div>
</template>
<script>
import api from '~/plugins/api';
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
      { src: 'http://api.tianditu.com/api?v=4.0' },
      {
        src:
          'http://lbs.tianditu.com/api/js4.0/opensource/openlibrary/ImageOverlay.js'
      }
    ]
  },
  mounted() {
    api.get('company/hotcompany')
      .then(e => {
        //  this.$router.push({ name: 'custome-list' });
        console.log(e);
      })
      .catch(err => {
        this.$notify.error({
          title: '错误',
          message: err.msg
        });
      });
    /* 地图实例化 */
    window.$('.ddd').text('aaaa');
    var map;
    var zoom = 11;
    var marker;
    map = new window.T.Map('mapDiv');
    map.centerAndZoom(new window.T.LngLat(119.286105, 29.470681), zoom);
    var bd = new window.T.LngLatBounds(
      new window.T.LngLat(118.8940912546568, 29.20439576265778),
      new window.T.LngLat(120.32081607375262, 30.155545642054992)
    );
    var img1 = new window.T.ImageOverlay(
      'http://chuantu.biz/t6/173/1512980653x-1404793565.png',
      bd,
      { opacity: '.5', alt: '建德市' }
    );
    var img2 = new window.T.ImageOverlay(
      'http://www.bbvdd.com/d/201712111707229eg.png',
      bd,
      { opacity: '.5', alt: '建德市' }
    );
    var img3 = new window.T.ImageOverlay(
      'http://www.bbvdd.com/d/20171211171824rag.png',
      bd,
      { opacity: '.5', alt: '建德市' }
    );
    var img4 = new window.T.ImageOverlay(
      'http://1.img.dianjiangla.com/jdAssets/jdQh.png',
      bd,
      { opacity: '.5', alt: '建德市' }
    );
    /* 不同图层加载不同的底图 */
    map.addOverLay(img1);
    map.addEventListener('zoomend', function (e) {
      console.log(map.getZoom());
      map.removeOverLay(img1);
      var zoom = map.getZoom();
      if (zoom < 12) {
        map.addOverLay(img1);
        map.removeOverLay(img2, img3, img4);
      } else if (zoom === 12) {
        map.addOverLay(img2);
        map.removeOverLay(img1, img3, img4);
      } else if (zoom > 12 && zoom < 15) {
        map.addOverLay(img3);
        map.removeOverLay(img2, img1, img4);
      } else if (zoom >= 15) {
        map.addOverLay(img4);
        map.removeOverLay(img2, img3, img1);
      }
    });
    /** 企业标注 **/
    var markers = [
      [119.280698, 29.474716],
      [119.280597, 29.471716],
      [119.286696, 29.474716],
      [119.281695, 29.478716],
      [119.286105, 29.470681],
      [119.226103, 29.420683],
      [119.296102, 29.410682],
      [119.226103, 29.420683],
      [119.047696, 29.320256],
      [119.041697, 29.330257],
      [119.048698, 29.330258],
      [119.042698, 29.330258],
      [119.307696, 29.320256],
      [119.221697, 29.490257],
      [119.048698, 29.310258],
      [119.242698, 29.370258]
    ];
    var icon = new window.T.Icon({
      iconUrl: 'http://p1.so.qhimgs1.com/t01989df0653e0a5ac1.png',
      iconSize: new window.T.Point(20, 25),
      iconAnchor: new window.T.Point(10, 25)
    });
    // var infoWin1 = new window.T.InfoWindow();
    for (let i = 0; i < markers.length; i++) {
      marker = new window.T.Marker(
        new window.T.LngLat(markers[i][0], markers[i][1]),
        { icon: icon }
      );
      map.addOverLay(marker);
      /** 信息窗体 **/
      var content = '<h2>我是标题</h2>我是第' + i + '个信息窗体的内容';
      addClickHandler(content, marker);
    }
    function addClickHandler(content, marker) {
      marker.addEventListener('mousemove', function (e) {
        openInfo(content, e);
      });
      // marker.addEventListener('mouseout', function (e) {
      //   map.closeInfoWindow();
      // });
    }
    function openInfo(content, e) {
      var point = e.lnglat;
      marker = new window.T.Marker(point);// 创建标注
      var markerInfoWin = new window.T.InfoWindow(content, {offset: new window.T.Point(0, -20), autoPan: true, closeOnClick: true}); // 创建信息窗口对象
      map.openInfoWindow(markerInfoWin, point); // 开启信息窗口
    }
    /** 乡划 **/
    var point = [];
    for (var i = 0; i < markers.length; i++) {
      point.push(new window.T.LngLat(markers[i][0], markers[i][1]));
    }
    var polygon = new window.T.Polygon(point, {
      color: '#FFFFFF', weight: 3, opacity: 0.1, fillColor: '#FFFFFF', fillOpacity: 0.1
    });
    // 鼠标点击选点
    map.addOverLay(polygon);
    polygon.addEventListener('mousemove', function (e) {
      polygon.setColor('red');
      // polygon.setOpacity({opacity: 0.3});
      // polygon.setFillOpacity({fillOpacity: 0.3});
      polygon.setFillColor('#000');
      console.log(polygon.getOpacity());
    });
    polygon.addEventListener('mouseout', function (e) {
      polygon.setColor('#FFFFFF');
      // polygon.setOpacity({opacity: 0.3});
      // polygon.setFillOpacity({fillOpacity: 0.3});
      polygon.setFillColor('#FFFFFF');
      console.log(polygon.getOpacity());
    });
  },

  methods: {
    rmShow() {
      console.log(window.$('.rm').css('width'));
      if (window.$('.rm').css('width') === '0px') {
        window.$('.rm').animate({ width: '413' });
        window.$('.p i').removeClass('el-icon-caret-left').addClass('el-icon-caret-right');
        window.$('.p').animate({ right: '423px' });
        return;
      }
      window.$('.rm').animate({ width: '0px' });
      window.$('.p i').removeClass('el-icon-caret-right').addClass('el-icon-caret-left');
      window.$('.p').animate({ right: '0' });
    },
    searchList() {
      window.$('.searchList').css({display: 'block'});
      window.$('.searchList').on('mouseleave', function () {
        window.$('.searchList').css({display: 'none'});
      });
      window.$('.searchList li').on('click', function () {
        window.$('.searchList').css({display: 'none'});
      });
    }
  }
};
</script>
<style lang='scss' scoped>
body #mapDiv {
  width: 100%;
  min-width: 1200px;
  min-height: 600px;
  position: absolute;
  top: 140px;
  left: 0;
  bottom: 0px;
}
.seach {
  position: absolute;
  top: 147px;
  left: 100px;
  z-index: 999;
  width: 800px;
  .input-with-select {
    width: 354px;
    float: left;
    margin-right: 50px;
    input{
      width: 294px;
    }
    .el-button{
      border-radius:0 5px 5px 0; 
    }
  }
  .searchList{
    position: absolute;
    top: 39px;
    background:#ffffff;
    border:1px solid #e0e0e0;
    width:294px;
    height:216px;
    display: none;
    li{
        width:274px;
        height:16px;
        padding: 10px;
        white-space: nowrap;  
        text-overflow:ellipsis; 
        overflow:hidden;
    }
    li:hover{
      background:#f2f8ff;
    }
  }
  .seachJl {
    el-button {

    }
    .xz {
      width: 120px;
    }
    .hy {
      width: 120px;
    }
  }
}
.right {
  overflow: hidden;
  position: absolute;
  top: 140px;
  right: 0px;
  bottom: 0px;
  z-index: 999;
  width: 443px;
  min-height: 600px;
  .p {
    position: absolute;
    display: inline-block;
    height: 40px;
    width: 18px;
    background: #f2f8ff;
    margin-top: 100%;
    border-radius: 5px 0 0 5px;
    border:1px solid #e0e0e0;
    border-right:none; 
    i {
      height: 20px;
      width: 20px;
      margin-top: 13px;
      text-align: center;
    }
  }
  .rm {
    float: right;
    background: #f2f8ff;
    overflow: hidden;
    width: 413px;
    height: 100%;
    border:1px solid #e0e0e0;
    padding-left:10px;
    .rmTitle {
      height: 18px;
      line-height: 18px;
      font-family: MicrosoftYaHei-Bold;
      font-size: 16px;
      font-weight: 600;
      color: #333333;
      padding: 14px 0px;
      span {
        display: inline-block;
        background: #f2ba55;
        width: 4px;
        height: 18px;
        margin-bottom: -3px;
        margin-right: 5px;
      }
    }
    ul {
      overflow: hidden;
      width:413px;
      padding:5px 0;
      li {
        overflow: hidden;
        
        p {
          display: inline-block;
          width: 121px;
          height: 79px;
          margin-right:10px;
          img {
            max-width: 119px;
            margin: 0 auto;
          }
        }
        ul {
          width: 277px;
          display: inline-block;
          
          li {
            color: #8f9193;
            font-size:12px; 
            height: 16px;
            line-height: 16px;
            span {
              color: #000;
              max-width: 170px;
            }
            a {
              font-family: MicrosoftYaHei;
              font-size: 12px;
              color: #1c7bef;
              text-align: left;
            }
          }
        }
      }
    }
  }
}
</style>
