<template>
  <div>
    起名系统
  </div>
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

</style>
