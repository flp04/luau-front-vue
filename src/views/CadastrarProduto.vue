<template>
  <section>
    <main id="main" class="main">
      <div class="pagetitle">
          <h1>Novo Produto</h1>
          <nav>
          <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="/">Home</a></li>
              <li class="breadcrumb-item active">Novo Produto</li>
          </ol>
          </nav>
      </div><!-- End Page Title -->

      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Novo Produto</h5>
          <div class="row g-3">
            <div class="col-md-4">
              <label for="categoria" class="form-label fw-bold">Categoria</label>
              <select v-model="categoria_id" class="form-select" name="categoria" id="categoria">
                <option v-for="categoria in definicaoInputs.categorias" :value="categoria.id">{{ categoria.nome }}</option>
              </select>
            </div>
            <div class="col-md-4">
              <label for="nome" class="form-label fw-bold">Nome</label>
              <input class="form-control" required id="nome" v-model="nome" type="text">
            </div>
            <div class="col-md-4">
              <label for="tecido" class="form-label fw-bold">Tecido  
              <a data-bs-toggle="modal" data-bs-target="#disablebackdrop">+</a>
              </label>
              <select v-model="tecido_id" class="form-select" name="tecido" id="tecido" @change="alterouTecido()">
                <option value="novo_tecido">Novo tecido</option>
                <option v-for="tecido in definicaoInputs.tecidos" :value="tecido.id">{{ tecido.nome }}</option>
              </select>
            </div>
            <div class="col-md-12">
              <label for="descricao" class="form-label fw-bold">Descrição</label>
              <input class="form-control" required id="descricao" v-model="descricao" type="text">
            </div>
            <div class="col-md-4">
              <label for="tamanhos" class="form-label fw-bold">Tamanhos</label>
              <select multiple v-model="tamanhos" class="form-select" name="tamanhos" id="tamanhos">
                <option v-for="tamanho in definicaoInputs.tamanhos" :value="tamanho.id">{{ tamanho.nome }}</option>
              </select>
            </div>
            <!-- <div class="col-md-4">
              <label for="cores" class="form-label fw-bold"></label>
              <input class="form-control" v-model="cores" type="color" name="cores" id="cores">
            </div> -->
            <div class="col-md-4">
              <label for="preco" class="form-label fw-bold">Preço de Venda</label>
              <input class="form-control" required id="preco" v-model="preco" type="number">
            </div>
            <div class="d-flex justify-content-end">
              <button @click="salvarProduto()" class="btn btn-primary" style="margin-right: 20px;">Salvar</button>
              <button type="reset" class="btn btn-secondary" style="margin-right: 20px;">Limpar</button>
            </div>
          </div>
        </div>
      </div>

      <div class="modal fade" id="disablebackdrop" tabindex="-1" data-bs-backdrop="false" :class="{ 'show': modalNovoTecido }">
      <!-- <div class="modal fade" id="disablebackdrop" tabindex="-1" v-if="modalNovoTecido"> -->
        <div class="modal-dialog">
        <!-- <div class="modal-dialog modal-dialog-centered"> -->
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Novo Tecido</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <label class="form-label fw-bold" for="tecido">Tecido</label>
              <input class="form-control" type="text" name="tecido" id="tecido" ref="novoTecido">
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
              <button type="button" class="btn btn-primary" @click="salvarTecido($refs.novoTecido.value)">Salvar</button>
            </div>
          </div>
        </div>
      </div><!-- End Disabled Backdrop Modal-->
    </main><!-- End #main -->
  </section>
</template>
<script>
export default {
  data() {
    return {
      definicaoInputs: [],
      // categorias: [],
      // tamanhos: [],
      // tecidos: [],
      nome: '',
      categoria_id: '',
      tamanhos: [],
      tecido_id: '',
      descricao: '',
      cor: '',
      preco: '',
      cores: [],
      modalNovoTecido: false
    }
  },
  mounted() {
    this.setDefinicaoInputs()
    // this.getTamanhos()
    // this.getTecidos()
  },
  watch: {
  },
  methods: {
    setDefinicaoInputs() {
      this.definicaoInputs = JSON.parse(localStorage.getItem('definicaoInputs'))
        // this.tamanhos = JSON.parse(localStorage.getItem('definicaoInputs')).tamanhos
        // this.categorias = JSON.parse(localStorage.getItem('definicaoInputs')).categorias
        // this.tecidos = JSON.parse(localStorage.getItem('definicaoInputs')).tecidos
        // this.formasPagamento = JSON.parse(localStorage.getItem('definicaoInputs')).formas_pagamento
      },
    salvarProduto() {
      let produto = {
        categoria_id: this.categoria_id,
        nome: this.nome,
        tecido_id: this.tecido_id,
        descricao: this.descricao,
        tamanhos: this.tamanhos,
        preco_venda: this.preco
      }
      let url = 'http://127.0.0.1:8000/api/cadastrarProduto'
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Access': 'application/json'
        },
        body: JSON.stringify(produto)
      })
      // .then(response => response.json())
      .then(data => {
        this.$router.push('/produtos')
          // console.log(response);
          console.log(data);
      })
      .catch(error => {
          console.error(error);
      })
    },
    getTamanhos() {
      let url = 'conexao-bd.php?requisicao=pegarTamanhos'
      fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.tamanhos = data
      })
      .catch(error => {
        console.error(error);
      }) 
    },
    getTecidos() {
      let url = 'conexao-bd.php?requisicao=pegarTecidos'
      fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.tecidos = data
      })
      .catch(error => {
        console.error(error);
      }) 
    },
    getCategorias() {
      let url = 'conexao-bd.php?requisicao=pegarCategorias'
      fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.categorias = data
      })
      .catch(error => {
        console.error(error);
      }) 
    },
    alterouTecido() {
      if (this.tecido_id == 'novo_tecido') {
        console.warn('oi')
        this.modalNovoTecido = true
      }
    },
    salvarTecido(valorInput) {
      console.warn(valorInput)
    }
  },
  computed: {
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