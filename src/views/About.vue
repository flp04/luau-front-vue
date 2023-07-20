<template>
  <section>
    <main id="main" class="main">
      <div class="pagetitle">
        <h1>About</h1>
      </div>
    </main>
  </section>
</template>
<script>
export default {
  mounted() {
    fetch('http://127.0.0.1:8000/api/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => response.json())
    .then(res => {
      console.log(res)
    })
  },
}
</script>
<style scoped>
  /*--------------------------------------------------------------
  # Main
  --------------------------------------------------------------*/
  #main {
    margin-top: 60px;
    padding: 20px 30px;
    transition: all 0.3s;
  }

  @media (max-width: 1199px) {
    #main {
      padding: 20px;
    }
  }
</style>