<template>
  <div class='ListDetail' style="min-height:500px;">
    <el-container>
      <el-main>
        <el-row>
          <el-col :span="24">
            <el-input placeholder="企业名称" prefix-icon="el-icon-search" v-model="FindCompanyName" @keyup.enter.native="Search(FindCompanyName)" style="width:983px">
            </el-input>
            <el-button class="searchBtn" @click="Search(FindCompanyName)">搜索</el-button>
          </el-col>
        </el-row>
        <el-row class="search">
          <el-row>
            <el-col :span="3" class="tittle">行业：</el-col>
            <el-col :span="20">
              <ul class="industry" v-bind:class="{ hidden: isActiveIndustry}">
                <li class="industry-list">
                  <a :class="{select: params.tradeId == null}" @click="selectIndustry(null)">不限</a>
                </li>
                <li v-for="item in industry" :key="item.id" class="industry-list">
                  <a @click="selectIndustry(item.id)" :class="{select: item.id == params.tradeId}">{{item.tradeName}}</a>
                </li>
              </ul>
            </el-col>
            <el-col :span="1">
              <a @click="showIndustry" class="more">更多
                <i class='el-icon-arrow-down' v-if="isActiveIndustry"></i>
                <i class='el-icon-arrow-up' v-else></i>
              </a>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="3" class="tittle">乡镇：</el-col>
            <el-col :span="20">
              <ul class="industry" v-bind:class="{ hidden: isActiveTown}">
                <li class="industry-list">
                  <a :class="{select: params.townId == null}" @click="selectTownShip(null)">不限</a>
                </li>
                <li v-for="item in townShip" :key="item.key" class="industry-list">
                  <a @click="selectTownShip(item.id)" :class="{select: item.id == params.townId}">{{item.name}}</a>
                </li>
              </ul>
              <!--<transition name="el-zoom-in-top">
                            <div class="transition-box">.el-zoom-in-top</div>
                          </transition>-->
            </el-col>
            <el-col :span="1">
              <a @click="showTownShip" class="more">更多
                <i class='el-icon-arrow-down' v-if="isActiveTown"></i>
                <i class='el-icon-arrow-up' v-else></i>
              </a>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="3" class="tittle">规上/规下：</el-col>
            <el-col :span="20">
              <ul class="industry">
                <li class="industry-list">
                  <a :class="{select: params.scaleType == null}" @click="selectScale(null)">不限</a>
                </li>
                <li v-for="item in scale" :key="item.key" class="industry-list">
                  <a @click="selectScale(item.key)" :class="{select: item.key == params.scaleType}">{{item.name}}</a>
                </li>
              </ul>
            </el-col>
          </el-row>
        </el-row>
        <el-row class="company">
          <el-row class="selecteType">
            <div class="personal" @click="staff()">
              <span>职工人数</span>
              <span class="arrow">
                <i class="sort-caret el-icon-caret-top" v-bind:class="{ selected: params.staffScaleType==1 }"></i>
                <i class="sort-caret el-icon-caret-bottom" v-bind:class="{ selected: params.staffScaleType==2 }"></i>
              </span>
            </div>
            <div class="personal" @click="party()">
              <span>党员人数</span>
              <span class="arrow">
                <i class="sort-caret el-icon-caret-top" v-bind:class="{ selected: params.partyMemberNumberType==1 }"></i>
                <i class="sort-caret el-icon-caret-bottom" v-bind:class="{ selected: params.partyMemberNumberType==2 }"></i>
              </span>
            </div>
          </el-row>
          <!-- 企业信息展示 -->
          <div class="container">
            <el-col :span="24" class="content" v-for="(item, index) in EnterpriseProfile" :key="item.id" v-show="index<15">
              <el-col :span="6">
                <div class="imgInfo"><img :src="item.imageUrl + '!260x174'" alt=""></div>
              </el-col>
              <el-col :span="14">
                <el-col :span="24">
                  <h1>{{item.companyName}}</h1>
                </el-col>
                <el-col :span="24" class="height30">
                  <el-col :span="6">
                    <span>所 属乡镇/村：</span>
                  </el-col>
                  <el-col :span="18">{{item.townName}}</el-col>
                </el-col>
                <el-col :span="24" class="height30">
                  <el-col :span="6">
                    <span>所 属 行 业：</span>
                  </el-col>
                  <el-col :span="18">
                    <i>{{item.tradeName}}</i>
                  </el-col>
                </el-col>
                <el-col :span="24" class="height30">
                  <el-col :span="6">
                    <span>主 要核心产品：</span>
                  </el-col>
                  <el-col :span="18">{{item.productMainName}}</el-col>
                </el-col>
                <el-col :span="24" class="height30">
                  <el-col :span="6">
                    <span>地 址：</span>
                  </el-col>
                  <el-col :span="18">{{item.companyAddress}}</el-col>
                </el-col>
                <el-col :span="24" class="height30">
                  <el-col :span="6">
                    <span>联 系 方 式：</span>
                  </el-col>
                  <el-col :span="18">{{item.chargePersonTel}}</el-col>
                </el-col>
              </el-col>
              <el-col :span="3">
                <el-button type="primary" style="margin-top: 80px;" @click="ViewDetails(item.companyId)">查看企业详情</el-button>
              </el-col>
            </el-col>
          </div>
          <!-- 分页 -->
          <el-col :span="24">
            <pages :pageSize=15 :count="pageCount" @pageCurrentChange="handleCurrentChange"></pages>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
    <nuxt-child/>
  </div>
