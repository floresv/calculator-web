import { defineStore } from 'pinia'

import { fetchWrapper } from '@/helpers'

const baseAPI = 'http://localhost:5001'
const operationUrl = `${baseAPI}/v1/records`

export const useRecordStore = defineStore({
  id: 'records',
  state: () => ({
    records: []
  }),
  actions: {
    setRecords(records: any) {
      this.records = records
    },
    async getAll(params: {}) {
      debugger
      var sortby_key = params.sortBy.length ? params.sortBy[0].key : 'id'
      sortby_key = sortby_key == 'operation' ? 'operation_id' : sortby_key
      const sortby_order = params.sortBy.length ? params.sortBy[0].order : 'desc'
      const url_params = new URLSearchParams({
        page: params.page || 1,
        per_page: params.itemsPerPage || 10,
        sort_by: sortby_key,
        sort_order: sortby_order,
        filter_by_amount: params.search.amount || '',
        filter_by_operation_type: params.search.operation || '',
        filter_by_user_balance: params.search.user_balance || '',
        filter_by_operation_response: params.search.operation_response || ''
      })
      const response = await fetchWrapper.get(operationUrl + '?' + url_params, undefined)
      this.setRecords(response['records'])
      console.log(response)
      return response
    }
  }
})
