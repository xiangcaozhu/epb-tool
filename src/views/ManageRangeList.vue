<template>
  <div class="has-tabs">
      <div class="row tab">
        <div class="col-4 item">
            <q-btn @click="searchCityModal(true)" flat>{{formData.city}}<q-icon size="14px" class="text-grey-6" name="arrow drop down"/></q-btn>
        </div>
        <div class="col-4 item">
            <q-btn @click="searchIndustryModal(true)" flat >{{formData.industry}}<q-icon size="14px" class="text-grey-6" name="arrow drop down"/></q-btn>
        </div>
        <div class="col-4 item">
            <q-btn @click="manageRangeSubmit" class="tab-submit" color="primary" small>一键生成</q-btn>
        </div>
      </div>
      <div class="loading-wrap relative-position">
        <q-transition
          appear
          enter="fadeIn"
          leave="fadeOut"
        >
          <div>
            <div v-show="unDisplay" class="row justify-center no" style="margin-top:50px;">
              <p class="col-12 text-grey-4" style="text-align:center;"><q-icon name="filter none" size="50px"/></p>
              <p class="col-12 filter none text-grey-4" style="text-align:center;">暂无数据可展示！</p>
            </div>
            <div class="list-wrap" v-show="showReturnData">
              <q-card color="" v-for="(item, index) in listData" :key="index" style="margin-bottom:20px;">
                <q-card-title>
                  <q-chip tag square color="orange">
                    推荐{{index+1}}
                  </q-chip>
                  <q-chip class="btn-copy chip-right" :data-clipboard-text="item.scope" slot="right"  color="primary">
                    <q-icon name="content copy" size="18px"/>
                    复制
                  </q-chip>
                  <q-icon  />
                </q-card-title>
                <q-card-main>
                  <h6>经验范围：</h6>
                  <p class="text-fade">{{item.scope}}</p>
                </q-card-main>
                <q-card-separator />
                <q-card-main>
                  参考公司：
                  <router-link :to="{ name: 'manageRangeDetail', params: { id: item.id }, query: {city: formData.city, industry: formData.industry}}">{{item.name}}</router-link>
                </q-card-main>
              </q-card>
              <div class="exchange-wrap">
                <q-btn big icon="autorenew" loader color="orange" v-model="progress" @click="manageRangeNews">
                  换一批
                  <span slot="loading">
                    <q-spinner-mat  class="on-left" slot="loading" color="white" :size="30" />
                    努力加载中...
                  </span>
                </q-btn>
              </div>
            </div>
          </div>
        </q-transition>
      </div>
      <search-city @getSelectedCity="getSelectedCity"></search-city>
      <search-industry @getSelectedIndustry="getSelectedIndustry"></search-industry>
  </div>
</template>

