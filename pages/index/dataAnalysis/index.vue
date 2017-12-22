<template>
  <div class='hello'>
    <div class="mainNav">
     <div class="mainNavs">
        <el-radio-group v-model="radio" fill="#f2ba55" @change="selecType(radio)">
          <el-radio-button label="1" class="redio">厂房建筑面积</el-radio-button>
          <el-radio-button label="2" class="redio">实际用地面积</el-radio-button>
          <el-radio-button label="3" class="redio">存量厂房面积</el-radio-button>
          <el-radio-button label="4" class="redio">入库税收</el-radio-button>
          <el-radio-button label="5" class="redio">R&D经费投入</el-radio-button>
          <el-radio-button label="6" class="redio">主营业务收入</el-radio-button>
          <el-radio-button label="7" class="redio">高新技术企业</el-radio-button>
          <el-radio-button label="8" class="redio">发明专利量</el-radio-button>
          <el-radio-button label="9" class="redio">核定用能</el-radio-button>
        </el-radio-group>
     </div>
    </div>
    <div class="mainContent">
      <el-table
        :data="companyInfo"
        stripe
        border
        style="width: 100%;text-align:center">
        <el-table-column
          prop="name"
          label="企业名称"
          min-width="180"
          header-align="center">
        </el-table-column>
        <el-table-column
          prop="town"
          label="所属乡镇"
          min-width="180"
          header-align="center">
        </el-table-column>
        <el-table-column
          prop="village"
          label="所属村(社区)"
          min-width="180"
          header-align="center">
        </el-table-column>
        <el-table-column
          prop="facBuildingArea"
          label="厂房建筑面积"
          min-width="180"
          sortable
          header-align="center"
          @sort-change="sortType(order)">
        </el-table-column>
        <el-table-column label="操作" header-align="center">
          <div slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">详情</el-button>
          </div>
        </el-table-column>
      </el-table>
      <!-- <pages :count='25' :pageNum='1' :pageSize='5'  @size-change="handleSizeChange" @current-change="handleCurrentChange" /> -->
      <div class="page">
        <el-row>
        <el-col :span="9">&nbsp</el-col>
        <el-col :span="15">
        <p class="demonstration" style="float:left;margin-top:5px;">共
        <span class="red">{{pageCount}}</span>条数据
        <span style="margin-left:20px;">每页</span>
        <span class="red">15</span>条</p>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="4"  background prev-text="< 上一页" next-text="下一页 >" layout="prev, pager, next, jumper">
        </el-pagination>
        </el-col>
        </el-row>
      </div>
    </div>
    <nuxt-child/>
  </div>
</template>


<script>
import pages from '~/components/pages';
import api from '~/plugins/api';
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
        pageNum: 1
      },
      currentPage: 1,
      pageCount: '',
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
  mounted() {
    this.getData();
  },
  methods: {
    handleEdit(index, row) {
      // console.log(index, row);
      this.$router.push({
        name: 'index-enterprise-detail',
        query: {
          id: row.id
        }
      });
    },
    handleSizeChange() {

    },
    // 改变页数时回调
    handleCurrentChange(val) {
      this.dataParams.pageNum = val;
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
          this.companyInfo = e.data.list;
          this.pageCount = e.data.count;
        })
        .catch(err => {
          this.$notify.error({
            title: '错误',
            message: err.msg
          });
        });
    }
  }
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style lang="scss">
#content{
  .mainNav{
    background:#f7f7f7;
    border:1px solid #e0e0e0;
    width:100%;
    height:48px;
    el-radio-group,.mainNavs{
      width:1200px;
      margin: 9px auto 0;
      el-radio-button{
        background:#f7f7f7;
      }
    }
    }
  .mainContent{
    width:1200px;
    margin: 0 auto;
  }
  .page{
    margin: 20px 0;
  }
.el-radio-button /deep/ .el-radio-button__inner{
  width: 150px;
}
}

</style>
