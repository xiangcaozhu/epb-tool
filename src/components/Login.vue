<template>
  <div>
    <!-- 行业选择 start-->
    <q-modal minimized class="modal-bg" v-model="getLogin" ref="loginModal" :content-css="{minWidth: '80vw', minHeight: '60vh'}">
      <q-modal-layout>
        <q-toolbar slot="header">
          <q-toolbar-title>
            提交查询
          </q-toolbar-title>
          <q-btn flat @click="loginModal(false)">
            <q-icon name="highlight off" />
          </q-btn>
        </q-toolbar>
        <div>
          <div class="login-wrap">
            <div class="form-wrap">
              <q-field
                icon="stay primary portrait"
                :count="11"
                :error="$v.mobile.$error"
                :helper="helper"
              >
                <q-input type="tel" max-length="11" float-label="请输入手机号码" v-model.number="mobile" @blur="$v.mobile.$touch()" @focus="$v.mobile.$reset()"/>
              </q-field>
              <div class="row">
                <div class="col-8">
                   <q-field
                      icon="message"
                      :error="$v.code.$error"
                      :helper="helperCode"
                    >
                      <q-input type="tel" max-length="11" float-label="请输入短信验证码" v-model.number="code" @blur="$v.code.$touch()" @focus="$v.code.$reset()"/>
                    </q-field>
                </div>
                <div class="col-4">
                  <q-btn :disable="codeDisable" @click="getCode" :color="codeDisable ? 'faded' : 'primary'" small>获取验证码</q-btn>
                </div>
              </div>
            </div>
            <q-btn :disable="submitDisable" :color="codeDisable ? 'faded' : 'primary'" @click="checkCodeLogin()" color="primary" big>
            立即提交查询
            </q-btn>
          </div>
        </div>
      </q-modal-layout>
    </q-modal>
    <!-- 行业选择 end-->
  </div>
</template>

<script>
import {
  Toast,
  Ripple,
  QBtn,
  QIcon,
  QModal,
  QModalLayout,
  QToolbar,
  QToolbarTitle,
  QInput,
  QField
} from 'quasar'
import { mapGetters, mapMutations } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import api from 'api/index'
export default {
  name: 'login',
  components: {
    Toast,
    Ripple,
    QBtn,
    QIcon,
    QModal,
    QModalLayout,
    QToolbar,
    QToolbarTitle,
    QInput,
    QField
  },
  data () {
    return {
      mobile: '',
      helper: '',
      code: '',
      helperCode: '',
      codeDisable: false,
      submitDisable: false
    }
  },
  props: ['formData'],
  validations: {
    mobile: {
      required
    },
    code: {
      required
    }
  },
  computed: {
    ...mapGetters([
      'getLogin',
      'getAccount',
      'isLoading',
      'getSignUp'
    ])
  },
  methods: {
    ...mapMutations(['loginModal', 'isSignUp', 'saveAccount']),
    loginSubmit () {
      this.$v.mobile.$touch()
      if (!this.$v.mobile.required) {
        this.helper = '手机号码不能为空！'
        return
      } else if (!/^1[3|5|7|8][0-9]{9}$/.test(this.mobile)) {
        this.helper = '请输入11位有效手机号码！'
        return
      } else if (!this.$v.code.required) {
        this.helperCode = '验证码不能为空！'
        return
      } else if (!this.$v.code.required) {
        this.helperCode = '验证码不能为空！'
        return
      }
      api.login(this.mobile, this.code).then(res => {
        if (res.data.code === 0) {
          Toast.create('提交成功!查询中……')
          this.saveAccount({mobile: this.mobile})
          if (this.formData.next === 'giveNameList') {
            this.$router.push({ path: this.formData.next, name: this.formData.next, query: {city: this.formData.city, industry: this.formData.industry} })
          } else if (this.formData.next === 'checkNameResult') {
            this.$router.push({ path: this.formData.next, name: this.formData.next, query: {city: this.formData.city, name: this.formData.name, industry: this.formData.industry, from: this.formData.from} })
          } else if (this.formData.next === 'manageRangeList') {
            this.$router.push({ path: this.formData.next, name: this.formData.next, query: {city: this.formData.city, name: this.formData.name, industry: this.formData.industry, from: this.formData.from} })
          }
          this.isSignUp(true)
          this.loginModal(false)
        } else {
          Toast.create('登陆失败！')
        }
      })
    },
    checkCodeLogin () {
      this.submitDisable = true
      this.$v.mobile.$touch()
      if (!this.$v.mobile.required) {
        this.helper = '手机号码不能为空！'
        this.submitDisable = false
        return
      } else if (!/^1[3|5|7|8][0-9]{9}$/.test(this.mobile)) {
        this.helper = '请输入11位有效手机号码！'
        this.submitDisable = false
        return
      } else if (!this.$v.code.required) {
        this.helperCode = '验证码不能为空！'
        this.submitDisable = false
        return
      } else if (!this.$v.code.required) {
        this.helperCode = '验证码不能为空！'
        this.submitDisable = false
        return
      }
      api.checkCodeLogin(this.mobile, this.code).then(res => {
        if (res.data.code === 0) {
          Toast.create('提交成功!查询中……')
          this.saveAccount({mobile: this.mobile})
          this.submitDisable = false
          if (this.formData.next === 'giveNameList') {
            this.$router.push({ path: this.formData.next, name: this.formData.next, query: {city: this.formData.city, industry: this.formData.industry} })
          } else if (this.formData.next === 'checkNameResult') {
            this.$router.push({ path: this.formData.next, name: this.formData.next, query: {city: this.formData.city, name: this.formData.name, industry: this.formData.industry, from: this.formData.from} })
          } else if (this.formData.next === 'manageRangeList') {
            this.$router.push({ path: this.formData.next, name: this.formData.next, query: {city: this.formData.city, name: this.formData.name, industry: this.formData.industry, from: this.formData.from} })
          }
          this.isSignUp(true)
          this.loginModal(false)
        } else {
          this.submitDisable = false
          Toast.create(res.data.data.message)
        }
      })
    },
    getCode () {
      this.codeDisable = true
      this.$v.mobile.$touch()
      if (!this.$v.mobile.required) {
        this.helper = '手机号码不能为空！'
        this.codeDisable = false
        return
      } else if (!/^1[3|5|7|8][0-9]{9}$/.test(this.mobile)) {
        this.helper = '请输入11位有效手机号码！'
        this.codeDisable = false
        return
      }
      api.codeSend(this.mobile).then(res => {
        if (res.data.code === 0) {
          Toast.create(res.data.data.message)
          this.codeDisable = false
        }
      })
    }
    // loginOut () {
    //   this.saveAccount({
    //     mobile: ''
    //   })
    //   this.isSignUp(false)
    //   this.loginModal(false)
    //   Cookies.remove('mobile')
    //   Cookies.remove('m')
    //   this.$router.push({ path: '/homeList', name: 'homeList' })
    // }
  }
}
</script>

<style lang="stylus" scoped>
.q-modal-layout-content
  background-color: #f5f5f5!important;
  .login-title
    font-size:40px;
    color:#027be3;
    font-family:'微软雅黑';
    text-align:center;
    font-weight:bold;
    margin:40px auto;
  .login-wrap,.has-login
    // margin:10px;
    padding:10px;
    .form-wrap
      padding:10px 0;
      background-color: #fff;
      border-radius:5px;
    button
      width: 100%;
      margin-top:20px;
    .has-mobile
      text-align:center;
      font-size:30px;
      font-weight:bold;
      color:orange;
</style>

