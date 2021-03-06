
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  account: {
    mobile: ''
  },
  is: {
    menuIcon: true,
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
  formData: {
    city: '',
    industry: '',
    name: '',
    from: '',
    next: ''
  },
  headBar: {
    title: '易企名',
    subTitle: '企业起名核名系统',
    bgColor: 'grey-3',
    iconColor: 'grey-6',
    titleClass: 'text-center text-dark'
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
  getAccount: state => state.account,
  getMenuIcon: state => state.is.menuIcon,
  getFormData: state => state.formData
}

const mutations = {
  // 布局显示是否需要
  has (state, has) {
    state.has = has
  },
  // 保存当前账号信息
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
  // 设置当前是否已经登陆
  isSignUp (state, status) {
    state.is.signUp = status
  },
  // 当前头部的标题和副标题
  headBar (state, data) {
    state.headBar = data
  },
  // 设置头部菜单按钮的显示隐藏
  setMenuIcon (state, status) {
    state.is.menuIcon = status
  },
  // 未登录情况下把form对象传递到登陆组件中，然后再发出数据请求
  setFormData (state, formData) {
    state.formData = formData
  }
}
const actions = {}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
