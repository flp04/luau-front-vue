<template>
  <section>
    <main id="main" class="main" v-if="!carregando">
      <div class="pagetitle">
          <h1>Cliente</h1>
          <nav>
          <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="/">Home</a></li>
              <li class="breadcrumb-item"><a href="/clientes">Cliente</a></li>
              <li class="breadcrumb-item">{{ cliente.nome }}</li>
          </ol>
          </nav>
      </div><!-- End Page Title -->

      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="col-md-6">
              <h4 class="card-title">#{{ cliente.id }} {{ cliente.nome }}</h4>
            </div>
            <!-- <div class="col-md-6">
              <div class="d-flex justify-content-end">
                <button v-if="!editarForm" style="margin-top: 15px; margin-right: 20px;" class="btn btn-success" @click="editar(true)">Editar</button>
                <button v-if="editarForm" style="margin-top: 10px; margin-right: 20px;" class="btn btn-danger" @click="editar(false)">Cancelar</button>
                <button v-if="editarForm" style="margin-top: 10px; margin-right: 20px;" class="btn btn-primary" @click="atualizarfornecedor()">Salvar</button>
              </div>
            </div> -->
          </div>
          <!-- <form v-if="editarForm">
            <div class="row g-3">
              <div class="col-md-6">
                <label for="categoria" class="form-label fw-bold">Categoria</label>
                <select class="form-select" name="categoria" id="categoria" v-model="produto.categoria_id">
                  <option v-for="categoria in definicaoInputs.categorias" :value="categoria.id">{{ categoria.nome }}</option>
                </select>
              </div>
              <div class="col-md-6">
                <label for="tecido" class="form-label fw-bold">Tecido</label>
                <select class="form-select" name="tecido" id="tecido" v-model="produto.tecido_id">
                  <option v-for="tecido in definicaoInputs.tecidos" :value="tecido.id">{{ tecido.nome }}</option>
                </select>
              </div>
            </div>
            <br>
            <div class="row g-3">
              <div class="col-md-8">
                <label for="descricao" class="form-label fw-bold">Descrição</label>
                <input type="text" :disabled="!editarForm" v-model="produto.descricao" class="form-control">
              </div>
              <div class="col-md-4">
                <label for="venda" class="form-label fw-bold">Preço de Venda</label>
                <input type="text" v-model="produto.preco_venda" :disabled="!editarForm" class="form-control">
              </div>
            </div>
          </form>
          <form v-else> -->
          <form>
            <div class="row g-3">
              <!-- <div class="col-md-12">
                <label for="nome" class="form-label fw-bold">Nome</label>
                <input type="text" disabled v-model="fornecedor.nome" class="form-control">
              </div> -->
              <div class="col-md-6">
                <label for="contato" class="form-label fw-bold">Contato</label>
                <input type="text" disabled v-model="cliente.contato" class="form-control">
              </div>
              <div class="col-md-6">
                <label for="data_nascimento" class="form-label fw-bold">Data de Nascimento</label>
                <input type="text" disabled v-model="cliente.data_nascimento" class="form-control">
              </div>

              <br>

            <div v-if="cliente.enderecos != undefined && cliente.enderecos.length > 0">
              <div>
                <h5 class="card-title">Endereço</h5>
              </div>
              <div class="row g-3">
                <div class="col-md-8">
                  <label for="logradouro" class="form-label fw-bold">Logradouro</label>
                  <input type="text" disabled v-model="cliente.enderecos[0].logradouro" class="form-control">
                </div>
                <div class="col-md-4">
                  <label for="numero" class="form-label fw-bold">Número</label>
                  <input type="text" disabled v-model="cliente.enderecos[0].numero" class="form-control">
                </div>
                <div class="col-md-3">
                  <label for="complemento" class="form-label fw-bold">Complemento</label>
                  <input type="text" disabled v-model="cliente.enderecos[0].complemento" class="form-control">
                </div>
                <div class="col-md-3">
                  <label for="bairro" class="form-label fw-bold">Bairro</label>
                  <input type="text" disabled v-model="cliente.enderecos[0].bairro" class="form-control">
                </div>
                <div class="col-md-3">
                  <label for="cidade" class="form-label fw-bold">Cidade</label>
                  <input type="text" disabled v-model="cliente.enderecos[0].cidade" class="form-control">
                </div>
                <div class="col-md-3">
                  <label for="estado" class="form-label fw-bold">Estado</label>
                  <input type="text" disabled v-model="cliente.enderecos[0].estado" class="form-control">
                </div>
              </div>
              <!-- <div class="col-md-10">
                <a href="https://www.google.com/maps/search/?api=1&query=Avenida+Gustavo+Adolfo,+682,+Vila+Gustavo,Sao+Paulo,+SP" target="_blank"><small>Abrir no Maps</small></a>
                <a href="https://www.google.com/maps/search/?api=1&query=Avenida+Gustavo+Adolfo,+682,+Vila+Gustavo,Sao+Paulo,+SP/Rua+Miller, +220,+Bras,+Sao+Paulo,+SP" target="_blank"><small>Abrir Rota no Maps</small></a>
              </div> -->
              <!-- <pre v-for="endereco in fornecedor.enderecos">{{ endereco.logradouro }}</pre> -->
            </div>
            
          </div>
            <!-- <div class="row g-3">
              <div class="col-md-8">
                <label for="descricao" class="form-label fw-bold">Descrição</label>
                <input type="text" :disabled="!editarForm" v-model="produto.descricao" class="form-control">
              </div>
              <div class="col-md-4">
                <label for="venda" class="form-label fw-bold">Preço de Venda</label>
                <input type="text" v-model="produto.preco_venda" :disabled="!editarForm" class="form-control">
              </div> -->
            <!-- </div> -->
          </form>
          <br>
          <!-- <div class="d-flex justify-content-end">
            <button v-if="!editarForm" style="margin-right: 20px;" class="btn btn-success" @click="editar(true)">Editar</button>
            <button v-if="editarForm" style="margin-right: 20px;" class="btn btn-danger" @click="editar(false)">Cancelar</button>
            <button v-if="editarForm" style="margin-right: 20px;" class="btn btn-primary" @click="atualizarProduto()">Salvar</button>
          </div> -->
            <!-- <div class="text-center">
              <a href="novo-cliente.php" class="btn btn-primary">Cadastrar Novo Cliente</a>
            </div> -->
        </div>
      </div>

      <!-- <div class="card">
        <div class="card-body">
          <h5 class="card-title" data-bs-target="#compras" data-bs-toggle="collapse">Compras<i class="bi bi-chevron-down ms-auto"></i></h5>
          <table id="compras" class="table table-borderless collapse">
            <thead>
              <tr>
                <th>Id</th>
                <th>Data da Compra</th>
                <th>Forma de Pagamento</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(compra, index) in cliente.historico_compras">
                <td><a :href="`venda.php?id=${compra.id}`">{{ compra.id }}</a></td>
                <td>{{ compra.created_at }}</td>
                <td>{{ compra.forma_pagamento_id }}</td>
                <td>{{ compra.total }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div> -->

      </main><!-- End #main -->
  </section>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      cliente: {},
      carregando: false,
      endereco: {
        logradouro: ''
      },
      editarForm: false
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
  mounted() {
    this.pegarCliente()
  },
  methods: {
    pegarCliente() {
      let vm = this
      vm.carregando = true
      let url = `http://127.0.0.1:8000/api/cliente/${vm.id}`
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(response => response.json())
      .then(data => {
        vm.cliente = data
        vm.carregando = false
          
      })
      .catch(error => {
          console.error(error);
      })
    },
    editar(op) {
      this.editarForm = op
    },
    // atualizarProduto() {
    //   let produto = {
    //     categoria_id: this.produto.categoria_id,
    //     nome: this.produto.nome,
    //     tecido_id: this.produto.tecido_id,
    //     descricao: this.produto.descricao,
    //     tamanhos: this.produto.tamanhos,
    //     preco_venda: this.produto.preco_venda
    //   }
    //   fetch(`http://127.0.0.1:8000/api/atualizar-produto/${this.id}`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify(produto)
    //   })
    //   .then(data => {
    //     this.pegarProduto()
    //     this.editarForm = false
    //   })
    //   .catch(error => {
    //       console.error(error);
    //   })
    // },
    excluirCliente(id) {
      let url = 'conexao-bd.php?requisicao=excluirCliente'
      fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({id: 1})
      })
      .then(response => response.json())
      .then(data => {
          console.log(response);
          console.log(data);
      })
      .catch(error => {
          console.error(error);
      })
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
</style>