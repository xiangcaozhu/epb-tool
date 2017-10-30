<template>
  <div>
    <q-card v-for="(item,index) of list" :key="index" class="index-page" >
      <q-card-media overlay-position="top">
        <img :src="item.src">
        <q-card-title slot="overlay">
          {{item.name}}
          <span class="row items-center fr">{{item.type}}<strong class="text-amber-8">{{item.count}}</strong>次</span>
          <span slot="subtitle">{{item.subName}}</span>
        </q-card-title>
        <q-btn class="card-btn" @click.native="goPage(item.to)" :color="item.color">{{item.link}}</q-btn> 
      </q-card-media>
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
  QCardMain,
  QCardActions,
  QCardSeparator
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
    QCardMain,
    QCardActions,
    QCardSeparator
  },
  data () {
    return {
      list: [
        {name: '公司起名', subName: '智能生成，工商通过率高的名字', src: require('assets/gsqm.jpg'), type: '已起名', count: 5848931, color: 'amber-9', link: '我要起名', to: 'giveName'},
        {name: '公司核名', subName: '输入名字，测试工商通过率', src: require('assets/gshm.jpg'), type: '已核名', count: 6905132, color: 'cyan-4', link: '我要核名', to: 'checkName'},
        {name: '经营范围查询', subName: '查询注册行业的经营范围', src: require('assets/gsfw.jpg'), type: '已查询', count: 1422079, color: 'light-blue', link: '我要生成', to: 'manageRange'}
        // {name: '工商材料', subName: '注册公司、常用合同、协议等工商材料下载', src: require('assets/gswd.jpg'), type: '已下载', count: 1086542, color: 'positive', link: '我要下载', to: 'materialList'}
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
      subTitle: '公司起名核名商标查询入口',
      bgColor: 'grey-3',
      iconColor: 'grey-6',
      titleClass: 'text-center text-dark'
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
  .index-page{
    padding:0;
    margin:0 0 10px 0;
    box-shadow:none;
  }
  .index-page .q-card-media-overlay{
    background-color:transparent;
  }
  .index-page .q-card-title{
    font-size:24px;
    font-family:'微软雅黑';
    margin-bottom:6px;
  }
  .index-page .q-card-subtitle{
    font-family:'微软雅黑';
  }
  .fr{
    float:right;
    font-size:16px;
  }
  .card-btn{
    position:absolute;
    width:115px;
    bottom:20px;
    left:50%;
    margin-left:-57px;
    font-family:'微软雅黑';
  }
</style>
