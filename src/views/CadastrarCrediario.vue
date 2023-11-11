<template>
  <section>
    <main id="main" class="main" v-if="!carregando">
      <div class="pagetitle">
          <h1>Novo Crediário</h1>
          <nav>
          <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="/">Home</a></li>
              <li class="breadcrumb-item active">Novo Crediário</li>
          </ol>
          </nav>
      </div><!-- End Page Title -->

      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Dados da Venda</h5>
          <div class="row g-3">
            <div class="col-md-4">
              <label for="cliente" class="form-label fw-bold">Cliente</label>
              <select class="form-select" required id="cliente" v-model="cliente">
                <option value="">- Selecione -</option>
                <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.id">{{ cliente.nome }}</option>
              </select>
            </div>
            <div class="col-md-4">
              <label for="contato" class="form-label fw-bold">Contato</label>
              <input type="text" disabled class="form-control" id="contato" :value="contatoClienteSelecionado">
              <!-- <select disabled class="form-select" required id="contato" v-model="formaPagamento">
                <option value="">- Selecione -</option>
                <option v-for="formaPagamento in formasPagamento" :value="formaPagamento.id">{{ formaPagamento.nome }}</option>
              </select> -->
            </div>
            <div class="col-md-4">
              <label for="forma-pagamento" class="form-label fw-bold">Forma de Pagamento</label>
              <select disabled class="form-select" required id="forma-pagamento" v-model="formaPagamento">
                <option value="">- Selecione -</option>
                <option v-for="formaPagamento in formasPagamento" :value="formaPagamento.id">{{ formaPagamento.nome }}</option>
              </select>
            </div>
          </div>
          <br>
          <div class="row g-3">
            <div class="col-md-12">
              <label for="forma-pagamento" class="form-label fw-bold">Endereco de Entrega</label>
              <input type="text" disabled class="form-control" id="contato" :value="enderecoClienteSelecionado">
            </div>
          </div>
          
          <br>
          
          <h5 class="card-title">Itens da Venda</h5>
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
                      <!-- <input type="text" id="produtos" class="form-control" v-model="item.produto_id" @change="selecionarProduto(item.produto_id, index)"> -->
                      <select @change="selecionarProduto(item.produto_id, index)" id="produtos" class="form-select" required v-model="item.produto_id">
                        <option value="">- Selecione -</option>
                        <option v-for="produto in produtos" :value="produto.id">{{ produto.nome }}</option>
                      </select>
                      <small v-show="index == formulario.length-1">Novo produto</small>
                    </td>
                    <td>
                      <!-- <input type="text" id="tamanho" class="form-control" required v-model="item.tamanho_id"> -->
                      <select :disabled="!item.tamanhos" id="tamanho" class="form-select" required v-model="item.tamanho_id">
                        <option value="">- Selecione -</option>
                        <option v-for="tamanho in item.tamanhos" :value="tamanho.id">{{ tamanho.nome }}</option>
                      </select>
                    </td>
                    <!-- <td><input v-model="item.preco_venda" @change="calcularFormulario(index)" type="number" class="form-control"></td> -->
                    <td><input disabled v-model="item.preco_venda" @change="calcularFormulario(index)" type="number" class="form-control"></td>
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
          </div>

            <!-- <div v-if="formaPagamento == '5'"> -->
              <h5 class="card-title">Dados do Parcelamento</h5>
              <div class="row g-3" v-if="parcelamento.entrada != null">
                <div class="col-md-3">
                  <label for="forma-pagamento" class="form-label fw-bold">Entrada</label>
                  <input type="number" class="form-control" v-model="parcelamento.entrada" @change="calcularParcela()">
                </div>
              </div>
              <div class="row g-3">
                <div class="col-md-3">
                  <label for="vencimento" class="form-label fw-bold">Dia de Vencimento</label>
                  <input type="number" class="form-control" name="vencimento" id="vencimento" v-model="parcelamento.dia_vencimento" @change="preencherdata_primeira_parcela()" min="1" max="30">
                  <small @click="addEntrada()" v-if="parcelamento.entrada == null" style="cursor:pointer;">Adcionar entrada</small>
                </div>
                <div class="col-md-3">
                  <label for="n-parcelas" class="form-label fw-bold">Parcelas</label>
                  <select class="form-select" required id="forma-pagamento" @change="calcularParcela()" v-model="parcelamento.n_parcelas">
                    <option value="">- Selecione -</option>
                    <option :value="i" v-for="i in 6">{{ i }}x</option>
                  </select>
                </div>
                <div class="col-md-3">
                  <label for="primeira-parcelas" class="form-label fw-bold">Primeira Parcela</label>
                  <input disabled type="text" class="form-control" name="primeira-parcelas" id="primeira-parcela" v-model="parcelamento.data_primeira_parcela">
                </div>
                <div class="col-md-3">
                  <label for="valor-parcela" class="form-label fw-bold">Valor da Parcela</label>
                  <input disabled type="text" class="form-control" name="valor-parcelas" id="valor-parcela" :value="parcelamento.valor_parcela">
                </div>
              </div>
            <!-- </div> -->

            <div class="d-flex justify-content-end">
              <!-- <div class="btn btn-primary" @click="salvarVenda()">Vai Baby</div> -->
              <button @click="salvarVenda()" class="btn btn-primary" style="margin-right: 20px;">Salvar</button>
              <!-- <button class="btn btn-primary" @click="salvarVenda()" style="margin-right: 20px;">Salvar</button> -->
              <button type="reset" class="btn btn-secondary" style="margin-right: 20px;">Limpar</button>
            </div>
          </div>
        </div>
      <!-- </div> -->

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
        cliente: '',
        formaPagamento: 5,
        formulario: [{
          produto_id: '',
          tamanho_id: '',
          preco_venda: '',
          quantidade: 0,
          subtotal: ''
        }],
        total: '',
        clientes: [],
        produtos: [],
        tamanhos: [], 
        formasPagamento: '',
        parcelamento: {
          entrada: null,
          dia_vencimento: '',
          data_primeira_parcela: '',
          n_parcelas: 0,
          valor_parcela: 0,
        },
      }
    },
    computed: {
      contatoClienteSelecionado() {
        if (this.cliente != '') return this.clientes.find(el => el.id == this.cliente).contato
      },
      enderecoClienteSelecionado() {
        let endereco = null
        if (this.cliente != '') {
          endereco = this.clientes.find(el => el.id == this.cliente).enderecos[0]
          let enderecoCompleto = endereco.logradouro + ', ' + endereco.numero
          enderecoCompleto += endereco.complemento ? ' - ' + endereco.complemento : ''
          enderecoCompleto += ' - ' + endereco.cidade
          endereco = enderecoCompleto
        }
        return endereco
      }
    },
    mounted() {
      this.setDefinicaoInputs()
      this.getClientes()
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
        console.log(index)
        let formulario = this.formulario[index]
        if (formulario.preco_venda != '') {
          formulario.subtotal = formulario.preco_venda * formulario.quantidade
          formulario.subtotal = formulario.subtotal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') * 1
          this.formulario[index] = formulario
          this.total = 0
          this.formulario.forEach(el => {
            this.total += el.subtotal
          })
          this.total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') * 1
        }
        let n = 2000
        console.log(n.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'))
        console.log(n.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'))
      },
      selecionarProduto(produto_id, index) {
        if (produto_id > 0) {
          this.formulario[index].preco_venda = this.produtos.find(produto => produto.id == produto_id).preco_venda
          this.formulario[index].tamanhos = this.produtos.find(produto => produto.id == produto_id).tamanhos
        } else {
          this.formulario[index].preco_venda = ''
          this.formulario[index].tamanhos = ''
        }
        this.formulario[index].quantidade = ''
        this.formulario[index].subtotal = ''
        this.calcularFormulario(index)
      },
      calcularParcela() {
        let valor_parcela = ''
        if (this.total > 0 && this.parcelamento.n_parcelas > 0) {
          if (this.parcelamento.entrada > 0) {
            valor_parcela = (this.total - this.parcelamento.entrada) / this.parcelamento.n_parcelas
          } else {
            valor_parcela = this.total / this.parcelamento.n_parcelas
          }
          this.parcelamento.valor_parcela = valor_parcela.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
        }
      },
      preencherdata_primeira_parcela() {
        const dataAtual = new Date()
        let dia = dataAtual.getDate()
        let mes = dataAtual.getMonth()
        let ano = dataAtual.getFullYear()
        if (this.parcelamento.dia_vencimento > dia) {
          this.parcelamento.data_primeira_parcela = new Date(ano, mes, this.parcelamento.dia_vencimento).toISOString().substring(0, 10)
        } else {
          this.parcelamento.data_primeira_parcela = new Date(ano, mes + 1, this.parcelamento.dia_vencimento).toISOString().substring(0, 10)
        }
      },
      salvarVenda() {
        let payload = {
          venda: {
            cliente_id: this.cliente,
            forma_pagamento_id: this.formaPagamento,
            total: this.total  
          },
          itens_venda: this.formulario,
          parcelamento: this.parcelamento
        }
        let url = 'http://127.0.0.1:8000/api/cadastrarVenda'
        fetch(url, {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        })
        .then(response => response.json())
        .then(data => {
          this.$router.push('/vendas')
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
      getClientes() {
        this.carregando = true
        let url = 'http://127.0.0.1:8000/api/clientes'
        fetch(url, {
          method: "GET",
          headers: {
              "Content-Type": "application/json"
          },
        })
        .then(response => response.json())
        .then(data => {
          this.clientes = data
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
          this.produtos.forEach(produto => {
            produto.tamanhos.forEach(el => {
              el.quantidade = el.pivot.quantidade
            })
          })
          this.carregando = false
        })
        .catch(error => {
          console.error(error);
        })
      },
      addEntrada() {
        this.parcelamento.entrada = 0
      }
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