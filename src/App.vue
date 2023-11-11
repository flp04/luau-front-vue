<template>
  <div v-if="!token">
    <Login/>
  </div>
  <div v-else>
    <Header/>
    <router-view/>
    <SideBar/>
  </div>
  <!-- <Footer/> -->
</template>

<script>
import Header from './components/Header.vue'
import SideBar from './components/SideBar.vue'
import Footer from './components/Footer.vue'
import Login from './components/Login.vue'

export default {
  name: 'App',
  data() {
    return {
    }
  },
  computed: {
    token() {
      return localStorage.getItem('token')
    }
  },
  mounted() {
    fetch('http://127.0.0.1:8000/api/getDefinicoesInput', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access': 'application/json'
      }
    })
    .then(response => response.json())
    .then(res => {
      localStorage.setItem('definicaoInputs', JSON.stringify(res))
    })
  },
  components: {
    SideBar,
    Header,
    Footer,
    Login
  }
}
</script>
