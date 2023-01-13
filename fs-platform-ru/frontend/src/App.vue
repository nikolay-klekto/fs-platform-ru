<template>
  <div id="app">
    <b-navbar style="width: 100%" type="dark" variant="dark">
      <b-navbar-brand id="nav-brand" href="#">Kotlin+Spring+Vue</b-navbar-brand>
      <router-link to="/"><img height="30px" src="./assets/img/kotlin-logo.png" alt="Kotlin+Spring+Vue"/></router-link>
      <router-link to="/"><img height="30px" src="./assets/img/spring-boot-logo.png" alt="Kotlin+Spring+Vue"/></router-link>
      <router-link to="/"><img height="30px" src="./assets/img/vuejs-logo.png" alt="Kotlin+Spring+Vue"/></router-link>
      <router-link to="/user" class="nav-link text-light" v-if="this.$store.getters.isAuthenticated">User</router-link>
      <router-link to="/admin" class="nav-link text-light" v-if="this.$store.getters.isAuthenticated && this.$store.getters.isAdmin">Admin</router-link>
      <router-link to="/email" class="nav-link text-light" v-if="this.$store.getters.isAuthenticated">Email</router-link>
      <router-link to="/register" class="nav-link text-light" v-if="!this.$store.getters.isAuthenticated">Register</router-link>
      <router-link to="/login" class="nav-link text-light" v-if="!this.$store.getters.isAuthenticated">Login</router-link>
      <a href="#" class="nav-link text-light" v-if="this.$store.getters.isAuthenticated" v-on:click="logout">Logout </a>
    </b-navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import {AXIOS} from './components/http-common'

export default {
  name: 'app',
  methods: {
    confirmRegistration() {
      if (this.$route.query.confirmRegistration === 'true' && this.$route.query.token != null) {
        this.$router.push({name: 'RegistrationConfirmPage', params: { token: this.$route.query.token}});
      }
    },
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/');

      AXIOS.post(`/auth/logout`)
          .then(response => {
            console.log(response.statusText);
            this.$store.dispatch('logout');
            this.$router.push('/');
          }, error => {
            console.log(error)
            alert("Server error. Please, try later")
          })
          .catch(e => {
            console.log(e);
          })
    }
  },
  mounted() {
    this.confirmRegistration();
  } 
}
</script>

<style>
</style>
