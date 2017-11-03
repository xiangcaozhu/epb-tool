<template>
  <div class="has-tabs">
    <div class="row tab fixed-top">
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
      <!-- <div class="row rate-item">
        <div class="col-4 line" :class="{'hight':resultData.passRate>=80}">高</div>
        <div class="col-4 line" :class="{'middle':resultData.passRate>=60&&resultData.passRate<80}">中</div>
        <div class="col-4" :class="{'low':resultData.passRate<59}">低</div>
      </div> -->
      <div class="suggest" v-if="resultData.prohibitWordsResult">
        <q-card>
          <q-card-title>
            <p class="text-grey-8 margin-b"><strong class="text-red">"{{formData.city}}{{formData.name}}{{formData.industry}}"</strong>&nbsp;通过率{{resultData.passRate}}% 
            <!-- {{resultData.approximateCompanyFourResult.title}} -->
            <p class="margin-b"><span slot="subtitle">
              <q-rating
                v-model="rate"
                :max="10"
                size="16px"
                :color="rateColor"
              />
            </span>
            <span v-show="resultData.passRate>=80" class="rate-stage" :class="{'hight':resultData.passRate>=80}">高</span><span v-show="resultData.passRate>=50&&resultData.passRate<80" class="rate-stage" :class="{'middle':resultData.passRate>=50&&resultData.passRate<80}">中</span><span v-show="resultData.passRate<49" class="rate-stage" :class="{'low':resultData.passRate<49}">低</span></p>
            </p>
          </q-card-title>
        </q-card>
      </div>
    </div>
    <div class="detail-wrap" >
      <div class="yes" v-if="resultData.prohibitWordsResult.hmbSolrWords.length!==0">
        <h2 class="detail-type">敏感词分析</h2>
        <q-card v-for="(list, index) in resultData.prohibitWordsResult.hmbSolrWords" class="caption card-padding" :key="index">
          <q-card-title>
            <q-icon color="warning" name="warning" />{{list.title}}
            <p slot="subtitle" class="text-faded" style="font-size:12px;margin-bottom:0;"><span style="float:right;">通过率{{list.passRate||0}}%/相似度{{list.similar||0}}%</span></p>
          </q-card-title>
          <q-card-separator />
          <q-card-main>
            <p class="text-faded" v-html="list.content"></p>
          </q-card-main>
        </q-card>
      </div>
      <div ref="apprInfinite">
        <div v-if="resultData.approximateCompanyFourResult.list.length!==0">
          <h2 class="detail-type">相似公司分析</h2>
          <q-card v-for="(list, index) in approList" :key="index" class="card-padding">
            <q-card-title>
              <span class="list-index">{{ index + 1 }}</span>
              {{list.companyName}}
              <p slot="subtitle" class="text-faded" style="font-size:12px;margin-bottom:0;">{{list.searchType}} <span style="float:right;">相似度{{list.similar}}%</span></p>
            </q-card-title>
            <q-card-separator />
            <q-card-main>
            <p>{{list.passRate}}</p>
              <p class="text-faded" v-html="list.detail"></p>
            </q-card-main>
          </q-card>
          <div v-if="hiddenApproSpinner" class="row justify-center" style="margin-top:20px;margin-bottom: 50px;">
            <q-spinner-ios color="primary" slot="message" :size="30" label="加载中……"/>
          </div>
          <div class="more" v-show="!hiddenApproSpinner">
             <q-btn @click="approLoadMore" class="tab-submit" color="orange" style="width:100%;">{{approTips}}</q-btn>
          </div>
        </div>
      </div>
      <div ref="tradeInfinite" >
        <div v-if="resultData.companyTrademarkResultPO.trademarkPOs.length!==0">
          <h2 class="detail-type">相似品牌商标分析</h2>
          <q-card v-for="(list, index) in trademarkPOs" class="caption card-padding" :key="index">
            <q-card-title>
              <span class="list-index bg-primary">{{ index + 1 }}</span>
              {{list.title}}
              <p slot="subtitle" class="text-faded" style="font-size:12px;margin-bottom:0;"><span style="float:right;">通过率{{list.passRate}}%/相似度{{list.similar}}%</span></p>
            </q-card-title>
            <q-card-separator />
            <q-card-main>
              <p class="text-faded" v-html="list.content"></p>
            </q-card-main>
          </q-card>
          <div v-if="hiddenTradeSpinner" class="row justify-center" style="margin-top:20px;margin-bottom: 50px;">
            <q-spinner-ios color="primary" slot="message" :size="30" />
          </div>
          <div class="more" v-show="!hiddenTradeSpinner">
             <q-btn @click="tradeLoadMore" class="tab-submit" color="orange" style="width:100%;">{{tradeTips}}</q-btn>
          </div>
        </div> 
      </div>
      <div v-show="unDisplay" class="row justify-center no" style="margin-top:50px;">
        <p class="col-12 text-grey-4" style="text-align:center;"><q-icon name="filter none" size="50px"/></p>
        <p class="col-12 filter none text-grey-4" style="text-align:center;">暂无分析数据可展示！</p>
      </div>
    </div>
    <search-city @getSelectedCity="getSelectedCity"></search-city>
    <search-industry @getSelectedIndustry="getSelectedIndustry"></search-industry>
  </div>
