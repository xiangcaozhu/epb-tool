<template>
  <div>
      <div class="row tab ">
        <div class="col item">
            <q-btn @click="searchCityModal(true)" flat icon-right="keyboard arrow down">{{formData.city}}</q-btn>
        </div>
        <div class="col item">
            <q-btn @click="inputCompanyName" flat >{{formData.name}}</q-btn>
        </div>
        <div class="col item">
            <q-btn @click="searchIndustryModal(true)" flat icon-right="keyboard arrow down">{{formData.industry}}</q-btn>
        </div>
        <div class="col item">
            <q-dialog-select
              v-model="formData.from"
              :options="fromOptions"
              ok-label="确定"
              cancel-label="取消"
              title="公司类型选择"
            />
        </div>
        <div class="col item">
            <q-btn @click="checkNameSubmit" class="tab-submit" color="primary" small>核名</q-btn>
        </div>
      </div>
      <div class="rate-wrap">
        <p><span class="text-red">"{{formData.city}}{{formData.name}}{{formData.industry}}"</span>&nbsp;通过率：</p>
        <div class="row rate-item">
          <div class="col-4 line" :class="{'hight':resultData.content.lastIndexOf('高')!==-1}">高</div>
          <div class="col-4 line" :class="{'middle':resultData.content.lastIndexOf('中')!==-1}">中</div>
          <div class="col-4" :class="{'low':resultData.content.lastIndexOf('低')!==-1}">低</div>
        </div>
        <div class="suggest">
          {{resultData.content}},通过概率{{resultData.passRate}}%
        </div>
      </div>
      <div class="detail-wrap" >
        <q-tabs v-model="tabsModel" inverted>
          <q-tab name="prohibitWordsResult" label="敏感词分析" slot="title" />
          <q-tab name="approximateCompanyFourResult" label="相似公司分析" slot="title" />
          <q-tab name="companyTrademarkResultPO" label="相似商标分析" slot="title" />
          <q-tab-pane name="prohibitWordsResult" v-if="resultData.prohibitWordsResult">
              <q-infinite-scroll :handler="refresher">
                <q-card inline v-for="(list, index) in resultData.prohibitWordsResult.hmbSolrWords" class="caption" :key="index">
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
                    <p class="text-faded">{{list.content}}</p>
                    <p>{{list.name}}</p>
                    <p>{{list.product}}</p>
                    <p>{{list.productWords}}</p>
                    <p>{{list.owner}} </p>
                    <p>{{list.banClass}} </p>
                    <p>{{list.banType}}</p>
                    <p>{{list.province}} </p>
                    <p>{{list.type}} </p>
                  </q-card-main>
                </q-card>
                <div class="row justify-center" style="margin-bottom: 50px;">
                  <q-spinner-dots slot="message" :size="40" />
                </div>
              </q-infinite-scroll> 
          </q-tab-pane>
          <q-tab-pane name="approximateCompanyFourResult" v-if="resultData.approximateCompanyFourResult">
              <q-card>
                <q-card-title>
                  {{resultData.approximateCompanyFourResult.title}}
                  <span slot="subtitle">
                    <q-rating
                      v-model="rate"
                      :max="10"
                    />
                  </span>
                </q-card-title>
                <q-card-separator />
                <q-card-main>
                  {{resultData.approximateCompanyFourResult.suggest}}
                </q-card-main>
              </q-card>
              <q-infinite-scroll :handler="refresher">
                <q-card inline v-for="(list, index) in resultData.approximateCompanyFourResult.list" :key="index">
                  <q-card-title>
                    {{list.companyName}}
                    <span slot="subtitle">{{list.title}}</span>
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
                    <p class="text-faded">{{list.searchType}}</p>
                    <p class="text-faded">{{list.detail}}</p>
                  </q-card-main>
                  
                    <p></p>
                    <p>{{list.passRate}}</p>
                    <p></p>
                </q-card>
                <div class="row justify-center" style="margin-bottom: 50px;">
                  <q-spinner-dots slot="message" :size="40" />
                </div>
              </q-infinite-scroll>
          </q-tab-pane>
          <q-tab-pane name="companyTrademarkResultPO" v-if="resultData.companyTrademarkResultPO">
              <q-infinite-scroll :handler="refresher">
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
                    <p class="text-faded">{{list.content}}</p>
                  </q-card-main>
                </q-card>
                <div class="row justify-center" style="margin-bottom: 50px;">
                  <q-spinner-dots slot="message" :size="40" />
                </div>
              </q-infinite-scroll>          
          </q-tab-pane>
        </q-tabs>
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
  QSpinnerDots,
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
import { mapMutations } from 'vuex'

export default {
  name: 'giveName',
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
    QSpinnerDots,
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
      progress: false,
      isMenu: true,
      formData: {
        city: this.$route.query.city || '',
        industry: this.$route.query.industry || '',
        name: this.$route.query.name || '',
        from: this.$route.query.type || '有限公司'
      },
      select: '',
      fromOptions: [{
        label: '有限公司',
        value: '有限公司'
      },
      {
        label: '合伙公司',
        value: '合伙公司'
      }],
      resultData: {
        content: ''
      },
      items: [{}, {}, {}, {}, {}],
      tabsModel: 'prohibitWordsResult',
      tabsOptions: [
        {label: 'Tab 1', value: 'xtab-1'},
        {label: 'Tab 2', value: 'xtab-2'},
        {label: 'Tab 3', value: 'xtab-3'}
      ],
      hotCity: localData.hotCity,
      industrys: localData.industrys
    }
  },
  created () {
    // 初始化根据query,加载api
    this.checkNameSubmit()
  },
  computed: {
    rate () {
      return Math.floor(this.resultData.approximateCompanyFourResult.passRate / 10)
    }
  },
  methods: {
    ...mapMutations([
      'searchCityModal',
      'searchIndustryModal'
    ]),
    refresher (index, done) {
      setTimeout(() => {
        let items = []
        for (let i = 0; i < 7; i++) {
          items.push({})
        }
        this.items = this.items.concat(items)
        done()
      }, 2500)
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
    // 如果没有登录跳转到登陆页，如果已经登录，可以查询数据
    checkNameSubmit () {
      api.getCompanyDetail(this.formData.city, this.formData.name, this.formData.industry, this.formData.from)
        .then(res => {
          if (res.data.code === 0) {
            this.resultData = res.data.data
            console.log(res.data.data)
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
  .tab
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
