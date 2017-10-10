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
        <q-tabs v-model="tabsModel">
          <q-tab name="prohibitWordsResult" label="敏感词分析" slot="title" />
          <q-tab name="approximateCompanyFourResult" label="相似公司分析" slot="title" />
          <q-tab name="companyTrademarkResultPO" label="相似商标分析" slot="title" />
          <q-tab-pane name="prohibitWordsResult" v-if="resultData.prohibitWordsResult">
              <div class="proh">
                <span>{{resultData.prohibitWordsResult.passRate}}</span>
              </div>
              <div class="proh-list" v-for="(list, index) in resultData.prohibitWordsResult.hmbSolrWords" :key="index">
                {{list.id}} <br>
                {{list.title}} <br>
                {{list.content}} <br>
                {{list.name}} <br>
                {{list.product}} <br>
                {{list.productWords}} <br>
                {{list.owner}} <br>
                {{list.banClass}} <br>
                {{list.banType}} <br>
                {{list.province}} <br>
                {{list.type}} <br>
              </div>
          </q-tab-pane>
          <q-tab-pane name="approximateCompanyFourResult" v-if="resultData.approximateCompanyFourResult">
              <div class="appro">
                {{resultData.approximateCompanyFourResult.title}}
                {{resultData.approximateCompanyFourResult.suggest}}
                {{resultData.approximateCompanyFourResult.passRate}}
              </div>
              <div class="appro-list" v-for="(list, index) in resultData.approximateCompanyFourResult.list">
                {{list.title}}
                {{list.companyName}}
                {{list.detail}}
                {{list.searchType}}
                {{list.similar}}
                {{list.warnWords}}
              </div>
          </q-tab-pane>
          <q-tab-pane name="companyTrademarkResultPO" v-if="resultData.companyTrademarkResultPO">
              <div class="company">
                {{resultData.companyTrademarkResultPO.passRate}}
              </div>
              <div class="company-list" v-for="(list, index) in resultData.companyTrademarkResultPO.trademarkPOs">
                {{list.title}}
                {{list.content}}
                {{list.passRate}}
                {{list.similar}}
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
  QTabPane
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
    QTabPane
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
  methods: {
    ...mapMutations([
      'searchCityModal',
      'searchIndustryModal'
    ]),
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
