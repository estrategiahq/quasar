<template>
  <q-page class="q-pl-md q-pr-md">
    <div class="text-h5 q-pb-lg q-pt-lg text-grey-8 text-weight-bold">Repositories</div>
    <q-table
      :columns="columns"
      :data="items"
      :rows-per-page-options="[10, 30, 50, 0]"
      :pagination.sync="pagination"
      square
      bordered
      flat
      row-key="id"
      wrap-cells
      class="bg-grey-1"
      :dense="false"
      rows-per-page-label="Per page:"
      :filter="filter"
      @request="fetchItems"
    >
      <template v-slot:top-right>
        <q-input v-model="filter" borderless dense debounce="300" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
          </q-input>
      </template>
      <template slot="body" slot-scope="props" :props="props">
        <q-tr
          :props="props"
          class="cursor-pointer"
          @click.native="edit(props.row.node.owner.login, props.row.node.name)"
        >
          <q-td key="name" :props="props">\{{ props.row.node.owner.login }}/\{{ props.row.node.name }}</q-td>
          <q-td key="stars" :props="props">\{{ props.row.node.stargazers.totalCount }}</q-td>
          <q-td key="description" :props="props">\{{ props.row.node.description }}</q-td>
        </q-tr>
      </template>
    </q-table>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      columns: [
        { name: 'name', label: 'Repository', align: 'left', field: 'name' },
        { name: 'stars', label: 'Stars', align: 'left', field: row => row.stargazers.totalCount },
        { name: 'description', label: 'Description', align: 'left', field: 'description' }
      ],
      items: [],
      filter: '',
      loading: false,
      pagination: {
        page: 1,
        prevPage: 0,
        rowsPerPage: 10,
        rowsNumber: 19,
        info: {}
      }
    }
  },
  mounted () {
    this.fetchItems({
      pagination: this.pagination,
      filter: this.filter
    })
  },
  methods: {
    edit (owner, name) {
      this.$router.push({
        name: 'form',
        params: { owner, name }
      })
    },
    async fetchItems ({ pagination, filter }) {
      let result = await this.$s.repository.fetchItems({
        pagination,
        filter
      })
      this.items = result.items
      this.pagination = result.pagination
    }
  }
}
</script>
