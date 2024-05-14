<template>
  <v-form v-model="valid">
    <v-container>
      <h1>New Operation</h1>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="first_value"
            :counter="10"
            :rules="valueRules"
            label="First value"
            hide-details
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="second_value"
            :counter="10"
            :rules="valueRules"
            label="Second value"
            hide-details
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-select
            v-model="operation"
            :items="items"
            :rules="[(v) => !!v || 'Item is required']"
            label="Operation"
            required
          ></v-select>
        </v-col>
      </v-row>
      <v-row class="align-center">
        <v-col cols="12" md="4"></v-col>
        <v-col cols="12" md="4">
          <v-btn class="mt-4" color="success" block @click="calculate"> Calculate </v-btn>
        </v-col>
      </v-row>
      <div class="red--text" v-if="error">
        {{ error }}
      </div>
      <div class="green--text" v-if="result">
        <h1>Result:</h1>
        <h2>{{ result }}</h2>
      </div>
    </v-container>
  </v-form>
</template>
<script lang="ts">
import { useOperationStore } from '@/stores/operation'
export default {
  name: 'Home',
  data: () => ({
    valid: false,
    first_value: '',
    second_value: '',
    operation: '',
    result: '',
    error: '',
    items: [
      'addition',
      'subtraction',
      'multiplication',
      'division',
      'square_root',
      'random_string'
    ],
    valueRules: [
      (value) => {
        if (value) return true

        return 'Value is required'
      }
    ]
  }),

  methods: {
    async calculate() {
      this.result = ''
      this.error = ''
      const operationStore = useOperationStore()
      console.log(this.first_value, this.second_value, this.operation)
      const response = await operationStore
        .calculate(this.first_value, this.second_value, this.operation)
        .catch((error) => {
          this.error = error
        })
      if (response) {
        this.result = response['record']['operation_response']
      }
    }
  }
}
</script>
