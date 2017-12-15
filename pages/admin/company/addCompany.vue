<template>
  <div class='add-company'>
    <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/admin' }">企业管理</el-breadcrumb-item>
  <el-breadcrumb-item>详情</el-breadcrumb-item>
</el-breadcrumb>
<br>
<hr>
<br>
<el-tabs type="border-card" calass="tabs">
  <el-tab-pane label="基本信息" class="tab1">
  <el-row :gutter="24">
  <el-col :span="4" :offset="20"><el-button type="primary" class="save">保存</el-button></el-col>
</el-row>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="180px" class="demo-ruleForm">
  <el-form-item label="企业照片：" prop="imageUrl">
    <el-upload
  class="upload-demo"
  drag
  action="https://jsonplaceholder.typicode.com/posts/"
  multiple>
  <i class="el-icon-upload"></i>
  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
  </el-form-item>
 
  <el-form-item label="企业名称：" prop="name">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
  <el-form-item label="所属乡镇：" prop="region">
    <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="所属村（社区）：" prop="region">
    <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="详细地址：" prop="name">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
  <el-form-item label="经纬度：" prop="name">
    东经<el-input v-model="ruleForm.name"></el-input>西经<el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
  <el-form-item label="行业代码：" prop="name">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
  <el-form-item label="所属行业：" prop="region">
    <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="主要核心产品：" prop="name">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
  <el-form-item label="规上（规下）：" prop="resource">
    <el-radio-group v-model="ruleForm.resource">
      <el-radio label="上规"></el-radio>
      <el-radio label="下规"></el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="主要负责人：" prop="name">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
  <el-form-item label="联系电话：" prop="name">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
   <el-form-item label="是否“两代表一委员”：" prop="resource">
    <el-radio-group v-model="ruleForm.resource">
      <el-radio label="是"></el-radio>
      <el-radio label="否"></el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="具体负责人：" prop="name">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
  <el-form-item label="联系电话：" prop="name">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
  <el-form-item label="企业职工人数：   " prop="name">
    <el-input v-model="ruleForm.name"></el-input>人
  </el-form-item>
  <el-form-item label="企业职工平均工资：" prop="name">
    <el-input v-model="ruleForm.name"></el-input>元
  </el-form-item>
  <el-form-item label="党组织名称：" prop="name">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
  <el-form-item label="党员人数： " prop="name">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
  <el-form-item label="主要核心产品：" prop="name">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
  <el-form-item label="每月电费：" prop="name">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
  <el-form-item label="每月水费：" prop="name">
    <el-input v-model="ruleForm.name"></el-input>
  </el-form-item>
  <el-form-item label="企业简介：" prop="desc">
    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>


  
  
  
  </el-tab-pane>
  <el-tab-pane label="指标数据">指标数据</el-tab-pane>
  <el-tab-pane label="相关项目">相关项目</el-tab-pane>
</el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        address: '',
        averageSalary: '',
        companyProfile: '',
        corporationName: '',
        corporationNameId: '',
        corporationPhone: '',
        id: '',
        imageUrl: '',
        imageUrlId: '',
        isCommittee: '',
        lat: '',
        leaderId: '',
        leaderName: '',
        leaderPhone: '',
        lng: '',
        monthElectricityBill: '',
        monthWaterBill: '',
        name: '',
        partyMemberNumber: '',
        partyName: '',
        productName: '',
        productNameId: '',
        scaleUp: '',
        staffScale: '',
        townId: '',
        tradeId: '',
        villageId: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped lang="scss">
.add-company{
  .tabs{
   .tab1{
     .save{
       display:flex;
       align-items: flex-end;
     }
   }

  }
}
</style>
