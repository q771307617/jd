<template>
  <el-container>
    <el-main>
      <el-row>
      <!-- 导航 -->
      <div class="navbar">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ name: 'index-enterprise'}">企业管理</el-breadcrumb-item>
          <el-breadcrumb-item>企业详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 企业封面 -->
        <div class="scope">
            <div class="el-col" style="width:1200px;margin:0 auto">
          <div class="top-text" style="padding-top:25px;"><i style="background-position:-92px -17px;top:25px;"></i>企业封面</div>
          <div class="top-picture">
            <img :src="companyInfo.imageUrl" alt="">
          </div>
          </div>
        </div>
        <!-- 企业概述 -->
          <div class="scope">
          <div class="el-col" style="width:1200px;margin:0 auto">
          <div class="col colHeight30">
            <div class="top-text"><i style="background-position: -92px -70px"></i>企业概述</div>
            <el-col :span="24">
            <el-col :span="4"><span class="justify_120">企    业   全   称：</span></el-col>
            <el-col :span="20">{{companyInfo.name}}</el-col>
            </el-col>

            <el-col :span="24">
            <el-col :span="4"><span class="justify_120">所    属   乡   镇：</span></el-col>
            <el-col :span="20">{{companyInfo.townName}}</el-col>
              </el-col>

            <el-col :span="24">
            <el-col :span="4"><span class="justify_120">所属村（社区）：</span></el-col>
            <el-col :span="20">{{companyInfo.villageName}}</el-col>
              </el-col>

            <el-col :span="24">
            <el-col :span="4"><span class="justify_120">详    细   地   址：</span></el-col>
            <el-col :span="20">{{companyInfo.address}}</el-col>
              </el-col>

            <!-- <el-col :span="24">
            <el-col :span="4"><span class="justify_120">行    业   代   码：</span></el-col>
            <el-col :span="20">{{companyInfo.tradeId}}</el-col>
              </el-col> -->

            <el-col :span="24">
            <el-col :span="4"><span class="justify_120">所    属   行   业：</span></el-col>
            <el-col :span="20"><i class="type">{{companyInfo.tradeName}}</i></el-col>
              </el-col>

            <el-col :span="24">
            <el-col :span="4"><span class="justify_120">主要核心产品：</span></el-col>
            <el-col :span="20">{{companyInfo.productName}}</el-col>
              </el-col>

            <el-col :span="24">
            <el-col :span="4"><span class="justify_120">规上（规下）：</span></el-col>
            <el-col :span="20">{{scaleUp[companyInfo.scaleUp]}}</el-col>
              </el-col>

            <el-col :span="24">
            <el-col :span="4"><span class="justify_120">主要负责人：</span></el-col>
            <el-col :span="20">{{companyInfo.corporationName}}</el-col>
              </el-col>

            <el-col :span="24">
            <el-col :span="4"><span class="justify_120">联    系   电   话：</span></el-col>
            <el-col :span="20">{{companyInfo.corporationPhone}}</el-col>
              </el-col>

            <el-col :span="24">
            <el-col :span="6"><span class="justify_120" style="width:200px">是否“两代表一委员”：</span></el-col>
            <el-col :span="18">{{isCommittee[companyInfo.isCommittee]}}</el-col>
              </el-col>

            <el-col :span="24">
            <el-col :span="4"><span class="justify_120">具体负责人：</span></el-col>
            <el-col :span="20">{{companyInfo.leaderName}}</el-col>
              </el-col>

            <el-col :span="24">
            <el-col :span="4"><span class="justify_120">联    系   电   话：</span></el-col>
            <el-col :span="20">{{companyInfo.leaderPhone}}</el-col>
              </el-col>

            <el-col :span="24">
            <el-col :span="4"><span class="justify_120">企业职工人数：</span></el-col>
            <el-col :span="20">{{companyInfo.staffScale}}</el-col>
              </el-col>

            <el-col :span="24">
            <el-col :span="4"><span class="justify_120">党组织名称：</span></el-col>
            <el-col :span="20">{{companyInfo.partyName}}</el-col>
              </el-col>

            <el-col :span="24">
            <el-col :span="4"><span class="justify_120">党    员   人   数：</span></el-col>
            <el-col :span="20">{{companyInfo.partyMemberNum}}</el-col>
              </el-col>
            <el-col :span="24">
            <el-col :span="4"><span class="justify_120">每    月   电   费：</span></el-col>
            <el-col :span="20">{{companyInfo.monthElecBill}}</el-col>
              </el-col>
            <el-col :span="24">
            <el-col :span="4"><span class="justify_120">每    月   水   费：</span></el-col>
            <el-col :span="20">{{companyInfo.monthWaterBill}}</el-col>
              </el-col>

            <el-col :span="24">
            <el-col :span="4"><span class="justify_120">企    业   简   介：</span></el-col>
            <el-col :span="20" style="letter-spacing:2px;">{{companyInfo.companyProfile}}</el-col>
            </el-col>
            </div>
        </div>
        </div>
        <!-- 数据指标 -->
        <div class="scope">
          <div class="el-col" style="width:1200px;margin:0 auto;">
            <div class="col">
            <div class="top-text"><i style="background-position: -92px -122px"></i>数据指标</div>
          <!-- 数据指标左-->
            <el-col :span="12" class="colHeight30" style="background:#eff6fa;">
              <el-col :span="24" style="margin-top:17px;">
                <el-col :span="10"><span class="justify_180">厂房建筑面积（m2）：</span></el-col>
                <el-col :span="14">{{companyInfo.facBuildingArea}}</el-col>
              </el-col>
              <el-col :span="24">
                <el-col :span="10"><span class="justify_180">实际用地面积（亩）：</span></el-col>
                <el-col :span="14">{{companyInfo.actualLandArea}}</el-col>
              </el-col>
              <el-col :span="24">
                <el-col :span="10"><span class="justify_180">存量厂房面积（m2）：</span></el-col>
                <el-col :span="14">{{companyInfo.stockWorkArea}}</el-col>
              </el-col>
              <el-col :span="24">
                <el-col :span="10"><span class="justify_180">2015年起历年税收(万元)：</span></el-col>
                <el-col :span="14">{{companyInfo.tax}}</el-col>
              </el-col>
              <el-col :span="24">
                <el-col :span="10"><span class="justify_180">研发经费投入（万元）：</span></el-col>
                <el-col :span="14">{{companyInfo.researchFee}}</el-col>
              </el-col>
            <el-col>
            </el-col>
            </el-col>
          <!-- 数据指标右 -->
          <el-col :span="12" class="colHeight30"  style="background:#eff6fa;">
            <el-col :span="24" style="margin-top:17px;">
              <el-col :span="10"><span class="justify_180">主营业务收入(万元)：</span></el-col>
              <el-col :span="14">{{companyInfo.mainBusIncome}}</el-col>
            </el-col>
            <el-col :span="24">
              <el-col :span="10"><span class="justify_180">核定用能（吨标煤）：</span></el-col>
              <el-col :span="14">{{companyInfo.ratifiedCoal}}</el-col>
            </el-col>
            <el-col :span="24">
              <el-col :span="10"><span class="justify_180">实际能耗（吨标煤）：</span></el-col>
              <el-col :span="14">{{companyInfo.energyConsume}}</el-col>
            </el-col>
            <el-col :span="24">
              <el-col :span="10"><span class="justify_180">水            耗（吨）：</span></el-col>
              <el-col :span="14">{{companyInfo.waterConsume}}</el-col>
            </el-col>
            <el-col :span="24">
              <el-col :span="10"><span class="justify_180">申    报 时  间:</span></el-col>
              <el-col :span="14">{{companyInfo.declareStartTime}}</el-col>
            </el-col>
          </el-col>
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
export default {
  data() {
    return {
      corporation: '',
      factoryImage: '',
      leader: '',
      product: '',
      companyInfo: {},
      scaleUp: ['', '规上', '规下'],
      isCommittee: ['', '是', '否']
    };
  },
  methods: {
    getCompanyInfo() {
      api.get('/company/detail', { id: this.$route.query.id }).then(e => {
        if (e.status === 200) {
          this.companyInfo = e.data;
          this.companyInfo.declareStartTime = moment(this.companyInfo.declareStartTime).format('YYYY-MM-DD');
        }
      });
    }
  },
  mounted() {
    this.getCompanyInfo();
  }
};
</script>

