<template>
  <div class='add-company'>
    <el-radio-group v-model="radio" fill="#f2ba55" @change="changePage">
      <el-radio-button label='1'>基本信息</el-radio-button>
      <el-radio-button label='2' v-if="this.$route.query.companyId=='null'" disabled> 指标数据</el-radio-button>
      <el-radio-button label='2' v-else> 指标数据</el-radio-button>
    </el-radio-group>
    <el-row :gutter="24">
      <el-col :span="4" :offset="20">
        <el-button type="primary" class="save" v-if="showInput=='yes'" @click="submitForm('ruleForm')">保存</el-button>
        <el-button type="primary" class="save" v-else @click="modify()">修改</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="21" :offset="3">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="180px" class="demo-ruleForm" label-position="left">
          <el-form-item label="企业照片：" prop="imageUrl">
            <div style="width:260px;height:174px;overflow: hidden;" v-if="this.img!=null"><img :src="ruleForm.imageUrl" alt="" style="max-width:100%;" v-if="this.img==null">
              <img :src="img" v-else alt="" style="max-width:100%;"></div>
            <div v-else>
              <div style="width:260px;height:174px;overflow: hidden;" v-if="this.$route.query.type!='add'"><img :src="ruleForm.imageUrl" alt="" style="max-width:100%;"></div>
            </div>
            <el-upload action="/api/upload/companyimg" :show-file-list="false" :on-success="handleSuccess" :before-upload="beforeAvatarUpload" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" v-if="showInput=='yes'">
              <el-button size="small" type="primary">点击上传</el-button>
              <div class="el-upload__tip" slot="tip">说明：比例大小：3：2，大小200KB以内；格式：JPG、PNG（建议最小600*400尺寸）</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="企业名称：" prop="name">
            <el-input v-model="ruleForm.name" class="input-length" v-if="showInput=='yes'"></el-input>
            <div v-else>{{ruleForm.name}}</div>
          </el-form-item>
          <!--<el-form-item label="所属乡镇：" prop="townId">
                                                                        <el-cascader :options="options2" @active-item-change="handleItemChange" :props="props" v-if="showInput=='yes'" @change="handleChange"></el-cascader>
                                                                        <div v-else>div</div>
                                                                      </el-form-item>-->
          <el-form-item label="所属乡镇：" prop="townId">
            <el-select v-model="ruleForm.townId" placeholder="请选择乡镇" v-if="showInput=='yes'" @change="selectTownId">
              <el-option :label="item.name" :value="item.id" v-for="item in townShip" :key="item.id"></el-option>
            </el-select>
            <div v-else>{{ruleForm.townName}}</div>
          </el-form-item>
          <el-form-item label="所属村（社区）：" prop="villageId">
            <el-select v-model="ruleForm.villageId" placeholder="请选择村（社区）" v-if="showInput=='yes'">
              <el-option :label="item.name" :value="item.id" v-for="item in village" :key="item.id"></el-option>
            </el-select>
            <div v-else>{{ruleForm.villageName}}</div>
          </el-form-item>
          <el-form-item label="详细地址：" prop="address">
            <el-input v-model="ruleForm.address" class="input-length" v-if="showInput=='yes'"></el-input>
            <div v-else>{{ruleForm.address}}</div>
          </el-form-item>
          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="经纬度：" prop="lng">
                经度
                <el-input v-model="ruleForm.lng" style="width:185px;" v-if="showInput=='yes'" placeholder="请输入经度"></el-input>
                <span v-else>{{ruleForm.lng}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item prop="lat">
                <span style="">纬度 </span>
                <el-input v-model="ruleForm.lat" style="width:185px;" v-if="showInput=='yes'" placeholder="请输入纬度"></el-input>
                <span v-else>{{ruleForm.lat}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- <el-form-item label="行业代码：" prop="tradeId">
                                    <el-input v-model="ruleForm.tradeId" class="input-length" v-if="showInput=='yes'"></el-input>
                                    <div v-else>div</div>
                                  </el-form-item>-->
          <el-form-item label="所属行业：" prop="tradeId">
            <el-select v-model="ruleForm.tradeId" placeholder="请选择所属行业" v-if="showInput=='yes'">
              <el-option :label="item.tradeName" :value="item.id" v-for="item in industry" :key="item.id"></el-option>
            </el-select>
            <div v-else>{{ruleForm.tradeName}}</div>
          </el-form-item>
          <el-form-item label="主要核心产品：" prop="productName">
            <el-input v-model="ruleForm.productName" class="input-length" v-if="showInput=='yes'"></el-input>
            <div v-else>{{ruleForm.productName}}</div>
          </el-form-item>
          <el-form-item label="规上（规下）：" prop="scaleUp">
            <el-radio-group v-model="ruleForm.scaleUp" v-if="showInput=='yes'">
              <el-radio label="1" value="1">规上</el-radio>
              <el-radio label="2" value="2">规下</el-radio>
            </el-radio-group>
            <div v-else>
              <p v-if="ruleForm.scaleUp==1">规上</p>
              <p v-if="ruleForm.scaleUp==2">规下</p>
            </div>
          </el-form-item>
          <el-form-item label="主要负责人：" prop="corporationName">
            <el-input v-model="ruleForm.corporationName" class="input-length" v-if="showInput=='yes'"></el-input>
            <div v-else>{{ruleForm.corporationName}}</div>
          </el-form-item>
          <el-form-item label="联系电话：" prop="corporationPhone">
            <el-input v-model="ruleForm.corporationPhone" class="input-length" v-if="showInput=='yes'"></el-input>
            <div v-else>{{ruleForm.corporationPhone}}</div>
          </el-form-item>
          <el-form-item label="是否“两代表一委员”：" prop="isCommittee">
            <el-radio-group v-model="ruleForm.isCommittee" v-if="showInput=='yes'">
              <el-radio label="1" value="1">是</el-radio>
              <el-radio label="2" value="2">否</el-radio>
            </el-radio-group>
            <div v-else>
              <p v-if="ruleForm.isCommittee==1">是</p>
              <p v-if="ruleForm.isCommittee==2">否</p>
            </div>
          </el-form-item>
          <el-form-item label="具体负责人：" prop="leaderName">
            <el-input v-model="ruleForm.leaderName" class="input-length" v-if="showInput=='yes'"></el-input>
            <div v-else>{{ruleForm.leaderName}}</div>
          </el-form-item>
          <el-form-item label="联系电话：" prop="leaderPhone">
            <el-input v-model="ruleForm.leaderPhone" class="input-length" v-if="showInput=='yes'"></el-input>
            <div v-else>{{ruleForm.leaderPhone}}</div>
          </el-form-item>
          <el-form-item label="企业职工人数： " prop="staffScale">
            <el-input v-model="ruleForm.staffScale" class="input-length" v-if="showInput=='yes'"></el-input>
            <span v-else>{{ruleForm.staffScale}}</span>人
          </el-form-item>
          <el-form-item label="企业职工平均工资：" prop="averageSalary">
            <el-input v-model="ruleForm.averageSalary" class="input-length" v-if="showInput=='yes'" placeholder="平均薪资保留两位小数"></el-input>
            <span v-else>{{ruleForm.averageSalary}}</span>元
          </el-form-item>
          <el-form-item label="党组织名称：" prop="partyName">
            <el-input v-model="ruleForm.partyName" class="input-length" v-if="showInput=='yes'"></el-input>
            <div v-else>{{ruleForm.partyName}}</div>
          </el-form-item>
          <el-form-item label="党员人数： " prop="partyMemberNum">
            <el-input v-model="ruleForm.partyMemberNum" class="input-length" v-if="showInput=='yes'"></el-input>
            <div v-else>{{ruleForm.partyMemberNum}}</div>
          </el-form-item>
          <el-form-item label="每月电费：" prop="monthElecBill">
            <el-input v-model="ruleForm.monthElecBill" class="input-length" v-if="showInput=='yes'"></el-input>
            <div v-else>{{ruleForm.monthElecBill}}</div>
          </el-form-item>
          <el-form-item label="每月水费：" prop="monthWaterBill">
            <el-input v-model="ruleForm.monthWaterBill" class="input-length" v-if="showInput=='yes'"></el-input>
            <div v-else>{{ruleForm.monthWaterBill}}</div>
          </el-form-item>
          <el-form-item label="企业简介：" prop="companyProfile">
            <el-input type="textarea" v-model="ruleForm.companyProfile" style="width:50%" v-if="showInput=='yes'"></el-input>
            <div v-else>{{ruleForm.companyProfile}}</div>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import api from './../../../plugins/api.js';
import {
  mapState
} from 'vuex';
export default {
  scrollToTop: true,
  data() {
    var checkNumber = (rule, value, callback) => {
      if (!value) {
        return callback();
      } else {
        if (!Number.isInteger(Number(value))) {
          callback(new Error('请输入数字值'));
        } else {
          callback();
        }
      }
    };
    var averageSalary = (rule, value, callback) => {
      if (!value) {
        return callback();
      } else {
        if (!/^[0-9.]+$/.test(value)) {
          callback(new Error('请输入正确薪资'));
        } else {
          callback();
        }
      }
    };
    var lat = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入纬度'));
      } else {
        if (!/^[0-9.]+$/.test(value)) {
          callback(new Error('请输入正确纬度'));
        } else {
          callback();
        }
      }
    };
    var lng = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入经度'));
      } else {
        if (!/^[0-9.]+$/.test(value)) {
          callback(new Error('请输入正确经度'));
        } else {
          callback();
        }
      }
    };
    return {
      radio: '1',
      showInput: 'no',
      village: null,
      img: null,
      ruleForm: {
        address: '',
        averageSalary: '',
        companyProfile: '',
        corporationName: '',
        corporationId: '',
        corporationPhone: '',
        id: '',
        imageUrl: '',
        imageUrlId: '',
        isCommittee: '',
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
          { required: true, validator: lng, trigger: 'blur' }
        ],
        lat: [
          { required: true, validator: lat, trigger: 'blur' }
        ],
        tradeId: [
          { required: true, message: '请选择所属行业', trigger: 'change' }
        ],
        corporationPhone: [
          { validator: checkNumber, trigger: 'blur' }
        ],
        staffScale: [
          { validator: checkNumber, trigger: 'blur' }
        ],
        averageSalary: [
          { validator: averageSalary, trigger: 'blur' }
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
      // console.log(file, fileList);
    },
    handlePictureCardPreview(response, file, fileList) {
      if (response.status === 200) {
        this.img = response.data.imgUrl;
        this.ruleForm.imageUrl = response.data.imgUrl;
      } else {
        this.$message.error('企业图片上传失败！');
      }
    },
    beforeAvatarUpload(file) {
      var isIMG = null;
      if (file.type === 'image/jpeg' || file.type === 'image/png') {
        isIMG = true;
      } else {
        isIMG = false;
      }
      const isLt200 = file.size / 1024 < 200;
      if (!isIMG) {
        this.$message.error('上传图片只能是 JPG/PNG 格式!');
      }
      if (!isLt200) {
        this.$message.error('上传图片大小不能超过 200KB!');
      }
      return isIMG && isLt200;
    },
    handleSuccess(response, file, fileList) {
      this.img = response.data.imgUrl;
      this.ruleForm.imageUrl = response.data.imgUrl;
      this.$message({
        message: '企业图片上传成功！',
        type: 'success'
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let name = null;
          let showInput = 'yes';
          if (this.$route.query.type === 'add') {
            name = 'admin-company-normData';
          } else {
            this.ruleForm.companyId = this.$route.query.companyId;
            name = 'admin-company-addCompany';
            showInput = 'no';
          }
          api.post('admin/company/update', this.ruleForm).then((e) => {
            if (e.status === 200) {
              this.showInput = 'no';
              this.$router.push({
                name: name,
                query: {
                  type: this.$route.query.type,
                  companyId: e.data,
                  showInput: showInput
                }
              });
            } else {
              this.$notify.error({
                title: '企业信息提交失败',
                message: e.msg
              });
            }
          });
        } else {
          this.$notify.error({
            title: '企业信息提交失败',
            message: '请检查填写数据'
          });
          return false;
        }
      });
    },
    // 选择选哪个镇触发
    selectTownId(val) {
      if (this.$route.query.type === 'add') {
        this.ruleForm.villageId = null;
      }
      api.get('common/getvillage', { townId: val }).then((e) => {
        this.village = e.data;
      }).catch(err => {
        this.$notify.error({
          title: '错误',
          message: err.msg
        });
      });
    },
    changePage() {
      this.$router.push({
        name: 'admin-company-normData',
        query: {
          type: this.$route.query.type,
          companyId: this.$route.query.companyId,
          showInput: this.$route.query.showInput
        }
      });
    },
    handleChange(value) {
      // console.log(value);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    modify() {
      this.showInput = 'yes';
      // console.log(this.ruleForm.imageUrl);
    },
    getCompanyDetails() {
      api.get('admin/company/detail', { id: this.$route.query.companyId }).then((e) => {
        this.ruleForm = e.data;
        this.img = e.data.imageUrl;
        this.ruleForm.isCommittee = String(e.data.isCommittee);
        this.ruleForm.scaleUp = String(e.data.scaleUp);
        this.selectTownId(this.ruleForm.townId);
      }).catch(err => {
        this.$notify.error({
          title: '获取详情错误',
          message: err.msg
        });
      });
    },
    getCompanyInfo() {
      // console.log(typeof (this.$route.query.showInput));
      this.showInput = this.$route.query.showInput;
      if (this.$route.query.companyId === 'null') {
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
