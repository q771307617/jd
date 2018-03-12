<template>
  <el-container>
    <el-main>
      <el-row>
        <!-- 导航 -->
        <div class="navbar">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'front' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ name: 'front-enterprise', query: {scrollY: $route.query.scrollY }}">企业管理</el-breadcrumb-item>
            <el-breadcrumb-item>企业详情</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <!-- 企业概述 -->
        <div class="scope">
          <div class="content">
            <div class="top-text">
              <i style="background-position: -92px -70px"></i>企业概述
            </div>
            <div class="table-content">
              <el-col :span="24" v-for="(item, index) in enterpriseOverview" :key="item.id" class="full" :class="{bgc: (index+1) % 2===0}">
                <section v-if="item.flag===1">
                  <el-col :span="24" class="leftborders" :class="{bottomborder: item.id===20, c7: item.id==7}">
                    <span :class="{bright: item.id!==20 || item.id===7}" style="min-width:140px">{{item.title}}</span>
                    <span :class="{companyfont: item.id===1, detile: item.id===20, h40: !companyInfo[item.value]}">{{companyInfo[item.value]}}</span>
                  </el-col>
                </section>
                <section v-else v-for="subitem in item" :key="subitem.id">
                  <el-col :span="12" v-if="subitem.position===3" class="leftborders">
                    <span class="w140">{{subitem.title}}</span>
                    <span v-if="subitem.id===5&&companyInfo[subitem.value]" class="buleborder">{{companyInfo[subitem.value]}}</span>
                    <span v-else-if="subitem.id===8">{{scaleUp[companyInfo[subitem.value]]}}</span>
                    <span v-else>{{companyInfo[subitem.value]}}</span>
                  </el-col>
                  <el-col :span="12" v-else class="rightborder">
                    <span class="w160">{{subitem.title}}</span>
                    <span v-if="subitem.id===9">{{equals[companyInfo[subitem.value]]}}</span>
                    <span v-else>{{companyInfo[subitem.value]}}</span>
                  </el-col>
                </section>
              </el-col>
            </div>
            <div style="clear:both"></div>
          </div>
        </div>
        <!-- 数据指标 -->
        <div class="scope">
          <div class="content">
            <div class="top-text">
              <i style="background-position: -92px -122px"></i>数据指标
            </div>
            <div class="table-content">
              <el-col :span="24" v-for="(item, index) in dataTarget" :key="item.id" :class="{bgc: (index+1) % 2===0}">
                <section v-if="item.flag===1">
                  <el-col :span="24" class="leftborders" :class="{bottomborder: item.id===22}">
                    <span class="w230" :class="{half: item.id===22}">{{item.title}}</span>
                    <span>{{companyInfo[item.value]}}</span>
                  </el-col>
                </section>
                <section v-else v-for="subitem in item" :key="subitem.id">
                  <el-col :span="12" v-if="subitem.position===3" class="leftborders">
                    <span class="w230">{{subitem.title}}</span>
                    <span v-if="subitem.id===13">{{equals[companyInfo[subitem.value]]}}</span>
                    <span v-else>{{companyInfo[subitem.value]}}</span>
                  </el-col>
                  <el-col :span="12" v-else class="rightborder">
                    <span class="w230">{{subitem.title}}</span>
                    <span v-if="subitem.id===14&&companyInfo[subitem.value]">{{companyInfo[subitem.value]}} 至 {{companyInfo.declareEndTime}}</span>
                    <span v-else>{{companyInfo[subitem.value]}}</span>
                  </el-col>
                </section>
              </el-col>
              <div style="clear:both"></div>
            </div>
          </div>
        </div>
        <!-- 企业封面 -->
        <div class="scope">
          <div class="content">
            <div class="top-text">
              <i style="background-position:-92px -17px;"></i>企业封面
            </div>
            <div class="top-picture">
              <img :src="companyInfo.imageUrl + '!600x400'" alt="">
            </div>
          </div>
        </div>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import api from '~/plugins/api';
