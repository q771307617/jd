<template>
  <div>
    <div id='mapDiv' style=''></div>
    <div class='seach'>
      <!-- <input  type='text'>
      <span></span> -->
      <el-input placeholder='请输入企业名称' v-model='searchParams.value' class='input-with-select'>
        <!-- <el-select v-model='select' slot='prepend' placeholder='请选择'>
          <el-option label='企业' value='1'></el-option>
          <el-option label='项目' value='2'></el-option>
        </el-select> -->
        <el-button  slot='append' style='background:#1c7bef;' icon='el-icon-search' class="searchBtn" @click="searchcompany(1)"></el-button>
      </el-input>
      <ul class="searchList" >
        <li class="searchItem" v-for = "item in searchList" :key='item.id' @click="searchItem(item.id, item)">{{item.name}}</li>
      </ul>
      <div class='seachJl'>
        <el-button @click="initMap">
          <i class='el-icon-location' style='color:#1c7bef;'></i>建德市</el-button>
        <el-select class='xz' v-model='xz' slot='prepend' placeholder='乡镇'>
            <el-option v-for = "item in townShip " :key='item.id' :label='item.name' :value='item.id'></el-option>
        </el-select>
        <el-select class='hy' v-model='hy' slot='prepend' placeholder='行业分类'>
            <el-option v-for = "item in industry" :label='item.tradeName':key='item.id' :value='item.id'></el-option>
        </el-select>
      </div>
    </div>
    <div class='right'>
        <p class='p' @click='rmShow'><i class='el-icon-caret-right' style='color:#1c7bef;'></i></p>
        <div class='rm'>
          <p class="rmTitle"><span></span> 热门企业</p>
          <ul>
            <li v-for = "item in remenParams" :key='item.companyId'>
              <p>
                <img :src='item.factoryImageUrl' alt=''>
              </p>
              <ul>
                <li class='ellipsis'>企业名称：<a>{{item.companyName}}</a></li>
                <li class='ellipsis'>所属乡镇：<span>{{item.townName}}</span></li>
                <li class='ellipsis'>地　　址：<span>{{item.companyAddress}}</span></li>
                <li class='ellipsis'>联系方式：<span>{{item.chargePersonTel}}</span></li>
              </ul>
            </li>          
          </ul>
        </div>
    </div>
  </div>
