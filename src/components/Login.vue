<template>
  <div>
    <!-- 行业选择 start-->
    <q-modal class="modal-bg" v-model="getLogin" :content-css="{minWidth: '80vw', minHeight: '80vh', boxShadow: 'none'}">
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
                :helper="helper"
                :error="$v.mobile.$error"
              >
                <q-input type="tel" :error="$v.mobile.$error" max-length="11" float-label="请输入手机号码" v-model.number="mobile" @blur="$v.mobile.$touch()" @focus="$v.mobile.$reset()"/>
              </q-field>
              <div class="row">
                <div class="col-8">
                   <q-field
                      icon="message"
                      :error="$v.code.$error"
                      :helper="helperCode"
                    >
                      <q-input type="tel" :error="$v.code.$error" max-length="11" float-label="请输入短信验证码" v-model.number="code" @blur="$v.code.$touch()" @focus="$v.code.$reset()"/>
                    </q-field>
                </div>
                <div class="col-4">
                  <q-btn :disable="codeDisable" @click.prevent="getCode" :color="codeDisable ? 'faded' : 'primary'" small>{{time}}</q-btn>
                </div>
              </div>
            </div>
            <q-btn :disable="submitDisable" :color="codeDisable ? 'faded' : 'primary'" @click.prevent="checkCodeLogin()" color="primary" big>
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
      submitDisable: false,
      time: '获取验证码'
    }
  },
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
      'getSignUp',
      'getFormData'
    ])
  },
  methods: {
    ...mapMutations(['loginModal', 'isSignUp', 'saveAccount']),
    loginSubmit () {
      this.$v.mobile.$touch()
      document.activeElement.blur()
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
          this.isSignUp(true)
          this.loginModal(false)
          if (this.getFormData.next === 'giveNameList') {
            this.$router.push({ path: this.getFormData.next, name: this.getFormData.next, query: {city: this.getFormData.city, industry: this.getFormData.industry} })
          } else if (this.getFormData.next === 'checkNameResult') {
            this.$router.push({ path: this.getFormData.next, name: this.getFormData.next, query: {city: this.getFormData.city, name: this.getFormData.name, industry: this.getFormData.industry, from: this.getFormData.from} })
          } else if (this.getFormData.next === 'manageRangeList') {
            this.$router.push({ path: this.getFormData.next, name: this.getFormData.next, query: {city: this.getFormData.city, name: this.getFormData.name, industry: this.getFormData.industry, from: this.getFormData.from} })
          }
        } else {
          Toast.create('登陆失败！')
        }
      })
    },
    checkCodeLogin () {
      this.submitDisable = true
      this.$v.mobile.$touch()
      document.activeElement.blur()
      if (!this.$v.mobile.required) {
        this.helper = '手机号码不能为空！'
        setTimeout(() => {
          this.submitDisable = false
        }, 2000)
        return
      } else if (!/^1[3|5|7|8][0-9]{9}$/.test(this.mobile)) {
        this.helper = '请输入11位有效手机号码！'
        setTimeout(() => {
          this.submitDisable = false
        }, 2000)
        return
      } else if (!this.$v.code.required) {
        this.helperCode = '验证码不能为空！'
        setTimeout(() => {
          this.submitDisable = false
        }, 2000)
        return
      } else if (!this.$v.code.required) {
        this.helperCode = '验证码不能为空！'
        setTimeout(() => {
          this.submitDisable = false
        }, 2000)
        return
      }
      api.checkCodeLogin(this.mobile, this.code).then(res => {
        if (res.data.code === 0) {
          this.saveAccount({mobile: this.mobile})
          this.submitDisable = false
          this.isSignUp(true)
          this.loginModal(false)
          Toast.create('提交成功!查询中……')
          console.log(this.getFormData.next)
          if (this.getFormData.next === 'giveNameList') {
            this.$router.push({ path: this.getFormData.next, name: this.getFormData.next, query: {city: this.getFormData.city, industry: this.getFormData.industry} })
          } else if (this.getFormData.next === 'checkNameResult') {
            this.$router.push({ path: this.getFormData.next, name: this.getFormData.next, query: {city: this.getFormData.city, name: this.getFormData.name, industry: this.getFormData.industry, from: this.getFormData.from} })
          } else if (this.getFormData.next === 'manageRangeList') {
            this.$router.push({ path: this.getFormData.next, name: this.getFormData.next, query: {city: this.getFormData.city, name: this.getFormData.name, industry: this.getFormData.industry, from: this.getFormData.from} })
          }
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
          this.countDown(res.data.data.interval)
        }
      }).catch(e => {
        this.codeDisable = false
      })
    },
    // 倒计时
    countDown (second, callback) {
      // 使用闭包封装一个内部倒计时变量
      let timer = second
      // 保存传进了的dom元素
      let _this = this
      return (function countDownInside () {
        // 自减
        --timer
        // 假如倒计时还没有结束那么继续执行该判断
        if (timer > 0 && timer < second) {
          // 设置倒计时字符串
          _this.time = (timer + 's')
          _this.codeDisable = true
          // 递归调用
          setTimeout(function () {
            // 继续调用闭包
            countDownInside()
          }, 1000)
          // 实时返回时间，供外面判断倒计时是否结束
          if (callback) {
            callback(timer, second)
          }
          return false
        } else {
          // 重新设置时间
          timer = second
          // 字符串变为重新发送
          _this.time = ('重新获取')
          // 允许按钮点击
          _this.codeDisable = false
          // 实时返回时间，供外面判断倒计时是否结束
          if (callback) {
            callback(timer, second)
          }
          return false
        }
      })()
    }
    // loginOut () {
    //   this.saveAccount({
    //     mobile: ''
    //   })
    //   this.isSignUp(false)
    //   this.loginModal(false)
    //   Cookies.remove('mobile')
    //   Cookies.remove('m')
    //   this.$router.push({ path: '/', name: 'home' })
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