import moment from 'moment';
import { mapState } from 'vuex';
export default {
  data() {
    return {
      companyInfo: {},
      scaleUp: ['', '规上', '规下'],
      equals: ['', '是', '否']
    };
  },
  methods: {
    getCompanyInfo() {
      api.get('/company/detail', { id: this.$route.query.id }).then(e => {
        if (e.status === 200) {
          this.companyInfo = e.data;
          this.companyInfo.declareStartTime = this.companyInfo.declareStartTime ? moment(this.companyInfo.declareStartTime).format('YYYY-MM-DD') : '';
          this.companyInfo.declareEndTime = this.companyInfo.declareStartTime ? moment(this.companyInfo.declareEndTime).format('YYYY-MM-DD') : '';
        }
      });
    }
  },
  computed: {
    ...mapState({
      enterpriseOverview: state => state.Pub.enterpriseOverview,
      dataTarget: state => state.Pub.dataTarget
    })
  },
  mounted() {
    // document.body.scrollTop = 0;
    // document.documentElement.scrollTop = 0;
    this.getCompanyInfo();
  }
};
</script>

<style scoped lang="scss">
.el-main {
  background-color: #f7f7f7;
  padding: 20px 0 0 0;
  .el-row {
    background-color: #f7f7f7;
    min-width: 100%;
    .navbar {
      width: 1200px;
      margin: 0 auto;
    }
    .scope {
      width: 100%;
      background-color: #fff;
      margin-bottom: 16px;
      padding-bottom: 30px;
      .content {
        width: 1200px;
        margin: 0 auto;
        .top-picture {
          margin-left: 60px;
          max-width: 600px;
          max-height: 400px;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .top-text {
          margin: 20px 0 25px 60px;
          font-size: 20px;
          color: #333333;
          line-height: 27px;
          position: relative;
          padding-top: 25px;
          font-weight: bold;
          i {
            display: inline-block;
            width: 35px;
            height: 35px;
            background: url(../../../../assets/img/iconFront.png) no-repeat;
            position: absolute;
            top: 25px;
            left: -60px;
          }
        }
      }
      .table-content {
        font-size: 14px;
        color: #666666;
        .bgc {
          background-color: #EFF6FA !important;
        }
        .w140,
        .w230,
        .w160 {
          border-color: #D4E1EA;
          border-style: solid;
        }
        .w140 {
          min-width: 140px;
          border-width: 0 1px 0 0;
        }
        .w160 {
          min-width: 160px;
          border-width: 0 1px 0 0;
        }
        .w230 {
          min-width: 230px;
          border-width: 0 1px 0 0;
        }
        .el-col {
          min-height: 40px;
          span {
            display: inline-block;
            line-height: 40px;
            text-indent: 25px;
            letter-spacing: -0.08em;
          }
          .leftborders,
          .rightborder,
          .full,
          {
            border-color: #D4E1EA;
            border-style: solid;
          }
          .bottomborder {
            border-bottom: 1px solid #D4E1EA !important;
            display: flex;
            align-items: center;
          }
          .h50 {
            min-height: 40px;
            line-height: 40px;
          }
          .companyfont {
            font-family: MicrosoftYaHei-Bold;
            font-size: 18px;
            color: #333333;
            font-weight: bold;
          }
          .c7{
            height: 41px;
            display: flex;
            align-items: center;
          }
          .leftborders {
            border-width: 1px 1px 0 1px;
            .bright {
              border-right: 1px solid #D4E1EA
            }
            .detile {
              border-left: 1px solid #D4E1EA;
              padding: 0 14px 0 20px;
              text-indent: 25px;
            }
            .h40 {
              min-height: 40px;
            }
            .half {
              min-width: 50%;
            }
            .buleborder {
              display: inline-block;
              box-sizing: border-box;
              background: #fafdff;
              border: 1px solid #2e86b9;
              border-radius: 1px;
              padding: 0 4px;
              height: 22px;
              font-style: normal;
              font-size: 14px;
              color: #2e86b9;
              text-align: center;
              line-height: 20px;
              text-indent: 0;
              margin-left: 25px;
            }
          }
          .rightborder {
            border-width: 1px 1px 0 0;
          }
          .full {
            border-width: 1px 1px 0 1px;
          }
        }
      }
    }
  }
}
</style>

