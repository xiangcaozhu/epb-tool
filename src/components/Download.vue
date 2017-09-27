<template>
  <div>
    <q-toolbar slot="header" color="secondary">
      <q-btn
        flat
        v-if="isMenu"
        @click="$refs.layout.toggleLeft()"
      >
        <q-icon name="menu" />
      </q-btn>
      <q-toolbar-title class="text-center">
        企业起名核名系统
      </q-toolbar-title>
    </q-toolbar>
    下载
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
  .layout-aside-left{
    width:260px;
  }
  .q-item-side{
    width:20px;
  }
</style>
