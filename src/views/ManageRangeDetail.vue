<template>
  <div>
      <div class="row tab ">
        <div class="col-4 item">
            <q-btn @click="searchCityModal(true)" flat>{{formData.city}}<q-icon size="14px" class="text-grey-6" name="arrow drop down"/></q-btn>
        </div>
        <div class="col-4 item">
            <q-btn @click="searchIndustryModal(true)" flat >{{formData.industry}}<q-icon size="14px" class="text-grey-6" name="arrow drop down"/></q-btn>
        </div>
        <div class="col-4 item">
            <q-btn @click="getManageRangeList" class="tab-submit" color="primary" small>一键生成</q-btn>
        </div>
      </div>
      <div class="table-wrap">
        <table class="q-table bordered striped-odd">
          <tbody>
            <tr><th class="text-left">公 司 名 ：</th><td>{{detailData.name}}</td></tr>
            <tr><th class="text-right">注册地址：</th><td>{{detailData.addr}}</td></tr>
            <tr><th class="text-right">法人姓名：</th><td>{{detailData.legal}}</td></tr>
            <tr><th class="text-right">注册资本：</th><td>{{detailData.capital}}</td></tr>
            <tr><th class="text-right">经营范围：</th><td>{{detailData.scope}}</td></tr>
          </tbody>
        </table>
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
  QCard,
  QChip,
  QCardTitle,
  QCardMedia,
  QCardActions,
  QCardSeparator,
  QCardMain
} from 'quasar'
// 导出常用的数据对象
import localData from 'static/localData'
import SearchCity from '%/SearchCity'
import SearchIndustry from '%/SearchIndustry'
import api from 'api/index'
import { mapMutations } from 'vuex'
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
    QCardMain
  },
  data () {
    return {
      progress: false,
      isMenu: true,
      formData: {
        city: this.$route.query.city,
        industry: this.$route.query.industry
      },
      detailData: [],
      hotCity: localData.hotCity,
      industrys: localData.industrys
    }
  },
  created () {
    // 初始化根据query,加载api
    this.getManageRangeDetail()
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
    getManageRangeDetail () {
      api.getCompanyIdBiz(this.$route.params.id).then(res => {
        if (res.data.code === 0) {
          this.detailData = res.data.data
        }
      })
    },
    getManageRangeList () {
      this.$router.push({path: '/manageRangeList', query: {city: this.formData.city, industry: this.formData.industry}})
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
      display:block;
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
      tr
        width: 100%;
      th
        width:110px;
        display:table-cell;
        color:#666;
        vertical-align:middle;
      td,th
        text-align:left;
</style>
