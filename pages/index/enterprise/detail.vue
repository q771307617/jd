<template>
  <el-container>
    <el-main>
      <el-row>
        <div class="box" style="width:1200px;margin: 0 auto">
      <!-- 企业封面 -->
        <el-col :span="24">
          <div class="top-text"><i style="background-position:-92px -17px"></i>企业封面</div>
          <div class="top-picture">
            <img :src="companyInfo.factoryImage" alt="">
          </div>
        </el-col>
        <!-- 企业概述 -->
        <el-col :span="24">
          <div class="col">
            <div class="top-text"><i style="background-position: -92px -70px"></i>企业概述</div>
            <el-col :span="24">
            <el-col :span="5"><span>企    业   全   称：</span></el-col>
            <el-col :span="18">{{companyInfo.name}}</el-col>
            </el-col>

            <el-col :span="24">
            <el-col :span="5"><span>所    属   乡   镇：</span></el-col>
            <el-col :span="18">{{companyInfo.townName}}</el-col>
              </el-col>

            <el-col :span="24">
            <el-col :span="5"><span>所属村（社区）：</span></el-col>
            <el-col :span="18">{{companyInfo.villageName}}</el-col>
              </el-col>

            <el-col :span="24">
            <el-col :span="5"><span>详    细   地   址：</span></el-col>
            <el-col :span="18">{{companyInfo.address}}</el-col>
              </el-col>

            <el-col :span="24">
            <el-col :span="5"><span>行    业   代   码：</span></el-col>
            <el-col :span="18">{{companyInfo.tradeId}}</el-col>
              </el-col>

            <el-col :span="24">
            <el-col :span="5"><span>所    属   行   业：</span></el-col>
            <el-col :span="18">{{companyInfo.tradeName}}</el-col>
              </el-col>

            <el-col :span="24">
            <el-col :span="5"><span>主要核心产品：</span></el-col>
            <el-col :span="18">{{companyInfo.product}}</el-col>
              </el-col>

            <el-col :span="24">
            <el-col :span="5"><span>规上（规下）：</span></el-col>
            <el-col :span="18">{{companyInfo.scaleUp}}</el-col>
              </el-col>

            <el-col :span="24">
            <el-col :span="5"><span>主要负责人：</span></el-col>
            <el-col :span="18">{{companyInfo.corporation}}</el-col>
              </el-col>

            <el-col :span="24">
            <el-col :span="5"><span>联    系   电   话：</span></el-col>
            <el-col :span="18">{{companyInfo.corporation}}</el-col>
              </el-col>

            <el-col :span="24">
            <el-col :span="5"><span>是否“两代表一委员”：</span></el-col>
            <el-col :span="18">{{companyInfo.corporation}}</el-col>
              </el-col>

            <el-col :span="24">
            <el-col :span="5"><span>具体负责人：</span></el-col>
            <el-col :span="18">{{companyInfo.leader}}</el-col>
              </el-col>

            <el-col :span="24">
            <el-col :span="5"><span>联    系   电   话：</span></el-col>
            <el-col :span="18">{{companyInfo.leader}}</el-col>
              </el-col>

            <el-col :span="24">
            <el-col :span="5"><span>企业职工人数：</span></el-col>
            <el-col :span="18">{{companyInfo.staffScale}}</el-col>
              </el-col>

            <el-col :span="24">
            <el-col :span="5"><span>党组织名称：</span></el-col>
            <el-col :span="18">{{companyInfo.partyName}}</el-col>
              </el-col>

            <el-col :span="24">
            <el-col :span="5"><span>党    员   人   数：</span></el-col>
            <el-col :span="18">{{companyInfo.partyMemberNum}}</el-col>
              </el-col>

            <el-col :span="24">
            <el-col :span="5"><span>企    业   简   介：</span></el-col>
            <el-col :span="18">{{companyInfo.companyProfile}}</el-col>
            </el-col>
            </div>
        </el-col>
        <!-- 数据指标 -->
        <el-col :span="24">
            <div class="col">
            <div class="top-text"><i style="background-position: -92px -122px"></i>数据指标</div>

          <!-- 数据指标左-->
            <el-col :span="12">
              <el-col :span="24">
                <el-col :span="10"><span>厂房建筑面积（米2）：</span></el-col>
                <el-col :span="14">{{companyInfo.facBuildingArea}}</el-col>
              </el-col>
              <el-col :span="24">
                <el-col :span="10"><span>实际用地面积（亩）：</span></el-col>
                <el-col :span="14">{{companyInfo.actualLandArea}}</el-col>
              </el-col>
              <el-col :span="24">
                <el-col :span="10"><span>存量厂房面积（米2）：</span></el-col>
                <el-col :span="14">{{companyInfo.stockWorkArea}}</el-col>
              </el-col>
              <el-col :span="24">
                <el-col :span="10"><span>2015年起历年税收(万元)：</span></el-col>
                <el-col :span="14">{{companyInfo.tax}}</el-col>
              </el-col>
              <el-col :span="24">
                <el-col :span="10"><span>研发经费投入（万元）：</span></el-col>
                <el-col :span="14">{{companyInfo.researchFee}}</el-col>
              </el-col>
            <el-col>
            </el-col>
            </el-col>
          <!-- 数据指标右 -->
          <el-col :span="12">
            <el-col :span="24">
              <el-col :span="10"><span>主营业务收入：</span></el-col>
              <el-col :span="14">{{companyInfo.mainBusIncome}}</el-col>
            </el-col>
            <el-col :span="24">
              <el-col :span="10"><span>核定用能（吨标煤）：</span></el-col>
              <el-col :span="14">{{companyInfo.ratifiedCoal}}</el-col>
            </el-col>
            <el-col :span="24">
              <el-col :span="10"><span>实际能耗（吨标煤）：</span></el-col>
              <el-col :span="14">{{companyInfo.energyConsume}}</el-col>
            </el-col>
            <el-col :span="24">
              <el-col :span="10"><span>水            耗（吨）：</span></el-col>
              <el-col :span="14">{{companyInfo.waterConsume}}</el-col>
            </el-col>
          </el-col>
            </div>
        </el-col>
      </div>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import api from '~/plugins/api';
export default {
  data() {
    return {
      companyInfo: {}
    };
  },
  methods: {
    getCompanyInfo() {
      api.get('/company/detail?id=1').then((e) => {
        console.log(e.data.corporation);
        this.companyInfo = e.data;
      });
    }
  },
  created() {
    this.$nextTick(() => {
      this.getCompanyInfo();
    });
  }
};
</script>

<style scoped lang="scss">
.el-main {
  background-color: #f7f7f7;
  .el-row {
    min-width: 100%;
    // margin: 10px auto;
    .el-col {
      margin: 0 0 16px 0;
      background-color: #fff;
      .col{
        overflow: hidden;
        margin-bottom: 30px;
        span{
          margin-left: 60px;
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
        width: 600px;
        height: 400px;
        // background-color: red;
        margin: 0 0 30px 60px;
      }
    }
  }
}
</style>

