<template>
  <section>
    <!-- <main v-if="false" id="main" class="main"> -->
    <main id="main" class="main">
      <div class="pagetitle">
          <h1>Venda</h1>
          <nav>
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="/">Home</a></li>
                <li class="breadcrumb-item"><a href="/vendas">Vendas</a></li>
                <li class="breadcrumb-item">{{ venda.id }}</li>
            </ol>
          </nav>
      </div><!-- End Page Title -->

      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="col-md-6">
              <!-- <h5 class="card-title">#{{ venda.id }} {{ venda }}</h5> -->
            </div>
            <div class="col-md-6">
              <div class="d-flex justify-content-end">
                <h4 v-if="venda.status == 'Pedido'"><span class="badge text-bg-primary">{{ venda.status }}</span></h4>
                <h4 v-else-if="venda.status == 'Entregue'"><span class="badge text-bg-success">{{ venda.status }}</span></h4>
                <h4 v-else><span class="badge text-bg-success">{{ venda.status }}</span></h4>
              </div>
            </div>
          </div>
          <form>
            <div class="row g-3">
              <div class="col-md-6">
                <label for="data" class="form-label fw-bold">Data da Venda</label>
                <input type="text" disabled v-model="venda.created_at" class="form-control">
              </div>
              <div class="col-md-4" v-if="venda.forma_pagamento">
                <label for="venda" class="form-label fw-bold">Forma de Pagamento</label>
                <input type="text" v-model="venda.forma_pagamento.nome" disabled class="form-control">
              </div>
            </div>

            <br>

            <div class="col-md-6">
              <h5 class="card-title">Itens da Venda</h5>
            </div>

            <table class="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Tamanho</th>
                  <th>Preço Unit</th>
                  <th>Quantidade</th>
                  <th>Sutbotal</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in venda.itens">
                  <td>{{ item.produto.nome }}</td>
                  <td>{{ item.tamanho.nome }}</td>
                  <td>{{ item.preco_venda }}</td>
                  <td>{{ item.quantidade }}</td>
                  <td>{{ item.subtotal }}</td>
                </tr>
              </tbody>
            </table>

          </form>
          <div class="col-md-8">
            <label for="total" class="form-label fw-bold">Valor total</label>
            <input type="text" disabled v-model="venda.total" class="form-control">
          </div>
        </div>
      </div>
      <br>
      <crediario :crediario="venda.parcelamento"></crediario>
      </main><!-- End #main -->
  </section>
</template>

<script>
import crediario from './Crediario.vue'
export default {
  props: ['id'],
  data() {
    return {
      venda: {},
    }
  },
  components: {
    crediario
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
      let url = `http://127.0.0.1:8000/api/venda/${this.id}`
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(response => response.json())
      .then(data => {
          console.log(data);
          this.venda = data
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