<template>
  <section>
    <main id="main" class="main">
      <div class="pagetitle">
          <h1>Lista de Clientes</h1>
          <nav>
          <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="/">Home</a></li>
              <li class="breadcrumb-item active">Clientes</li>
          </ol>
          </nav>
      </div><!-- End Page Title -->

      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Lista de Clientes</h5>
          <div class="table-responsive">

            <!-- <form class="form-control" style="width: 300px;">
              <label for="">Filtro por categoria</label>
              <select multiple class="form-select" v-model="filtroCategoria" name="filtro-categoria" id="filtro-categoria">
                <option value="0">Todos</option>
                <option v-for="categoria in definicaoInputs.categorias" :value="categoria.id">{{ categoria.nome }}</option>
              </select>
            </form> -->
            <!-- <div class="form-control">
              <input v-model="filtroSegmento" type="text" class="form-control" list="sugestoes-segmentos">
              <datalist id="sugestoes-segmentos">
                <option v-for="segmento in definicaoInputs.segmentos" :value="segmento.nome"/>
              </datalist>
            </div> -->
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <!-- <th>Categoria</th> -->
                  <th>Nome</th>
                  <th>Contato</th>
                  <th>Data de Nascimento</th>
                  <!-- <th>Data do Cadastro</th> -->
                </tr>
              </thead>
              <tbody>
                <tr v-for="(cliente, index) in clientesFiltrados">
                  <td><router-link :to="`cliente/${cliente.id}`">{{ cliente.id }}</router-link></td>
                  <td>{{ cliente.nome }}</td>
                  <td>{{ cliente.contato }}</td>
                  <td>{{ cliente.data_nascimento }}</td>
                  <!-- <td>{{ produto.created_at }}</td> -->
                  <!-- <td><a :href=`editar-produto.php?id=${produto.id}`><i class="bi bi-pencil-fill"></i></a></td> -->
                  <!-- <td><i @click="excluirProduto(produto.id)" class="bi bi-trash-fill"></i></td> -->
                </tr>
              </tbody>
            </table>
          </div>
          <div class="text-center">
            <a href="novo-cliente" class="btn btn-primary">Cadastrar Novo Cliente</a>
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
      clientes: [],
      clientesFiltrados: [],
      // filtroSegmento: '',
      // filtroCategoria: [0]
      // formulario: [{
      //   produto: '',
      //   valor: '',
      //   quantidade: '',
      //   subtotal: ''
      // }],
    }
  },
  computed: {
    definicaoInputs() {
      return JSON.parse(localStorage.getItem('definicaoInputs'))
    }
  },
  watch: {
    // filtroSegmento() {
    //   this.fornecedoresFiltrados = []
    //   this.fornecedores.forEach(element => {
    //     element.segmentos.forEach(el => {
    //       console.warn(el, this.filtroSegmento)
    //       console.log(el.includes(this.filtroSegmento))
    //       if (el.includes(this.filtroSegmento)) {
    //         this.fornecedoresFiltrados.push(element)
    //       }
    //     })
    //   })
    //   console.log(this.fornecedoresFiltrados)
    //   // this.fornecedoresFiltrados = this.fornecedores.filter(el => el.segmentos.forEach(el => el.includes(this.filtroSegmento)))
    // }
    // filtroCategoria() {
    //   if (this.filtroCategoria[0] != 0) {
    //     this.produtosFiltrados = this.produtos.filter(el => this.filtroCategoria.includes(el.categoria_id))
    //   } else {
    //     this.produtosFiltrados = this.produtos
    //   }
    // }
  },
  mounted() {
    fetch('http://127.0.0.1:8000/api/clientes', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Access': 'application/json'
      },
    })
    .then(response => response.json())
    .then(data => {
      this.clientes = data;
      // this.clientes.forEach(el => {
      //   let segmentos = []
      //   el.segmentos.forEach(el => segmentos.push(el.nome))
      //   el.segmentos = segmentos
      // })
      this.clientesFiltrados = this.clientes;
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