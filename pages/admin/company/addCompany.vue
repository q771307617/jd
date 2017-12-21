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
            <el-upload action="https://172.30.34.41:8081/upload/companyimg" :on-success="handleSuccess" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" v-if="showInput">
              <i class="el-icon-plus"></i>
              <div class="el-upload__tip" slot="tip">说明：比例大小：3：2，大小200KB以内；格式：JPG、PNG</div>
            </el-upload>
            <div v-else>div</div>
          </el-form-item>
          <el-form-item label="企业名称：" prop="name">
            <el-input v-model="ruleForm.name" class="input-length" v-if="showInput"></el-input>
            <div v-else>{{ruleForm.name}}</div>
          </el-form-item>
          <!--<el-form-item label="所属乡镇：" prop="townId">
                <el-cascader :options="options2" @active-item-change="handleItemChange" :props="props" v-if="showInput" @change="handleChange"></el-cascader>
                <div v-else>div</div>
              </el-form-item>-->
          <el-form-item label="所属乡镇：" prop="townId">
            <el-select v-model="ruleForm.townId" placeholder="请选择乡镇" v-if="showInput" @change="selectTownId">
              <el-option :label="item.name" :value="item.id" v-for="item in townShip" :key="item.id"></el-option>
            </el-select>
            <div v-else>{{ruleForm.townName}}</div>
          </el-form-item>
          <el-form-item label="所属村（社区）：" prop="villageId">
            <el-select v-model="ruleForm.villageId" placeholder="请选择村（社区）" v-if="showInput">
              <el-option :label="item.name" :value="item.id" v-for="item in village" :key="item.id"></el-option>
            </el-select>
            <div v-else>{{ruleForm.villageName}}</div>
          </el-form-item>
          <el-form-item label="详细地址：" prop="address">
            <el-input v-model="ruleForm.address" class="input-length" v-if="showInput"></el-input>
            <div v-else>{{ruleForm.companyProfile}}</div>
          </el-form-item>
          <el-row :gutter="24">
            <el-col :span="8">
              <el-form-item label="经纬度：" prop="lng">
                经度
                <el-input v-model="ruleForm.lng" class="input-length" v-if="showInput"></el-input>
                <span v-else>{{ruleForm.lng}}</span>
              </el-form-item>
              <el-form-item prop="lat">
                纬度
                <el-input v-model="ruleForm.lat" class="input-length" v-if="showInput"></el-input>
                <span v-else>{{ruleForm.lat}}</span>
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
          <!-- <el-form-item label="行业代码：" prop="tradeId">
                                                          <el-input v-model="ruleForm.tradeId" class="input-length" v-if="showInput"></el-input>
                                                          <div v-else>div</div>
                                                        </el-form-item>-->
          <el-form-item label="所属行业：" prop="tradeId">
            <el-select v-model="ruleForm.tradeId" placeholder="请选择所属行业" v-if="showInput">
              <el-option :label="item.tradeName" :value="item.id" v-for="item in industry" :key="item.id"></el-option>
            </el-select>
            <div v-else>{{ruleForm.townName}}</div>
          </el-form-item>
          <el-form-item label="主要核心产品：" prop="productName">
            <el-input v-model="ruleForm.productName" class="input-length" v-if="showInput"></el-input>
            <div>{{ruleForm}}</div>
          </el-form-item>
          <el-form-item label="规上（规下）：" prop="scaleUp">
            <el-radio-group v-model="ruleForm.scaleUp" v-if="showInput">
              <el-radio label="1" value="1">规上</el-radio>
              <el-radio label="2" value="2">规下</el-radio>
            </el-radio-group>
            <div v-else>
              <p v-if="ruleForm.scaleUp==1">规上</p>
              <p v-if="ruleForm.scaleUp==2">规下</p>
            </div>
          </el-form-item>
          <el-form-item label="主要负责人：" prop="corporationName">
            <el-input v-model="ruleForm.corporationName" class="input-length" v-if="showInput"></el-input>
            <div v-else>{{ruleForm.corporationName}}</div>
          </el-form-item>
          <el-form-item label="联系电话：" prop="corporationPhone">
            <el-input v-model="ruleForm.corporationPhone" class="input-length" v-if="showInput"></el-input>
            <div v-else>{{ruleForm.corporationPhone}}</div>
          </el-form-item>
          <el-form-item label="是否“两代表一委员”：" prop="isCommittee">
            <el-radio-group v-model="ruleForm.isCommittee" v-if="showInput">
              <el-radio label="1" value="1">是</el-radio>
              <el-radio label="2" value="2">否</el-radio>
            </el-radio-group>
            <div v-else>
              <p v-if="ruleForm.isCommittee==1">是</p>
              <p v-if="ruleForm.isCommittee==2">否</p>
            </div>
          </el-form-item>
          <el-form-item label="具体负责人：" prop="leaderName">
            <el-input v-model="ruleForm.leaderName" class="input-length" v-if="showInput"></el-input>
            <div v-else>{{ruleForm.leaderName}}</div>
          </el-form-item>
          <el-form-item label="联系电话：" prop="leaderPhone">
            <el-input v-model="ruleForm.leaderPhone" class="input-length" v-if="showInput"></el-input>
            <div v-else>{{ruleForm.leaderPhone}}</div>
          </el-form-item>
          <el-form-item label="企业职工人数： " prop="staffScale">
            <el-input v-model="ruleForm.staffScale" class="input-length" v-if="showInput"></el-input>
            <span v-else>{{ruleForm.staffScale}}</span>人
          </el-form-item>
          <el-form-item label="企业职工平均工资：" prop="averageSalary">
            <el-input v-model="ruleForm.averageSalary" class="input-length" v-if="showInput"></el-input>
            <span v-else>{{ruleForm.averageSalary}}</span>元
          </el-form-item>
          <el-form-item label="党组织名称：" prop="partyName">
            <el-input v-model="ruleForm.partyName" class="input-length" v-if="showInput"></el-input>
            <div v-else>{{ruleForm.partyName}}</div>
          </el-form-item>
          <el-form-item label="党员人数： " prop="partyMemberNum">
            <el-input v-model="ruleForm.partyMemberNum" class="input-length" v-if="showInput"></el-input>
            <div v-else>{{ruleForm.partyMemberNum}}</div>
          </el-form-item>
          <el-form-item label="每月电费：" prop="monthElecBill">
            <el-input v-model="ruleForm.monthElecBill" class="input-length" v-if="showInput"></el-input>
            <div v-else>{{ruleForm.monthElecBill}}</div>
          </el-form-item>
          <el-form-item label="每月水费：" prop="monthWaterBill">
            <el-input v-model="ruleForm.monthWaterBill" class="input-length" v-if="showInput"></el-input>
            <div v-else>{{ruleForm.monthWaterBill}}</div>
          </el-form-item>
          <el-form-item label="企业简介：" prop="companyProfile">
            <el-input type="textarea" v-model="ruleForm.companyProfile" style="width:80%" v-if="showInput"></el-input>
            <div v-else>{{ruleForm.companyProfile}}</div>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import api from './../../../plugins/api.js';
