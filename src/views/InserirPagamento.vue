<template>
  <section>    
    <div class="modal fade" id="disablebackdrop" tabindex="-1" data-bs-backdrop="false">
      <div class="modal-dialog">
      <!-- <div class="modal-dialog modal-dialog-centered"> -->
        <div class="modal-content" v-if="parcelamento">
          <div class="modal-header">
            <h5 class="modal-title">Inserir Pagamento - Venda #{{ parcelamento.venda.id }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <label class="form-label fw-bold" for="tecido">Valor da Parcela</label>
            <input disabled class="form-control" type="text" name="valor_parcela" id="valor_parcela" :value="parcelamento.valor_parcela">
            <label class="form-label fw-bold" for="tecido">Valor do Pagamento</label>
            <input class="form-control" type="text" name="valor_pagamento" id="valor_pagamento" v-model="valor_pagamento">
            <!-- <div class="col-md-4"> -->
              <label for="forma-pagamento" class="form-label fw-bold">Forma de Pagamento</label>
              <select class="form-select" required id="forma-pagamento" v-model="forma_pagamento">
                <option value="">- Selecione -</option>
                <option v-for="formaPagamento in formasPagamento" v-show="formaPagamento.nome != 'Crediario'" :value="formaPagamento.id">{{ formaPagamento.nome }}</option>
              </select>
            <!-- </div> -->
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
            <button type="button" class="btn btn-primary" @click="salvarPagamento()">Salvar</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  props: ['parcelamento'],
  data() {
    return {
      valor_pagamento: '',
      forma_pagamento: ''
    }
  },
  computed: {
    formasPagamento() {
      return JSON.parse(localStorage.getItem('definicaoInputs')).formas_pagamento
    }
  },
  watch: {
    parcelamento() {
      this.valor_pagamento =  this.parcelamento.valor_parcela
    }
  },
  methods: {
    salvarPagamento() {
      let payload = {
        parcelamento_id: this.parcelamento.id,
        valor_pagamento: this.valor_pagamento,
        forma_pagamento: this.forma_pagamento
      }
      fetch('http://127.0.0.1:8000/api/inserirPagamento', {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          'Access': 'application/json'
        },
        })
        .then(response => response.json())
        .then(data => {
          //   this.vendas = data;
          // this.vendas.forEach(el => {
          //   let cliente = []
          // //   el.segmentos.forEach(el => segmentos.push(el.nome))
          // //   el.segmentos = segmentos
          // })
          // this.vendasFiltradas = this.vendas;
      })
    }
  },
}
</script>