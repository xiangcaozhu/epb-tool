<template>
  <div>
    <!-- 起名查询 start -->
    <div class="query-warp bg-light-blue-9">
      <div class="query-header">
        <h2 class="title">公司起名系统</h2>
        <p class="des">只推荐工商通过率高的好名字</p>
      </div>
      <form class="query-form">
        <div class="form-wrap">
          <q-input v-model="formData.city" float-label="城市" placeholder=" 如：厦门" />
          <q-input v-model="formData.industry" float-label="行业" placeholder=" 如：网络科技" />
        </div>
        <q-btn rounded loader class="full-width" color="orange" big @click.native="giveNameSubmit">
          推荐名字
          <span slot="loading">推荐中...</span>
        </q-btn>
      </form>
    </div>
    <!-- 起名查询 end -->
    <q-toolbar slot="footer">
      <q-toolbar-title>
        Footer
      </q-toolbar-title>
    </q-toolbar>
  </div>
</template>

<script>
import {
  Cookies,
  QInput,
  QBtn,
  QIcon,
  QSelect,
  QField,
  Dialog,
  Toast,
  QToolbar,
  QToolbarTitle
} from 'quasar'
// 导出常用的数据对象
import localData from 'static/localData'
export default {
  name: 'giveName',
  components: {
    QInput,
    QBtn,
    QIcon,
    QSelect,
    QField,
    QToolbar,
    QToolbarTitle
  },
  data () {
    return {
      isMenu: true,
      formData: {
        city: '',
        industry: ''
      },
      hotCity: localData.hotCity,
      industrys: localData.industrys
    }
  },
  methods: {
    // 如果没有登录跳转到登陆页，如果已经登录，可以查询数据
    giveNameSubmit () {
      if (!Cookies.get('m')) {
        let _this = this
        Dialog.create({
          title: '提示：',
          message: '您还未登录，现在去登录？',
          buttons: [
            {
              label: '取消',
              handler () {
                Toast.create('取消登录...')
              }
            },
            {
              label: '去登录',
              handler () {
                _this.$router.push({ path: '/login', name: 'login' })
              }
            }
          ]
        })
        return
      }
      this.$router.push({ path: '/giveNameList', name: 'giveNameList', query: {city: this.formData.city, industry: this.formData.industry} })
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
      margin-bottom:2rem;
    .query-form
      margin:10px 10px 50px;
      .form-wrap
        padding:2px 10px 10px;
        background-color:#fff;
        border-radius:5px;
      button
        margin-top:20px;  
</style>
