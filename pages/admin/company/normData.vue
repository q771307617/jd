<template>
  <div class='normdata'>
    <el-radio-group v-model="radio" fill="#f2ba55" @change="changePage()">
      <el-radio-button label='1' v-if="this.$route.query.type=='add'&&this.$route.query.companyId!=0" disabled>基本信息</el-radio-button>
      <el-radio-button label='1' v-else>基本信息</el-radio-button>
      <el-radio-button label='2'> 指标数据</el-radio-button>
    </el-radio-group>
    <el-row :gutter="24">
      <el-col :span="4" :offset="20">
        <el-button type="primary" class="save" v-if="showInput" @click="submitForm('ruleForm')">保存</el-button>
        <el-button type="primary" class="save" v-else @click="modify()">修改</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="21" :offset="3">
        <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="350px" class="demo-ruleForm" label-position="left">
          <el-form-item label="厂房建筑面积（㎡）：" prop="facBuildingArea">
            <el-input v-model="ruleForm.facBuildingArea" class="input-length" v-if="showInput"></el-input>
            <div v-else>{{ruleForm.facBuildingArea}}</div>
          </el-form-item>
          <el-form-item label="实际用地面积（亩）：" prop="actualLandArea">
            <el-input v-model="ruleForm.actualLandArea" class="input-length" v-if="showInput"></el-input>
            <div v-else>{{ruleForm.actualLandArea}}</div>
          </el-form-item>
          <el-form-item label="存量厂房面积（米2）：" prop="stockWorkArea">
            <el-input v-model="ruleForm.stockWorkArea" class="input-length" v-if="showInput"></el-input>
            <div v-else>{{ruleForm.stockWorkArea}}</div>
          </el-form-item>
          <el-form-item label="入库税收（万元）：" prop="tax">
            <el-input v-model="ruleForm.tax" class="input-length" v-if="showInput"></el-input>
            <div v-else>{{ruleForm.tax}}</div>
          </el-form-item>
          <el-form-item label="R＆D经费投入（万元）：" prop="researchFee">
            <el-input v-model="ruleForm.researchFee" class="input-length" v-if="showInput"></el-input>
            <div v-else>{{ruleForm.researchFee}}</div>
          </el-form-item>
          <el-form-item label="主营业务收入（万元）：" prop="mainBusIncome">
            <el-input v-model="ruleForm.mainBusIncome" class="input-length" v-if="showInput"></el-input>
            <div v-else>{{ruleForm.mainBusIncome}}</div>
          </el-form-item>
          <el-form-item label="是否高新技术企业：" prop="isHighTech">
            <el-radio-group v-model="ruleForm.isHighTech" v-if="showInput">
              <el-radio label="1" value="1">是</el-radio>
              <el-radio label="2" value="2">否</el-radio>
            </el-radio-group>
            <div v-else>
              <p v-if="ruleForm.isHighTech==1">是</p>
              <p v-if="ruleForm.isHighTech==2">否</p>
            </div>
          </el-form-item>
          <el-form-item label="发明专利量：" prop="patentNumber">
            <el-input v-model="ruleForm.patentNumber" class="input-length" v-if="showInput"></el-input>
            <div v-else>{{ruleForm.patentNumber}}</div>
          </el-form-item>
          <!-- <el-form-item label="创新平台：（技术中心、设计中心、研发中心）：" prop="staffScale">
                                                      <el-input v-model="ruleForm.staffScale" class="input-length" v-if="showInput"></el-input>
                                                      <div v-else>div</div>
                                                    </el-form-item> -->
          <el-form-item label="核定用能（吨标煤）：" prop="ratifiedCoal">
            <el-input v-model="ruleForm.ratifiedCoal" class="input-length" v-if="showInput"></el-input>
            <div v-else>{{ruleForm.ratifiedCoal}}</div>
          </el-form-item>
          <el-form-item label="实际等价值能耗（吨标煤）：" prop="energyConsume">
            <el-input v-model="ruleForm.energyConsume" class="input-length" v-if="showInput"></el-input>
            <div v-else>{{ruleForm.energyConsume}}</div>
          </el-form-item>
          <el-form-item label="水耗（吨）或天然气（万立方米）" prop="waterConsume">
            <el-input v-model="ruleForm.waterConsume" class="input-length" v-if="showInput"></el-input>
            <div v-else>{{ruleForm.waterConsume}}</div>
          </el-form-item>
          <el-form-item label="电耗（万千瓦时）" prop="elecConsume">
            <el-input v-model="ruleForm.elecConsume" class="input-length" v-if="showInput"></el-input>
            <div v-else>{{ruleForm.elecConsume}}</div>
          </el-form-item>
          <el-form-item label="煤耗（吨标煤）" prop="coalConsume">
            <el-input v-model="ruleForm.coalConsume" class="input-length" v-if="showInput"></el-input>
            <div v-else>{{ruleForm.coalConsume}}</div>
          </el-form-item>
          <el-form-item label="增加值能耗（吨标煤/万元）" prop="addedEnergyConsume">
            <el-input v-model="ruleForm.addedEnergyConsume" class="input-length" v-if="showInput"></el-input>
            <div v-else>{{ruleForm.addedEnergyConsume}}</div>
          </el-form-item>
          <el-form-item label="申报时间" required>
            <el-col :span="5" v-if="showInput">
              <el-form-item prop="declareStartTime" class="input-length">
                <el-date-picker type="date" placeholder="请选择时间范围起始" v-model="ruleForm.declareStartTime" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
            <span v-else>{{declareStartTime}}-</span>
            <el-col class="line" :span="1" v-if="showInput">&nbsp——</el-col>
            <el-col :span="11" v-if="showInput">
              <el-form-item prop="declareEndTime" class="input-length">
                <el-date-picker type="date" placeholder="请选择时间范围结束" v-model="ruleForm.declareEndTime" style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
            <span v-else>{{declareEndTime}}</span>
          </el-form-item>`
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import api from './../../../plugins/api.js';
import qs from 'qs';
import moment from 'moment';
export default {
  data() {
    var checkNumber = (rule, value, callback) => {
      if (!value) {
        return callback();
      } else {
        if (!/^[0-9.]+$/.test(value)) {
          callback(new Error('请输入数字值'));
        } else {
          callback();
        }
      }
    };
    return {
      radio: '2',
      showInput: false,
      declareStartTime: null,
      declareEndTime: null,
      id: null,
      ruleForm: {
        actualLandArea: '',
        addedEnergyConsume: '',
        coalConsume: '',
        companyId: '',
        declareStartTime: null,
        declareEndTime: null,
        elecConsume: '',
        energyConsume: '',
        facBuildingArea: '',
        id: null,
        isHighTech: '',
        mainBusIncome: '',
        patentNumber: '',
        ratifiedCoal: '',
        researchFee: '',
        staffScale: '',
        stockWorkArea: '',
        tax: '',
        waterConsume: '',
        year: ''
      },
      rules: {
        actualLandArea: [
          { validator: checkNumber, trigger: 'blur' }
        ],
        addedEnergyConsume: [
          { validator: checkNumber, trigger: 'blur' }
        ],
        coalConsume: [
          { validator: checkNumber, trigger: 'blur' }
        ],
        elecConsume: [
          { validator: checkNumber, trigger: 'blur' }
        ],
        energyConsume: [
          { validator: checkNumber, trigger: 'blur' }
        ],
        facBuildingArea: [
          { validator: checkNumber, trigger: 'blur' }
        ],
        mainBusIncome: [
          { validator: checkNumber, trigger: 'blur' }
        ],
        patentNumber: [
          { validator: checkNumber, trigger: 'blur' }
        ],
        ratifiedCoal: [
          { validator: checkNumber, trigger: 'blur' }
        ],
        researchFee: [
          { validator: checkNumber, trigger: 'blur' }
        ],
        staffScale: [
          { validator: checkNumber, trigger: 'blur' }
        ],
        stockWorkArea: [
          { validator: checkNumber, trigger: 'blur' }
        ],
        tax: [
          { validator: checkNumber, trigger: 'blur' }
        ],
        waterConsume: [
          { validator: checkNumber, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('111', this.ruleForm.declareStartTime, this.ruleForm.declareEndTime);
          if (this.ruleForm.declareStartTime) {
            this.declareStartTime = moment(this.ruleForm.declareStartTime).format('YYYY-MM-DD');
            this.ruleForm.declareStartTime = moment(this.ruleForm.declareStartTime).format('x');
          }
          if (this.ruleForm.declareEndTime) {
            this.declareEndTime = moment(this.ruleForm.declareEndTime).format('YYYY-MM-DD');
            this.ruleForm.declareEndTime = moment(this.ruleForm.declareEndTime).format('x');
          }
          let name = null;
          if (this.$route.query.type === 'add') {
            name = 'admin';
          } else {
            this.ruleForm.companyId = this.$route.query.companyId;
            name = 'admin-company-normData';
          }
          api.post('admin/indicator/add', qs.stringify(this.ruleForm)).then((e) => {
            if (e.status === 200) {
              this.showInput = false;
              this.$router.push({
                name: name,
                query: {
                  type: this.$route.query.type,
                  companyId: this.$route.query.companyId,
                  showInput: false
                }
              });
            } else {
              this.$notify.error({
                title: '指标数据提交失败',
                message: e.msg
              });
            }
          });
        } else {
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
    changePage() {
      this.$router.push({
        name: 'admin-company-addCompany',
        query: {
          type: this.$route.query.type,
          companyId: this.$route.query.companyId,
          showInput: this.$route.query.showInput
        }
      });
    },
    getCompanyDetails() {
      api.get('admin/indicator/detail', { companyId: this.$route.query.companyId }).then((e) => {
        if (e.status === 200) {
          this.ruleForm = e.data;
          if (e.data.declareStartTime) {
            this.declareStartTime = moment(e.data.declareStartTime).format('YYYY-MM-DD');
          }
          if (e.data.declareEndTime) {
            this.declareEndTime = moment(e.data.declareEndTime).format('YYYY-MM-DD');
          }
        }
      });
    },
    getCompanyInfo() {
      let type = null;
      this.showInput = this.$route.query.showInput;
      console.log(this.showInput);
      type = this.$route.query.type;
      if (type === 'add') {
      } else {
        this.getCompanyDetails();
      }
    }
  },
  mounted() {
    this.getCompanyInfo();
  }
};
</script>

<style scoped lang="scss">
.normdata {
  .line {
    text-align: center;
  }
}

.input-length {
  width: 217px;
}
</style>
