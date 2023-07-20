<template>
  <Header/>
  <router-view/>
  <SideBar/>
  <Footer/>
</template>

<script>
import Header from './components/Header.vue'
import SideBar from './components/SideBar.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  data() {
    return {

    }
  },
  components: {
    SideBar,
    Header,
    Footer
  }
}
</script>
