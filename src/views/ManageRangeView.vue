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
            <q-btn @click="manageRangeSubmit" class="tab-submit" color="primary" small>一键生成</q-btn>
        </div>
      </div>
      <router-view />
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
      listData: [],
      hotCity: localData.hotCity,
      industrys: localData.industrys
    }
  },
  created () {
    // 初始化根据query,加载api
    this.manageRangeSubmit()
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
    // 如果没有登录跳转到登陆页，如果已经登录，可以查询数据
    manageRangeSubmit () {
      api.getCompanyScope(this.formData.city, this.formData.industry)
        .then(res => {
          if (res.data.code === 0) {
            this.listData = res.data.data
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
</style>
