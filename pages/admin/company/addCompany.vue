<template>
  <div class='add-company'>
    <el-row :gutter="24">
      <el-col :span="4" :offset="20">
        <el-button type="primary" class="save" v-if="showInput" @click="submitForm('ruleForm')">保存</el-button>
        <el-button type="primary" class="save" v-else @click="modify()">修改</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="21" :offset="3">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="180px" class="demo-ruleForm" label-position="left">
          <el-form-item label="企业照片：" prop="imageUrl">
            <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple v-if="showInput">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或
                <em>点击上传</em>
              </div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
            <div v-else>div</div>
          </el-form-item>
          <el-form-item label="企业名称：" prop="name">
            <el-input v-model="ruleForm.name" class="input-length" v-if="showInput"></el-input>
            <div v-else>div</div>
          </el-form-item>
          <el-form-item label="所属乡镇：" prop="townId">
            <el-select v-model="ruleForm.townId" placeholder="请选择乡镇" v-if="showInput">
              <el-option label="刘庄" value="刘庄"></el-option>
              <el-option label="李庄" value="李庄"></el-option>
            </el-select>
            <div v-else>div</div>
          </el-form-item>
          <el-form-item label="所属村（社区）：" prop="villageId">
            <el-select v-model="ruleForm.villageId" placeholder="请选择村（社区）" v-if="showInput">
              <el-option label="古荡" value="古荡"></el-option>
              <el-option label="三墩" value="三墩"></el-option>
            </el-select>
            <div v-else>div</div>
          </el-form-item>
          <el-form-item label="详细地址：" prop="address">
            <el-input v-model="ruleForm.address" class="input-length" v-if="showInput"></el-input>
            <div v-else>div</div>
          </el-form-item>
          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="经纬度：" prop="lng">
                经度
                <el-input v-model="ruleForm.lng" class="input-length" v-if="showInput"></el-input>
                <span v-else>div</span>
              </el-form-item>
              <el-form-item prop="lat">
                纬度
                <el-input v-model="ruleForm.lat" class="input-length" v-if="showInput"></el-input>
                <span v-else>div</span>
              </el-form-item>
            </el-col>
            <!--
                                          <el-col :span="8">
                                            <el-form-item  prop="name">
                                            纬度
                                                <el-input v-model="ruleForm.name" class="input-length"></el-input>
                                              </el-form-item>
                                          </el-col>-->
          </el-row>
          <el-form-item label="行业代码：" prop="tradeId">
            <el-input v-model="ruleForm.tradeId" class="input-length" v-if="showInput"></el-input>
            <div v-else>div</div>
          </el-form-item>
          <el-form-item label="所属行业：" prop="region">
            <el-select v-model="ruleForm.region" placeholder="请选择所属行业" v-if="showInput">
              <el-option label="java" value="java"></el-option>
              <el-option label="web" value="web"></el-option>
            </el-select>
            <div v-else>div</div>
          </el-form-item>
          <el-form-item label="主要核心产品：" prop="productName">
            <el-input v-model="ruleForm.productName" class="input-length" v-if="showInput"></el-input>
            <div v-else>div</div>
          </el-form-item>
          <el-form-item label="规上（规下）：" prop="scaleUp">
            <el-radio-group v-model="ruleForm.scaleUp" v-if="showInput">
              <el-radio label="规上" value="1"></el-radio>
              <el-radio label="规下" value="2"></el-radio>
            </el-radio-group>
            <div v-else>div</div>
          </el-form-item>
          <el-form-item label="主要负责人：" prop="corporationName">
            <el-input v-model="ruleForm.corporationName" class="input-length" v-if="showInput"></el-input>
            <div v-else>div</div>
          </el-form-item>
          <el-form-item label="联系电话：" prop="corporationPhone">
            <el-input v-model="ruleForm.corporationPhone" class="input-length" v-if="showInput"></el-input>
            <div v-else>div</div>
          </el-form-item>
          <el-form-item label="是否“两代表一委员”：" prop="isCommittee">
            <el-radio-group v-model="ruleForm.isCommittee" v-if="showInput">
              <el-radio label="是" value="1"></el-radio>
              <el-radio label="否" value="2"></el-radio>
            </el-radio-group>
            <div v-else>div</div>
          </el-form-item>
          <el-form-item label="具体负责人：" prop="leaderName">
            <el-input v-model="ruleForm.leaderName" class="input-length" v-if="showInput"></el-input>
            <div v-else>div</div>
          </el-form-item>
          <el-form-item label="联系电话：" prop="leaderPhone">
            <el-input v-model="ruleForm.leaderPhone" class="input-length" v-if="showInput"></el-input>
            <div v-else>div</div>
          </el-form-item>
          <el-form-item label="企业职工人数：   " prop="staffScale">
            <el-input v-model="ruleForm.staffScale" class="input-length" v-if="showInput"></el-input>
            <span v-else>div</span>人
          </el-form-item>
          <el-form-item label="企业职工平均工资：" prop="averageSalary">
            <el-input v-model="ruleForm.averageSalary" class="input-length" v-if="showInput"></el-input>
            <span v-else>div</span>元
          </el-form-item>
          <el-form-item label="党组织名称：" prop="partyName">
            <el-input v-model="ruleForm.partyName" class="input-length" v-if="showInput"></el-input>
            <div v-else>div</div>
          </el-form-item>
          <el-form-item label="党员人数： " prop="partyMemberNumber">
            <el-input v-model="ruleForm.partyMemberNumber" class="input-length" v-if="showInput"></el-input>
            <div v-else>div</div>
          </el-form-item>
          <el-form-item label="每月电费：" prop="monthElectricityBill">
            <el-input v-model="ruleForm.monthElectricityBill" class="input-length" v-if="showInput"></el-input>
            <div v-else>div</div>
          </el-form-item>
          <el-form-item label="每月水费：" prop="monthWaterBill">
            <el-input v-model="ruleForm.monthWaterBill" class="input-length" v-if="showInput"></el-input>
            <div v-else>div</div>
          </el-form-item>
          <el-form-item label="企业简介：" prop="companyProfile">
            <el-input type="textarea" v-model="ruleForm.companyProfile" class="input-length" v-if="showInput"></el-input>
            <div v-else>div</div>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import api from './../../../plugins/api.js';
