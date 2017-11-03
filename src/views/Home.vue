<template>
  <q-layout
    ref="layout"
    view="lHh Lpr fFf"
    :left-class="{'bg-grey-2': true}"
    :header-class="{'shadow-4': true}"
  >
    <!-- 头部nav start -->
    <q-toolbar v-show="getHas.header" slot="header" :color="getHeadBar.bgColor">
      <q-btn v-if="getMenuIcon"
        flat
        @click="$refs.layout.toggleLeft()"
      >
        <q-icon name="menu" :color="getHeadBar.iconColor"/>
      </q-btn>
      <q-btn v-else
        flat
        @click="backPage"
      >
        <q-icon name="keyboard arrow left" />
      </q-btn>
      <q-toolbar-title :class="getHeadBar.titleClass" style="padding-right:42px;">
        {{getHeadBar.title}}
        <!-- 面包屑导航注销 -->
        <!-- <span v-if="getHeadBar.subTitle" slot="subtitle">
          {{getHeadBar.subTitle}}
        </span> -->
      </q-toolbar-title>
      <!-- <q-btn
        flat
        @click="loginModal(true)"
      >
        <q-icon name="account circle"/>
      </q-btn> -->
    </q-toolbar>
    <!-- 头部nav end -->
    <!-- 左侧菜单栏 start-->
    <div slot="left">
      <q-list no-border link inset-delimiter>
        <q-list-header>易企名</q-list-header> 
        <q-side-link item to="/home">
          <q-item>
            <q-item-side icon="home" />
            <q-item-main label="首页" sublabel="起名核名，快速查询" />
          </q-item>
        </q-side-link>
        <q-side-link item to="/giveName">
          <q-item>
            <q-item-side icon="supervisor account" />
            <q-item-main label="公司起名" sublabel="智能生成，工商通过率高的名字" />
          </q-item>
        </q-side-link>
        <q-side-link item to="/checkName">
          <q-item>
            <q-item-side icon="playlist add check" />
            <q-item-main label="公司核名" sublabel="输入名字，测试工商通过率" />
          </q-item>
        </q-side-link>
        <q-side-link item to="/manageRange">
          <q-item>
            <q-item-side icon="settings input component" />
            <q-item-main label="查询经营范围" sublabel="查询注册行业的经营范围" />
          </q-item>
        </q-side-link>
        <!-- <q-side-link item to="/materialList">
          <q-item>
            <q-item-side icon="file download" />
            <q-item-main label="工商材料" sublabel="注册公司，常用合同，协议等工商材料下载" />
          </q-item>
        </q-side-link> -->
      </q-list>
    </div>
    <q-toolbar v-show="getHas.footer" slot="footer">
      <q-toolbar-title>
        Footer
      </q-toolbar-title>
    </q-toolbar>
    <login></login>
    <!-- 左侧菜单栏 end-->
    <!-- 展示的内容 -->
    <router-view />
  </q-layout>
</template>

<script>
import {
  Cookies,
  QLayout,
  QToolbar,
  QToolbarTitle,
  QBtn,
  QIcon,
  QList,
  QListHeader,
  QItem,
  QItemSide,
  QItemMain,
  QSideLink,
  QCard,
  QCardTitle,
  QCardMedia,
  QCardActions,
  QCardSeparator,
  QCardMain
} from 'quasar'
import { mapGetters, mapMutations } from 'vuex'
import Login from '%/Login'
export default {
  name: 'index',
  components: {
    QLayout,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QList,
    QListHeader,
    QItem,
    QItemSide,
    QItemMain,
    QSideLink,
    QCard,
    QCardTitle,
    QCardMedia,
    QCardActions,
    QCardSeparator,
    QCardMain,
    Login
  },
  data () {
    return {
      currentRouter: ''
    }
  },
  computed: {
    ...mapGetters([
      'getHeadBar',
      'getHas',
      'getSignUp',
      'getLoading',
      'getMenuIcon'
    ])
  },
  created () {
    if (Cookies.has('m')) {
      this.isSignUp(true)
      if (Cookies.has('mobile')) {
        this.saveAccount({
          mobile: Cookies.get('mobile')
        })
      }
    }
  },
  methods: {
    ...mapMutations(['loginModal', 'saveAccount', 'isSignUp']),
    goPage (to) {
      this.$router.push({ path: to, name: to })
      this.$refs.layout.hideLeft()
    },
    backPage () {
      if (this.currentRouter === 'manageRangeList') {
        this.$router.push({ name: 'manageRange' })
      } else {
        this.$router.go(-1)
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
    })
  },
  watch: {
    // 监听路由变化，如果是manageRangeList页面，back始终都是manageRang
    '$route': function (newroute) {
      this.currentRouter = newroute.name
    }
  }
}
</script>

<style lang="stylus" scoped>
  .layout-aside-left{
    width:260px;
  }
  .q-item-side{
    width:20px;
  }
</style>
