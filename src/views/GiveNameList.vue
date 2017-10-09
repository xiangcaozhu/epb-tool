<template>
  <div>
      <div class="row tab ">
        <div class="col-4 item">
            <q-btn flat icon-right="keyboard arrow down">{{formData.city}}</q-btn>
        </div>
        <div class="col-4 item">
            <q-btn flat icon-right="keyboard arrow down">{{formData.industry}}</q-btn>
        </div>
        <div class="col-4 item">
            <q-btn class="tab-submit" color="primary" small>推荐名称</q-btn>
        </div>
    </div>
    <div class="table-wrap">
      <table class="q-table striped-odd">
        <thead>
          <tr>
            <th class="text-left">推荐公司名字</th>
            <th class="text-right">通过率</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in tableData" @click="checkNameSubmit(item.city, item.name, item.industry, item.type)">
            <td class="text-left">{{item.city}} <span class="company-name">{{item.name}}</span> {{item.industry}} {{item.type}}</td>
            <td class="text-right"><span class="pass-rate" :class="{'hight':item.rate=='高', 'middle':item.rate=='中', 'low':item.rate=='低'}">{{item.rate}}</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import {
  QInput,
  QBtn,
  QIcon,
  QSelect,
  QField
} from 'quasar'
// 导出常用的数据对象
import localData from 'static/localData'
import api from 'api/index'
export default {
  name: 'giveName',
  components: {
    QInput,
    QBtn,
    QIcon,
    QSelect,
    QField
  },
  data () {
    return {
      isMenu: true,
      formData: {
        city: this.$route.query.city,
        industry: this.$route.query.industry
      },
      tableData: [],
      hotCity: localData.hotCity,
      industrys: localData.industrys
    }
  },
  created () {
    console.log(this.formData.city)
    console.log(this.formData.industry)
    this.giveNameSubmit()
  },
  methods: {
    // 如果没有登录跳转到登陆页，如果已经登录，可以查询数据
    giveNameSubmit () {
      api.getCompanyName(this.formData.city, this.formData.industry)
        .then(res => {
          if (res.data.code === 0) {
            console.log(res.data.data)
            this.tableData = res.data.data
          }
        })
    },
    checkNameSubmit (city, name, industry, type) {
      this.$router.push({path: '/checkName', name: 'checkName', query: { city: city, name: name, industry: industry, from: type }})
      // api.getCompanyDetail(city, name, industry, type).then(res => {
      //   if (res.data.code === 0) {
      //     console.log(res.data.data)
      //   }
      // })
    }
  },
  mounted () {
    this.$nextTick(() => {
    })
  }

}
</script>

<style lang="stylus" scoped>
  .tab
    background-color #f5f5f5;
    .item
      border-right:1px solid #dedede;
    .item:last-child
      border-right:none;
    button
      display:block
      padding:0 5px;
      margin:0 auto;
      text-align:center;
      .on-right
        margin-left:0!important;
    .tab-submit
      width:80%;
      margin:5px auto;
  .table-wrap
    width:100%;
    padding:10px;
    margin-top:10px;
    table
      width: 100%;
      border:1px solid #f39800;
      th
        color:#fff;
        background-color:#f39800;
      td,th
        text-align:center;
      .pass-rate
        display:inline-block;
        padding:5px 8px;
        border-radius:5px;
        color:#fff;
      .hight
        background-color:green;
      .middle
        background-color:#f39800;
      .low
        background-color:#f00;    
  .company-name
    color:#f00;
</style>