import qs from 'qs';
import {
  mapState
} from 'vuex';
export default {
  data() {
    return {
      showInput: false,
      id: null,
      village: null,
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
        leader: {
          gmtModified: 'wsl'
        },
        lat: null,
        leaderId: '',
        leaderName: '',
        leaderPhone: '',
        lng: null,
        monthElecBill: '',
        monthWaterBill: '',
        name: '',
        partyMemberNum: '',
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
          { required: true, message: '请输入企业名称', trigger: 'blur' }
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
        ],
        tradeId: [
          { required: true, message: '请选择所属行业', trigger: 'change' }
        ]
      }
    };
  },
  computed: {
    ...mapState({
      townShip: state => state.Lists.AllTownShip,
      scale: state => state.Lists.scale,
      industry: state => state.Lists.AllIndustry
    })
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.ruleForm.imageUrl = file.url;
    },
    handleSuccess(response, file, fileList) {
      console.log(response, file, fileList);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let url = null;
          if (this.$route.query.type === 'add') {
            url = 'admin/company/add';
          } else {
            url = 'admin/company/update';
          }
          api.post(url, qs.stringify(this.ruleForm)).then((e) => {
            if (e.status === 200) {
              this.id = e.data;
              this.showInput = false;
              this.$router.push({
                name: 'admin-company-addCompany',
                query: {
                  type: this.$route.query.type,
                  companyId: e.data,
                  showInput: false
                }
              });
            }
          }, response => {
            this.$notify.error({
              title: '错误',
              message: response.msg
            });
          });
        } else {
          console.log(this.ruleForm);
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 选择选哪个镇触发
    selectTownId(val) {
      console.log(val);
      api.get('common/getvillage', { townId: val }).then((e) => {
        console.log(e);
        this.village = e.data;
        console.log(this.village);
      }).catch(err => {
        this.$notify.error({
          title: '错误',
          message: err.msg
        });
      });
    },
    handleChange(value) {
      console.log(value);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    modify() {
      this.showInput = true;
    },
    getCompanyDetails() {
      api.get('admin/company/detail', { id: this.$route.query.companyId }).then((e) => {
        console.log(e);
        this.ruleForm = e.data;
        // this.ruleForm.leader = e.data.leader;
        console.error('111', e.data.leader);
        // this.ruleForm.isCommittee = e.data.leader.isCommittee;
      }).catch(err => {
        this.$notify.error({
          title: '错误',
          message: err.msg
        });
      });
    },
    getCompanyInfo() {
      let type = null;
      this.id = this.$route.query.companyId || null;
      this.showInput = this.$route.query.showInput;
      type = this.$route.query.type;
      if (type === 'add') {
      } else {
        this.getCompanyDetails();
      }
    }
  },
  mounted() {
    this.getCompanyInfo();
  },
  watch: {
    'showInput'() {
      this.$router.push({
        name: 'admin-company-addCompany',
        query: {
          type: this.$route.query.type,
          companyId: this.$route.query.companyId,
          showInput: this.$route.query.showInput
        }
      });
    }
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
