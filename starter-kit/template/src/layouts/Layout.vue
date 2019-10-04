<template>
  <q-layout view="lHh Lpr lFf">
    <q-drawer
      v-model="leftDrawerOpen"
      :mini="mini"
      :breakpoint="320"
      content-class="drawer-background text-white flex column q-pt-lg justify-start"
    >
      <div class="text-h6 q-mb-lg q-pl-md q-pr-md text-uppercase row justify-between items-center">
        <span v-if="!mini">{{ name }}</span>
        <q-icon
          :name="mini ? 'arrow_forward_ios' : 'arrow_back_ios'"
          @click="mini = !mini"
          class="cursor-pointer"
        />
      </div>
      <q-list>
        <q-item clickable tag="a" :to="{ name: 'login' }" active-class="drawer-menu-active">
          <q-item-section avatar class="q-mini-drawer-only">
            L
          </q-item-section>
          <q-item-section>
            <q-item-label>Login</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" :to="{ name: 'repositories' }" active-class="drawer-menu-active">
          <q-item-section avatar class="q-mini-drawer-only">
            R
          </q-item-section>
          <q-item-section>
            <q-item-label>Repositories</q-item-label>
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
export default {
  name: 'Layout',
  created () {
    this.$subscribe('apollo-loading-on', () => {
      this.$q.loading.show()
    })
    this.$subscribe(['apollo-error', 'apollo-loading-off'], () => {
      this.$q.loading.hide()
    })
  },
  data () {
    return {
      leftDrawerOpen: true,
      mini: false
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