</template>
<script>
import api from '~/plugins/api';
import { mapState } from 'vuex';
export default {
  data() {
    return {
      map: {},
      markerO: {},
      allCompanys: { },
      seachInput: '',
      xz: '',
      hy: '',
      remenParams: {
        img: '',
        name: '',
        address: '',
        phone: ''
      },
      searchParams: {
        type: '1',
        value: ''
      },
      searchxzhyParams: {
        type: '',
        value: ''
      },
      searchList: [],
      mapParams: {
        zoom: '11',
        lat: '29.470681',
        lng: '119.286105',
        markers: [
          [119.248339, 29.46814],
          [119.282672, 29.409538],
          [119.499652, 29.515954],
          [119.21955, 29.372445],
          [119.544284, 29.643148],
          [119.069812, 29.285045],
          [119.66582, 29.505198],
          [119.352023, 29.580467],
          [119.314257, 29.316781],
          [119.171435, 29.324564],
          [119.435794, 29.607335],
          [118.993594, 29.324564],
          [119.505145, 29.428079],
          [119.286105, 29.603753],
          [119.54909, 29.716525],
          [119.295718, 29.528502]
        ]
      }
    };
  },
  head: {
    script: [{
      src: 'http://api.tianditu.com/api?v=4.0'
    },
    {
      src: 'http://lbs.tianditu.com/api/js4.0/opensource/openlibrary/ImageOverlay.js'
    }
    ]
  },
  computed: {
    ...mapState({
      townShip: state => state.Lists.AllTownShip,
      scale: state => state.Lists.scale,
      industry: state => state.Lists.AllIndustry
    })
  },
  mounted() {
    /* 热门企业 */
    this.remen();
    /* 地图实例化 */
    this.allCompany();
  },
  watch: {
    xz(val, old) {
      this.searchXzHy(2, val);
      this.map.panTo(new window.T.LngLat(this.mapParams.markers[val - 1][0], this.mapParams.markers[val - 1][1]), 13);
    },
    hy(val, old) {
      this.searchXzHy(3, val);
    }
  },
  methods: {
    // 右边侧边栏
    rmShow() {
      if (window.$('.right').css('width') === '20px') {
        window.$('.right').animate({
          width: '443px'
        });
        window.$('.rm').animate({
          width: '413px'
        });
        window.$('.p i').removeClass('el-icon-caret-left').addClass('el-icon-caret-right');
        window.$('.p').animate({
          right: '423px', top: '50%'
        });
        return;
      }
      window.$('.right').animate({
        width: '20px'
      });
      window.$('.rm').animate({
        width: '0px'
      });
      window.$('.p i').removeClass('el-icon-caret-right').addClass('el-icon-caret-left');
      window.$('.p').animate({
        right: '0px', top: '50%'
      });
    },
    searchcompany(type) {
      let searchParams = this.searchParams;
      api.get('company/searchcompany', searchParams)
        .then(e => {
          this.searchList = e.data.list.slice(0, 6);
        })
        .catch(err => {
          this.$notify.error({
            title: '错误',
            message: err.msg
          });
        });
      window.$('.searchList').css({display: 'block'});
      window.$('.searchList').on('mouseleave', function () {
        window.$('.searchList').css({display: 'none'});
      });
      // window.$('.searchList li').on('click', function (e) {
      //   window.$('.searchList').css({display: 'none'});
      // });
    },
    // 乡镇行业搜索
    searchXzHy(type, val) {
      // this.searchxzhyParams.value = val;
      // this.searchxzhyParams.type = type;
      api.get('/company/getcompanybytownid', {townId: this.xz, tradeId: this.hy})
        .then(e => {
          this.allCompanys = e.data;
          this.map.clearOverLays();
          this.imgOverLay(this.map);
          this.polygon(this.map);
          this.markers(this.map);
          // this.map.setZoom(15);
        })
        .catch(error => {
          this.$notify.error({
            title: '错误',
            message: error.msg
          });
        });
    },
    // 建德市企业
    initMap() {
      this.map.centerAndZoom(new window.T.LngLat(this.mapParams.lng, this.mapParams.lat), 11);
      this.map.clearOverLays();
      // this.imgOverLay(this.map);
      // this.polygon(this.map);
      api.get('company/getallcompany')
        .then(e => {
          this.map.clearOverLays();
          this.imgOverLay(this.map);
          this.polygon(this.map);
          this.allCompanys = e.data;
          this.markers(this.map);
        })
        .catch(error => {
          this.$notify.error({
            title: '错误',
            message: error.msg
          });
        });
    },
    // 所有企业
    allCompany() {
      api.get('company/getallcompany')
        .then(e => {
          this.allCompanys = e.data;
          this.getMap();
        })
        .catch(err => {
          this.$notify.error({
            title: '错误',
            message: err.msg
          });
        });
    },
    // 企业搜索
    searchItem(id, data) {
      this.searchParams.value = data.name;
      this.mapParams.zoom = '18';
      this.mapParams.lat = data.lat;
      this.mapParams.lng = data.lng;
      this.allCompanys = [data];
      this.map.clearOverLays();
      this.imgOverLay(this.map);
      this.polygon(this.map);
      // this.markerO.setLngLat({lng: 119.282672, lat: 29.409538});
      this.markers(this.map);
      // this.getMap();
      this.fetchMap();
    },
    // 热门企业
    remen() {
      api.get('company/hotcompany')
        .then(e => {
          this.remenParams = e.data;
        })
        .catch(error => {
          this.$notify.error({
            title: '错误',
            message: error.msg
          });
        });
    },
    // 更新地图
    fetchMap() {
      // this.map.setZoom(this.mapParams.zoom);
      // console.log(this.mapParams.lng, this.mapParams.lat);
      this.map.panTo(new window.T.LngLat(this.mapParams.lng, this.mapParams.lat), 14);
    },
    getMap() {
      var zoom = this.mapParams.zoom;
      var lng = this.mapParams.lng;
      var lat = this.mapParams.lat;
      var map = new window.T.Map('mapDiv');
      // 移动到指定点
      map.centerAndZoom(new window.T.LngLat(lng, lat), zoom);
      map.enableDrag();
      /* 不同图层加载不同的底图 */
      this.imgOverLay(map);
      /** 企业标注 **/
      this.markers(map);
      /** 乡划 **/
      this.polygon(map);
      this.map = map;
    },
    imgOverLay(map) {
      var bd = new window.T.LngLatBounds(
        new window.T.LngLat(118.8940912546568, 29.20439576265778),
        new window.T.LngLat(120.32081607375262, 30.155545642054992)
      );
      var img1 = new window.T.ImageOverlay(
        'http://1.img.dianjiangla.com/jdAssets/JD1.png',
        bd, {
          opacity: '.7',
          alt: '建德市'
        }
      );
      var img2 = new window.T.ImageOverlay(
        'http://1.img.dianjiangla.com/jdAssets/JD2.png',
        bd, {
          opacity: '.7',
          alt: '建德市'
        }
      );
      var img3 = new window.T.ImageOverlay(
        'http://1.img.dianjiangla.com/jdAssets/JD3.png',
        bd, {
          opacity: '.7',
          alt: '建德市'
        }
      );
      var img4 = new window.T.ImageOverlay(
        'http://1.img.dianjiangla.com/jdAssets/JD4.png',
        bd, {
          opacity: '.7',
          alt: '建德市'
        }
      );
      map.addOverLay(img1);
      map.addOverLay(img1);
      map.addOverLay(img1);
      map.addOverLay(img1);
      map.addEventListener('zoomend', function (e) {
        console.log(map.getLayers());
        var zoom = map.getZoom();
        // map.removeOverLay(img1, img2, img3, img4);
        img1.hide();
        img2.hide();
        img3.hide();
        img4.hide();
        if (zoom < 12) {
          // map.addOverLay(img1);
          img1.show();
        } else if (zoom === 12) {
          // map.addOverLay(img2);
          img2.show();
        } else if (zoom > 12 && zoom < 15) {
          img3.show();
          // map.addOverLay(img3);
        } else if (zoom >= 15) {
          img4.show();
          // map.addOverLay(img4);
        }
      });
    },
    markers(map) {
      var markers = [];
      for (var i in this.allCompanys) {
        markers.push([this.allCompanys[i].lng, this.allCompanys[i].lat]);
      }
      var icon = new window.T.Icon({
        iconUrl: 'http://p1.so.qhimgs1.com/t01989df0653e0a5ac1.png',
        iconSize: new window.T.Point(20, 25),
        iconAnchor: new window.T.Point(10, 25)
      });
      // var infoWin1 = new window.T.InfoWindow();
      for (let i = 0; i < markers.length; i++) {
        var marker = new window.T.Marker(
          new window.T.LngLat(markers[i][0], markers[i][1]), {
            icon: icon
          }
        );
        map.addOverLay(marker);
        // map.removeOverLay(marker);
        /** 信息窗体 **/
        var content = '';
        content = '<h2>' + this.allCompanys[i].name + '</h2>' + this.allCompanys[i].chargePersonTel + '';

        addClickHandler(content, marker);
      }
      this.markerO = marker;
      function addClickHandler(content, marker) {
        marker.addEventListener('mousemove', function (e) {
          openInfo(content, e);
        });
      }
      function openInfo(content, e) {
        var point = e.lnglat;
        // marker = new window.T.Marker(point); // 创建标注
        var markerInfoWin = new window.T.InfoWindow(content, {
          offset: new window.T.Point(0, -20),
          autoPan: true,
          closeOnClick: true
        }); // 创建信息窗口对象
        map.openInfoWindow(markerInfoWin, point); // 开启信息窗口
      };
    },
    polygon(map) {
      // 鼠标点击选点
      let polygonList = [
        [119.248339, 29.46814],
        [119.282672, 29.409538],
        [119.499652, 29.515954],
        [119.21955, 29.372445],
        [119.544284, 29.643148],
        [119.069812, 29.285045],
        [119.66582, 29.505198],
        [119.352023, 29.580467],
        [119.314257, 29.316781],
        [119.171435, 29.324564],
        [119.435794, 29.607335],
        [118.993594, 29.324564],
        [119.505145, 29.428079],
        [119.286105, 29.603753],
        [119.54909, 29.716525],
        [119.295718, 29.528502]
      ];
      for (var item in polygonList) {
        window.$.ajax({
          url: 'http://172.30.34.63:6080/arcgis/rest/services/JDLand_XZM/MapServer/identify',
          data: 'f=json&tolerance=5&returnGeometry=true&imageDisplay=1398%2C210%2C96&geometry=%7B"x"%3A' + polygonList[item][0] + '%2C"y"%3A' + polygonList[item][1] + '%7D&geometryType=esriGeometryPoint&sr=4326&mapExtent=118.94165999313367%2C29.6123519861085%2C119.90159041305554%2C29.756547542749125&layers=top',
          success: function (data) {
            var a = JSON.parse(data).results[0].geometry.rings[0];
            var point = [];
            for (var i = 0; i < a.length; i++) {
              point.push(new window.T.LngLat(a[i][0], a[i][1]));
            }
            var polygon = new window.T.Polygon(point, {color: '#537fb9', weight: 2, opacity: '.6', fillColor: '#FFF', fillOpacity: 0});
            // 鼠标滑过
            polygon.addEventListener('mouseover', function (e) {
              polygon.setColor('#537fb9');
              polygon.setOpacity({opacity: '0.6'});
              polygon.setFillOpacity('0.3');
              polygon.setFillColor('#488EF9');
            });
            polygon.addEventListener('mouseout', function (e) {
              polygon.setColor('#537fb9');
              polygon.setOpacity({opacity: '0'});
              polygon.setFillOpacity('0');
              polygon.setFillColor('#FFFFFF');
            });
            map.addOverLay(polygon);
          },
          error: function (error) {
            this.$notify.error({
              title: '错误',
              message: error.msg
            });
          }
        });
      }
      // map.on('mousemove', function (e) {
      //   // 经度 纬度
      //   var x = e.lnglat.getLng();
      //   var y = e.lnglat.getLat();
      //   if (y > 29.205656 && y < 29.774429 && x > 118.896922 && x < 119.765112) {
      //   }
      // });
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
    input {
      width: 294px;
    }
    .el-button {
      border-radius: 0 5px 5px 0;
    }
  }
  .searchList {
    position: absolute;
    top: 39px;
    background: #ffffff;
    border: 1px solid #e0e0e0;
    width: 294px;
    height: 216px;
    display: none;
    li {
      width: 274px;
      height: 16px;
      padding: 10px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    li:hover {
      background: #f2f8ff;
    }
  }
  .seachJl {
    el-button {}
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
    z-index: 999;
    position: absolute;
    display: inline-block;
    height: 40px;
    width: 18px;
    top: 50%;
    background: #f2f8ff;
    border-radius: 5px 0 0 5px;
    border: 1px solid #e0e0e0;
    border-right: none;
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
    border: 1px solid #e0e0e0;
    padding-left: 10px;
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
      width: 413px;
      padding: 5px 0;
      li {
        overflow: hidden;
        clear: both;
        p {
          display: inline-block;
          width: 121px;
          height: 79px;
          margin-right: 10px;
          float: left;
          img {
            max-width: 119px;
            margin: 0 auto;
          }
        }
        ul {
          float: right;
          width: 277px;
          display: inline-block;
          li {
            color: #8f9193;
            font-size: 12px;
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
