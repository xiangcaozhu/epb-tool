<template>
  <q-layout
    ref="layout"
    view="lHh Lpr fff"
    :left-class="{'bg-grey-2': true}"
  >
    <q-toolbar slot="header" color="secondary">
      <q-btn
        flat
        @click="$refs.layout.toggleLeft()"
      >
        <q-icon name="menu" />
      </q-btn>

      <q-toolbar-title class="text-center">
        企业起名核名系统
      </q-toolbar-title>
    </q-toolbar>
    <div slot="left">
      <q-list no-border link inset-delimiter>
        <q-list-header>企大师项目</q-list-header>
        <q-item>
          <q-item-side icon="supervisor account" />
          <q-item-main label="公司起名系统" sublabel="企大师为你智能推荐名字" />
        </q-item>
        <q-item>
          <q-item-side icon="playlist add check" />
          <q-item-main label="公司核名系统" sublabel="公司名字工商查名 3秒出结果" />
        </q-item>
        <q-item>
          <q-item-side icon="settings input component" />
          <q-item-main label="经营范围智能生成！" sublabel="经营范围智能生成！" />
        </q-item>
        <q-item>
          <q-item-side icon="file download" />
          <q-item-main label="工商材料下载" sublabel="工商材料下载" />
        </q-item>
      </q-list>
    </div>
    <!-- 内容区域子路由 -->
    <!-- 公司起名系统 start-->
    <q-card class="">
      <q-card-media overlay-position="top">
        <img src="~assets/parallax2.63cd0bb.jpg">
        <q-card-title slot="overlay">
          公司起名系统
          <span slot="subtitle">企大师为您智能推荐名字</span>
        </q-card-title>
      </q-card-media>
      <q-card-actions class="q-card-actions-horiz row justify-around">
            <span class="row items-center">已起名<strong color="red">10238385</strong>次</span>
            <q-btn color="primary">我要起名</q-btn> 
      </q-card-actions>
    </q-card>
    <!-- 公司起名系统 end -->
    <!-- 公司核名系统 -->
    <q-card class="">
      <q-card-media overlay-position="top">
        <img src="~assets/parallax2.63cd0bb.jpg">
        <q-card-title slot="overlay">
          公司核名系统
          <span slot="subtitle">公司名字工商查名 3秒出结果</span>
        </q-card-title>
      </q-card-media>
      <q-card-actions  class="q-card-actions-horiz row justify-around">
        <span class="row items-center">已起名10238385次</span>
        <q-btn color="secondary">我要核名</q-btn>
      </q-card-actions>
    </q-card>
    <!-- 公司核名系统 end-->
    <!-- 经营范围智能生成 -->
    <q-card class="">
      <q-card-media overlay-position="top">
        <img src="~assets/parallax2.63cd0bb.jpg">
        <q-card-title slot="overlay">
          经营范围智能生成
          <span slot="subtitle">经营范围智能生成</span>
        </q-card-title>
      </q-card-media>
      <q-card-actions  class="q-card-actions-horiz row justify-around">
        <span class="row items-center">已起名10238385次</span>
        <q-btn color="info">我要生成</q-btn>
      </q-card-actions>
    </q-card>
    <!-- 经营范围智能生成 end-->
    <!-- 工商材料下载 -->
    <q-card class="">
      <q-card-media overlay-position="top">
        <img src="~assets/parallax2.63cd0bb.jpg">
        <q-card-title slot="overlay">
          工商材料下载
          <span slot="subtitle">工商材料下载</span>
        </q-card-title>
      </q-card-media>
      <q-card-actions  class="q-card-actions-horiz row justify-around">
        <span class="row items-center">已起名10238385次</span>
        <q-btn color="green">我要下载</q-btn>
      </q-card-actions>
    </q-card>
    <!-- 工商材料下载 end-->
  </q-layout>
</template>

<script type="text/ecamscript6">
import {
  dom,
  event,
  openURL,
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
    QCard,
    QCardTitle,
    QCardMedia,
    QCardActions,
    QCardSeparator,
    QCardMain
  },
  data () {
    return {

    }
  },
  computed: {
    
  },
  methods: {

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
