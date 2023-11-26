<template>
  <main id="main" class="main">
    <section v-if="!loading">
      <div class="row">
        <div class="col-md-9">
          <h4 class="text-center mb-4">Brasileirão 2023 - Série A</h4>
          <table class="table table-striped table-bordered">
            <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Equipe</th>
              <th scope="col">P</th>
              <th scope="col">J</th>
              <th scope="col">V</th>
              <th scope="col">E</th>
              <th scope="col">D</th>
              <th scope="col">SG</th>
              <th scope="col">Forma</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="d in dados">
              <td>{{ d.position }}°</td>
              <td>{{ d.team.shortName }}</td>
              <td>{{ d.points }}</td>
              <td>{{ d.playedGames }}</td>
              <td>{{ d.won }}</td>
              <td>{{ d.draw }}</td>
              <td>{{ d.lost }}</td>
              <td>{{ d.goalDifference }}</td>
              <td>{{ d.form }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-md-3">
        <div class="d-flex justify-content-between align-items-center">
          <i class="bi bi-arrow-left" @click="rodadaAnterior()"></i>
          <h4 class="text-center mb-3">Rodada {{ matchday }}</h4>
          <i class="bi bi-arrow-right" @click="rodadaProxima()"></i>
        </div>
        <div class="container">
          <div v-for="partida in partidas" v-show="partida.matchday == matchday">
          <div class="row justify-content-center" v-if="partida.status == 'FINISHED'">
              <h7 class="text-center">{{ corrigirFusoHorario(partida.utcDate) }}</h7>
              <div class="col-md-3 d-flex justify-content-center align-items-center mb-4">
                <img :src="partida.homeTeam.crest" :alt="partida.homeTeam.shortName" style="width: 40px;"> 
              </div>
              <div class="col-md-1 d-flex justify-content-center align-items-center mb-4">
                {{ partida.score.fullTime.home }}
              </div>
              <div class="col-md-2 d-flex justify-content-center align-items-center mb-4">
                vs
              </div>
              <div class="col-md-1 d-flex justify-content-center align-items-center mb-4">
                {{ partida.score.fullTime.away }}
              </div>
              <div class="col-md-3 d-flex justify-content-center align-items-center mb-4">
                <img :src="partida.awayTeam.crest" :alt="partida.awayTeam.shortName" style="width: 40px;">
              </div>
            </div>
            <div class="row justify-content-center" v-else>
              <h7 class="text-center">{{ corrigirFusoHorario(partida.utcDate) }}</h7>
              <div class="col-md-5 d-flex justify-content-center align-items-center mb-4">
                <img :src="partida.homeTeam.crest" :alt="partida.homeTeam.shortName" style="width: 40px;"> 
              </div>
              <div class="col-md-2 d-flex justify-content-center align-items-center mb-4">
                vs 
              </div>
              <div class="col-md-5 d-flex justify-content-center align-items-center mb-4">
                <img :src="partida.awayTeam.crest" :alt="partida.awayTeam.shortName" style="width: 40px;">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </section>
  </main>
</template>
<script>
import axios from 'axios'

export default {
  name: 'Home',
  props: ['code'],
  components: {},
  data() {
    return {
      partidas: '',
      dados: '',
      matchday: 20,
      loading: false
    }
  },
  mounted() {
    this.getTabela()
    this.getPartidas()
    // const url2 = `/api/competitions/${this.code}/matches`;
    // const url2 = `/api/competitions/${this.code}/standings`;
    // const headers2 = {
    //   'X-Auth-Token': 'bef4843a927541c5b894ff0c1d3c78ae',
    // };

    // axios.get(url2, { headers2 })
    //   .then(response => {
    //     this.partidas = response.data;
    //   })
    //   .catch(error => {
    //     console.error('Error fetching matches:', error);
    //   });
  },
  methods: {
    getTabela() {
      this.loading = true   
      const url = `/api/competitions/${this.code}/standings`;
      const headers = {
        'X-Auth-Token': 'bef4843a927541c5b894ff0c1d3c78ae',
      };

      axios.get(url, { headers })
      .then(response => {
        this.matchday = response.data.season.currentMatchday
        this.dados = response.data.standings[0].table;
        this.loading = false
      })
      .catch(error => {
        console.error('Error fetching matches:', error);
      });
    },
    getPartidas() {      
      this.loading = true
      const url = `/api/competitions/${this.code}/matches`;
      const headers = {
        'X-Auth-Token': 'bef4843a927541c5b894ff0c1d3c78ae',
      };

      axios.get(url, { headers })
      .then(response => {
        this.partidas = response.data.matches;
        this.loading = false
      })
      .catch(error => {
        console.error('Error fetching matches:', error);
      });
    },
    corrigirFusoHorario(data) {
      data = new Date(data)
      let opcoes = {
        weekday: 'long',
        // year: 'numeric', 
        month: '2-digit', 
        day: '2-digit',
        hour: 'numeric',
        minute: 'numeric',
        // second: 'numeric',
        hour12: false,
        // timeZone: 'local'
      }
      let tradutor = new Intl.DateTimeFormat('pt-BR', opcoes)
      data = tradutor.format(data).split(',')
      data = `${data[0].slice(0,3)}, ${data[1]} - ${data[2]}`
      return data
    },
    rodadaAnterior() {
      this.matchday -= 1
    },
    rodadaProxima() {
      this.matchday += 1
    },
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