<template>
  <div>
    <!-- 行业选择 start-->
    <q-modal v-model="getSearchCity" :content-css="{minWidth: '80vw', minHeight: '80vh'}">
      <q-modal-layout>
        <!-- 搜索头部 start -->
        <q-toolbar slot="header">
          <q-btn flat @click.stop="searchCityModal(false)">
            <q-icon name="keyboard_arrow_left" />
          </q-btn>
          <q-toolbar-title>
            选择城市
          </q-toolbar-title>
        </q-toolbar>
        <!-- 搜索头部 end -->
        <!-- 搜索栏 start -->
        <q-toolbar slot="header">
          <q-search inverted color="none" v-model="searchCity" placeholder="请输入您要选择的城市">
            <q-autocomplete @search="queryCityItem" @selected="selectedCityItem" />
          </q-search>
        </q-toolbar>
        <!-- 搜索栏 end -->
        <div class="layout-padding">
          <h1 class="hot-title">热门城市</h1>
          <div class="row xs-gutter">
            <div class="col-4 hot" v-for="(item, index) in hotCity" :key="index"><q-btn @click="getHotCityVal(item.label,item.code)" outline color="primary">{{item.label}}</q-btn></div>
          </div>
        </div>
      </q-modal-layout>
    </q-modal>
    <!-- 行业选择 end-->
  </div>
</template>

<script>
import {
  Toast,
  Ripple,
  QBtn,
  QIcon,
  QModal,
  QModalLayout,
  QToolbar,
  QToolbarTitle,
  QSearch,
  QAutocomplete,
  QList,
  QItem,
  QItemSide,
  QItemMain,
  filter
} from 'quasar'
import localData from 'static/localData'
import { mapMutations, mapGetters } from 'vuex'
export default {
  components: {
    Toast,
    Ripple,
    QBtn,
    QIcon,
    QModal,
    QModalLayout,
    QToolbar,
    QToolbarTitle,
    QSearch,
    QAutocomplete,
    QList,
    QItem,
    QItemSide,
    QItemMain
  },
  data () {
    return {
      searchCity: '',
      queryCity: {
        label: '',
        code: ''
      },
      hotCity: localData.hotCity
    }
  },
  computed: {
    ...mapGetters([
      'getSearchCity',
      'getSearchIndustry'
    ])
  },
  methods: {
    ...mapMutations([
      'searchCityModal',
      'searchIndustryModal'
    ]),
    getHotCityVal (label, code) {
      // 保存选中的值
      this.queryCity.label = label
      this.queryCity.code = code
      // 把获取的数值发给父级
      this.$emit('getSelectedCity', this.queryCity)
      // 关闭城市选择
      this.searchCityModal(false)
    },
    queryCityItem (items, done) {
      setTimeout(() => {
        done(filter(items, {field: 'label', list: localData.hotCity}))
      }, 1000)
    },
    selectedCityItem (item) {
      // 保存选中的值
      this.searchCity = item.label
      this.queryCity.label = item.label
      this.queryCity.code = item.code
      // 把获取的数值发给父级
      this.$emit('getSelectedCity', this.queryCity)
      // 关闭城市选择
      this.searchCityModal(false)
      // 提示选择的选项
      Toast.create(`你选择了"${item.label}-${item.code}"`)
    }
  }
}
</script>

<style lang="stylus" scoped>
.hot-title
  font-size:18px;
  color:#666;
  margin:0 0 20px 0;
.hot .q-btn
  width: 100%;
</style>

