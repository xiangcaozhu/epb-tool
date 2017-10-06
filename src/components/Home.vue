<template>
  <q-layout
    ref="layout"
    view="lHh Lpr fff"
    :left-class="{'bg-grey-2': true}"
  >
    <!-- 头部nav start -->
    <q-toolbar slot="header" color="secondary">
      <q-btn
        flat
        v-if="isMenu"
        @click="$refs.layout.toggleLeft()"
      >
        <q-icon name="menu" />
      </q-btn>
      <q-toolbar-title class="text-center">
        企业起名核名系统
      </q-toolbar-title>
      <q-btn
        flat
        @click=""
      >
        <q-icon name="account circle"/>
      </q-btn>
    </q-toolbar>
    <!-- 头部nav end -->
    <!-- 左侧菜单栏 start-->
    <div slot="left" v-if="isMenu">
      <q-list no-border link inset-delimiter>
        <q-list-header>企大师项目</q-list-header> 
        <q-side-link item to="/homeList">
          <q-item>
            <q-item-side icon="home" />
            <q-item-main label="首页" sublabel="企大师为你智能推荐名字" />
          </q-item>
        </q-side-link>
        <q-side-link item to="/giveName">
          <q-item>
            <q-item-side icon="supervisor account" />
            <q-item-main label="公司起名系统" sublabel="企大师为你智能推荐名字" />
          </q-item>
        </q-side-link>
        <q-side-link item to="/checkName">
          <q-item>
            <q-item-side icon="playlist add check" />
            <q-item-main label="公司核名系统" sublabel="公司名字工商查名 3秒出结果" />
          </q-item>
        </q-side-link>
        <q-side-link item to="/manageRange">
          <q-item>
            <q-item-side icon="settings input component" />
            <q-item-main label="经营范围智能生成！" sublabel="经营范围智能生成！" />
          </q-item>
        </q-side-link>
        <q-side-link item to="/download">
          <q-item>
            <q-item-side icon="file download" />
            <q-item-main label="工商材料下载" sublabel="工商材料下载" />
          </q-item>
        </q-side-link>
      </q-list>
    </div>
    <!-- 左侧菜单栏 end-->
    <!-- 展示的内容 -->
    <router-view />
  </q-layout>
</template>

<script>
import {
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
    QCardMain
  },
  data () {
    return {
      isMenu: true
    }
  },
  methods: {
    goPage (to) {
      this.$router.push({ path: to, name: to })
      this.$refs.layout.hideLeft()
    }
  },
  mounted () {
    this.$nextTick(() => {

    })
  }

}
</script>

<style lang="stylus">
  .layout-aside-left{
    width:260px;
  }
  .q-item-side{
    width:20px;
  }
</style>
