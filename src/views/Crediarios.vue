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
                  <th>Parcelamento</th>
                  <th>Próx. Parcela</th>
                  <!-- <th>Forma de Pagamento</th> -->
                  <th>Valor da Parcela</th>
                  <th colspan="2">Boleto</th>
                  <!-- <th>Boleto</th> -->
                </tr>
              </thead>
              <tbody>
                <tr v-for="(crediario, index) in vendasFiltradas">
                  <!-- <td>{{ venda.created_at }}</td> -->
                  <td><router-link :to="`venda/${crediario.venda.id}`">{{ crediario.venda.id }}</router-link></td>
                  <td>{{ formatarData(crediario.venda.created_at) }}</td>
                  <td>{{ crediario.venda.cliente.nome }}</td>
                  <td v-if="(crediario.parcelas_pagas.indexOf('*') !== -1)" :title="`Valor pago: ${crediario.valor_parcelado - crediario.saldo_devedor}`">{{ crediario.parcelas_pagas }}</td>
                  <td v-else>{{ crediario.parcelas_pagas }}</td>
                  <td>{{ crediario.dia_vencimento }}/{{ hoje.getMonth() + 1 }}/{{ hoje.getFullYear() }}</td>
                  <!-- <td>{{ venda.forma_pagamento.nome }}</td> -->
                  <td>{{ crediario.valor_parcela }}</td>
                  <td><i class="bi bi-file-arrow-down" style="cursor:pointer;" @click="criarPdf(crediario)"></i></td>
                  <td>
                    <a style="cursor:pointer;" @click="selecionarParcelamento(crediario)" data-bs-toggle="modal" data-bs-target="#disablebackdrop">
                      <i class="bi bi-cash-coin"></i>
                    </a>
                  </td>
                  <!-- <td v-if="venda.status == 'Pedido'"><span class="badge text-bg-primary">{{ venda.status }}</span></td>
                  <td v-else-if="venda.status == 'Entregue'"><span class="badge text-bg-primary">{{ venda.status }}</span></td>
                  <td v-else-if="venda.status == 'Aguardando'"><span class="badge text-bg-primary">{{ venda.status }}</span></td>
                  <td v-else-if="venda.status == 'Em Transito'"><span class="badge text-bg-primary">{{ venda.status }}</span></td>
                  <td v-else><span class="badge text-bg-primary">{{ venda.status }}</span></td> -->
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
    <modal-inserir-pagamento :parcelamento="parcelamento"></modal-inserir-pagamento>
  </section>
</template>
<script>
import InserirPagamento from './InserirPagamento.vue'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

export default {
  data() {
    return {
      venda: [],
      vendasFiltradas: [],
      parcelamento: null
      // filtroSegmento: '',
      // filtroCategoria: [0]
    }
  },
  components: {
    'modal-inserir-pagamento': InserirPagamento,
    jsPDF
  },
  computed: {
    hoje() {
      return new Date()
    },
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
    fetch('http://127.0.0.1:8000/api/crediarios', {
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
        el.parcelas_pagas = (el.valor_parcelado - el.saldo_devedor) / el.valor_parcela
        // el.parcelas_pagas = el.parcelas_pagas % 1 == 0 ? el.parcelas_pagas : `${parseInt(el.parcelas_pagas)}*`
        el.parcelas_pagas = el.parcelas_pagas % 1 == 0 ? `${el.parcelas_pagas}/${el.n_parcelas}` : `${parseInt(el.parcelas_pagas)}/${el.n_parcelas}*`
      //   el.segmentos.forEach(el => segmentos.push(el.nome))
      //   el.segmentos = segmentos
      })
      this.vendasFiltradas = this.vendas;
    })
  },
  methods: {
    formatarData(data) {
      data = data.split('T')[0].split('-')
      return `${data[2]}/${data[1]}/${data[0]}`
    },
    selecionarParcelamento(parcelamento) {
      this.parcelamento = parcelamento
    },
    criarPdf(crediario) {
      const pdf = new jsPDF()
      pdf.text('Valor total: R$' + crediario.venda.total, 10, 10)
      let lista = []
      crediario.venda.itens.forEach(el => {
        lista.push([el.produto.nome, el.preco_venda, el.quantidade, el.subtotal])
        console.warn(el)
      })
      pdf.autoTable({
        head: [['Item', 'Preço', 'Quantidade', 'Subtotal']],
        body: lista
        // body: [['Roupa', 2.00], ['Lov', 4.00]]
      })
      pdf.text('Valor parcelado: R$' + crediario.valor_parcelado, 10, pdf.autoTable.previous.finalY + 10)
      pdf.autoTable({
        head: [['N° de parcelas', 'Vencimento', 'Valor da Parcela']],
        body: [[crediario.n_parcelas, crediario.dia_vencimento, crediario.valor_parcela]],
        startY: pdf.autoTable.previous.finalY + 20
      })
      let parcelas = []
      let primeira_parcela = crediario.data_primeira_parcela.split('-')
      for (let i = 0; i < crediario.n_parcelas; i++) {
        if (i == 0) {
          parcelas.push(`${primeira_parcela[2]}/${primeira_parcela[1]}/${primeira_parcela[0]}`)
        } else {
          let mes = primeira_parcela[1]*1 + 1 <= 12 ? primeira_parcela[1] : primeira_parcela[1]*1 + 1
          parcelas.push(`${primeira_parcela[2]}/${mes}/${primeira_parcela[0]}`)
        }
      }
      pdf.autoTable({
        // head: [['N° de parcelas', 'Vencimento', 'Valor da Parcela']],
        body: [parcelas],
        // startY: pdf.autoTable.previous.finalY + 20
      })
      pdf.save('boleto.pdf')
    }
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