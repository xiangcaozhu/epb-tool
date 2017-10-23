<template>
  <div>
    <!-- 行业选择 start-->
    <q-modal v-model="getSearchIndustry" :content-css="{minWidth: '80vw', minHeight: '80vh'}">
      <q-modal-layout>
        <!-- 搜索头部 start -->
        <q-toolbar slot="header">
          <q-btn flat @click.stop="searchIndustryModal(false)">
            <q-icon name="keyboard_arrow_left" />
          </q-btn>
          <q-toolbar-title>
            选择行业
          </q-toolbar-title>
        </q-toolbar>
        <!-- 搜索头部 end -->
        <!-- 搜索栏 start -->
        <q-toolbar slot="header">
          <div class="col-10">
            <q-search inverted color="none" v-model="searchIndustry" placeholder="请输入您要选择的行业">
              <q-autocomplete @search="queryIndustryItem" @selected="selectedIndustryItem" />
            </q-search>
          </div>
          <div class="col-2">
            <q-btn inverted color="none" @click.stop="diySelectIndustry" style="font-size:12px;box-shadow:none;">
              确定
            </q-btn>
          </div>
        </q-toolbar>
        <!-- 搜索栏 end -->
        <div class="layout-padding">
          <h1 class="industry-title">常见行业</h1>
          <div class="row xs-gutter industry-container" v-for="(item, index) in industrys" :key="index">
            <div class="col-2">{{item.type}}</div>
            <div class="col-10">
              <div class="row xs-gutter">
                <div class="col-4 hot" v-for="(list, index) in item.industry" :key="index"><q-btn @click="getIndustrysVal(item.type, list.label)" outline small color="primary">{{list.label}}</q-btn></div>
              </div>
            </div>
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
      searchIndustry: '',
      queryIndustry: {
        type: '',
        industry: ''
      },
      industrys: localData.industrys,
      industrysAll: localData.industrysAll
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
    getIndustrysVal (type, industry) {
      // 保存选中的值
      this.queryIndustry.type = type
      this.queryIndustry.industry = industry
      // 把获取的数值发给父级
      this.$emit('getSelectedIndustry', this.queryIndustry)
      // 关闭行业选择
      this.searchIndustryModal(false)
    },
    queryIndustryItem (items, done) {
      this.queryIndustry.industry = items
      setTimeout(() => {
        done(filter(items, {field: 'label', list: this.industrysAll}))
      }, 1000)
    },
    selectedIndustryItem (item) {
      // 保存选中的值
      this.searchIndustry = item.label
      this.queryIndustry.type = item.type
      this.queryIndustry.industry = item.label
      // 把获取的数值发给父级
      this.$emit('getSelectedIndustry', this.queryIndustry)
      // 关闭行业选择
      this.searchIndustryModal(false)
      // 提示选择的选项
      Toast.create(`你选择了"${item.label}"`)
    },
    diySelectIndustry () {
      // 把获取的数值发给父级
      this.$emit('getSelectedIndustry', this.queryIndustry)
      // 关闭行业选择
      this.searchIndustryModal(false)
      // 提示选择的选项
      Toast.create(`你选择了"${this.queryIndustry.industry}"`)
    }
  }
}
</script>

<style lang="stylus" scoped>
.industry-title
  font-size:18px;
  color:#666;
  margin:0 0 20px 0;
.industry-container
  margin-bottom:20px;
.hot .q-btn
  width: 100%;
</style>

