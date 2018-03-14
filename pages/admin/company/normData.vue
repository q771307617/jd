<template>
  <div class='normdata'>
    <el-radio-group v-model="radio" fill="#f2ba55" @change="changePage()">
      <el-radio-button label='1' v-if="this.$route.query.type=='add'&&this.$route.query.companyId!=0" disabled>基本信息</el-radio-button>
      <el-radio-button label='1' v-else>基本信息</el-radio-button>
      <el-radio-button label='2'> 指标数据</el-radio-button>
    </el-radio-group>
    <el-row :gutter="24">
      <el-col :span="4" :offset="20">
        <el-button type="primary" class="save" v-if="showInput=='yes'" @click="submitForm('ruleForm')">保存</el-button>
        <el-button type="primary" class="save" v-else @click="modify()">修改</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="21" :offset="3">
        <el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="350px" class="demo-ruleForm" label-position="left">
          <el-form-item label="厂房建筑面积（㎡）：" prop="facBuildingArea">
            <el-input v-model="ruleForm.facBuildingArea" class="input-length" v-if="showInput=='yes'"></el-input>
            <div v-else>{{ruleForm.facBuildingArea}}</div>
          </el-form-item>
          <el-form-item label="实际用地面积（亩）：" prop="actualLandArea">
            <el-input v-model="ruleForm.actualLandArea" class="input-length" v-if="showInput=='yes'"></el-input>
            <div v-else>{{ruleForm.actualLandArea}}</div>
          </el-form-item>
          <el-form-item label="存量厂房面积（㎡）：" prop="stockWorkArea">
            <el-input v-model="ruleForm.stockWorkArea" class="input-length" v-if="showInput=='yes'"></el-input>
            <div v-else>{{ruleForm.stockWorkArea}}</div>
          </el-form-item>
          <el-form-item label="入库税收（元）：" prop="tax">
            <el-input v-model="ruleForm.tax" class="input-length" v-if="showInput=='yes'"></el-input>
            <div v-else>{{ruleForm.tax}}</div>
          </el-form-item>
          <el-form-item label="R＆D经费投入（元）：" prop="researchFee">
            <el-input v-model="ruleForm.researchFee" class="input-length" v-if="showInput=='yes'"></el-input>
            <div v-else>{{ruleForm.researchFee}}</div>
          </el-form-item>
          <el-form-item label="主营业务收入（元）：" prop="mainBusIncome">
            <el-input v-model="ruleForm.mainBusIncome" class="input-length" v-if="showInput=='yes'"></el-input>
            <div v-else>{{ruleForm.mainBusIncome}}</div>
          </el-form-item>
          <el-form-item label="工业增加值（万元）：" prop="industrialValue">
            <el-input v-model="ruleForm.industrialValue" class="input-length" v-if="showInput=='yes'"></el-input>
            <div v-else>{{ruleForm.industrialValue}}</div>
          </el-form-item>
          <el-form-item label="能源消费值（标吨煤）：" prop="powerConsume">
            <el-input v-model="ruleForm.powerConsume" class="input-length" v-if="showInput=='yes'"></el-input>
            <div v-else>{{ruleForm.powerConsume}}</div>
          </el-form-item>
          <el-form-item label="核定排污权（吨）：" prop="approvedDischarge">
            <el-input v-model="ruleForm.approvedDischarge" class="input-length" v-if="showInput=='yes'"></el-input>
            <div v-else>{{ruleForm.approvedDischarge}}</div>
          </el-form-item>
          <el-form-item label="单位排污权核定增加值（万元/吨）：" prop="sewageAdd">
            <el-input v-model="ruleForm.sewageAdd" class="input-length" v-if="showInput=='yes'"></el-input>
            <div v-else>{{ruleForm.sewageAdd}}</div>
          </el-form-item>
          <el-form-item label="研究与试验发展经费支出占主营业务收入比（%）：" prop="researchRate">
            <el-input v-model="ruleForm.researchRate" class="input-length" v-if="showInput=='yes'"></el-input>
            <div v-else>{{ruleForm.researchRate}}</div>
          </el-form-item>
          <el-form-item label="全员劳动生产率数据（万元/人）：" prop="aborProductivity">
            <el-input v-model="ruleForm.aborProductivity" class="input-length" v-if="showInput=='yes'"></el-input>
            <div v-else>{{ruleForm.aborProductivity}}</div>
          </el-form-item>
          <el-form-item label="新产品产值率（%）：" prop="productRate">
            <el-input v-model="ruleForm.productRate" class="input-length" v-if="showInput=='yes'"></el-input>
            <div v-else>{{ruleForm.productRate}}</div>
          </el-form-item>
          <el-form-item label="是否高新技术企业：" prop="isHighTech">
            <el-radio-group v-model="ruleForm.isHighTech" v-if="showInput=='yes'">
              <el-radio label='1' value='1'>是</el-radio>
              <el-radio label='2' value='2'>否</el-radio>
            </el-radio-group>
            <div v-else>
              <p v-if="ruleForm.isHighTech==1">是</p>
              <p v-if="ruleForm.isHighTech==2">否</p>
            </div>
          </el-form-item>
          <el-form-item label="发明专利量：" prop="patentNumber">
            <el-input v-model="ruleForm.patentNumber" class="input-length" v-if="showInput=='yes'"></el-input>
            <div v-else>{{ruleForm.patentNumber}}</div>
          </el-form-item>
          <!-- <el-form-item label="创新平台：（技术中心、设计中心、研发中心）：" prop="staffScale">
                                                                                  <el-input v-model="ruleForm.staffScale" class="input-length" v-if="showInput=='yes'"></el-input>
                                                                                  <div v-else>div</div>
                                                                                </el-form-item> -->
          <el-form-item label="核定用能（吨标煤）：" prop="ratifiedCoal">
            <el-input v-model="ruleForm.ratifiedCoal" class="input-length" v-if="showInput=='yes'"></el-input>
            <div v-else>{{ruleForm.ratifiedCoal}}</div>
          </el-form-item>
          <el-form-item label="实际等价值能耗（吨标煤）：" prop="energyConsume">
            <el-input v-model="ruleForm.energyConsume" class="input-length" v-if="showInput=='yes'"></el-input>
            <div v-else>{{ruleForm.energyConsume}}</div>
          </el-form-item>
          <el-form-item label="水耗（吨）或天然气（万立方米）" prop="waterConsume">
            <el-input v-model="ruleForm.waterConsume" class="input-length" v-if="showInput=='yes'"></el-input>
            <div v-else>{{ruleForm.waterConsume}}</div>
          </el-form-item>
          <el-form-item label="电耗（万千瓦时）" prop="elecConsume">
            <el-input v-model="ruleForm.elecConsume" class="input-length" v-if="showInput=='yes'"></el-input>
            <div v-else>{{ruleForm.elecConsume}}</div>
          </el-form-item>
          <el-form-item label="煤耗（吨标煤）" prop="coalConsume">
            <el-input v-model="ruleForm.coalConsume" class="input-length" v-if="showInput=='yes'"></el-input>
            <div v-else>{{ruleForm.coalConsume}}</div>
          </el-form-item>
          <el-form-item label="增加值能耗（吨标煤/万元）" prop="addedEnergyConsume">
            <el-input v-model="ruleForm.addedEnergyConsume" class="input-length" v-if="showInput=='yes'"></el-input>
            <div v-else>{{ruleForm.addedEnergyConsume}}</div>
          </el-form-item>
          <el-form-item label="申报时间">
            <!-- <el-col :span="4" v-if="showInput=='yes'" style="margin-left:-12px;">
                              <el-form-item prop="declareStartTime" class="input-length">
                                <el-date-picker type="date" placeholder="请选择时间范围起始" v-model="ruleForm.declareStartTime" style="width: 100%;"></el-date-picker>
                              </el-form-item>
                            </el-col>
                            <span v-else>{{declareStartTime}}
                              <span class="line" :span="1">至</span>
                            </span>
                            <el-col :span="1" v-if="showInput=='yes'" style="margin-left:40px;">至
                            </el-col>
                            <el-col :span="11" v-if="showInput=='yes'">
                              <el-form-item prop="declareEndTime" class="input-length" style="margin-left:-25px;">
                                <el-date-picker type="date" placeholder="请选择时间范围结束" v-model="ruleForm.declareEndTime" style="width: 100%;"></el-date-picker>
                              </el-form-item>
                            </el-col>
                            <span v-else>{{declareEndTime}}</span> -->
            <el-date-picker v-model="value" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" v-if="showInput=='yes'">
            </el-date-picker>
            <div v-else>{{value[0]}}<span v-show="value[0]">　至　</span>{{value[1]}}</div>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import api from './../../../plugins/api.js';
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
      value: [],
      radio: '2',
      showInput: 'no',
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
        isHighTech: '0',
        mainBusIncome: '',
        industrialValue: '',
        powerConsume: '',
        approvedDischarge: '',
        sewageAdd: '',
        researchRate: '',
        aborProductivity: '',
        productRate: '',
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
        industrialValue: [
          { validator: checkNumber, trigger: 'blur' }
        ],
        powerConsume: [
          { validator: checkNumber, trigger: 'blur' }
        ],
        approvedDischarge: [
          { validator: checkNumber, trigger: 'blur' }
        ],
        sewageAdd: [
          { validator: checkNumber, trigger: 'blur' }
        ],
        researchRate: [
          { validator: checkNumber, trigger: 'blur' }
        ],
        aborProductivity: [
          { validator: checkNumber, trigger: 'blur' }
        ],
        productRate: [
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
        console.log(this.value);
        console.log(this.value);
        if (this.value === null) {
          this.value = [];
          this.ruleForm.declareStartTime = '';
          this.ruleForm.declareEndTime = '';
        }
        if (valid) {
          if (this.value[0] && this.value[1]) {
            console.log(this.value);
            this.ruleForm.declareStartTime = moment(this.value[0]).format('x');
            this.ruleForm.declareEndTime = moment(this.value[1]).format('x');
          }
          this.ruleForm.isHighTech = Number(this.ruleForm.isHighTech);
          let name = 'admin-company-normData';
          if (this.$route.query.type === 'add') {
            name = 'admin';
          } else {
            this.ruleForm.companyId = this.$route.query.companyId;
            name = 'admin-company-normData';
          }
          api.post('admin/indicator/update', this.ruleForm).then((e) => {
            if (e.status === 200) {
              this.showInput = 'no';
              this.$router.push({
                name: name,
                query: {
                  type: this.$route.query.type,
                  companyId: this.$route.query.companyId,
                  showInput: 'no'
                }
              });
              this.getCompanyDetails();
            } else {
              this.$notify.error({
                title: '指标数据提交失败',
                message: e.msg
              });
            }
          });
        } else {
          this.$notify.error({
            title: '企业指标数据提交失败',
            message: '请检查填写指标数据'
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    modify() {
      this.showInput = 'yes';
    },
    changePage() {
      this.$router.push({
        name: 'admin-company-addCompany',
        query: {
          type: this.$route.query.type,
          companyId: this.$route.query.companyId,
          showInput: this.$route.query.showInput,
          scrollY: this.$route.query.scrollY
        }
      });
    },
    getCompanyDetails() {
      api.get('admin/indicator/detail', { companyId: this.$route.query.companyId }).then((e) => {
        if (e.status === 200) {
          this.ruleForm = e.data;
          if (e.data.isHighTech) {
            this.ruleForm.isHighTech = String(e.data.isHighTech);
          }
          if (e.data.declareStartTime && e.data.declareEndTime) {
            this.value = [];
            this.value.push(moment(e.data.declareStartTime).format('YYYY-MM-DD'), moment(e.data.declareEndTime).format('YYYY-MM-DD'));
          }
        }
      });
    },
    getCompanyInfo() {
      let type = null;
      this.showInput = this.$route.query.showInput;
      type = this.$route.query.type;
      if (type === 'add') {
        this.ruleForm.companyId = this.$route.query.companyId;
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
