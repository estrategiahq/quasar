<template>
  <q-layout view="lHh Lpr lFf">
    <q-drawer
      v-model="leftDrawerOpen"
      content-class="drawer-background text-white flex column q-pt-lg justify-start"
      show-if-above
    >
      <q-list>
        <div class="text-h5 q-pl-md q-pb-md text-weight-bold text-brand-grey">{{ name }}</div>
        <q-item clickable tag="a" :to="{ name: 'login' }" active-class="drawer-menu-active">
        <q-item-section>
          <q-item-label>Login</q-item-label>
        </q-item-section>
        </q-item>
        <q-item clickable tag="a" :to="{ name: 'repositories' }" active-class="drawer-menu-active">
          <q-item-section>
            <q-item-label>Repositories</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="https://github.quasar.dev">
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
      leftDrawerOpen: true
    }
  }
}
</script>

<style>
.drawer-background {
  background: #111146;
}
.drawer-menu-active {
  margin-left: 50px;
  padding-left: 0;
  border-bottom: 1px solid white;
  font-weight: bold;
}
</style>
