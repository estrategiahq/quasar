<template>
  <q-layout view="lHh Lpr lFf">
    <q-drawer
      v-model="leftDrawerOpen"
      :mini="mini"
      :breakpoint="320"
      content-class="drawer-background text-white flex column q-pt-lg justify-start"
    >
      <div class="text-h6 q-mb-lg q-pl-md q-pr-md text-uppercase row justify-between items-center">
        <span v-if="!mini">BO</span>
        <q-icon
          :name="mini ? 'arrow_forward_ios' : 'arrow_back_ios'"
          @click="mini = !mini"
          class="cursor-pointer"
        />
      </div>
      <q-list>
        <q-item
          v-for="i in menus"
          :key="JSON.stringify(i)"
          :to="{ name: i.routeName }"
          tag="a"
          clickable
          active-class="drawer-menu-active"
        >
          <q-item-section avatar class="q-mini-drawer-only">
            {{ i.abbreviation }}
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ i.name }}</q-item-label>
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
import { menus, TOKEN } from '../constants'
export default {
  data () {
    return {
      menus,
      leftDrawerOpen: true,
      mini: false
    }
  },
  async created () {
    localStorage.setItem(TOKEN, 'awaiting-token-from-container')
    return new Promise((resolve, reject) => {
      this.$bridger.$subscribe('event:user-login', payload => {
        localStorage.setItem('email', payload.email)
        localStorage.setItem(TOKEN, payload.token)
        localStorage.setItem('acl', JSON.stringify(payload.acl))
        resolve()
      })
    })
  }
}
</script>
