<template>
  <section>
    <main id="main" class="main" v-if="!carregando">
      <div class="pagetitle">
          <h1>Nova Compra</h1>
          <nav>
          <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="/">Home</a></li>
              <li class="breadcrumb-item active">Nova Compra</li>
          </ol>
          </nav>
      </div><!-- End Page Title -->

      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Dados da Compra</h5>
          <div class="row g-3">
            <div class="col-md-4">
              <label for="fornecedor" class="form-label fw-bold">Fornecedor</label>
              <select class="form-select" required id="fornecedor" v-model="fornecedor">
                <option value="">- Selecione -</option>
                <option v-for="fornecedor in fornecedores" :key="fornecedor.id" :value="fornecedor.id">{{ fornecedor.nome }}</option>
              </select>
            </div>
            <div class="col-md-4">
              <label for="forma-pagamento" class="form-label fw-bold">Forma de Pagamento</label>
              <select class="form-select" required id="forma-pagamento" v-model="formaPagamento">
                <option value="">- Selecione -</option>
                <option v-for="formaPagamento in formasPagamento" v-show="formaPagamento.nome != 'Crediario'" :value="formaPagamento.id">{{ formaPagamento.nome }}</option>
              </select>
            </div>
            <div class="col-md-4">
              <label for="forma-envio" class="form-label fw-bold">Forma de Envio</label>
              <select class="form-select" required id="forma-envio" v-model="formaEnvio">
                <option value="">- Selecione -</option>
                <option value="0">Retirada</option>
                <option value="1">Entrega</option>
              </select>
            </div>
          </div>

          <br>
          
          <h5 class="card-title">Itens da Compra</h5>
          <div class="row g-3">
            <div class="table-responsive">
              <table class="table table-borderless">
                <thead>
                  <tr>
                    <!-- <th>Produto <a style="cursor:pointer;" title="Novo Produto" data-bs-toggle="modal" data-bs-target="#disablebackdrop">+</a></th> -->
                    <th>Produto</th>
                    <th>Tamanho</th>
                    <th>Preço</th>
                    <th>Quant.</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in formulario">
                    <td>
                      <select id="produtos" class="form-select" required v-model="item.produto_id">
                        <option value="">- Selecione -</option>
                        <option v-for="produto in produtos" :value="produto.id">{{ produto.nome }}</option>
                      </select>
                      <!-- <small>Novo produto</small> -->
                    </td>
                    <td><select id="tamanho" class="form-select" required v-model="item.tamanho_id">
                      <option value="">- Selecione -</option>
                      <option v-for="tamanho in tamanhos" :value="tamanho.id">{{ tamanho.nome }}</option>
                    </select></td>
                    <!-- <td><input disabled type="number" class="form-control" :value="item.valor"></td> -->
                    <td><input v-model="item.preco_venda" @change="calcularFormulario(index)" type="number" class="form-control"></td>
                    <td><input v-model="item.quantidade" @change="calcularFormulario(index)" type="number" class="form-control"></td>
                    <td><input v-model="item.subtotal" disabled type="number" class="form-control"></td>
                    <td @click="addLinha()" style="cursor: pointer;">&#43</td>
                    <td @click="excluirLinha(index)" style="cursor: pointer;">x</td>
                    <!-- <td @click="excluirLinha(index)" style="cursor: pointer;">&#x2716</td> -->
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td></td>
                    <td></td>
                    <th>Total</th>
                    <td>{{ total }}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div class="d-flex justify-content-end">
              <!-- <div class="btn btn-primary" @click="salvarCompra()">Vai Baby</div> -->
              <button @click="salvarCompra()" class="btn btn-primary" style="margin-right: 20px;">Salvar</button>
              <!-- <button class="btn btn-primary" @click="salvarCompra()" style="margin-right: 20px;">Salvar</button> -->
              <button type="reset" class="btn btn-secondary" style="margin-right: 20px;">Limpar</button>
            </div>
          </div>
        </div>
      </div>

      <div class="modal fade" id="disablebackdrop" tabindex="-1" data-bs-backdrop="false">
        <div class="modal-dialog">
        <!-- <div class="modal-dialog modal-dialog-centered"> -->
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Novo Produto</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <label class="form-label fw-bold" for="tecido">Produto</label>
              <input class="form-control" type="text" name="tecido" id="tecido" ref="novoTecido">
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
              <!-- <button type="button" class="btn btn-primary" @click="salvarTecido($refs.novoTecido.value)">Salvar</button> -->
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
        carregando: false,
        fornecedor: '',
        formaPagamento: '',
        formaEnvio: '',
        formulario: [{
          produto_id: '',
          tamanho_id: '',
          preco_venda: '',
          quantidade: '',
          subtotal: ''
        }],
        total: '',
        fornecedores: [],
        produtos: [],
        tamanhos: [], 
        formasPagamento: '',
      }
    },
    computed: {
    },
    mounted() {
      this.setDefinicaoInputs()
      this.getFornecedores()
      this.getProdutos()
    },
    watch: {
    },
    methods: {
      addLinha() {
        this.formulario.push({
          produto_id: '',
          tamanho_id: '',
          preco_venda: '',
          quantidade: '',
          subtotal: ''
        })
      },
      excluirLinha(index) {
        if (this.formulario.length > 1) {
          this.formulario.splice(index, 1)
        }
      },
      calcularFormulario(index) {
        let formulario = this.formulario[index]
        if (formulario.preco_venda != '' && formulario.quantidade != '') {
          formulario.subtotal = formulario.preco_venda * formulario.quantidade
          this.formulario[index] = formulario
          this.total = 0
          this.formulario.forEach(el => {
            this.total += el.subtotal 
          })
        }
      },
      // selecionarProduto(index) {
      //   if (this.formulario[index].produto_id > 0) {
      //     this.formulario[index].preco_venda = this.produtos.find(produto => produto.id == this.formulario[index].produto_id).preco_venda
      //   } else {
      //     this.formulario[index].preco_venda = ''
      //   }
      //     this.formulario[index].quantidade = ''
      //     this.formulario[index].subtotal = ''
      // },
      salvarCompra() {
        let payload = {
          compra: {
            fornecedor_id: this.fornecedor,
            forma_pagamento_id: this.formaPagamento,
            forma_envio: this.formaEnvio,
            total: this.total  
          },
          itens_compra: this.formulario
        }
        let url = 'http://127.0.0.1:8000/api/cadastrarCompra'
        fetch(url, {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        })
        .then(response => response.json())
        .then(data => {
          this.$router.push('/compras')
        })
        .catch(error => {
            console.error(error);
        })
      },
      setDefinicaoInputs() {
        this.tamanhos = JSON.parse(localStorage.getItem('definicaoInputs')).tamanhos
        this.categorias = JSON.parse(localStorage.getItem('definicaoInputs')).categorias
        this.tecidos = JSON.parse(localStorage.getItem('definicaoInputs')).tecidos
        this.formasPagamento = JSON.parse(localStorage.getItem('definicaoInputs')).formas_pagamento
      },
      getFornecedores() {
        this.carregando = true
        let url = 'http://127.0.0.1:8000/api/fornecedores'
        fetch(url, {
          method: "GET",
          headers: {
              "Content-Type": "application/json"
          },
        })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          this.fornecedores = data
          this.carregando = false
        })
        .catch(error => {
          console.error(error);
        })
      },
      getProdutos() {
        this.carregando = true
        let url = 'http://127.0.0.1:8000/api/produtos'
        fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
      })
      .then(response => response.json())
      .then(data => {
          this.produtos = data
          this.carregando = false
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