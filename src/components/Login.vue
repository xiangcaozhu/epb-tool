<template>
  <div>
    <!-- 行业选择 start-->
    <q-modal ref="layoutModal" :content-css="{minWidth: '80vw', minHeight: '80vh'}">
      <q-modal-layout>
        <q-toolbar slot="header">
          <q-btn flat @click="$refs.layoutModal.close()">
            <q-icon name="keyboard_arrow_left" />
          </q-btn>
          <q-toolbar-title>
            登录
          </q-toolbar-title>
        </q-toolbar>
        <q-toolbar slot="footer">
          <q-toolbar-title>
            Footer
          </q-toolbar-title>
        </q-toolbar>

        <div class="layout-padding">
          <h1>Modal</h1>
          <q-btn color="primary" @click="$refs.layoutModal.close()">Close</q-btn>
          <p class="caption" v-for="(item, index) in industrys" :key="index" :data-code="item.code">{{item.label}}</p>
        </div>
      </q-modal-layout>
    </q-modal>
    <!-- 行业选择 end-->
  </div>
</template>

<script>
import {
  Toast,
  Ripple,
  QBtn,
  QIcon,
  QModal,
  QModalLayout,
  QToolbar,
  QToolbarTitle,
  QSearch,
  QList,
  QItem,
  QItemSide,
  QItemMain
} from 'quasar'
import localData form 'static/localData'
export default {
  components: {
    Toast,
    Ripple,
    QBtn,
    QIcon,
    QModal,
    QModalLayout,
    QToolbar,
    QToolbarTitle,
    QSearch,
    QList,
    QItem,
    QItemSide,
    QItemMain
  },
  data () {
    return {
      search: '',
      hotCity:localData.hotCity
    }
  }
}
</script>

<style>
</style>

