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
      <q-card-actions class="q-card-actions-horiz row justify-between">
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
import { mapGetters, mapMutations } from 'vuex'
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
      list: [
        {name: '公司起名', subName: '智能生成，工商通过率高的名字', src: require('assets/gsqm.jpg'), count: 5848931, color: 'primary', link: '我要起名', to: 'giveName'},
        {name: '公司核名', subName: '输入名字，测试工商通过率', src: require('assets/gshm.jpg'), count: 6905132, color: 'secondary', link: '我要核名', to: 'checkName'},
        {name: '经营范围查询', subName: '查询注册行业的经营范围', src: require('assets/gsfw.jpg'), count: 1422079, color: 'info', link: '我要生成', to: 'manageRange'},
        {name: '工商材料', subName: '注册公司、常用合同、协议等工商材料下载', src: require('assets/gswd.jpg'), count: 1086542, color: 'positive', link: '我要下载', to: 'materialList'}
      ]
    }
  },
  computed: {
    ...mapGetters(['isLoading'])
  },
  methods: {
    ...mapMutations(['headBar', 'setMenuIcon']),
    goPage (to) {
      // 编程式的导航
      this.$router.push({ path: to, name: to })
    }
  },
  created () {
    this.setMenuIcon(true)
    this.headBar({
      title: '易企名',
      subTitle: '公司起名核名商标查询入口'
    })
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
