<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Side from './components/Side.vue'
import Login from './components/Login.vue'
import Home from './components/Home.vue'
</script>

<template>
  <header>
    <img alt="Logo" class="logo" src="@/assets/calculator.png" width="125" height="125" />

    <div class="wrapper">
      <Side msg="Calculator" />

      <nav>
        <RouterLink v-if="!loginStore().isLoggedIn" to="/">Login</RouterLink>
        <RouterLink v-if="loginStore().isLoggedIn" to="/home">Home</RouterLink>
        <RouterLink v-if="loginStore().isLoggedIn" to="/records">Records</RouterLink>
        <!-- <v-list-item link v-if="loginStore().isLoggedIn">
          <v-list-item-content v-on:click="logout">Log out</v-list-item-content>
        </v-list-item> -->
      </nav>

      <div>
        <v-btn v-if="loginStore().isLoggedIn" variant="outlined" v-on:click="logout" color="green">
          Log out
        </v-btn>
      </div>
    </div>
  </header>
  <RouterView />
</template>

<script lang="ts">
import { loginStore } from '@/stores/login'
export default {
  name: 'App',
  components: {
    Side,
    Login,
    Home
  },
  data: () => ({
    //
  }),
  methods: {
    //
    logout() {
      const authStore = loginStore()
      authStore.logout()
      this.$router.replace({ name: 'login' })
    }
  }
}
</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
