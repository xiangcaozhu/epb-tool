<template>
  <div>
    <div class="wrap-content">
      <ul>
        <li>{{detailData.title}}</li>
        <li>{{detailData.usefor}}</li>
        <li>{{detailData.description}}</li>
      </ul>
      <div class="">
        <div class="wrap-images" v-for="(item, index) in detailData.picList">
          <img :src="item" :alt="detailData.title">
        </div>
      </div>
    </div>
    <div class="row tabs tabs-bottom">
      <div class="col item"><q-icon color="primary" name="reply" size="20px"/>返回</div>
      <div class="col item"><q-icon color="primary" name="phone" size="20px"/>电话咨询</div>
      <div class="col item strong"><q-icon @click="downloadMaterial" color="white" name="file download" size="20px"/>立即下载</div>
    </div>
  </div>
</template>

<script>
import {
  QBtn,
  QIcon
} from 'quasar'

import api from 'api/index'
// import { mapMutations } from 'vuex'

export default {
  name: 'index',
  components: {
    QBtn,
    QIcon
  },
  data () {
    return {
      isMenu: true,
      detailData: {}
    }
  },
  created () {
    this.getMaterialIdDetail()
  },
  methods: {
    getMaterialIdDetail () {
      api.getMaterialIdMsg(this.$route.params.id).then(res => {
        if (res.data.code === 0) {
          console.log(res.data.data)
          this.detailData = res.data.data
        }
      })
    },
    downloadMaterial () {
      if (this.$route.params.id) {
        window.location.href = `http://localhost:8080/qidashi-boot/material/${this.$route.params.id}/down?id=${this.$route.params.id}`
      }
    }
  },
  mounted () {
    this.$nextTick(() => {

    })
  }

}
</script>

<style lang="stylus">
.tabs
  position:fixed;
  width:100%;
  height:50px;
  line-height:50px;
  text-align:center;
  background-color #f5f5f5;
.tabs-bottom
  bottom:0;
  left:0;
  .item
    border-right:1px solid #dedede;
    &:last-child{
      border-right:0;
    }
  .strong
    background-color:orange;
    color:#fff;
.wrap-images
  width:100%;
  img
    max-width:100%;
    display:block;
    margin:0 auto;
    padding:0px 10px;
</style>
