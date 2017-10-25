<template>
  <div>
    <!-- 起名查询 start -->
    <div class="query-warp bg-light-blue-9">
      <div class="query-header">
        <h2 class="title">公司核名</h2>
        <p class="des">输入名字，测试工商通过率</p>
      </div>
      <form class="query-form">
        <div class="form-wrap">
          <q-input v-model="formData.city" @click="searchCityInput(true)" float-label="城市" :error="$v.formData.city.$error" placeholder=" 如：厦门" readonly/>
          <q-input v-model="formData.name" float-label="字号" :error="$v.formData.name.$error" placeholder=" 如：恒安"/>
          <q-input v-model="formData.industry" @click.native="searchIndustryInput(true)" float-label="行业" :error="$v.formData.industry.$error" placeholder=" 如：网络科技" readonly/>
          <q-select
            radio
            float-label="类型"
            v-model="formData.from"
            :options="fromOptions"
          />
        </div>
        <q-btn big :disable="submitDisable" color="orange"  @click.prevent="checkNameSubmit" >
          马上测试
        </q-btn>
      </form>
    </div>
    <!-- 起名查询 end -->
    <search-city @getSelectedCity="getSelectedCity"></search-city>
    <search-industry @getSelectedIndustry="getSelectedIndustry"></search-industry>
    <login :formData ="formData"></login>
  </div>
</template>

<script>
import {
  QInput,
  QBtn,
  QIcon,
  QSelect,
  QField,
  Toast,
  QToolbar,
  QToolbarTitle
} from 'quasar'
// 导出常用的数据对象
import SearchCity from '%/SearchCity'
import SearchIndustry from '%/SearchIndustry'
import Login from '%/Login'
import { mapMutations, mapGetters } from 'vuex'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'giveName',
  components: {
    QInput,
    QBtn,
    QIcon,
    QSelect,
    QField,
    QToolbar,
    QToolbarTitle,
    SearchCity,
    SearchIndustry,
    Login
  },
  data () {
    return {
      isMenu: true,
      formData: {
        city: '',
        industry: '',
        name: '',
        from: '有限公司',
        next: 'checkNameResult'
      },
      submitDisable: false,
      fromOptions: [
        {
          label: '有限公司',
          value: '有限公司'
        },
        {
          label: '合伙企业',
          value: '合伙企业'
        }
      ]
    }
  },
  validations: {
    formData: {
      city: { required },
      industry: { required },
      name: { required },
      from: { required }
    }
  },
  computed: {
    ...mapGetters([
      'getSearchCity',
      'getSearchIndustry',
      'getSignUp'
    ])
  },
  created () {
    this.setMenuIcon(true)
    this.headBar({
      title: '公司核名',
      subTitle: '查询入口'
    })
  },
  methods: {
    ...mapMutations([
      'searchCityModal',
      'searchIndustryModal',
      'loginModal',
      'headBar',
      'setMenuIcon'
    ]),
    getSelectedCity (query) {
      this.formData.city = query.label
    },
    getSelectedIndustry (query) {
      this.formData.industry = query.industry
    },
    searchCityInput () {
      this.$v.formData.city.$reset()
      this.$v.formData.industry.$reset()
      document.activeElement.blur()
      this.searchCityModal(true)
    },
    searchIndustryInput () {
      this.$v.formData.city.$reset()
      this.$v.formData.industry.$reset()
      document.activeElement.blur()
      this.searchIndustryModal(true)
    },
    // 如果没有登录跳转到登陆页，如果已经登录，可以查询数据
    checkNameSubmit () {
      this.submitDisable = true
      this.$v.formData.city.$touch()
      this.$v.formData.industry.$touch()
      this.$v.formData.name.$touch()
      this.$v.formData.from.$touch()
      if (this.$v.formData.city.$error) {
        Toast.create('城市是必选项！')
        setTimeout(() => {
          this.submitDisable = false
        }, 2000)
        return
      } else if (this.$v.formData.name.$error) {
        Toast.create('企业字号是必选项！')
        setTimeout(() => {
          this.submitDisable = false
        }, 2000)
        return
      } else if (this.$v.formData.industry.$error) {
        Toast.create('行业是必选项！')
        setTimeout(() => {
          this.submitDisable = false
        }, 2000)
        return
      } else if (this.$v.formData.from.$error) {
        Toast.create('公司类型是必选项！')
        setTimeout(() => {
          this.submitDisable = false
        }, 2000)
        return
      }
      if (!this.getSignUp) {
        // let _this = this
        // Dialog.create({
        //   title: '提示：',
        //   message: '您还未登录，现在去登录？',
        //   buttons: [
        //     {
        //       label: '取消',
        //       handler () {
        //         Toast.create('取消登录...')
        //       }
        //     },
        //     {
        //       label: '去登录',
        //       handler () {
        //         _this.loginModal(true)
        //         // _this.$router.push({ path: '/login', name: 'login' })
        //       }
        //     }
        //   ]
        // })
        this.submitDisable = false
        this.loginModal(true)
        return
      }
      this.submitDisable = false
      this.$router.push({ path: '/checkNameResult', name: 'checkNameResult', query: {city: this.formData.city, name: this.formData.name, industry: this.formData.industry, from: this.formData.from} })
    }
  },
  mounted () {
    this.$nextTick(() => {
    })
  }

}
</script>

<style lang="stylus" scoped>
  .query-warp
    padding:10px;
    .query-header
      text-align:center;
    .title
      margin-top:40px;
      font-size:30px;
      font-weight:bold;
      font-family:'微软雅黑';
      color:#fff;
    .des
      color:#fff;
      margin-bottom:1rem;
    .query-form
      margin:10px 10px 50px;
      .form-wrap
        padding:2px 10px 10px;
        background-color:#fff;
        border-radius:5px;
      input
        -webkit-user-select:none;
        -webkit-touch-callout:none;
      button
        margin-top:20px; 
        width:100%;
        border-radius:5px;
         
</style>