</template>

<script>
import api from '~/plugins/api';
import { mapState } from 'vuex';
import pages from '~/components/pages';
export default {
  components: {
    pages
  },
  data() {
    return {
      isActiveIndustry: true,
      isActiveTown: true,
      scrollY: '',
      params: {
        companyName: null,
        pageNum: 0,
        pageSize: 15,
        partyMemberNumberType: 0,
        scaleType: null,
        staffScaleType: 0,
        townId: null,
        tradeId: null
      },
      FindCompanyName: '',
      EnterpriseProfile: {},
      currentPage: 1,
      pageCount: 0,
      selectType: [
        {
          index: 1,
          classify: '行业',
          type: ['不限', '化工']
        }
      ]
    };
  },
  computed: {
    ...mapState({
      townShip: state => state.Lists.AllTownShip,
      scale: state => state.Lists.scale,
      industry: state => state.Lists.AllIndustry
    })
  },
  mounted() {
    if (this.$route.query.pageNum) {
      this.handleCurrentChange(this.$route.query.pageNum, true);
    } else {
      this.getCompanyInfo(true);
    }
    // this.$nextTick(() => {
    //   this.getCompanyInfo(true);
    //   // this.RefreshSave();
    // });
    window.onscroll = (event) => {
      this.scrollY = document.documentElement.scrollTop || document.body.scrollTop;
    };
  },
  methods: {
    Scroll(Number) {
      setTimeout(() => {
        window.scroll(0, Number);
      }, 1000);
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
    },
    // 改变页数时回调
    handleCurrentChange(val, type) {
      this.params.pageNum = Number(val);
      if (!type) {
        this.$router.push({
          name: 'front-enterprise',
          query: {
            pageNum: this.params.pageNum
          }
        });
      }
      this.getCompanyInfo(type);
    },
    showIndustry() {
      this.isActiveIndustry = !this.isActiveIndustry;
    },
    showTownShip() {
      this.isActiveTown = !this.isActiveTown;
    },
    // 职工人数排序
    staff() {
      this.params.partyMemberNumberType = 0;
      this.params.staffScaleType = Number(++this.params.staffScaleType);
      if (this.params.staffScaleType === 3) {
        this.params.staffScaleType = 0;
      }
      this.getCompanyInfo();
    },
    // 党员人数排序
    party() {
      this.params.staffScaleType = 0;
      this.params.partyMemberNumberType = Number(
        ++this.params.partyMemberNumberType
      );
      if (this.params.partyMemberNumberType === 3) {
        this.params.partyMemberNumberType = 0;
      }
      this.getCompanyInfo();
    },
    // 查看企业详情
    ViewDetails(id) {
      this.$router.push({
        name: 'front-enterprise-detail',
        query: {
          id: id,
          scrollY: this.scrollY,
          pageNum: this.params.pageNum
        }
      });
    },
    // 企业名称搜索
    Search(val) {
      this.params.companyName = val === '' ? null : val;
      this.getCompanyInfo();
    },
    /* @argument val
     * 选择行业
     */
    selectIndustry(val) {
      this.params.tradeId = val;
      this.getCompanyInfo();
    },
    /* @argument val
    * 选择乡镇
    */
    selectTownShip(val) {
      this.params.townId = val;
      this.getCompanyInfo();
    },
    /* @argument val
    * 选择规模
    */
    selectScale(val) {
      this.getCompanyInfo();
      this.params.scaleType = val;
    },
    /* @argument val
    * 刷新保存
    */
    // RefreshSave() {
    //   this.$router.push({
    //     path: this.$route.path.slice(1),
    //     query: this.params
    //   });
    // },
    /* @argument val
    * 获取企业信息
    */
    getCompanyInfo(type) {
      api
        .get('company/getcompany', this.params)
        .then(e => {
          if (e.status === 200) {
            this.EnterpriseProfile = e.data.list;
            this.pageCount = e.data.count;
            if (type) {
              this.Scroll(this.$route.query.scrollY);
            }
          }
        })
        .catch(err => {
          this.$notify.error({
            title: '错误',
            message: err.msg
          });
        });
    }
  },
  created() {
    // this.$nextTick(() => {
    //   this.getCompanyInfo(true);
    //   // this.RefreshSave();
    // });
  },
  destroyed() {}
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.ListDetail {
  .container {
    width: 1200px;
    min-height: 400px;
  }
  .search {
    max-width: 1200px;
    margin-top: 23px;
    padding: 10px 0 0 20px;
    background: #ffffff;
    border: 1px solid #d4e1ea;
    font-size: 14px;
    .tittle {
      color: #666666;
    }
    .hidden {
      max-height: 34px;
      overflow: hidden;
    }
    .industry {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      .industry-list {
        display: inline-block;
        margin-right: 40px;
        margin-bottom: 17px;
        a {
          color: #333333;
          cursor: pointer;
        }
        a:hover {
          color: #f54203;
        }
        a:active {
          color: #ffbf50;
        }
        .select {
          color: #ffbf50;
        }
      }
    }
  }
  .more {
    font-family: MicrosoftYaHei;
    font-size: 12px;
    color: #666666;
    letter-spacing: 0;
    text-align: center;
    border: 1px solid #e0e0e0;
    border-radius: 1px;
    width: 39px;
    height: 20px;
    padding: 5px;
    cursor: pointer;
    margin-left: -10px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
}

.el-container {
  width: 1240px;
  margin: 0 auto;
  .el-main {
    .el-row {
      .el-col {
        max-width: 1200px;
        .el-input__inner {
          border-radius: 0;
        }
        .searchBtn {
          background-color: #409eff;
          width: 219px;
          height: 41px;
          margin:0 -1px;
          font-size: 16px;
          color: #ffffff;
          letter-spacing: 9.14px;
          border-radius: 0 5px 5px 0;
        }
      }
      .content {
        border-bottom: 1px solid #d4e1ea;
        margin-bottom: 20px;
        h1 {
          font-size: 18px;
          font-weight: bold;
          padding-bottom: 11px;
          display: inline-block;
        }
        span {
          display: inline-block;
          font-size: 14px;
          color: #666666;
          letter-spacing: 5px;
          width: 150px;
          text-align: justify;
        }
        span::after {
          content: '';
          padding-left: 100%;
          display: inline-block;
        }
        i {
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
        .imgInfo {
          margin-bottom: 20px;
          width: 260px;
          height: 174px;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .height30 {
          height: 30px;
        }
      }
      .selecteType {
        max-width: 1200px;
        border: 1px solid #d4e1ea;
        margin: 20px 0;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        display: flex;
        justify-content: flex-start;
        .personal {
          height: 34px;
          width: 94px;
          border-right: 1px solid #d4e1ea;
          line-height: 34px;
          margin-left: 22px;
          .arrow {
            color: #c0c4cc;
            display: inline-flex;
            flex-direction: column;
            align-items: center;
            vertical-align: middle;
            overflow: initial;
            position: relative;
          }
          .selected {
            color: #1c7bef;
          }
          .sort-caret {
            margin: -3px 2px;
          }
        }
      }
    }
  }
}
</style>
