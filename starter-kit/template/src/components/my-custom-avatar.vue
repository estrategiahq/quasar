<template>
  <div class="q-gutter-sm">
    <q-chip>
      <q-avatar>
        <img class="my-avatar" :src="item ? item.avatarUrl : ''" />
      </q-avatar>
      <span>\{{ item ? item.login : '' }}</span>
    </q-chip>
  </div>
</template>

<script>
export default {
  props: ['item']
}
</script>
