<template>
  <section>
    <main id="main" class="main">
      <div class="pagetitle">
          <h1>Compra</h1>
          <nav>
          <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="/">Home</a></li>
              <li class="breadcrumb-item"><a href="/compras">Compras</a></li>
              <li class="breadcrumb-item">{{ compra.id }}</li>
          </ol>
          </nav>
      </div><!-- End Page Title -->

      <div class="card">
        <div class="card-body" v-if="compra.fornecedor != undefined">
          <div class="row">
            <div class="col-md-6">
              <!-- <h5 v-if="!editarForm" class="card-title">#{{ compra.id }} {{ compra.nome }}</h5>
              <h5 v-else class="card-title"><input type="text" class="form-control" v-model="compra.nome"></h5> -->
            </div>
            <div class="col-md-6">
              <div class="d-flex justify-content-end">
                <h4 v-if="compra.status == Pedido"><span class="badge text-bg-primary">{{ compra.status }}</span></h4>
                <h4 v-else-if="compra.status == Entregue"><span class="badge text-bg-success">{{ compra.status }}</span></h4>
                <h4 v-else><span class="badge text-bg-success">{{ compra.status }}</span></h4>
                <!-- <button v-if="!editarForm" style="margin-top: 15px; margin-right: 20px;" class="btn btn-success" @click="editar(true)">Editar</button>
                <button v-if="editarForm" style="margin-top: 15px; margin-right: 20px;" class="btn btn-danger" @click="editar(false)">Cancelar</button>
                <button v-if="editarForm" style="margin-top: 15px; margin-right: 20px;" class="btn btn-primary" @click="atualizarCompra()">Salvar</button> -->
              </div>
            </div>
          </div>
          <form v-if="editarForm">
            <!-- <div class="row g-3">
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
              <div class="col-md-4">
                <label for="tamanhos" class="form-label fw-bold">Tamanhos</label>
                <select multiple v-model="produto.tamanhos" class="form-select" name="tamanhos" id="tamanhos">
                  <option v-for="tamanho in definicaoInputs.tamanhos" :value="tamanho.id">{{ tamanho.nome }}</option>
                </select>
              </div>
            </div> -->
          </form>
          <form v-else>
            <div class="row g-3">
              <div class="col-md-6">
                <label for="data" class="form-label fw-bold">Data da Compra</label>
                <input type="text" :disabled="!editarForm" v-model="compra.created_at" class="form-control">
              </div>
              <div class="col-md-6">
                <label for="fornecedor" class="form-label fw-bold">Fornecedor</label>
                <input type="text" :disabled="!editarForm" v-model="compra.fornecedor.nome" class="form-control">
              </div>
            </div>
            <br>
            <div class="row g-3">
              <div class="col-md-8">
                <label for="total" class="form-label fw-bold">Valor total</label>
                <input type="text" :disabled="!editarForm" v-model="compra.total" class="form-control">
              </div>
              <div class="col-md-4">
                <label for="venda" class="form-label fw-bold">Forma de Pagamento</label>
                <input type="text" v-model="compra.forma_pagamento.nome" :disabled="!editarForm" class="form-control">
              </div>
            </div>

            <br>

            <div class="col-md-6">
              <h5 class="card-title">Itens da Compra</h5>
              <!-- <h5 v-if="!editarForm" class="card-title">#{{ compra.id }} {{ compra.nome }}</h5>
              <h5 v-else class="card-title"><input type="text" class="form-control" v-model="compra.nome"></h5> -->
            </div>

            <table class="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>
                    Produto
                  </th>
                  <th>
                    Tamanho
                  </th>
                  <th>
                    Preço Unit
                  </th>
                  <th>
                    Quantidade
                  </th>
                  <th>
                    Sutbotal
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in compra.itens">
                  <td>
                    {{ item.produto.nome }}
                  </td>
                  <td>
                    {{ item.tamanho.nome }}
                  </td>
                  <td>
                    {{ item.preco_venda }}
                  </td>
                  <td>
                    {{ item.quantidade }}
                  </td>
                  <td>
                    {{ item.subtotal }}
                  </td>
                </tr>
              </tbody>
            </table>    
            <table class="table table-borderless">
              <thead>
                <tr>
                  <!-- <th>Tamanho</th>
                  <th>Quantidade</th> -->
                </tr>
              </thead>
              <tbody>
                <!-- <tr v-for="tamanho in produto.tamanhosQuantidade">
                  <td>{{ tamanho.nome }}</td>
                  <td>{{ tamanho.quantidade !== null ? tamanho.quantidade : 0 }}</td>
                </tr> -->
              </tbody>
            </table>

          </form>
          <br>
          <!-- <div class="d-flex justify-content-end">
            <button v-if="!editarForm" style="margin-right: 20px;" class="btn btn-success" @click="editar(true)">Editar</button>
            <button v-if="editarForm" style="margin-right: 20px;" class="btn btn-danger" @click="editar(false)">Cancelar</button>
            <button v-if="editarForm" style="margin-right: 20px;" class="btn btn-primary" @click="atualizarProduto()">Salvar</button>
          </div> -->
          <!-- <table class="table table-borderless">
              <thead>
                <tr>
                  <th>Tamanho</th>
                  <th>Quantidade</th>
                </tr>
              </thead>
              <tbody> -->
                <!-- <tr v-for="(cliente, index) in clientes"> -->
                <!-- <tr v-for="tamanho in produto.tamanhos">
                  <td>{{ tamanho.nome }}</td>
                  <td>{{ tamanho.quantidade }}</td> -->
                  <!-- <td>{{ produto.tquantidade }}</td> -->
                  <!-- <td><a :href=`editar-cliente.php?id=${cliente.id}`><i class="bi bi-pencil-fill"></i></a></td> -->
                  <!-- <td><i @click="excluirCliente(cliente.id)" style="cursor:point;" class="bi bi-trash-fill"></i></td> -->
                <!-- </tr>
              </tbody>
            </table> -->
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
      compra: {},
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
    this.pegarCompra()
  },
  methods: {
    pegarCompra() {
      let url = `http://127.0.0.1:8000/api/compra/${this.id}`
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(response => response.json())
      .then(data => {
          console.log(data);
          this.compra = data
          // this.compra.categoria = data.categoria.nome
          // this.produto.tecido = data.tecido.nome
          // let tamanhos = []
          // let tamanhosQuantidade = []
          // this.produto.tamanhos.forEach(el => {
          //   tamanhos.push(el.id)
          //   tamanhosQuantidade.push({
          //     nome: el.nome,
          //     quantidade: el.pivot.quantidade
          //   } )
          // })
          // this.produto.tamanhos = tamanhos
          // this.produto.tamanhosQuantidade = tamanhosQuantidade

          // this.produto.preco_venda = data.precos_venda[0].preco_venda
      })
      .catch(error => {
          console.error(error);
      })
    },
    editar(op) {
      this.editarForm = op
    },
    atualizarProduto() {
      let produto = {
        categoria_id: this.produto.categoria_id,
        nome: this.produto.nome,
        tecido_id: this.produto.tecido_id,
        descricao: this.produto.descricao,
        tamanhos: this.produto.tamanhos,
        preco_venda: this.produto.preco_venda
      }
      fetch(`http://127.0.0.1:8000/api/atualizar-produto/${this.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(produto)
      })
      .then(data => {
        this.pegarProduto()
        this.editarForm = false
      })
      .catch(error => {
          console.error(error);
      })
    },
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