export default {
  data() {
    return {
      showInput: false,
      id: null,
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
          { required: true, message: '请输入企业名称', trigger: 'blur' },
          { min: 3, max: 9, message: '长度在 3 到 9 个字符', trigger: 'blur' }
        ],
        townId: [
          { required: true, message: '请选择所属乡镇', trigger: 'change' }
        ],
        villageId: [
          { required: true, message: '请选择村（社区）', trigger: 'change' }
        ],
        address: [
          { required: true, message: '请输入详细地址', trigger: 'blur' }
        ],
        lng: [
          { required: true, message: '请输入经度', trigger: 'blur' }
        ],
        lat: [
          { required: true, message: '请输入纬度', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm);
          api.post('admin/company/add', this.ruleForm).then((e) => {
            // console.log("11111");
          }, response => {
            // error callback
          });
          alert('submit!');
        } else {
          console.log(this.ruleForm);
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    modify() {
      this.showInput = true;
    },
    getCompanyInfo() {
      let type = null;
      this.id = this.$route.query.companyId || null;
      type = this.$route.query.type;
      if (type === 'view') {
        this.showInput = false;
      } else {
        this.showInput = true;
      }
    }
  },
  mounted() {
    this.getCompanyInfo();
  }
};
</script>

<style scoped lang="scss">
.add-company {
  .tabs {
    .tab1 {
      .save {
        display: flex;
        align-items: flex-end;
      }
    }
  }
}

.input-length {
  width: 217px;
}
</style>
