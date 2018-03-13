<template>
  <div class="mainMap">
    <div id='mapDiv' style=''>
      <div class='right'>
        <p class='p' @click='rmShow'><i class='el-icon-caret-right' style='color:#1c7bef;'></i></p>
        <div class='rm'>
          <p class="rmTitle rmmore"><span class="span"></span> 数据分析<a href="/front/dataAnalysis">更多公司 <span>>></span></a> </p>
          <p class="rmDetail">
            一共
            <span class="rmDetailItem">{{this.analyze.allCount}}</span> 家企业, 其中规上企业 
            <span class="rmDetailItem">{{this.analyze.upCount}}</span> 家, 规下企业 
            <span class="rmDetailItem">{{this.analyze.downCount}}</span> 家。年度累计销售产值 
            <span class="rmDetailItem">{{this.analyze.allMain}}</span> 万元, 税收 
            <span class="rmDetailItem">{{this.analyze.allTax}}</span> 万元, 水耗 
            <span class="rmDetailItem">{{this.analyze.allWater}}</span> 万立方米, 电耗 
            <span class="rmDetailItem">{{this.analyze.allElec}}</span> 万千瓦时。
          </p>
          <ul class="rmUl"><li v-for="item in rmType" :key="item.key" class="redio" :class="{nactive: radio===item.key}" @click="selecType(item.key)">{{item.tittle}}</li><br class="clearfloat" /> </ul>
          <el-table :data="companyInfo" max-height="630" :row-class-name="tableRowClassName" :header-cell-class-name="tableHeaderClassName" class="tables" @sort-change="sortType">
            <el-table-column label="企业名称" width="170" header-align="center">
              <span class="block ellipsis" slot-scope="scope" @click="searchItem(scope.row.id, scope.row)" href="">{{scope.row.name}}</span>
            </el-table-column>
            <el-table-column label="所属乡镇村(社区)" width="116" header-align="center">
              <span class="block ellipsis" slot-scope="scope">{{scope.row.townName}} -&nbsp;{{scope.row.villageName}}</span>
            </el-table-column>
            <el-table-column v-for="item in rmType" :key="item.key" :label="item.label" v-if="item.key==radio" width="165" :sortable='item.status' header-align="center">
              <p class="block" slot-scope="scope"><span class="blocknum ellipsis">{{scope.row[item.name]}}</span><a @click="handleEdit(scope.$index, scope.row)" >详情</a></p>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div class='seach'>
      <el-input placeholder='请输入企业名称' v-model='searchParams.value' class='input-with-select'>
        <el-button  slot='append' style='background:#1c7bef;color:#FFF;margin:0 -20px;' icon='el-icon-search' class="searchBtn" @click="searchcompany(1)"></el-button>
      </el-input>
      <ul class="searchList" >
        <li class="searchItem" v-for = "item in searchList" :key='item.id' @click="searchItem(item.id, item)">{{item.name}}</li>
      </ul>
      <div class='seachJl'>
        <span class="fast">快速筛选：</span>
        <el-select class='xz' v-model='xz' slot='prepend' placeholder='乡镇'>
            <el-option  label='全部乡镇' value=''></el-option>
            <el-option v-for = "item in townShip " :key='item.id' :label='item.name' :value='item.id'></el-option>
        </el-select>
        <el-select class='hy' v-model='hy' slot='prepend' placeholder='行业分类'>
          <el-option  label='全部行业' value=''></el-option>
            <el-option v-for = "item in industry" :label='item.tradeName' :key='item.id' :value='item.id'></el-option>
        </el-select>
        <el-select class='gs' v-model='gs' slot='prepend' placeholder='规上规下'>
          <el-option  label='规上规下' value=''></el-option>
          <el-option  label='规上' value='1'></el-option>
          <el-option  label='规下' value='2'></el-option>
        </el-select>
        <el-select class='gy' v-model='qy' slot='prepend' placeholder='全部区域'>
          <el-option  label='全部区域' value=''></el-option>
          <el-option  label='工业功能区内' value='1'></el-option>
          <el-option  label='非工业功能区' value='2'></el-option>
        </el-select>
      </div>
    </div>
  </div>