<style scoped lang="scss">
.el-main {
  background-color: #f7f7f7;
  .el-row {
    background-color: #f7f7f7;
    min-width: 100%;
    .navbar {
      width: 1200px;
      margin: 0 auto;
    }
    .el-col {
      .col {
        overflow: hidden;
        .justify_120,
        .justify_180 {
          margin-left: 60px;
          display: inline-block;
          text-align: justify;
        }
        .justify_120 {
          width: 120px;
        }
        .justify_180 {
          width: 180px;
        }
        .justify_120::after,
        .justify_180::after {
          content: '';
          padding-left: 100%;
          display: inline-block;
        }
        .type {
          display: inline-block;
          background: #fafdff;
          border: 1px solid #2e86b9;
          border-radius: 1px;
          padding: 0 4px;
          height: 20px;
          font-style: normal;
          font-size: 14px;
          color: #2e86b9;
          text-align: center;
        }
      }
      .top-text {
        margin: 20px 0 25px 60px;
        font-size: 20px;
        color: #333333;
        line-height: 27px;
        position: relative;
        i {
          display: inline-block;
          width: 35px;
          height: 35px;
          background: url(../../../assets/img/iconFront.png) no-repeat;
          position: absolute;
          top: 0;
          left: -60px;
        }
      }
      .el-col {
        li {
          font-size: 14px;
          color: #666666;
          line-height: 32px;
          text-align: left;
          margin-left: 60px;
        }
      }
      .top-picture {
        margin-left: 60px;
        max-width: 600px;
        max-height: 400px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .scope {
      width: 100%;
      background-color: #fff;
      margin-bottom: 16px;
      padding-bottom: 30px;
    }
  }
}
</style>

