<template>
  <section>
    <main id="main" class="main">
      <div class="pagetitle">
          <h1>Lista de Produtos</h1>
          <nav>
          <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="/">Home</a></li>
              <li class="breadcrumb-item active">Lista de Produtos</li>
          </ol>
          </nav>
      </div><!-- End Page Title -->

      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Lista de Produtos</h5>
          <div class="table-responsive">

            <form class="form-control">
              <div class="row">
                <div class="col-md-6">
                  <label for="">Filtro por categoria</label>
                  <select multiple class="form-select" v-model="filtroCategoria" name="filtro-categoria" id="filtro-categoria">
                    <option value="0">Todos</option>
                    <option v-for="categoria in definicaoInputs.categorias" :value="categoria.id">{{ categoria.nome }}</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label for="">Filtro por tecido</label>
                  <select multiple class="form-select" v-model="filtroTecido" name="filtro-tecido" id="filtro-tecido">
                    <option value="0">Todos</option>
                    <option v-for="tecido in definicaoInputs.tecidos" :value="tecido.id">{{ tecido.nome }}</option>
                  </select>
                </div>
              </div>
            </form>
            
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <!-- <th>Categoria</th> -->
                  <th>Nome</th>
                  <th>Tecido</th>
                  <th>Quantidade</th>
                  <th>Preço</th>
                  <!-- <th>Data do Cadastro</th> -->
                </tr>
              </thead>
              <tbody>
                <tr v-for="(produto, index) in produtosFiltrados">
                  <!-- <a :href="`produto/${produto.id}`"><td>{{ produto.id }}</td></a> -->
                  <!-- <td>{{ produto.id }}</td> -->
                  <td><router-link :to="`produto/${produto.id}`">{{ produto.id }}</router-link></td>
                  <!-- <td>{{ produto.categoria.nome }}</td> -->
                  <td>{{ produto.nome }}</td>
                  <td>{{ produto.tecido.nome }}</td>
                  <td>{{ produto.quantidade }}</td>
                  <td>{{ produto.preco_venda }}</td>
                  <!-- <td>{{ produto.created_at }}</td> -->
                  <!-- <td><a :href=`editar-produto.php?id=${produto.id}`><i class="bi bi-pencil-fill"></i></a></td> -->
                  <!-- <td><i @click="excluirProduto(produto.id)" class="bi bi-trash-fill"></i></td> -->
                </tr>
              </tbody>
            </table>
          </div>
          <div class="text-center">
            <a href="novo-produto" class="btn btn-primary">Cadastrar Novo Produto</a>
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
      produtos: [],
      produtosFiltrados: [],
      filtroCategoria: [0],
      filtroTecido: [0]
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
    filtroCategoria() {
      if (this.filtroCategoria[0] != 0) {
        this.produtosFiltrados = this.produtos.filter(el => this.filtroCategoria.includes(el.categoria_id))
      } else {
        this.produtosFiltrados = this.produtos
      }
    },
    filtroTecido() {
      if (this.filtroTecido[0] != 0) {
        this.produtosFiltrados = this.produtos.filter(el => this.filtroTecido.includes(el.tecido_id))
      } else {
        this.produtosFiltrados = this.produtos
      }
    }
  },
  mounted() {
    fetch('http://127.0.0.1:8000/api/produtos', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Access': 'application/json'
      },
    })
    .then(response => response.json())
    .then(data => {
      this.produtos = data;
      this.produtos.forEach(produto => {
        let tamanhos = []
        let tamanhosQuantidade = []
        let quantidade = 0
        produto.tamanhos.forEach(el => {
          tamanhos.push(el.id)
          tamanhosQuantidade.push({
            nome: el.nome,
            quantidade: el.pivot.quantidade
          } )
          quantidade += el.pivot.quantidade * 1
        })
        produto.tamanhos = tamanhos
        produto.tamanhosQuantidade = tamanhosQuantidade
        produto.quantidade = quantidade
        this.produtosFiltrados.push(produto);
      })
      this.produtos = this.produtosFiltrados;
      // this.produtosFiltrados = this.produtos;
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