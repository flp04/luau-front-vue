<template>
  <section>
    <main id="main" class="main">
      <div class="pagetitle">
        <!-- <form @submit.stop.prevent="login" style="width: 300px; margin: 50px"> -->
        <form @submit.stop.prevent="login">
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input v-model="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
            <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input v-model="password" type="password" class="form-control" id="exampleInputPassword1">
          </div>
          <div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" id="exampleCheck1">
            <label class="form-check-label" for="exampleCheck1">Check me out</label>
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </main>
  </section>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login() {
      fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access': 'application/json'
        },
        body: JSON.stringify({
            'email': this.email,
            'password': this.password
          })
        })
        .then(response => response.json())
        .then(res => {
          if (res.error) {
            console.log(res.error)
          }
          console.warn(res)
          localStorage.setItem('token', res.access_token)
          localStorage.setItem('profile_img', res.profile_img)
          window.location.reload()
          // this.$router.push('/')
        })
        .catch((error) => {
          console.log(error)
        })
    }
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

/*--------------------------------------------------------------
# Dashboard
--------------------------------------------------------------*/
/* Filter dropdown */
.dashboard .filter {
  position: absolute;
  right: 0px;
  top: 15px;
}

.dashboard .filter .icon {
  color: #aab7cf;
  padding-right: 20px;
  padding-bottom: 5px;
  transition: 0.3s;
  font-size: 16px;
}

.dashboard .filter .icon:hover,
.dashboard .filter .icon:focus {
  color: #4154f1;
}

.dashboard .filter .dropdown-header {
  padding: 8px 15px;
}

.dashboard .filter .dropdown-header h6 {
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 1px;
  color: #aab7cf;
  margin-bottom: 0;
  padding: 0;
}

.dashboard .filter .dropdown-item {
  padding: 8px 15px;
}

</style>