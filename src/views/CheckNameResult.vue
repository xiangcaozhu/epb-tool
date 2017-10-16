<template>
  <div class="has-tabs">
    <div class="row tab">
      <div class="col item">
          <q-btn @click="searchCityModal(true)" flat >{{formData.city}}<q-icon size="14px" class="text-grey-6" name="arrow drop down"/></q-btn>

      </div>
      <div class="col item">
          <q-btn @click="inputCompanyName" flat >{{formData.name}}</q-btn>
      </div>
      <div class="col item">
          <q-btn @click="searchIndustryModal(true)" flat >{{formData.industry}}<q-icon size="14px" class="text-grey-6" name="arrow drop down"/></q-btn>
      </div>
      <div class="col item">
          <q-btn @click="inputCompanyFrom" flat >{{formData.from}}<q-icon size="14px" class="text-grey-6" name="arrow drop down"/></q-btn>
      </div>
      <div class="col item">
          <q-btn @click="checkNameSubmit" class="tab-submit" color="primary" small>核名</q-btn>
      </div>
    </div>
    <div class="rate-wrap">
      <p><span class="text-red">"{{formData.city}}{{formData.name}}{{formData.industry}}"</span>&nbsp;通过率：</p>
      <div class="row rate-item">
        <div class="col-4 line" :class="{'hight':resultData.passRate>=80}">高</div>
        <div class="col-4 line" :class="{'middle':resultData.passRate>=60&&resultData.passRate<80}">中</div>
        <div class="col-4" :class="{'low':resultData.passRate<59}">低</div>
      </div>
      <div class="suggest" v-if="resultData.prohibitWordsResult">
        <q-card>
          <q-card-title>
            该名称通过率{{resultData.passRate}}%
            <!-- {{resultData.approximateCompanyFourResult.title}} -->
            <span slot="subtitle">
              <q-rating
                v-model="rate"
                :max="10"
              />
            </span>
          </q-card-title>
        </q-card>
      </div>
    </div>  
    <div class="detail-wrap" >
      <q-tabs v-model="tabsModel" inverted no-pane-border>
        <q-tab name="prohibitWordsResult" label="敏感词分析" slot="title" />
        <q-tab name="approximateCompanyFourResult" label="相似公司分析" slot="title" />
        <q-tab name="companyTrademarkResultPO" label="相似商标分析" slot="title" />
        <q-tab-pane name="prohibitWordsResult">
            <div class="yes" v-if="resultData.prohibitWordsResult.hmbSolrWords.length!==0">
               <q-card v-for="(list, index) in resultData.prohibitWordsResult.hmbSolrWords" class="caption" :key="index">
                  <q-card-title>
                    {{list.title}}
                    <span slot="subtitle">相似度{{list.similar||0}}/通过率{{list.passRate||0}}%</span>
                    <div slot="right" class="row items-center">
                      <q-chip small square color="secondary" class="shadow-1">
                        {{ index + 1 }}
                      </q-chip>
                    </div>
                  </q-card-title>
                  <q-card-separator />
                  <q-card-main>
                    <p class="text-faded" v-html="list.content"></p>
                  </q-card-main>
                </q-card>
            </div>
            <div v-else class="row justify-center no">
              <p class="col-12 text-grey-4" style="text-align:center;"><q-icon name="filter none" size="50px"/></p>
              <p class="col-12 filter none text-grey-4" style="text-align:center;">恭喜您，暂无敏感词分析,请查阅其他分析</p>
            </div>
        </q-tab-pane>
        <q-tab-pane name="approximateCompanyFourResult" >
            <q-infinite-scroll inline ref="apprInfinite" :handler="approListLoadMore" v-if="resultData.approximateCompanyFourResult.list.length!==0">
              <q-card inline v-for="(list, index) in approList" :key="index">
                <q-card-title>
                  {{list.companyName}}
                  <span slot="subtitle">{{list.searchType}}</span>
                  <div slot="right" class="row items-center">
                    <q-chip small square color="secondary" class="shadow-1">
                      {{ index + 1 }}
                    </q-chip>
                    <!-- {{list.similar}} -->
                    <!-- {{list.warnWords}} -->
                  </div>
                </q-card-title>
                <q-card-separator />
                <q-card-main>
                <p>{{list.passRate}}</p>
                  <div class="row">
                    <p class="col-8 text-faded" style="font-size:12px;text-align:left;">{{list.title}}</p>
                    <p class="col-4 text-faded" style="font-size:12px;text-align:right;">相似度{{list.similar}}%</p>
                  </div>
                  <p class="text-faded" v-html="list.detail"></p>
                </q-card-main>
              </q-card>
              <div v-if="hiddenApproSpinner" class="row justify-center" style="margin-bottom: 50px;">
                <q-spinner-ios color="primary" slot="message" :size="40" label="加载中……"/>
              </div>
            </q-infinite-scroll>
            <div v-else class="row justify-center no">
              <p class="col-12 text-grey-4" style="text-align:center;"><q-icon name="filter none" size="50px"/></p>
              <p class="col-12 filter none text-grey-4" style="text-align:center;">暂无相似公司分析</p>
            </div>
        </q-tab-pane>
        <q-tab-pane name="companyTrademarkResultPO">
            <q-infinite-scroll inline ref="tradeInfinite" :handler="tradeLoadMore" v-if="resultData.companyTrademarkResultPO.trademarkPOs.length!==0">
              <q-card inline v-for="(list, index) in resultData.companyTrademarkResultPO.trademarkPOs" class="caption" :key="index">
                <q-card-title>
                  {{list.title}}
                  <span slot="subtitle">相似度{{list.similar}}/通过率{{list.passRate}}%</span>
                  <div slot="right" class="row items-center">
                    <q-chip small square color="secondary" class="shadow-1">
                      {{ index + 1 }}
                    </q-chip>
                  </div>
                </q-card-title>
                <q-card-separator />
                <q-card-main>
                  <p class="text-faded" v-html="list.content"></p>
                </q-card-main>
              </q-card>
              <div v-if="hiddenTradeSpinner" class="row justify-center" style="margin-bottom: 50px;">
                <q-spinner-ios color="primary" slot="message" :size="40" />
              </div>
            </q-infinite-scroll> 
            <div v-else class="row justify-center no">
              <p class="col-12 text-grey-4" style="text-align:center;"><q-icon name="filter none" size="50px"/></p>
              <p class="col-12 filter none text-grey-4" style="text-align:center;">暂无相似品牌商标分析</p>
            </div>         
        </q-tab-pane>
      </q-tabs>
    </div>
    <search-city @getSelectedCity="getSelectedCity"></search-city>
    <search-industry @getSelectedIndustry="getSelectedIndustry"></search-industry>
  </div>
