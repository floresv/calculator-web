<template>
  <v-container>
    <h1>Records</h1>
    <v-data-table-server
      v-model:items-per-page="perPage"
      :headers="headers"
      :items="serverItems"
      :items-length="totalItems"
      :loading="loading"
      :search="search"
      item-value="operation"
      @update:options="loadItems"
    >
      <template v-slot:tfoot>
        <tr>
          <td align="center">Search</td>
          <td>
            <v-text-field
              v-model="operation"
              class="ma-2"
              placeholder="Operation"
              hide-details
              min-width="100px"
            ></v-text-field>
          </td>
          <td align="center">Search</td>
          <td>
            <v-text-field
              v-model="amount"
              class="ma-2"
              placeholder="Cost"
              hide-details
              width="100px"
            ></v-text-field>
          </td>
        </tr>
        <tr>
          <td align="center">Search</td>
          <td>
            <v-text-field
              v-model="user_balance"
              class="ma-2"
              placeholder="Balance"
              hide-details
              min-width="100px"
            ></v-text-field>
          </td>
          <td align="center">Search</td>
          <td>
            <v-text-field
              v-model="operation_response"
              class="ma-2"
              placeholder="Result"
              hide-details
              width="100px"
            ></v-text-field>
          </td>
        </tr>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon size="small" @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table-server>
  </v-container>
</template>
<script lang="ts">
import { useRecordStore } from '@/stores/records'

export default {
  data: () => ({
    perPage: 10,
    headers: [
      { title: 'ID', key: 'id', align: 'start' },
      {
        title: 'Operation',
        align: 'start',
        key: 'operation'
      },
      { title: 'Cost', key: 'amount', align: 'end' },
      { title: 'Balance', key: 'user_balance', align: 'end' },
      { title: 'Result', key: 'operation_response', align: 'end' },
      { title: 'Actions', key: 'actions', sortable: false }
    ],
    serverItems: [],
    sortBy: 'id',
    loading: true,
    totalItems: 0,
    search: '',
    amount: '',
    operation: '',
    user_balance: '',
    operation_response: ''
  }),
  watch: {
    amount() {
      this.search = String(Date.now())
    },
    user_balance() {
      this.search = String(Date.now())
    },
    operation() {
      this.search = String(Date.now())
    },
    operation_response() {
      this.search = String(Date.now())
    }
  },
  methods: {
    async loadItems({ page, itemsPerPage, sortBy, search }) {
      this.loading = true
      const recordStore = useRecordStore()
      const response = await recordStore.getAll({
        page,
        itemsPerPage,
        sortBy,
        search: {
          amount: this.amount,
          operation: this.operation,
          user_balance: this.user_balance,
          operation_response: this.operation_response
        }
      })
      this.serverItems = response['records']
      this.totalItems = response['total']
      this.loading = false
    },
    async deleteItem(item) {
      this.loading = true
      const recordStore = useRecordStore()
      await recordStore.deleteRecord(item.raw.id)
      await this.loadItems({ page: 0, sortBy: {} })
      this.loading = false
    }
  }
}
</script>
