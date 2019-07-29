<template>
  <div id="app">
    <navbar />
    <router-view/>
  </div>
</template>

<script>
import navbar from '@/components/navbar.vue'

export default {
  components: {
    navbar
  },
  created () {
    if (localStorage.token) {
      this.$store.commit('ISLOGIN', true)
      this.$store.commit('ROLE',localStorage.role)
    }
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}


</style>