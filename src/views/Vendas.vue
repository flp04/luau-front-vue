<template>
  <section>
    <main id="main" class="main">
      <div class="pagetitle">
          <h1>Lista de Vendas</h1>
          <nav>
          <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="/">Home</a></li>
              <li class="breadcrumb-item active">Vendas</li>
          </ol>
          </nav>
      </div><!-- End Page Title -->

      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Lista de Vendas</h5>
          <div class="table-responsive">

            <!-- <form class="form-control" style="width: 300px;">
              <label for="">Filtro por Data</label>
            </form> -->
            <!-- <form class="form-control" style="width: 300px;">
              <label for="">Filtro por Cliente</label>
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
                  <th>Cliente</th>
                  <th>Forma de Pagamento</th>
                  <th>Valor Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(venda, index) in vendasFiltradas">
                  <!-- <td>{{ venda.created_at }}</td> -->
                  <td><router-link :to="`venda/${venda.id}`">{{ venda.id }}</router-link></td>
                  <td>{{ venda.created_at }}</td>
                  <td>{{ venda.cliente.nome }}</td>
                  <td>{{ venda.forma_pagamento.nome }}</td>
                  <td>{{ venda.total }}</td>
                  <td v-if="venda.status == 'Pedido'"><span class="badge text-bg-primary">{{ venda.status }}</span></td>
                  <td v-else-if="venda.status == 'Entregue'"><span class="badge text-bg-primary">{{ venda.status }}</span></td>
                  <td v-else-if="venda.status == 'Aguardando'"><span class="badge text-bg-primary">{{ venda.status }}</span></td>
                  <td v-else-if="venda.status == 'Em Transito'"><span class="badge text-bg-primary">{{ venda.status }}</span></td>
                  <td v-else><span class="badge text-bg-primary">{{ venda.status }}</span></td>
                  <!-- <td>{{ produto.created_at }}</td> -->
                  <!-- <td><a :href=`editar-produto.php?id=${produto.id}`><i class="bi bi-pencil-fill"></i></a></td> -->
                  <!-- <td><i @click="excluirProduto(produto.id)" class="bi bi-trash-fill"></i></td> -->
                </tr>
              </tbody>
            </table>
          </div>
          <div class="text-center">
            <a href="nova-venda" class="btn btn-primary">Cadastrar Nova Venda</a>
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
      venda: [],
      vendasFiltradas: [],
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
      this.clientesFiltrados = []
      this.clientes.forEach(element => {
        element.segmentos.forEach(el => {
          console.warn(el, this.filtroSegmento)
          console.log(el.includes(this.filtroSegmento))
          if (el.includes(this.filtroSegmento)) {
            this.clientesFiltrados.push(element)
          }
        })
      })
      console.log(this.clientesFiltrados)
      // this.clientesFiltrados = this.clientes.filter(el => el.segmentos.forEach(el => el.includes(this.filtroSegmento)))
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
    fetch('http://127.0.0.1:8000/api/vendas', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Access': 'application/json'
      },
    })
    .then(response => response.json())
    .then(data => {
      this.vendas = data;
      this.vendas.forEach(el => {
        let cliente = []
      //   el.segmentos.forEach(el => segmentos.push(el.nome))
      //   el.segmentos = segmentos
      })
      this.vendasFiltradas = this.vendas;
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