</template>

<script>
import {
  Loading,
  QInput,
  QBtn,
  QIcon,
  QSelect,
  QField,
  QSpinnerMat,
  QDialogSelect,
  Dialog,
  QTabs,
  QTab,
  QTabPane,
  QInfiniteScroll,
  QSpinnerIos,
  QChip,
  QCard,
  QCardTitle,
  QCardMedia,
  QCardActions,
  QCardSeparator,
  QCardMain,
  QRating
} from 'quasar'
// 导出常用的数据对象
import localData from 'static/localData'
import SearchCity from '%/SearchCity'
import SearchIndustry from '%/SearchIndustry'
import api from 'api/index'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'checkNameResult',
  components: {
    QInput,
    QBtn,
    QIcon,
    QSelect,
    QField,
    QSpinnerMat,
    SearchCity,
    SearchIndustry,
    QDialogSelect,
    QTabs,
    QTab,
    QTabPane,
    QInfiniteScroll,
    QSpinnerIos,
    QChip,
    QCard,
    QCardTitle,
    QCardMedia,
    QCardActions,
    QCardSeparator,
    QCardMain,
    QRating
  },
  data () {
    return {
      formData: {
        city: this.$route.query.city || '',
        industry: this.$route.query.industry || '',
        name: this.$route.query.name || '',
        from: this.$route.query.type || '有限公司'
      },
      select: '',
      resultData: {
        content: '',
        prohibitWordsResult: {
          hmbSolrWords: []
        },
        approximateCompanyFourResult: {
          list: []
        },
        companyTrademarkResultPO: {
          trademarkPOs: []
        }
      },
      approList: [],
      trademarkPOs: [],
      tabsModel: 'prohibitWordsResult',
      hotCity: localData.hotCity,
      industrys: localData.industrys,
      start: 0,
      count: 5,
      index: 0,
      hiddenApproSpinner: true,
      hiddenTradeSpinner: true
    }
  },
  created () {
    // 初始化根据query,加载api
    this.checkNameSubmit()
    this.setMenuIcon(false)
    this.headBar({
      title: '公司核名系统',
      subTitle: '核名详情'
    })
  },
  computed: {
    ...mapGetters(['getLoading']),
    rate () {
      return Math.floor(this.resultData.passRate / 10)
    }
  },
  methods: {
    ...mapMutations([
      'searchCityModal',
      'searchIndustryModal',
      'headBar',
      'setMenuIcon'
    ]),
    approListLoadMore (index, done) {
      this.index = 0
      this.loadMoreData(this.resultData.approximateCompanyFourResult.list, 'approList', 'hiddenApproSpinner', index, done)
    },
    tradeLoadMore (index, done) {
      this.index = 0
      this.loadMoreData(this.resultData.companyTrademarkResultPO.trademarkPOs, 'trademarkPOs', 'hiddenTradeSpinner', index, done)
    },
    loadMoreData (formArray, toString, spinner, index, done) {
      if (formArray) {
        let items = []
        let start = this.count * this.index,
          end = start + this.count,
          maxEnd = formArray.length - end < this.count ? formArray.length : end
        this[spinner] = true
        if (formArray.length <= this[toString].length) {
          this[spinner] = false
          return false
        }
        setTimeout(() => {
          for (; start < maxEnd; start++) {
            items.push(formArray[start])
          }
          this[toString] = this[toString].concat(items)
          this.index++
          if (done) {
            done()
          }
        }, 1000)
      }
    },
    getSelectedCity (query) {
      this.formData.city = query.label
    },
    getSelectedIndustry (query) {
      this.formData.industry = query.industry
    },
    inputCompanyName () {
      let _this = this
      Dialog.create({
        title: '填写公司字号',
        form: {
          name: {
            type: 'text',
            label: '公司字号',
            model: '',
            placeholder: '请输入公司字号'
          }
        },
        buttons: [
          '取消',
          {
            label: '确定',
            handler (item) {
              _this.formData.name = item.name
            }
          }
        ]
      })
    },
    inputCompanyFrom () {
      let _this = this
      Dialog.create({
        title: '选择公司类型',
        form: {
          option: {
            type: 'radio',
            model: 'opt1',
            items: [
              {label: '有限公司', value: '有限公司', color: 'secondary'},
              {label: '合伙企业', value: '合伙企业'}
            ]
          }
        },
        buttons: [
          '取消',
          {
            label: '确认',
            handler (value) {
              _this.formData.from = value.option
            }
          }
        ]
      })
    },
    // 如果没有登录跳转到登陆页，如果已经登录，可以查询数据
    checkNameSubmit () {
      this.approList = []
      this.trademarkPOs = []
      this.index = 0
      Loading.show({
        spinner: QSpinnerIos,
        message: '加载中……',
        messageColor: 'white',
        spinnerSize: 50,
        spinnerColor: 'white'
      })
      api.getCompanyDetail(this.formData.city, this.formData.name, this.formData.industry, this.formData.from)
        .then(res => {
          if (res.data.code === 0) {
            // 因为后台返回的数据结构不稳定，数组会变成null
            this.resultData = res.data.data
            setTimeout(() => {
              Loading.hide()
            }, 1500)
          }
        })
      // this.$refs.apprInfinite.loadMore()
      // this.$refs.tradeInfinite.loadMore()
    }
  },
  mounted () {
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
      padding:0;
      margin:0 auto;
      text-align:center;
      .on-right
        margin-left:0!important;
    .tab-submit
      width:80%;
      margin:5px auto;
  .rate-wrap
    width:100%;
    padding:10px;
    margin-top:10px;
    .rate-item
      text-align:center;
      div
        padding:10px;
        background-color:#dedede;
        color:#888;
      .line
        border-right:1px solid #fff;
    .hight
      background-color:green!important;
      color:#fff!important;
    .middle
      background-color:#f39800!important;
      color:#fff!important;
    .low
      background-color:#f00!important;
      color:#fff!important;

</style>
