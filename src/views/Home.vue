<template>
  <main id="main" class="main">
    <section>
    </section>    

  </main><!-- End #main -->
</template>

<script>
import api from '../api';
import axios from 'axios'

export default {
  name: 'Home',
  components: {},
  data() {
    return {
    }
  },
  mounted() {
    console.log('oi')
    const code = 'PL';
    const url = `/api/competitions/PL/matches`;
    // const url = `http://api.football-data.org/v4/competitions/${code}/matches`;
    const headers = {
      'X-Auth-Token': 'bef4843a927541c5b894ff0c1d3c78ae',
    };

    axios.get(url, { headers })
      .then(response => {
        this.matches = response.data;
      })
      .catch(error => {
        console.error('Error fetching matches:', error);
      });
  },
  methods: {
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