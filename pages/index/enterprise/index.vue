<template>
  <div class='ListDetail'>
    <el-container>
      <el-main>
        <el-row>
          <el-col :span="24">
            <el-input placeholder="企业名称" prefix-icon="el-icon-search" v-model="input21">
              <template slot="append" id="enterprise-index-check">搜&nbsp&nbsp索
</template>
            </el-input>
          </el-col>
        </el-row>
        <el-row class="search">
          <el-row>
            <el-col :span="3" class="tittle">行业：</el-col>
            <el-col :span="20">
              <ul class="industry"  v-bind:class="{ hidden: isActiveIndustry}">
                <li class="industry-list">
                  <a v-if="params.tradeId===null">不限</a>
                  <a v-else>不限</a>
                </li>
                <li v-for="item in industry" :key="item.key" class="industry-list">
                  <a @click="selectIndustry(item.key)">{{item.name}}</a>
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
                  <a>不限</a>
                </li>
                <li v-for="item in townShip" :key="item.key" class="industry-list">
                  <a @click="selectTownShip(item.key)">{{item.name}}</a>
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
                 <li v-for="item in scale" :key="item.key" class="industry-list">
                  <a @click="selectScale(item.key)">{{item.name}}</a>
                </li>
              </ul>
            </el-col>
          </el-row>
        </el-row>
        <el-row class="company">
          <el-row class="selecteType">
              <div class="personal" @click="staff()"><span>职工人数</span><span class="arrow"><i class="sort-caret el-icon-caret-top" v-bind:class="{ selected: !params.staffScaleType }"></i><i class="sort-caret el-icon-caret-bottom" v-bind:class="{ selected: params.staffScaleType }"></i></span></div>
              <div class="personal" @click="party()"><span>党员人数</span><span class="arrow"><i class="sort-caret el-icon-caret-top" v-bind:class="{ selected: !params.partyMemberNumberType }"></i><i class="sort-caret el-icon-caret-bottom" v-bind:class="{ selected: params.partyMemberNumberType }"></i></span></div>
          </el-row>
          <el-col :span="24">
            行业行业行业行业行业行业行业行业行业行业行业行业行业行业行业行业行业行业行业
          </el-col>
          <!-- 企业信息展示 -->
          <el-col :span="24" class="content">
            <el-col :span="6">
              <div class="imgInfo"><img src="" alt=""></div>
            </el-col>
            <el-col :span="15">
              <el-col :span="8">
                <ul>
                  <h1>公司名称</h1>
                  <li v-for="item in data1" :key="item">{{item}}</li>
                </ul>
              </el-col>
              <el-col :span="16">
                <ul>
                  <li>&nbsp</li>
                  <li>1</li>
                  <li>1</li>
                  <li>1</li>
                  <li>1</li>
                </ul>
              </el-col>
            </el-col>
            <el-col :span="3">
              <el-button type="primary" style="margin-top: 80px">查看企业详情</el-button>
            </el-col>
          </el-col>
          <!-- 分页 -->
          <el-col :span="24">
            <el-col :span="10">&nbsp</el-col>
            <el-col :span="14">
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[100, 200, 300, 400]" :page-size="10" background prev-text="上一页" next-text="下一页" layout="total, prev, pager, next, jumper" :total="400">
              </el-pagination>
            </el-col>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
    <nuxt-child/>
  </div>
</template>

<script>
import api from './../../../plugins/api.js';
import {
  mapState
} from 'vuex';
import { pub, time } from '~/plugins/utils/index';

export default {
  computed: {
    ...mapState({
      state: state => state.Pub
    })
  },
  data() {
    return {
      isActiveIndustry: true,
      isActiveTown: true,
      params: {
        chargePersonType: null,
        companyName: null,
        pageNum: null,
        pageSize: null,
        partyMemberNumberType: 0,
        scaleType: null,
        staffScaleType: 0,
        townId: null,
        tradeId: null
      },
      input21: '',
      currentPage4: 4,
      data1: [
        '所属乡镇/村：',
        '所属行业：',
        '主要核心产品：',
        '地      址：',
        '联系方式：'
      ],
      selectType: [{
        index: 1,
        classify: '行业',
        type: ['不限', '化工']
      }]
    };
  },
  computed: {
    ...mapState({
      townShip: state => state.Pub.townShip,
      scale: state => state.Pub.scale,
      industry: state => state.Pub.industry
    })
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    // 改变页数时回调
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    showIndustry() {
      if (this.isActiveIndustry) {
        this.isActiveIndustry = false;
      } else {
        this.isActiveIndustry = true;
      }
    },
    showTownShip() {
      if (this.isActiveTown) {
        this.isActiveTown = false;
      } else {
        this.isActiveTown = true;
      }
    },
    staff() {
      if (this.params.staffScaleType) {
        this.params.staffScaleType = 0;
      } else {
        this.params.staffScaleType = 1;
      }
    },
    party() {
      if (this.params.partyMemberNumberType) {
        this.params.partyMemberNumberType = 0;
      } else {
        this.params.partyMemberNumberType = 1;
      }
    },
    selectIndustry(val) {
      console.log(val);
    },
    selectTownShip(val) {
      console.log(val);
    },
    selectScale(val) {
      console.log(val);
    },
    getCompanyInfo() {
      api.post('admin/company/add', this.params).then((e) => {
        // console.log("11111");
      }, response => {
        // error callback
      });
    }
  }
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.ListDetail {
  .search {
    margin-top: 23px;
    padding: 10px 0 0 20px;
    background: #ffffff;
    border: 1px solid #d4e1ea;
    font-size: 14px;
    .tittle {
      color: #666666;
    }
    .hidden {
      max-height: 36px;
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
        a:focus {
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
    width: 42px;
    height: 20px;
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
      .content {
        border-bottom: 1px solid #d4e1ea;
        margin-bottom: 20px;
        h1 {
          font-size: 18px;
          font-weight: bold;
          padding-bottom: 11px;
        }
        li {
          font-size: 14px;
          color: #666666;
          letter-spacing: 5px;
          padding-bottom: 11px;
        }
        .imgInfo {
          width: 264px;
          height: 176px;
          background-color: greenyellow;
          margin-bottom: 20px;
        }
      }
      .selecteType {
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
          .selected{
            color:#1c7bef;
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