<script>
import {
  LocalStorage,
  Loading,
  Toast,
  QInput,
  QBtn,
  QIcon,
  QSelect,
  QField,
  QSpinnerMat,
  QCard,
  QChip,
  QCardTitle,
  QCardMedia,
  QCardActions,
  QCardSeparator,
  QCardMain,
  QInnerLoading,
  QTransition,
  QSpinnerIos
} from 'quasar'
// 导出常用的数据对象
import localData from 'static/localData'
import SearchCity from '%/SearchCity'
import SearchIndustry from '%/SearchIndustry'
import api from 'api/index'
import Clipboard from 'clipboard'
import { mapMutations } from 'vuex'
import 'quasar-extras/animate/fadeIn.css'
import 'quasar-extras/animate/fadeOut.css'
export default {
  name: 'manageRange',
  components: {
    QInput,
    QBtn,
    QIcon,
    QSelect,
    QField,
    QSpinnerMat,
    SearchCity,
    SearchIndustry,
    QCard,
    QChip,
    QCardTitle,
    QCardMedia,
    QCardActions,
    QCardSeparator,
    QCardMain,
    QInnerLoading,
    QTransition,
    QSpinnerIos
  },
  data () {
    return {
      progress: false,
      showReturnData: false,
      unDisplay: false,
      formData: {
        city: this.$route.query.city,
        industry: this.$route.query.industry
      },
      listData: [],
      hotCity: localData.hotCity,
      industrys: localData.industrys
    }
  },
  created () {
    // 初始化根据query,加载api
    this.setMenuIcon(false)
    this.headBar({
      title: '经营范围查询',
      subTitle: '范围列表'
    })
    this.getLocalManageRange()
  },
  beforeRouteLeave (to, from, next) {
    // 缓存数据到storage
    if (to.name === 'manageRangeDetail') {
      LocalStorage.set('manageRangeList', this.listData)
    } else {
      LocalStorage.remove('manageRangeList')
    }
    next()
  },
  methods: {
    ...mapMutations([
      'searchCityModal',
      'searchIndustryModal',
      'setMenuIcon',
      'headBar'
    ]),
    getSelectedCity (query) {
      this.formData.city = query.label
    },
    getSelectedIndustry (query) {
      this.formData.industry = query.industry
    },
    getLocalManageRange () {
      this.showReturnData = false
      // 保证再获取本地数据后再进行渲染
      new Promise((resolve, reject) => {
        let localManageRangeList = LocalStorage.get.item('manageRangeList')
        resolve(localManageRangeList)
      }).then(list => {
        if (list) {
          this.listData = list
          this.showReturnData = true
        } else {
          this.manageRangeSubmit()
        }
      })
    },
    // 如果没有登录跳转到登陆页，如果已经登录，可以查询数据
    manageRangeSubmit () {
      this.showReturnData = false
      this.unDisplay = false
      Loading.show({
        spinner: QSpinnerIos,
        message: '加载中……',
        messageColor: 'white',
        spinnerSize: 50,
        spinnerColor: 'white'
      })
      api.getCompanyScope(this.formData.city, this.formData.industry)
        .then(res => {
          if (res.data.code === 0) {
            this.listData = res.data.data
            if (res.data.data.length === 0) {
              this.unDisplay = true
            }
            setTimeout(() => {
              this.showReturnData = true
              Loading.hide()
            }, 1500)
          }
        })
        .catch(e => {
          this.unDisplay = true
        })
    },
    manageRangeNews () {
      this.showReturnData = false
      this.unDisplay = false
      Loading.show({
        spinner: QSpinnerIos,
        message: '加载中……',
        messageColor: 'white',
        spinnerSize: 50,
        spinnerColor: 'white'
      })
      api.getCompanyScope(this.formData.city, this.formData.industry)
        .then(res => {
          if (res.data.code === 0) {
            this.listData = res.data.data
            if (res.data.data.length === 0) {
              this.unDisplay = true
            }
            setTimeout(() => {
              this.progress = false
              this.showReturnData = true
              Loading.hide()
            }, 1500)
          }
        })
        .catch(e => {
          this.unDisplay = true
        })
    }
  },
  mounted () {
    let clipboard = new Clipboard('.btn-copy')
    clipboard.on('success', (e) => {
      Toast.create('复制到剪切板，您可以粘贴到任何地方！')
      e.clearSelection()
    })
    clipboard.on('error', (e) => {
      Toast.create('复制失败，您的浏览器不支持！')
      e.clearSelection()
    })
    this.$nextTick(() => {
    })
  }

}
</script>

<style lang="stylus" scoped>
  .has-tabs
    padding-top:40px;
  .tab
    position:fixed;
    z-index:10;
    top:50px;
    width:100%;
    background-color #f5f5f5;
    .item
      border-right:1px solid #dedede;
    .item:last-child
      border-right:none;
    button
      display:block
      padding:0 5px;
      margin:0 auto;
      text-align:center;
      .on-right
        margin-left:0!important;
    .tab-submit
      width:80%;
      margin:5px auto;
  .list-wrap
    width:100%;
    padding:10px;
    box-sizing:border-box;      
  .company-name
    color:#f00;
  .exchange-wrap
    padding:20px 10px 50px 10px;
    button
      width:100%;
    .tips
      color:orange;
      text-align:center;
</style>
