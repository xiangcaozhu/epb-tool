
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  account: {
    mobile: ''
  },
  is: {
    signUp: false,
    searchCityModal: false,
    searchIndustryModal: false,
    loginModal: false,
    loading: false
  },
  has: {
    header: true,
    headerTab: true,
    footer: false,
    footerTab: true
  },
  headBar: {
    title: '一品标局',
    subTitle: '企业起名核名系统'
  }
}
const getters = {
  getSearchCity: state => state.is.searchCityModal,
  getSearchIndustry: state => state.is.searchIndustryModal,
  getLogin: state => state.is.loginModal,
  getLoading: state => state.is.loading,
  getSignUp: state => state.is.signUp,
  getHeadBar: state => state.headBar,
  getHas: state => state.has,
  getAccount: state => state.account
}

const mutations = {
  // 布局显示是否需要
  has (state, has) {
    state.has = has
  },
  saveAccount (state, data) {
    state.account = data
  },
  // 城市选择器
  searchCityModal (state, status) {
    state.is.searchCityModal = status
  },
  // 行业选择器
  searchIndustryModal (state, status) {
    state.is.searchIndustryModal = status
  },
  // 登陆弹窗
  loginModal (state, status) {
    state.is.loginModal = status
  },
  // 加载是否完成
  isLoading (state, status) {
    state.is.isLoading = status
  },
  isSignUp (state, status) {
    state.is.signUp = status
  },
  // 当前头部的标题和副标题
  headBar (state, data) {
    state.headBar = data
  }
}
const actions = {}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