</template>
<script>
import api from '~/plugins/api';
import {mapState, mapActions} from 'vuex';
export default {
  // head: {
  //   script: [{
  //     src: 'http://api.tianditu.com/api?v=4.0'
  //   },
  //   {
  //     src: 'http://lbs.tianditu.com/api/js4.0/opensource/openlibrary/ImageOverlay.js'
  //   }
  //   ]
  // },
  data() {
    return {
      radio: '6',
      map: {},
      allCompanys: {},
      companyInfo: [],
      analyze: '',
      seachInput: '',
      xz: '', /* 乡镇 */
      hy: '', /* 行业 */
      qy: '', /* 工业区 */
      gs: '', /* 规上规下 */
      remenParams: {
        img: '',
        name: '',
        address: '',
        phone: ''
      },
      dataParams: {
        sort: '',
        type: 6,
        pageSize: 13,
        pageNum: 0,
        isPark: '',
        scaleType: '',
        townId: '',
        tradeId: '',
        companyName: ''
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
          [119.295718, 29.528502],
          [119.22, 29.36],
          [119.37, 29.54]
        ]
      }
    };
  },
  computed: {
    ...mapState({
      townShip: state => state.Lists.AllTownShip.concat([{id: 17, name: '开发区', lng: 119.22, lat: 29.36}, {id: 18, name: '高铁新区', lng: 119.37, lat: 29.54}]),
      scale: state => state.Lists.scale,
      industry: state => state.Lists.AllIndustry,
      rmType: state => state.Pub.searchindicator
    })
  },
  mounted() {
    this.LIST_GET();
    /* 热门企业 */
    this.getData();
    /* 地图实例化 */
    this.allCompany();
  },
  watch: {
    xz(val, old) {
      this.searchXzHy(2, val);
      if (val === '') {
        this.map.panTo(new window.T.LngLat(this.mapParams.lng, this.mapParams.lat), 11);
        return;
      }
      this.map.panTo(new window.T.LngLat(this.mapParams.markers[val - 1][0], this.mapParams.markers[val - 1][1]), 13);
    },
    hy(val, old) {
      this.searchXzHy(3, val);
      if (val === '') {
        this.map.panTo(new window.T.LngLat(this.mapParams.lng, this.mapParams.lat), 11);
      }
    },
    gs(val, old) {
      this.searchXzHy(3, val);
      if (val === '') {
        this.map.panTo(new window.T.LngLat(this.mapParams.lng, this.mapParams.lat), 11);
      }
    },
    qy(val, old) {
      this.searchXzHy(3, val);
      if (val === '') {
        this.map.panTo(new window.T.LngLat(this.mapParams.lng, this.mapParams.lat), 11);
      }
    }
  },
  methods: {
    ...mapActions([ 'LIST_GET' ]),
    findCompany(val) {
      this.$router.push({
        name: 'front-enterprise-detail',
        query: {
          id: val
        }
      });
    },
    // 热门企业去详情页
    handleEdit(index, row) {
      this.$router.push({
        name: 'front-enterprise-detail',
        query: {
          id: row.id
        }
      });
    },
    // 数据排序
    sortType(column) {
      switch (column.order) {
        case 'ascending':
          this.dataParams.sort = 1;
          break;

        case 'descending':
          this.dataParams.sort = 2;
          break;
      }
      this.getData();
    },
    // 右边侧边栏
    rmShow() {
      if (window.$('.right').css('width') === '20px') {
        window.$('.right').animate({
          width: '470px'
        });
        window.$('.rm').animate({
          width: '450px'
        });
        window.$('.p i').removeClass('el-icon-caret-left').addClass('el-icon-caret-right');
        window.$('.p').animate({
          right: '450px', top: '50%'
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
    // 选择具体信息
    selecType(val) {
      this.radio = val;
      this.dataParams.type = val;
      this.dataParams.sort = '';
      this.getData();
    },
    // 表格颜色
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 !== 0) {
        return 'warning-row';
      }
      return 'success-row';
    },
    tableHeaderClassName({ row, rowIndex }) {
      return 'warning-row';
    },
    getData() {
      api
        .get('company/analyze')
        .then(e => {
          if (e.status === 200) {
            this.analyze = e.data;
          } else {
            this.$notify.error({
              title: '企业说明获取失败',
              message: e.msg
            });
          }
        })
        .catch(err => {
          this.$notify.error({
            title: '企业说明获取失败',
            message: err.msg
          });
        });
      this.dataParams.townId = this.xz;
      this.dataParams.tradeId = this.hy;
      this.dataParams.scaleType = this.gs;
      this.dataParams.isPark = this.qy;
      api
        .get('company/hotcompany', this.dataParams)
        .then(e => {
          if (e.status === 200) {
            this.companyInfo = e.data.list;
            this.pageCount = e.data.count;
            this.companyInfo.map(x => {
              if (x.isHighTech === 1) {
                x.isHighTech = '是';
              } else if (x.isHighTech === 2) {
                x.isHighTech = '否';
              } else if (x.isHighTech === 0) {
                x.isHighTech = '';
              }
            });
          } else {
            this.$notify.error({
              title: '热门企业获取失败',
              message: e.msg
            });
          }
        })
        .catch(err => {
          this.$notify.error({
            title: '热门企业获取失败',
            message: err.msg
          });
        });
    },
    searchcompany(type) {
      let searchParams = this.searchParams;
      api.get('company/searchcompany', searchParams)
        .then(e => {
          this.searchList = e.data.slice(0, 6);
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
    },
    // 乡镇行业搜索
    searchXzHy(type, val) {
      this.searchParams.value = '';
      api.get('/company/getcompanybytownid', {townId: this.xz, tradeId: this.hy, scaleType: this.gs, isPark: this.qy})
        .then(e => {
          this.allCompanys = e.data;
          this.getData();
          this.map.clearOverLays();
          this.imgOverLay(this.map);
          this.polygon(this.map);
          this.markers(this.map);
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
      api.get('company/getcompanybytownid')
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
    // 清空搜索数据
    clearData() {
      this.xz = '';
      this.hy = '';
      this.qy = '';
      this.gs = '';
    },
    // 企业搜索
    searchItem(id, data) {
      // if (type) {
      //   this.clearData();
      // }
      this.map.clearOverLays();
      this.searchParams.value = data.name;
      this.mapParams.zoom = '13';
      this.mapParams.lat = data.lat;
      this.mapParams.lng = data.lng;
      this.allCompanys = [data];
      this.fetchMap();
      this.imgOverLay(this.map);
      this.markers(this.map);
      this.polygon(this.map);
    },
    // 更新地图
    fetchMap() {
      this.map.panTo(new window.T.LngLat(this.mapParams.lng, this.mapParams.lat), 13);
    },
    getMap() {
      var zoom = this.mapParams.zoom;
      var lng = this.mapParams.lng;
      var lat = this.mapParams.lat;
      var map = new window.T.Map('mapDiv');
      // 移动到指定点
      map.centerAndZoom(new window.T.LngLat(lng, lat), zoom);
      // 获取热门
      this.getData();
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
        'http://1.img.dianjiangla.com/jdAssets/JD2.png',
        bd, {
          opacity: '.9',
          alt: '建德市'
        }
      );
      // var img2 = new window.T.ImageOverlay(
      //   'http://1.img.dianjiangla.com/jdAssets/JD2.png',
      //   bd, {
      //     opacity: '.7',
      //     alt: '建德市'
      //   }
      // );
      var img3 = new window.T.ImageOverlay(
        'http://1.img.dianjiangla.com/jdAssets/JD3.png',
        bd, {
          opacity: '.9',
          alt: '建德市'
        }
      );
      // var img4 = new window.T.ImageOverlay(
      //   'http://1.img.dianjiangla.com/jdAssets/JD4.png',
      //   bd, {
      //     opacity: '.7',
      //     alt: '建德市'
      //   }
      // );
      var img5 = new window.T.ImageOverlay(
        'http://1.img.dianjiangla.com/jdAssets/JD5.png',
        bd, {
          opacity: '.9',
          alt: '建德市'
        }
      );
      map.addOverLay(img1);
      map.addEventListener('zoomend', function (e) {
        map.removeOverLay(img1);
        var zoom = map.getZoom();
        map.removeOverLay(img1);
        map.removeOverLay(img3);
        map.removeOverLay(img5);
        if (zoom < 11) {
          map.addOverLay(img1);
        } else if (zoom === 11 || zoom === 12) {
          map.addOverLay(img3);
        } else if (zoom === 13) {
          map.addOverLay(img5);
        } else {
          map.removeOverLay(img1);
          map.removeOverLay(img3);
          map.removeOverLay(img5);
        }
      });
    },
    markers(map) {
      var markers = [];
      for (var i in this.allCompanys) {
        markers.push([this.allCompanys[i].lng, this.allCompanys[i].lat]);
      }
      var icon = new window.T.Icon({
        iconUrl: 'http://1.img.dianjiangla.com/jdAssets/Positioning.png',
        iconSize: new window.T.Point(26, 26),
        iconAnchor: new window.T.Point(13, 26)
      });
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
        if (this.allCompanys[i].mainBusIncome) {
          content = '<a href="/front/enterprise/detail?id=' + this.allCompanys[i].id + '">' + '<h2 style="color: #333333;width:100%;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;" >' + this.allCompanys[i].name + '</h2>' + '</a>' + '产值(元)：' + '<span style="color: #cb2b2b;" >' + this.allCompanys[i].mainBusIncome + '</span>' + '';
        } else {
          content = '<a href="/front/enterprise/detail?id=' + this.allCompanys[i].id + '">' + '<h2 style="color: #333333;width:100%;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;">' + this.allCompanys[i].name + '</h2>' + '' + '</a>';
        }
        addClickHandler(content, marker);
      }
      function addClickHandler(content, marker) {
        marker.addEventListener('mouseover', function (e) {
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
      // 'http://172.30.34.63:6080/arcgis/rest/services/JDLand_XZM/MapServer/identify'
      for (var item in polygonList) {
        window.$.ajax({
          url: '/map/arcgis/rest/services/JDLand_XZM/MapServer/identify',
          data: 'f=json&tolerance=5&returnGeometry=true&imageDisplay=1398%2C210%2C96&geometry=%7B"x"%3A' + polygonList[item][0] + '%2C"y"%3A' + polygonList[item][1] + '%7D&geometryType=esriGeometryPoint&sr=4326&mapExtent=118.94165999313367%2C29.6123519861085%2C119.90159041305554%2C29.756547542749125&layers=top',
          success: function (data) {
            var d = JSON.parse(data).results[0].geometry.rings[0];
            // let c = [];
            let a = [];
            for (var e = 0; e < d.length; e += 4) {
              a.push(d[e]);
            };
            var point = [];
            for (var i = 0; i < a.length; i++) {
              point.push(new window.T.LngLat(a[i][0], a[i][1]));
            }
            var polygon = new window.T.Polygon(point, {color: '#90bcff', weight: 2, opacity: '.6', fillColor: '#FFF', fillOpacity: 0});
            // 鼠标滑过
            polygon.addEventListener('mouseover', function (e) {
              polygon.setColor('#90bcff');
              polygon.setOpacity({opacity: '0.6'});
              polygon.setFillOpacity('0.3');
              polygon.setFillColor('#488EF9');
            });
            polygon.addEventListener('mouseout', function (e) {
              polygon.setColor('#90bcff');
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
  },
  destroyed() {
  // 离开页面时销毁组件
    // this.map.destroy();
  }
};
</script>
<style lang='scss' scoped>
#mapDiv {
  width: 100%;
  min-width: 1460px;
  min-height: 840px;
  clear: both;
}
.black{
  color: #333333;
}
@media screen and (min-width : 1567px){
.seach {width: 1020px;}
}
@media screen and (max-width : 1567px){
.seach {width: 860px;}
}
.seach {
  position: absolute;
  top: 150px;
  left: 100px;
  z-index: 999;
  .input-with-select {
    width: 354px;
    float: left;
    margin-top:10px;
    margin-right: 30px;
    input {
      width: 294px;
    }
    .el-button {
      border-radius: 0 5px 5px 0;
    }
  }
  .searchList {
    position: absolute;
    top: 50px;
    background: #ffffff;
    border: 1px solid #e0e0e0;
    width: 294px;
    height: 216px;
    display: none;
    z-index: 1000;
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
    margin-top:10px;
    display: inline-block;
    .fast{
      display:inline-block;width:119px;height:37.8px;line-height:37.8px;border:1px solid #c9ccd3; border-radius:5px;color:#606266;text-align:center;background-color:#fff;
    }
    .xz {
      width: 120px;
    }
    .hy {
      width: 120px;
    }
    .gs{
      width: 120px;
    }
    .gy{
      width: 130px;
    }
  }
}

.right {
  overflow: hidden;
  position: absolute;
  right:0;
  z-index: 999;
  width: 470px;
  min-height:840px;
  height: auto;
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
    width: 450px;
    min-height:840px;
    height: auto;
    border: 1px solid #e0e0e0;
    cursor:pointer;
    .rmTitle {
      line-height:22px;
      font-family: MicrosoftYaHei-Bold;
      font-size: 16px;
      font-weight: 600;
      color: #333333;
      background: #f2f8ff;
      padding: 14px 10px 14px 20px;
      .span {
        display: inline-block;
        background: #f2ba55;
        width: 4px;
        height: 18px;
        margin-bottom: -3px;
        margin-right: 5px;
      }
      a{
        display: inline-block;
        margin-left: 240px;
        font-size: 12px;
        font-weight: 500;
        width: 78px;
        height:22px;
        line-height:22px;
        border: 1px solid #CCCCCC;
        color: #333333; 
        span{
          color:#333333;
        }
      }
    }
    .rmDetail{
      padding:5px 20px;
      height: auto;
      max-height: 75px;
      line-height: 25px;
      background: #fff;
      font-size: 12px;
      color: #333333;
      text-overflow: ellipsis;
      overflow: hidden;
      .rmDetailItem{
        font-size: 12px;
        color: #cb2b2b;
      }
    }
    .rmUl{
      padding:5px 15px;
      height: 88px;
      overflow: hidden;
    }
    .redio {
        float: left;
        width: auto;
        height: 28px;
        line-height:28px;
        cursor: pointer;
        text-align: center;
        border: 1px solid #C9DDFD;
        background-color: #FFF;
        border-radius: 3px;
        padding:2px 5px;
        margin:5px 5px;
    }
    .clearfloat{clear:both} 
    .nactive{
        background-color: #C9DDFD;
    }
    .el-table__body{
      width: 470px !important;
    }
    .tables{
      background: #f2f8ff;
      font-size: 12px;
      text-align:center;
    }    
    .cell{
      padding:0;
    }
    .block{
        display: block;
        width: 100%;
        a{
           float: right;
           margin-right:20px;
           color: #3087F1;
        }
    }
    .blocknum{
      width: 95px; 
      float: left;
    }
  }
}
</style>
