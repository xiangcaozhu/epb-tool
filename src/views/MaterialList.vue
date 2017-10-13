<template>
  <div>
    <q-carousel infinite  fullscreen class="text-white" style="min-height:180px;">
      <div slot="slide" class="bg-grey-2 centered" v-for="(item, index) in slider" style="padding:0;">
        <img :src="item.src" alt="工商材料" class="responsive">
      </div>
    </q-carousel>
    <!-- <q-gallery-carousel :src="slider" class="responsive"></q-gallery-carousel> -->
    <div class="wrap-title">
      <h2>
        <q-chip  tag color="orange">
          工商材料| 注册公司
        </q-chip>
      </h2>
      <q-tabs v-model="tabsModel" inverted>
      <!-- Tabs - notice slot="title" -->
      <q-tab default slot="title" name="yxgs" label="有限公司"/>
      <q-tab slot="title" name="hhqy" label="合伙企业"/>
      <q-tab slot="title" name="fgs" label="分公司"/>
      <q-tab slot="title" name="grdz" label="个人独资"/>
      <!-- Targets -->
      <q-tab-pane name="yxgs">
        <div class="list" v-for="(item, index) in yxgs" :key="index">
          <router-link :to="{ name: 'materialDetail', params: { id: item.id }}"><p><q-icon color="grey-6" size="20px" name="insert drive file" />&nbsp;{{item.title}}</p></router-link>
        </div>
      </q-tab-pane>
      <q-tab-pane name="hhqy">
        <div class="list" v-for="(item,index) in hhqy" :key="index">
          <router-link :to="{ name: 'materialDetail', params: { id: item.id }}"><p><q-icon color="grey-6" size="20px" name="insert drive file" />&nbsp;{{item.title}}</p></router-link>
        </div>
      </q-tab-pane>
      <q-tab-pane name="fgs">
        <div class="list" v-for="(item,index) in fgs">
          <router-link :to="{ name: 'materialDetail', params: { id: item.id }}"><p><q-icon color="grey-6" size="20px" name="insert drive file" />&nbsp;{{item.title}}</p></router-link>
        </div>
      </q-tab-pane>
      <q-tab-pane name="grdz">
        <div class="list" v-for="(item,index) in grdz">
          <router-link :to="{ name: 'materialDetail', params: { id: item.id }}"><p><q-icon color="grey-6" size="20px" name="insert drive file" />&nbsp;{{item.title}}</p></router-link>
        </div>
      </q-tab-pane>
    </q-tabs>
    </div>
    <div class="wrap-title">
      <h2>
        <q-chip  tag color="orange">
          常用合同&amp;协议
        </q-chip>
      </h2>
      <q-tabs v-model="tabsModel2" inverted>
        <!-- Tabs - notice slot="title" -->
        <q-tab default slot="title" name="rsht" label="劳动人事合同"/>
        <q-tab slot="title" name="gqht" label="股权合同"/>
        <q-tab slot="title" name="tzqt" label="投资&amp;其他"/>
        <!-- Targets -->
        <q-tab-pane name="rsht">
          <div class="list" v-for="(item,index) in rsht">
            <router-link :to="{ name: 'materialDetail', params: { id: item.id }}"><p><q-icon color="grey-6" size="20px" name="insert drive file" />&nbsp;{{item.title}}</p></router-link>
          </div>
        </q-tab-pane>
        <q-tab-pane name="gqht">
          <div class="list" v-for="(item,index) in gqht">
            <router-link :to="{ name: 'materialDetail', params: { id: item.id }}"><p><q-icon color="grey-6" size="20px" name="insert drive file" />&nbsp;{{item.title}}</p></router-link>
          </div>
        </q-tab-pane>
        <q-tab-pane name="tzqt">
          <div class="list" v-for="(item,index) in tzqt">
            <router-link :to="{ name: 'materialDetail', params: { id: item.id }}"><p><q-icon color="grey-6" size="20px" name="insert drive file" />&nbsp;{{item.title}}</p></router-link>
          </div>
        </q-tab-pane>
      </q-tabs>
    </div>
  </div>
</template>

<script>
import {
  Toast,
  QInput,
  QBtn,
  QIcon,
  QGalleryCarousel,
  QCarousel,
  QTabs,
  QTab,
  QTabPane,
  QChip
} from 'quasar'

import api from 'api/index'
import { mapMutations } from 'vuex'
export default {
  name: 'materialList',
  components: {
    Toast,
    QInput,
    QBtn,
    QIcon,
    QGalleryCarousel,
    QCarousel,
    QTabs,
    QTab,
    QTabPane,
    QChip
  },
  data () {
    return {
      slider: [
        { src: require('assets/gswd.jpg') },
        { src: require('assets/gsfw.jpg') },
        { src: require('assets/gshm.jpg') },
        { src: require('assets/gsqm.jpg') },
        { src: require('assets/gsjz.jpg') }
      ],
      tabsModel: '',
      tabsModel2: '',
      yxgs: [],
      hhqy: [],
      fgs: [],
      grdz: [],
      rsht: [],
      gqht: [],
      tzqt: []
    }
  },
  created () {
    // 初始化根据query,加载api
    this.getMaterialList()
    this.setMenuIcon(true)
    this.headBar({
      title: '工商材料',
      subTitle: '下载列表'
    })
  },
  methods: {
    ...mapMutations([
      'searchCityModal',
      'searchIndustryModal',
      'headBar',
      'setMenuIcon'
    ]),
    getMaterialList () {
      api.getMaterialAll().then(res => {
        // 有限公司,合伙企业,分公司,个人独资,劳动人事合同,股权合同,投资&其他
        if (res.data.code === 0) {
          console.log(res.data.data)
          res.data.data.forEach((item, index) => {
            switch (item.classify) {
              case '有限公司':
                this.yxgs.push(item)
                break
              case '合伙企业':
                this.hhqy.push(item)
                break
              case '分公司':
                this.fgs.push(item)
                break
              case '个人独资':
                this.grdz.push(item)
                break
              case '劳动人事合同':
                this.rsht.push(item)
                break
              case '股权合同':
                this.gqht.push(item)
                break
              case '投资&其他':
                this.tzqt.push(item)
                break
            }
          })
        }
      })
    }

  },
  mounted () {
    this.$nextTick(() => {
    })
  }

}
</script>

<style lang="stylus" scoped>
.wrap-title
  padding:10px;
  h2
    font-size:20px;
    font-weight:bold;
    margin-top:0;
  .list
    a
      color:#333;
</style>
