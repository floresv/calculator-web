import { defineStore } from 'pinia'

import { fetchWrapper } from '@/helpers'

const baseAPI = 'http://localhost:5001'
const operationUrl = `${baseAPI}/v1/records`

export const useOperationStore = defineStore({
  id: 'operation',
  state: () => ({
    result: {}
  }),
  actions: {
    setResult(result: any) {
      this.result = result
    },
    async calculate(first_value: string, second_value: string, operation: string) {
      const params = {
        first_value,
        second_value,
        operation
      }
      const response = await fetchWrapper.post(operationUrl, params)
      this.setResult(response)
      console.log(response)
      return response
    }
  }
})
