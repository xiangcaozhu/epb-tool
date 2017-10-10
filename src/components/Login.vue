<template>
  <div>
    <!-- 行业选择 start-->
    <q-modal class="modal-bg" v-model="getLogin" ref="loginModal" :content-css="{minWidth: '80vw', minHeight: '80vh'}">
      <q-modal-layout>
        <q-toolbar slot="header">
          <q-btn flat @click="loginModal(false)">
            <q-icon name="keyboard_arrow_left" />
          </q-btn>
          <q-toolbar-title>
            登录
          </q-toolbar-title>
        </q-toolbar>
        <div class="layout-padding">
          <h1 class="login-title">免注册登陆</h1>
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
            </div>
            <q-btn @click="loginSubmit()" color="primary" big>
            登录
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
      helper: ''
    }
  },
  validations: {
    mobile: {
      required
    }
  },
  computed: {
    ...mapGetters([
      'getLogin'
    ])
  },
  methods: {
    ...mapMutations(['loginModal']),
    loginSubmit () {
      this.$v.mobile.$touch()
      if (!this.$v.mobile.required) {
        this.helper = '手机号码不能为空！'
        return
      } else if (!/^1[3|5|7|8][0-9]{9}$/.test(this.mobile)) {
        this.helper = '请输入11位有效手机号码！'
        return
      }
      api.login(this.mobile).then(res => {
        console.log(res)
        if (res.data.code === 0) {
          Toast.create('登陆成功！马上去查询试试')
          this.loginModal(false)
        } else {
          Toast.create('登陆失败！')
        }
      })
    }
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
  .login-wrap
    margin:10px;
    padding:10px;
    .form-wrap
      padding:10px 0;
      background-color: #fff;
      border-radius:5px;
    button
      width: 100%;
      margin-top:20px;
</style>

