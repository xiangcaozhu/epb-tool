<template>
  <div class="has-tabs">
      <div class="row tab fixed-top">
        <div class="col-4 item">
            <q-btn @click="searchCityModal(true)" flat>{{formData.city}}<q-icon size="14px" class="text-grey-6" name="arrow drop down"/></q-btn>
        </div>
        <div class="col-4 item">
            <q-btn @click="searchIndustryModal(true)" flat >{{formData.industry}}<q-icon size="14px" class="text-grey-6" name="arrow drop down"/></q-btn>
        </div>
        <div class="col-4 item">
            <q-btn @click="giveNameSubmit" class="tab-submit" color="primary" small>生成</q-btn>
        </div>
      </div>
      <div class="loading-wrap relative-position">
        <div class="table-wrap" style="height:330px;">
          <table class="q-table striped-odd">
            <thead>
              <tr>
                <th class="text-left" style="width:70%">公司名字</th>
                <th class="text-right">通过率</th>
              </tr>
            </thead>
            <q-transition
              appear
              enter="fadeIn"
              leave="fadeOut"
            >
              <tbody v-show="showReturnData">
                <tr v-for="(item, index) in tableData" @click="checkNameResult(item.city, item.name, item.industry, item.type)">
                  <td class="text-left text-size">{{item.city}} <span class="company-name">{{item.name}}</span> {{item.industry}} {{item.type}}</td>
                  <td class="text-right"><span class="pass-rate" :class="{'hight':item.rate=='高', 'middle':item.rate=='中', 'low':item.rate=='低'}">{{item.rate}}</span></td>
                </tr>
              </tbody>
            </q-transition>
          </table>
        </div> 
        <q-inner-loading :visible="visible">
          <q-spinner-ios size="30px" color="primary"></q-spinner-ios>
        </q-inner-loading>
        <div class="exchange-wrap" v-show="showReturnData">
          <p class="tips">点击公司名字，查看核名结果！</p>
          <q-btn big loader color="orange" v-model="progress" @click="giveNameNews">
            换一批
            <span slot="loading">
              <q-spinner-mat  class="on-left" slot="loading" color="primary" :size="30" />
              努力加载中...
            </span>
          </q-btn>
        </div>
      </div>
      <search-city @getSelectedCity="getSelectedCity"></search-city>
      <search-industry @getSelectedIndustry="getSelectedIndustry"></search-industry>
  </div>
</template>

<script>
import {
  LocalStorage,
  QInput,
  QBtn,
  QIcon,
  QSelect,
  QField,
  QSpinnerMat,
  QInnerLoading,
  QTransition,
  QSpinnerIos
} from 'quasar'
// 导出常用的数据对象
import localData from 'static/localData'
import SearchCity from '%/SearchCity'
import SearchIndustry from '%/SearchIndustry'
import api from 'api/index'
import { mapGetters, mapMutations } from 'vuex'
import 'quasar-extras/animate/fadeIn.css'
import 'quasar-extras/animate/fadeOut.css'
export default {
  name: 'giveNameList',
  components: {
    QInput,
    QBtn,
    QIcon,
    QSelect,
    QField,
    QSpinnerMat,
    SearchCity,
    SearchIndustry,
    QInnerLoading,
    QTransition,
    QSpinnerIos
  },
  data () {
    return {
      progress: false,
      visible: false,
      showReturnData: false,
      formData: {
        city: this.$route.query.city,
        industry: this.$route.query.industry
      },
      tableData: [],
      hotCity: localData.hotCity,
      industrys: localData.industrys
    }
  },
  created () {
    this.setMenuIcon(false)
    this.headBar({
      title: '公司起名',
      subTitle: '推荐列表'
    })
  },
  beforeRouteLeave (to, from, next) {
    // 缓存数据到storage
    if (to.name === 'checkNameResult') {
      LocalStorage.set('giveNameList', this.tableData)
    } else {
      LocalStorage.remove('giveNameList')
    }
    next()
  },
  computed: {
    ...mapGetters(['isLoading'])
  },
  methods: {
    ...mapMutations([
      'searchCityModal',
      'searchIndustryModal',
      'headBar',
      'setMenuIcon'
    ]),
    getSelectedCity (query) {
      this.formData.city = query.label
    },
    getSelectedIndustry (query) {
      this.formData.industry = query.industry
    },
    getLocalGiveName () {
      this.showReturnData = false
      // 保证再获取本地数据后再进行渲染
      new Promise((resolve, reject) => {
        let localGiveNameList = LocalStorage.get.item('giveNameList')
        resolve(localGiveNameList)
      }).then(list => {
        if (list) {
          this.tableData = list
          this.showReturnData = true
        } else {
          this.giveNameSubmit()
        }
      })
    },
    // 如果没有登录跳转到登陆页，如果已经登录，可以查询数据
    giveNameSubmit () {
      this.visible = true
      this.showReturnData = false
      api.getCompanyName(this.formData.city, this.formData.industry)
        .then(res => {
          if (res.data.code === 0) {
            this.tableData = res.data.data
            setTimeout(() => {
              this.visible = false
              this.showReturnData = true
            }, 500)
          }
        })
    },
    checkNameResult (city, name, industry, type) {
      this.$router.push({path: '/checkNameResult', name: 'checkNameResult', query: { city: city, name: name, industry: industry, from: type }})
    },
    giveNameNews () {
      this.visible = true
      this.showReturnData = false
      api.getCompanyName(this.formData.city, this.formData.industry)
        .then(res => {
          if (res.data.code === 0) {
            this.tableData = res.data.data
            setTimeout(() => {
              this.progress = false
              this.visible = false
              this.showReturnData = true
            }, 500)
          }
        })
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.getLocalGiveName()
    })
  }

}
</script>

<style lang="stylus" scoped>
  .has-tabs
    padding-top:40px;
  .tab
    // position:fixed;
    z-index:10;
    top:50px;
    // width:100%;
    background-color #f5f5f5;
    .item
      flex:1;
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
  .table-wrap
    width:100%;
    padding:10px;
    margin-top:10px;
    table
      width: 100%;
      border:1px solid #f39800;
      th
        color:#fff;
        background-color:#f39800;
      td,th
        text-align:center;
      .pass-rate
        display:inline-block;
        padding:5px 8px;
        border-radius:5px;
        color:#fff;
        font-size:14px;
      .hight
        background-color:green;
      .middle
        background-color:#f39800;
      .low
        background-color:#f00;  
  .text-size
    font-size:14px;  
  .company-name
    color:#f00;
    font-size:14px;
  .exchange-wrap
    padding:0 10px;
    button
      width:100%;
    .tips
      color:orange;
      text-align:center;
      font-size:12px;
</style>
