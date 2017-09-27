<template>
  <q-layout
    ref="layout"
    view="lHh Lpr fff"
    :left-class="{'bg-grey-2': true}"
  >
    <div slot="left" v-if="isMenu">
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
    <!-- 展示的内容 -->
    <router-view />
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
       isMenu:true
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
