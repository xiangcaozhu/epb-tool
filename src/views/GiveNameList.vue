<template>
  <div>
    
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

</style>
