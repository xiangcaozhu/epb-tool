<template>
  <div>
    <q-card v-for="(item,index) of list" :key="index" class="" >
      <q-card-media overlay-position="top">
        <img :src="item.src">
        <q-card-title slot="overlay">
          {{item.name}}
          <span slot="subtitle">{{item.subName}}</span>
        </q-card-title>
      </q-card-media>
      <q-card-actions class="q-card-actions-horiz row justify-around">
          <span class="row items-center">已起名<strong class="text-red">{{item.count}}</strong>次</span>
          <q-btn @click.native="goPage(item.to)" :color="item.color">{{item.link}}</q-btn> 
      </q-card-actions>
    </q-card>
</div>
</template>
<script>
import {
  event,
  openURL,
  QToolbar,
  QToolbarTitle,
  QBtn,
  QIcon,
  QCard,
  QCardTitle,
  QCardMedia,
  QCardActions,
  QCardSeparator,
  QCardMain
} from 'quasar'

export default {
  name: 'homelist',
  components: {
    event,
    openURL,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QCard,
    QCardTitle,
    QCardMedia,
    QCardActions,
    QCardSeparator,
    QCardMain
  },
  data () {
    return {
      title: '企业起名核名系统',
      isMenu: false,
      list: [
        {name: '公司起名系统', subName: '企大师为您智能推荐名字', src: require('assets/parallax2.63cd0bb.jpg'), count: 2345, color: 'primary', link: '我要起名', to: 'giveName'},
        {name: '公司核名系统', subName: '公司名字工商查名 3秒出结果', src: require('assets/parallax2.63cd0bb.jpg'), count: 10238385, color: 'secondary', link: '我要核名', to: 'checkName'},
        {name: '经营范围智能生成', subName: '经营范围智能生成', src: require('assets/parallax2.63cd0bb.jpg'), count: 2345, color: 'info', link: '我要生成', to: 'manageRange'},
        {name: '工商材料下载', subName: '工商材料下载', src: require('assets/parallax2.63cd0bb.jpg'), count: 233445, color: 'positive', link: '我要下载', to: 'download'}
      ]
    }
  },
  methods: {
    goPage (to) {
      // 编程式的导航
      this.$router.push({ path: to, name: to })
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
