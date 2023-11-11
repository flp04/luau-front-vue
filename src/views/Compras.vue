<template>
  <section>
    <main id="main" class="main">
      <div class="pagetitle">
          <h1>Lista de Compras</h1>
          <nav>
          <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="/">Home</a></li>
              <li class="breadcrumb-item active">Compras</li>
          </ol>
          </nav>
      </div><!-- End Page Title -->

      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Lista de Compras</h5>
          <div class="table-responsive">

            <!-- <form class="form-control" style="width: 300px;">
              <label for="">Filtro por Data</label>
            </form> -->
            <!-- <form class="form-control" style="width: 300px;">
              <label for="">Filtro por Fornecedor</label>
            </form> -->
            <!-- <form class="form-control" style="width: 300px;">
              <label for="">Filtro por Produto</label>
            </form> -->
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <!-- <th>Categoria</th> -->
                  <th>Data</th>
                  <th>Fornecedor</th>
                  <th>Valor Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(compra, index) in comprasFiltradas">
                  <td><router-link :to="`compra/${compra.id}`">{{ compra.id }}</router-link></td>
                  <td>{{ compra.created_at }}</td>
                  <td>{{ compra.fornecedor.nome }}</td>
                  <td>{{ compra.total }}</td>
                  <td v-if="compra.status == 'Pedido'"><span class="badge text-bg-primary">{{ compra.status }}</span></td>
                  <td v-else-if="compra.status == 'Entregue'"><span class="badge text-bg-primary">{{ compra.status }}</span></td>
                  <td v-else-if="compra.status == 'Aguardando'"><span class="badge text-bg-primary">{{ compra.status }}</span></td>
                  <td v-else-if="compra.status == 'Em Transito'"><span class="badge text-bg-primary">{{ compra.status }}</span></td>
                  <td v-else><span class="badge text-bg-primary">{{ compra.status }}</span></td>
                  <!-- <td>{{ produto.created_at }}</td> -->
                  <!-- <td><a :href=`editar-produto.php?id=${produto.id}`><i class="bi bi-pencil-fill"></i></a></td> -->
                  <!-- <td><i @click="excluirProduto(produto.id)" class="bi bi-trash-fill"></i></td> -->
                </tr>
              </tbody>
            </table>
          </div>
          <div class="text-center">
            <a href="nova-compra" class="btn btn-primary">Cadastrar Nova Compra</a>
          </div>
        </div>
      </div>
    </main>
  </section>
</template>
<script>
export default {
  data() {
    return {
      compra: [],
      comprasFiltradas: [],
      // filtroSegmento: '',
      // filtroCategoria: [0]
    }
  },
  computed: {
    definicaoInputs() {
      return JSON.parse(localStorage.getItem('definicaoInputs'))
    }
  },
  watch: {
    filtroSegmento() {
      this.fornecedoresFiltrados = []
      this.fornecedores.forEach(element => {
        element.segmentos.forEach(el => {
          console.warn(el, this.filtroSegmento)
          console.log(el.includes(this.filtroSegmento))
          if (el.includes(this.filtroSegmento)) {
            this.fornecedoresFiltrados.push(element)
          }
        })
      })
      console.log(this.fornecedoresFiltrados)
      // this.fornecedoresFiltrados = this.fornecedores.filter(el => el.segmentos.forEach(el => el.includes(this.filtroSegmento)))
    }
    // filtroCategoria() {
    //   if (this.filtroCategoria[0] != 0) {
    //     this.produtosFiltrados = this.produtos.filter(el => this.filtroCategoria.includes(el.categoria_id))
    //   } else {
    //     this.produtosFiltrados = this.produtos
    //   }
    // }
  },
  mounted() {
    fetch('http://127.0.0.1:8000/api/compras', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Access': 'application/json'
      },
    })
    .then(response => response.json())
    .then(data => {
      this.compras = data;
      this.compras.forEach(el => {
        let fornecedor = []
      //   el.segmentos.forEach(el => segmentos.push(el.nome))
      //   el.segmentos = segmentos
      })
      this.comprasFiltradas = this.compras;
    })
  },
  methods: {
    // excluirProduto(id) {
    //   let url = 'conexao-bd.php?requisicao=excluirProduto'
    //   fetch(url, {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({id: id})
    //   })
    //   .then(response => response.json())
    //   .then(data => {
    //       console.log(response);
    //       console.log(data);
    //   })
    //   .catch(error => {
    //       console.error(error);
    //   })
    // },
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