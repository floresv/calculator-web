<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="firstname"
            :counter="10"
            :rules="nameRules"
            label="First name"
            hide-details
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="lastname"
            :counter="10"
            :rules="nameRules"
            label="Last name"
            hide-details
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-select
            v-model="select"
            :items="items"
            :rules="[(v) => !!v || 'Item is required']"
            label="Item"
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
    </v-container>
  </v-form>
</template>
<script lang="ts">
export default {
  data: () => ({
    valid: false,
    firstname: '',
    lastname: '',
    nameRules: [
      (value) => {
        if (value) return true

        return 'Name is required.'
      },
      (value) => {
        if (value?.length <= 10) return true

        return 'Name must be less than 10 characters.'
      }
    ]
  }),

  methods: {
    async calculate() {
      console.log(lastname + 'logged in')
    }
  }
}
</script>
