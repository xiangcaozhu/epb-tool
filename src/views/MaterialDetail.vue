<template>
  <div>
    <div class="wrap-content">
      <q-transition
        appear
        group
        enter="fadeIn"
        leave="fadeOut"
      >
        <div class="explain" key="explain" v-show="showReturnData">
          <p><strong>文件用途：</strong>{{detailData.usefor}}</p>
          <p><strong>使用解读：</strong></p>
        </div>
        <div class="descrip" v-html="detailData.description" key="explain" v-show="showReturnData"></div>
        <div class="" key="explain" v-show="showReturnData">
          <div class="wrap-images" v-for="(item, index) in detailData.picList">
            <img :src="item" :alt="detailData.title">
          </div>
        </div>
      </q-transition>
    </div>
    <div class="row tabs tabs-bottom">
      <div class="col item" @click="$router.go(-1)"><q-icon color="primary" name="reply" size="20px"/>返回</div>
      <div class="col item"><a href="tel:13328762329" class="text-grey-8"><q-icon color="primary" name="phone" size="20px"/>电话咨询</a></div>
      <div class="col item strong"  @click="downloadMaterial"><q-icon color="white" name="file download" size="20px"/>立即下载</div>
    </div>
  </div>
</template>

<script>
import {
  Loading,
  Toast,
  QBtn,
  QIcon,
  QSpinnerIos,
  QTransition
} from 'quasar'

import api from 'api/index'
import { mapGetters, mapMutations } from 'vuex'
import 'quasar-extras/animate/fadeIn.css'
import 'quasar-extras/animate/fadeOut.css'
export default {
  name: 'index',
  components: {
    QBtn,
    QIcon,
    QSpinnerIos,
    QTransition
  },
  data () {
    return {
      showReturnData: false,
      detailData: {}
    }
  },
  created () {
    this.getMaterialIdDetail()
    this.setMenuIcon(false)
  },
  computed: {
    ...mapGetters(['getSignUp'])
  },
  methods: {
    ...mapMutations(['setMenuIcon', 'headBar', 'loginModal']),
    getMaterialIdDetail () {
      Loading.show({
        spinner: QSpinnerIos,
        message: '加载中……',
        messageColor: 'white',
        spinnerSize: 50,
        spinnerColor: 'white'
      })
      api.getMaterialIdMsg(this.$route.params.id).then(res => {
        if (res.data.code === 0) {
          this.headBar({
            title: res.data.data.title,
            subTitle: '文档下载'
          })
          this.detailData = res.data.data
          setTimeout(() => {
            this.showReturnData = true
            Loading.hide()
          }, 1500)
        }
      })
    },
    downloadMaterial () {
      if (!this.getSignUp) {
        Toast.create('您还没有登录，请先去登录')
        setTimeout(() => {
          this.loginModal(true)
        }, 1000)
        return false
      }
      if (this.$route.params.id) {
        api.getMaterialIdDown().then(res => {
          if (res.data) {
            window.location.href = res.data
            return false
          }
          Toast.create('该文档暂时不提供下载！')
        })
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
    })
  }
}
</script>

<style lang="stylus">
.tabs
  position:fixed;
  width:100%;
  height:50px;
  line-height:50px;
  text-align:center;
  background-color #f5f5f5;
.tabs-bottom
  bottom:0;
  left:0;
  .item
    border-right:1px solid #dedede;
    &:last-child{
      border-right:none;
    }
  .strong
    background-color:orange;
    color:#fff;
.explain
  padding:20px 20px 0;
.descrip
  padding:0 20px;
  ul
    padding:0 20px 0 50px;
  li
    list-style-type:decimal;
    font-size:14px;
    color:#666;
    line-height:1.8;
    margin-bottom:10px;
.wrap-images
  width:100%;
  margin-top:20px;
  margin-bottom:70px;
  img
    max-width:100%;
    display:block;
    margin:0 auto;
    padding:0px 10px;
</style>
