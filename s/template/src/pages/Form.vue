<template>
  <q-page class="q-pa-md">
    <div class="text-h5 text-weight-bold">
      \{{ item.nameWithOwner }}
    </div>
    <MyCustomAvatar
      :item="item.owner"
      :key="JSON.stringify(item.owner)"
      class="q-pt-md"
    />
    <div class="q-pt-lg q-pb-md">
      <q-form>
        <div class="field q-mb-md">
          <q-input
            outlined
            square
            bg-color="white"
            label="Name"
            stack-label
            v-model="item.name"
          />
        </div>
        <div class="field q-mb-md">
          <q-input
            outlined
            square
            bg-color="white"
            label="Description"
            stack-label
            type="textarea"
            v-model="item.description"
          />
        </div>
        <div class="field q-mb-md">
          <q-select
            outlined
            square
            bg-color="white"
            label="Languages"
            stack-label
            multiple
            use-chips
            :options="languages.all"
            v-model="languages.selected"
          >
          </q-select>
        </div>
        <div class="field q-mb-md">
          <q-btn color="primary" @click="removeStar(item.id)" enabled="item.id" label="Remove star">
            <q-badge color="red" floating>\{{ item.stargazers.totalCount }}</q-badge>
          </q-btn>
          <q-btn color="secondary" flat class="q-ml-md" @click="$router.back()">Back</q-btn>
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
export default {
  mounted () {
    this.fetchOne(this.$route.params)
  },
  data () {
    return {
      item: {
        languages: [],
        stargazers: {}
      },
      languages: {
        all: [],
        selected: []
      }
    }
  },
  methods: {
    async fetchOne (params) {
      const { owner, name } = params
      const item = await this.$s.repository.fetchOne({ owner, name })
      this.item = item
      this.languages.all = item.languages.nodes.map(lang => lang.name)
      this.languages.selected = this.languages.all
    },
    async removeStar (starrableId) {
      const item = await this.$s.repository.removeStar({ starrableId })
      this.item.stargazers.totalCount = item.starrable.stargazers.totalCount
    }
  }
}
</script>
