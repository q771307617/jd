<template>
  <div class='hello'>
    <div class="mainNav">
      <div class="mainNavs">
        <el-radio-group v-model="radio" fill="#f2ba55" @change="selecType(radio)">
          <el-radio-button :label="item.key" class="redio" v-for="item in type" :key="item.key">{{item.tittle}}</el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <div class="mainContent">
      <el-table :data="companyInfo" stripe border style="width: 100%;text-align:center">
        <el-table-column prop="name" label="企业名称" min-width="180" header-align="center">
        </el-table-column>
        <el-table-column prop="town" label="所属乡镇" min-width="180" header-align="center">
        </el-table-column>
        <el-table-column prop="village" label="所属村(社区)" min-width="180" header-align="center">
        </el-table-column>
        <el-table-column v-for="item in type" :key="item.key" :prop="item.name" :label="item.label" v-if="item.key==radio" min-width="180" sortable header-align="center" @sort-change="sortType(order)">
        </el-table-column>
        <el-table-column label="操作" header-align="center">
          <div slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">详情</el-button>
          </div>
        </el-table-column>
      </el-table>
      <div class="page">
      <pages :pageSize=15 :count="pageCount" @pageCurrentChange="handleCurrentChange"></pages>
      </div>
    </div>
    <nuxt-child/>
  </div>
</template>


<script>
import pages from '~/components/pages';
import api from '~/plugins/api';
import { mapState } from 'vuex';
export default {
  components: {
    pages
  },
  data() {
    return {
      radio: '1',
      dataParams: {
        sort: 1,
        type: 1,
        pageSize: 15,
        pageNum: 0
      },
      currentPage: 1,
      pageCount: 0,
      companyInfo: [{
        actualLandArea: null,
        facBuildingArea: null,
        id: null,
        isHighTech: null,
        name: null,
        patentNumber: null,
        ratifiedCoal: null,
        researchFee: null,
        stockWorkArea: null,
        tax: null,
        town: null,
        village: null
      }]
    };
  },
  computed: {
    ...mapState({
      type: state => state.Pub.searchindicator
    })
  },
  mounted() {
    this.getData();
  },
  methods: {
    handleEdit(index, row) {
      // console.log(index, row);
      this.$router.push({
        name: 'front-enterprise-detail',
        query: {
          id: row.id
        }
      });
    },
    handleSizeChange() {

    },
    // 改变页数时回调
    handleCurrentChange(val) {
      this.dataParams.pageNum = Number(val);
      this.getData();
      console.log(val);
    },
    // 选择具体信息
    selecType(val) {
      this.dataParams.type = val;
      this.getData();
    },
    getData() {
      api.get('company/searchindicator', this.dataParams)
        .then((e) => {
          if (e.status === 200) {
            this.companyInfo = e.data.list;
            this.pageCount = e.data.count;
            this.companyInfo.map((x) => {
              if (x.isHighTech === 1) {
                x.isHighTech = '是';
              } else if (x.isHighTech === 2) {
                x.isHighTech = '否';
              };
            });
          } else {
            this.$notify.error({
              title: '数据分析获取失败',
              message: e.msg
            });
          }
        })
        .catch(err => {
          this.$notify.error({
            title: '数据分析获取失败',
            message: err.msg
          });
        });
    }
  }
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style lang="scss">
#content {
  .mainNav {
    background: #f7f7f7;
    border: 1px solid #e0e0e0;
    width: 100%;
    height: 48px;
    el-radio-group,
    .mainNavs {
      width: 1200px;
      margin: 9px auto 0;
      el-radio-button {
        background: #f7f7f7;
      }
    }
  }
  .mainContent {
    width: 1200px;
    margin: 0 auto;
  }
  .page {
    margin: 20px 0;
  }
  .el-radio-button /deep/ .el-radio-button__inner {
    width: 150px;
  }
}
</style>
