<template>
  <v-app>
    <v-main class="mx-auto">
      <v-sheet class="d-flex align-center mb-6" color="transparent" height="100%" flat tile>
        <v-sheet class="ma-2 pa-2 align-self-center">
          <v-container>
            <v-layout align-self-center justify-center rounded rounded-md>
              <v-card style="min-height: 300px; min-width: 300px">
                <v-toolbar dark color="primary">
                  <v-toolbar-title><h2>Login form</h2></v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <form ref="form" @submit.prevent="login()">
                    <v-text-field
                      v-model="username"
                      name="username"
                      label="Username"
                      type="text"
                      placeholder="username"
                      required
                    ></v-text-field>

                    <v-text-field
                      v-model="password"
                      name="password"
                      label="Password"
                      type="password"
                      placeholder="password"
                      required
                    ></v-text-field>
                    <div class="red--text">{{ error }}</div>
                    <v-btn type="submit" class="mt-4" color="primary" value="log in">Login</v-btn>
                  </form>
                </v-card-text>
              </v-card>
            </v-layout>
          </v-container>
        </v-sheet>
      </v-sheet>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { loginStore } from '@/stores/login'
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      error: ''
    }
  },
  methods: {
    async login() {
      const authStore = loginStore()
      const response = await authStore.login(this.username, this.password).catch((error) => {
        this.error = error
      })
      if (response['error']) {
        this.error = response['error']
      } else {
        this.$router.push('/home')
      }
    }
  }
}
</script>
