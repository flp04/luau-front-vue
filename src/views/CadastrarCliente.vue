<template>
  <section>
    <main id="main" class="main">

      <div class="pagetitle">
          <h1>Novo Cliente</h1>
          <nav>
          <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="/">Home</a></li>
              <li class="breadcrumb-item active">Novo Cliente</li>
          </ol>
          </nav>
      </div><!-- End Page Title -->

      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Novo Cliente</h5>
          <div class="row g-3">
            <div class="col-md-12">
              <label for="nome" class="form-label fw-bold">Nome</label>
              <input class="form-control" required id="nome" v-model="cliente.nome" type="text">
            </div>
            <div class="col-md-6">
              <label for="contato" class="form-label fw-bold">Contato</label>
              <input v-mask="'(##) # ####-####'" class="form-control" required id="contato" v-model="cliente.contato" type="text">
            </div>
            <div class="col-md-6">
              <label for="data_nascimento" class="form-label fw-bold">Data de Nascimento</label>
              <input class="form-control" required id="data_nascimento" v-model="cliente.data_nascimento" type="date">
            </div>
          <h5 class="card-title">Endereço</h5>
          <div class="row">
            <div class="col-md-6">
              <label for="cep" class="form-label fw-bold">CEP</label>
              <input class="form-control" required id="cep" v-model="endereco.cep" @change="preencherEndereco()" type="text" v-mask="'#####-###'">
              <!-- <small>Não sei o CEP</small> -->
            </div>
          </div>
            <div class="col-md-6">
              <label for="logradouro" class="form-label fw-bold">Logradouro</label>
              <input disabled class="form-control" required id="logradouro" v-model="endereco.logradouro" type="text">
            </div>
            <div class="col-md-3">
              <label for="numero" class="form-label fw-bold">Número</label>
              <input class="form-control" required id="numero" v-model="endereco.numero" type="number">
            </div>
            <div class="col-md-3">
              <label for="complemento" class="form-label fw-bold">Complemento</label>
              <input class="form-control" required id="complemento" v-model="endereco.complemento" type="text">
            </div>
            <div class="col-md-4">
              <label for="complemento" class="form-label fw-bold">Bairro</label>
              <input disabled class="form-control" required id="complemento" v-model="endereco.bairro" type="text">
            </div>
            <div class="col-md-4">
              <label for="cidade" class="form-label fw-bold">Cidade</label>
              <input disabled class="form-control" required id="cidade" v-model="endereco.cidade" type="text">
            </div>
            <div class="col-md-4">
              <label for="estado" class="form-label fw-bold">Estado</label>
              <input disabled class="form-control" required id="estado" v-model="endereco.estado" type="text">
            </div>
            <!-- <div class="col-md-6">
              <label for="forma-pagamento" class="form-label fw-bold">Bairro</label>
              <select class="form-select" required id="forma-pagamento" v-model="formaPagamento">
                <option value="dinheiro">Dinheiro</option>
                <option value="cartão">Cartão</option>
              </select>
            </div>
            <div class="table-responsive">
              <table class="table table-borderless">
                <thead>
                  <tr>
                    <th>Produto</th>
                    <th>Valor</th>
                    <th>Quant.</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in formulario">
                    <td><input v-model="item.produto" type=" text" class="form-control"></td>
                    <td><input v-model="item.valor" @change="calcularFormulario(index)" type="number" class="form-control"></td>
                    <td><input v-model="item.quantidade" @change="calcularFormulario(index)" type="number" class="form-control"></td>
                    <td><input v-model="item.subtotal" disabled type="number" class="form-control"></td>
                    <td @click="addLinha()" style="cursor: pointer;">&#43</td>
                    <td @click="excluirLinha(index)" style="cursor: pointer;">&#x2716</td>
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
            </div> -->
            <div class="d-flex justify-content-end">
              <button @click="cadastrarCliente()" class="btn btn-primary" style="margin-right: 20px;">Salvar</button>
              <!-- <button class="btn btn-primary" style="margin-right: 20px;">Salvar</button> -->
              <!-- <button class="btn btn-primary" @click="salvarCompra()" style="margin-right: 20px;">Salvar</button> -->
              <button type="reset" class="btn btn-secondary" style="margin-right: 20px;">Limpar</button>
            </div>
          </div>
        </div>
      </div>

    </main><!-- End #main -->
  </section>
</template>
<script>
import {mask} from 'vue-the-mask'
import VueTagsInput from "@sipec/vue3-tags-input"

  export default {
    data() {
      return {
        cliente: {
          nome: '',
          contato: '',
          data_nascimento: '',
        },
        segmento: '',
        segmentos: [],
        endereco: {
          logradouro: '',
          numero: '',
          complemento: '',
          bairro: '',
          cidade: '',
          estado: '',
          cep: ''
        },
      }
    },
    directives: {
      mask
    },
    components: {
      VueTagsInput,
    },
    methods: {
      cadastrarCliente() {
        this.cliente.contato = this.cliente.contato.replace(/\D/g, '')
        let payload = {
          cliente: this.cliente,
          endereco: this.endereco,
          // segmentos: this.segmentos
        }
        let url = 'http://127.0.0.1:8000/api/cadastrarCliente'
        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Access': 'application/json'
          },
          body: JSON.stringify(payload)
        })
      },
      preencherEndereco() {
        if (this.endereco.cep.replace('-', '').length == 8) {
          fetch(`https://viacep.com.br/ws/${this.endereco.cep}/json/`)
          .then(response => response.json())
          .then(data => {
            this.endereco.logradouro = data.logradouro
            this.endereco.bairro = data.bairro
            this.endereco.cidade = data.localidade
            this.endereco.estado = data.uf
          })
          .catch(error => {
            console.log('Ocorreu um erro:', error);
          })
        }
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