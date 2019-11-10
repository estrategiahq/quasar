<template>
  <q-layout view="lhr lPr lFr">
    <q-drawer
      content-class="drawer-background text-white flex column q-pt-lg justify-start"
      :breakpoint="320"
      :mini="mini"
      v-model="leftDrawerOpen"
    >
      <div class="text-h6 q-mb-lg q-pl-md q-pr-md text-uppercase row justify-between items-center">
        <span v-if="!mini">Repositories</span>
        <q-icon
          :name="mini ? 'arrow_forward_ios' : 'arrow_back_ios'"
          @click="mini = !mini"
          class="cursor-pointer"
        />
      </div>
      <q-list>
        <q-item
          clickable
          tag="a"
          :to="{ name: 'repositories' }"
          active-class="drawer-menu-active"
        >
          <q-item-section avatar class="q-mini-drawer-only">
            R
          </q-item-section>
          <q-item-section>
            <q-item-label>Repositories</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          tag="a"
          target="_blank"
          href="https://github.quasar.dev"
        >
          <q-item-section avatar class="q-mini-drawer-only">
            E
          </q-item-section>
          <q-item-section>
            <q-item-label>External Link</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { events } from '../constants'
export default {
  events,
  created () {
    this.$subscribe(events.LOADING_START, () => {
      this.$q.loading.show()
    })
    this.$subscribe([events.LOADING_STOP, events.REQUEST_ERROR], () => {
      this.$q.loading.hide()
    })
    this.$subscribe(events.DIALOG_ERROR, message => {
      this.$q.dialog({
        title: 'Alguma coisa errada não está certa',
        position: 'bottom',
        message
      })
    })
  },
  data () {
    return {
      mini: false,
      leftDrawerOpen: true
    }
  },
  methods: {
    logout () {
      this.$q.localStorage.clear()
      window.location.href = '/'
    }
  }
}
</script>
<style>
.drawer-background {
  background: #111146;
}
.drawer-background > .q-item-type {
  color: #fff;
  opacity: .6;
}
.drawer-menu-active {
  border-left: 2px solid #fff;
  background: #030331;
  opacity: 1;
}
</style>
