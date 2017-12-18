<template>
  <el-container>
    <el-main>
      <el-row>
        <el-col :span="24">
          <div class="top-text"><i style="background-position:-92px -17px"></i><span>企业封面</span></div>
          <div class="top-picture">
            <img :src="CompanyDetails.companyimageInfo" alt="">
          </div>
        </el-col>
        <el-col :span="24">
          <div class="top-text"><i style="background-position: -92px -70px"></i><span>企业概述</span></div>
          <el-row>
            <el-col :span="5">
              <ul>
                <li v-for="data1 in companyList" :key="data1">{{data1}}</li>
              </ul>
            </el-col>
            <el-col :span="12">
              <ul>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
              </ul>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="24">
          <div class="top-text"><i style="background-position: -92px -122px"></i><span>企业指标</span></div>
          <el-row>
            <el-col :span="12">
              <el-col :span="10">
                <ul>
                  <li v-for="data2 in dataIndex1" :key="data2">{{data2}}</li>
                </ul>
              </el-col>
              <el-col :span="14">
                <ul>
                  <li>1</li>
                  <li>1</li>
                  <li>1</li>
                </ul>
              </el-col>
            </el-col>
            <el-col :span="12">
              <el-col :span="10">
                <ul>
                  <li v-for="data3 in dataIndex1" :key="data3">{{data3}}</li>
                </ul>
              </el-col>
              <el-col :span="14">
                <ul>
                  <li>1</li>
                  <li>1</li>
                  <li>1</li>
                </ul>
              </el-col>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      CompanyDetails: {
        companyImage: '',
        companyName: '',
        companyCommunity: '',
        companyStreet: '',
        companyAddress: '',
        companyCode: '',
        companyType: ''
      },
      companyList: [
        '企    业   全   称：',
        '所    属   乡   镇：',
        '所属村（社区）：',
        '详    细   地   址：',
        '行    业   代   码：',
        '所    属   行   业：',
        '主要核心产品：',
        '规上（规下）：',
        '主要负责人：',
        '联    系   电   话：',
        '是否“两代表一委员”：',
        '具体负责人：',
        '联    系   电   话：',
        '企业职工人数：',
        '党组织名称：',
        '党    员   人   数：',
        '企    业   简   介：'
      ],
      dataIndex1: [
        '存量厂房面积（米2）：',
        '实际用地面积（亩）：',
        '存量厂房面积（米2）：',
        '2015年起历年税收（万元）：',
        '研发经费投入（万元）：'
      ],
      dataIndex2: [
        '信息化投入（万元）：',
        '核定用能（吨标煤）：',
        '实际能耗（吨标煤）：',
        '水            耗（吨）：'
      ]
    };
  }

};
</script>

<style scoped lang="scss">
.el-main {
  background-color: #f7f7f7;
  .el-row {
    width: 1200px;
    margin: 10px auto;
    .el-col {
      margin: 0 0 16px 0;
      background-color: #fff;
      .top-text{
        margin: 20px 0 25px 60px;
        font-size:20px;
        color:#333333;
        line-height: 27px;
        position: relative;
        i{
          display: inline-block;
          width: 35px;
          height: 35px;
          background: url(../../../assets/img/iconFront.png) no-repeat;
          position: absolute;
          top: 0;
          left: -60px;
        }
        span{
          font-weight: 900;
        }
      }
      .el-row{
        .el-col{
          li{
            font-size:14px;
            color:#666666;
            line-height:32px;
            text-align:left;
            margin-left: 60px;
          }
        }
      }
      .top-picture {
        width: 600px;
        height: 400px;
        background-color: red;
        margin: 0 0 30px 60px;
      }
    }
  }
}
</style>

