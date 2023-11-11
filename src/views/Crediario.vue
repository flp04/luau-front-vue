<template>
  <section>
    <!-- <main id="main" class="main"> -->
    <main>
      <!-- <div class="pagetitle">
          <h1>Venda</h1>
          <nav>
          <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="/">Home</a></li>
              <li class="breadcrumb-item"><a href="/vendas">Vendas</a></li>
              <li class="breadcrumb-item">{{ venda.id }}</li>
          </ol>
          </nav>
      </div> End Page Title -->

      <div class="card" v-if="crediario">
        <div class="card-body">
          <div class="row">
            <table class="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Vencimento</th>
                  <th>N° de Parcelas</th>
                  <th>Valor da Parcela</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{{ crediario.dia_vencimento }}</td>
                  <td>{{ crediario.n_parcelas }}</td>
                  <td>{{ crediario.valor_parcela }}</td>
                </tr>
              </tbody>
            </table>
            <div class="col-md-4">
              {{ crediario.dia_vencimento }}
            </div>
            <div class="col-md-4">
              {{ crediario.n_parcelas }}
            </div>
            <div class="col-md-4">
              {{ crediario.valor_parcela }}
            </div>
            <div class="col-md-12">
              {{ formataData(crediario.data_primeira_parcela) }}
            </div>
            <div class="col-md-12" v-for=" pagamento in crediario.pagamentos">
              {{ formataData(pagamento.created_at) }} - {{ pagamento.valor }}
            </div>
            <div class="col-md-6">
              <div class="d-flex justify-content-end">
              </div>
            </div>
          </div>
        </div>
      </div>

      </main><!-- End #main -->
  </section>
</template>
<script>
export default {
  props: ['crediario'],
  data() {
    return {
      parcelas: []
    }
  },
  watch: {
    crediario() {
      console.log('oi')
      this.setParcelas()
    }
  },
  mounted() {
    console.log(this.crediario)
    this.setParcelas()
  },
  methods: {
    setParcelas() {
      if(this.crediario) {
        for(let i = 0; i < this.crediario.n_parcelas; i++) {
          console.log(i)
        }
      }
    },
    formataData(data) {
      data = data.split('T')
      data = data[0].split('-')
      return `${data[2]}/${data[1]}/${data[0]}`
    }
  }
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