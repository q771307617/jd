<template>
  <div class="content">
    <div class='hello'>
      <div class="mainNav">
        <div class="mainNavs">
          <ul>
            <li v-for="item in type" :key="item.key" class="redio" :class="{nactive: radio===item.key}" @click="selecType(item.key)">{{item.tittle}}</li>
          </ul>
        </div>
      </div>
      <div class="mainContent">
        <el-table :data="companyInfo" border :row-class-name="tableRowClassName" :header-cell-class-name="tableHeaderClassName" style="width: 100%;text-align:center" @sort-change="sortType">
          <el-table-column prop="name" label="企业名称" min-width="180" header-align="center">
          </el-table-column>
          <el-table-column prop="townName" label="所属乡镇" min-width="180" header-align="center">
          </el-table-column>
          <el-table-column prop="villageName" label="所属村(社区)" min-width="180" header-align="center">
          </el-table-column>
          <el-table-column v-for="item in type" :key="item.key" :prop="item.name" :label="item.label" v-if="item.key==radio" min-width="180" :sortable="item.status" header-align="center">
          </el-table-column>
          <el-table-column label="操作" header-align="center">
            <div slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">详情</el-button>
            </div>
          </el-table-column>
        </el-table>
        <div class="page">
          <pages :pageSize='15' :count="pageCount" @pageCurrentChange="handleCurrentChange" ref="emitChild"></pages>
        </div>
      </div>
      <nuxt-child/>
    </div>
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
      radio: '6',
      dataParams: {
        sort: '',
        type: 6,
        pageSize: 15,
        pageNum: 1
      },
      currentPage: 1,
      pageCount: 0,
      companyInfo: [
        {
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
          townName: null,
          villageName: null
        }
      ]
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
      this.$router.push({
        name: 'front-enterprise-detail',
        query: {
          id: row.id
        }
      });
    },
    handleSizeChange() { },
    // 改变页数时回调
    handleCurrentChange(val) {
      this.dataParams.pageNum = Number(val);
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
    // 选择具体信息
    selecType(val) {
      this.radio = val;
      this.dataParams.type = val;
      this.dataParams.sort = '';
      this.dataParams.pageNum = 1;
      // 页面回到第一页
      this.$refs.emitChild.$emit('bridge');
      this.getData();
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
        default:
          this.dataParams.sort = '';
          break;
      }
      this.getData();
    },
    getData() {
      api
        .get('company/hotcompany', this.dataParams)
        .then(e => {
          if (e.status === 200) {
            this.companyInfo = e.data.list;
            this.pageCount = e.data.count;
            this.companyInfo.map(x => {
              switch (x.isHighTech) {
                case 1:
                  x.isHighTech = '是';
                  break;
                case 2:
                  x.isHighTech = '否';
                  break;
                default:
                  x.isHighTech = '';
                  break;
              }
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
<style lang="scss" scoped>
.hello {
  // width: 1200px;
  // margin: 0 auto;
  .mainNav {
    background: #f7f7f7;
    border: 1px solid #e0e0e0;
    width: 100%;
    height: 48px;
    el-radio-group,
    .mainNavs {
      width: 1200px;
      margin: 9px auto 0;
      .redio {
        display: inline-block;
        width: 133px;
        height: 42px;
        line-height: 42px;
        cursor: pointer;
        text-align: center;
      }
      .nactive {
        background: #D9E7FE;
      }
    }
  }
  .mainContent {
    width: 1200px;
    min-width: 800px;
    margin: 20px auto;
  }
  .el-radio-button__inner {
    width: 133px;
  }
}
</style>