</template> 

<script>
import {
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
      approIndex: 0,
      approTips: '加载更多',
      tradeIndex: 0,
      tradeTips: '加载更多',
      hiddenApproSpinner: false,
      hiddenTradeSpinner: false,
      unDisplay: false
    }
  },
  created () {
    // 初始化根据query,加载api
    this.checkNameSubmit()
    this.setMenuIcon(false)
    this.headBar({
      title: '公司核名',
      subTitle: '核名详情'
    })
  },
  computed: {
    ...mapGetters(['getLoading']),
    rate () {
      return Math.floor(this.resultData.passRate / 10)
    },
    rateColor () {
      if (Math.floor(this.resultData.passRate / 10) >= 8) {
        return 'green'
      } else if (Math.floor(this.resultData.passRate / 10) < 8 && Math.floor(this.resultData.passRate / 10) >= 5) {
        return 'amber-8'
      } else if (Math.floor(this.resultData.passRate / 10) < 5) {
        return 'red'
      }
    }
  },
  methods: {
    ...mapMutations([
      'searchCityModal',
      'searchIndustryModal',
      'headBar',
      'setMenuIcon'
    ]),
    approLoadMore (index, done) {
      this.loadMoreData(this.resultData.approximateCompanyFourResult.list, 'approList', 'hiddenApproSpinner', 'approIndex', () => {
        this.approTips = '没有更多'
      })
    },
    tradeLoadMore (index, done) {
      this.loadMoreData(this.resultData.companyTrademarkResultPO.trademarkPOs, 'trademarkPOs', 'hiddenTradeSpinner', 'tradeIndex', () => {
        this.tradeTips = '没有更多'
      })
    },
    loadMoreData (formArray, toString, spinner, index, callback) {
      if (formArray.length !== 0) {
        setTimeout(() => {
          let items = []
          let start = this.count * this[index],
            end = start + this.count,
            maxEnd = formArray.length - end < this.count ? formArray.length : end
          if (formArray.length <= this[toString].length) {
            this[spinner] = false
            callback()
            return false
          }
          for (; start < maxEnd; start++) {
            items.push(formArray[start])
          }
          this[toString] = this[toString].concat(items)
          this[index]++
          this[spinner] = false
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
      this.approIndex = 0
      this.tradeIndex = 0
      this.hiddenApproSpinner = true
      this.hiddenTradeSpinner = true
      this.unDisplay = false
      // Loading.show({
      //   spinner: QSpinnerIos,
      //   message: '加载中……',
      //   messageColor: 'white',
      //   spinnerSize: 50,
      //   spinnerColor: 'white'
      // })
      api.getCompanyDetail(this.formData.city, this.formData.name, this.formData.industry, this.formData.from)
        .then(res => {
          if (res.data.code === 0) {
            // 因为后台返回的数据结构不稳定，数组会变成null
            this.resultData = res.data.data
            if (res.data.data.prohibitWordsResult.hmbSolrWords.length === 0 && res.data.data.approximateCompanyFourResult.list.length === 0 && res.data.data.companyTrademarkResultPO.trademarkPOs.length === 0) {
              this.unDisplay = true
            }
            // 初始化加载5条
            setTimeout(() => {
              this.approLoadMore()
              this.tradeLoadMore()
            }, 200)
          }
        })
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
    z-index:10;
    top:50px;
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
  .margin-b
    margin-bottom:0;
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
  .rate-stage
    line-height:1;
    width:30px;
    height:24px;
    text-align:center;
    line-height:24px;
    display:inline-block;
    float:right;
    font-size:12px;
    color:#fff;
    background-color:#ff6600;
  .list-index
    margin-top:6px;
    float:left;
    height:22px;
    line-height:22px;
    text-align:center;
    width:22px;
    margin-right:10px;
    background-color:#ff9800;
    color:#fff;
    font-size:12px;
    display:inline-block;
  .detail-type
    font-size:18px;
    height:50px;
    line-height:50px;
    color:#666;
    padding:0 20px;
    font-family:'微软雅黑';
    margin:0;
    font-weight:bold;
    border-bottom:2px solid #027be3;
  .card-padding
    margin-bottom:20px;
    .q-card-container
      padding: 5px 16px;
  .more
    height:40px;
    line-height:40px;
    text-align:center;
    padding:0 10px;
    margin-bottom:20px;
    p
      color:#888;
      font-size:20px;
</style>
