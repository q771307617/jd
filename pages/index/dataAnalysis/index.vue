<template>
  <div class='hello'>
    <div class="mainNav">
     <div class="mainNavs">
        <el-radio-group v-model="radio3" fill="#f2ba55">
          <el-radio-button label="0">厂房建筑面积</el-radio-button>
          <el-radio-button label="1">实际用地面积</el-radio-button>
          <el-radio-button label="2">存量厂房面积</el-radio-button>
          <el-radio-button label="3">入库税收</el-radio-button>
          <el-radio-button label="4">R&D经费投入</el-radio-button>
          <el-radio-button label="5">信息化投入</el-radio-button>
          <el-radio-button label="6">高新技术企业</el-radio-button>
          <el-radio-button label="7">发明专利量</el-radio-button>
          <el-radio-button label="8">核定用能</el-radio-button>
        </el-radio-group>
     </div>
    </div>
    <div class="mainContent">
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
          prop="date"
          label="企业名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="所属乡镇"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="所属村(社区)">
        </el-table-column>
        <el-table-column
          prop="date"
          label="厂房建筑面积"
          width="180"
          sortable>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="prev, pager, next, total, jumper"
        :total="40">
      </el-pagination>
    </div>  
    <nuxt-child/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio3: '0',
      tableData: [{
        date: '2016-05-02',
        name: '滑冰',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '画饼',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '话柄',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '花柄',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleSizeChange() {

    },
    handleCurrentChange() {
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
}

</style>
<style scoped lang="scss">
.mainContent{
    el-pagination{
      display: inline-block;
      text-align:right;
    }
}
</style>
