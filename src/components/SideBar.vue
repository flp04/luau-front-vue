<template>

  <!-- ======= Sidebar ======= -->
  <aside id="sidebar" class="sidebar">

    <ul class="sidebar-nav" id="sidebar-nav">

      <li class="nav-item">
        <a class="nav-link " href="/">
          <i class="bi bi-grid"></i>
          <span>Dashboard</span>
        </a>
      </li><!-- End Dashboard Nav -->

      <li class="nav-item" v-for="campeonato in competicoes" ::key="campeonato">
        <!-- <a class="nav-link collapsed" data-bs-target="#components-nav" data-bs-toggle="collapse" :href=`index.php?code=${campeonato.code}`> -->
        <a class="nav-link" data-bs-target="#components-nav" :href="`/liga/${campeonato.code}`">
          <img :src="campeonato.emblem" style="width: 24px; height: 24px;"><span>{{ campeonato.nome }}</span>
        </a>
<<<<<<< HEAD
        <ul v-if="item.subitens" :id="`${item.nome}-nav`" class="nav-content collapse " data-bs-parent="#sidebar-nav">
          <li v-for="subitem in item.subitens">
            <!-- <a :href="subitem.rota">
              <i class="bi bi-circle"></i><span>{{ subitem.nome }}</span>
            </a> -->
            <router-link :to="subitem.rota"><i class="bi bi-circle"></i><span>{{ subitem.nome }}</span></router-link>
          </li>
        </ul>
=======
>>>>>>> 0b78401c55593c9debce0aa4ff22d2afa2794503
      </li>

    </ul>

  </aside><!-- End Sidebar-->

</template>

<script>
export default {
  data() {
    return {
<<<<<<< HEAD
          menu: [
            // {
            //   nome: 'Produtos',
            //   rota: '',
            //   subitens: [
            //     {
            //       nome: 'Cadastrar Novo Produto',
            //       rota: '/novo-produto'
            //     },
            //     {
            //       nome: 'Lista de Produtos',
            //       rota: '/produtos'
            //     }
            //    ]
            // },
            // {
            //   nome: 'Fornecedores',
            //   rota: '',
            //   subitens: [
            //     {
            //       nome: 'Cadastrar Novo Fornecedor',
            //       rota: '/novo-fornecedor'
            //     },
            //     {
            //       nome: 'Lista de Fornecedores',
            //       rota: '/fornecedores'
            //     }
            //   ],
            // },
            // {
            //   nome: 'Compras',
            //   // rota: 'compras',
            //   subitens: [
            //     {
            //       nome: 'Cadastrar Nova Compra',
            //       rota: '/nova-compra'
            //     },
            //     {
            //       nome: 'Lista de Compras',
            //       rota: '/compras'
            //     },
            //   ]
            // },
            {
              nome: 'Clientes',
              rota: '',
              subitens: [
                {
                  nome: 'Cadastrar Novo Cliente',
                  rota: '/novo-cliente'
                },
                {
                  nome: 'Lista de Clientes',
                  rota: '/clientes'
                },
              ],
            },
            {
              nome: 'Vendas',
              // rota: 'compras',
              subitens: [
                {
                  nome: 'Cadastrar Nova Venda',
                  rota: '/nova-venda'
                },
                {
                  nome: 'Lista de Vendas',
                  rota: '/vendas'
                },
              ]
            },
            {
              nome: 'Crediário',
              // rota: 'compras',
              subitens: [
                {
                  nome: 'Novo Crediário',
                  rota: 'novo-crediario'
                },
                {
                  nome: 'Lista de Vendas',
                  rota: '/vendas'
                },
                {
                  nome: 'Lista de Parcelamentos',
                  rota: 'crediarios'
                  // rota: '/'
                },
                {
                  nome: 'Registrar Pagamento de Parcela',
                  // rota: 'nova-pagamento'
                  rota: '/'
                }
              ]
            },
          ]
      }
    },
    mounted() {
    },
    methods: {
    },
=======
      competicoes: [
        {
          nome: 'Campeonato Brasileiro',
          code: 'BSA',
          emblem: 'https://crests.football-data.org/764.svg'
        },
        {
          nome: 'Campeonato Inglês',
          code: 'PL',
          emblem: 'https://crests.football-data.org/PL.png'
        },
        {
          nome: 'Campeonato Português',
          code: 'PPL',
          emblem: 'https://crests.football-data.org/PPL.png'
        },
        {
          nome: 'Campeonato Alemão',
          code: 'BL1',
          emblem: 'https://crests.football-data.org/BL1.png'
        },
        {
          nome: 'Campeonato Holandes',
          code: 'DED',
          emblem: 'https://crests.football-data.org/ED.png'
        },
        {
          nome: 'Campeonato Espanhol',
          code: 'PD',
          emblem: 'https://crests.football-data.org/PD.png'
        },
        {
          nome: 'Campeonato Francês',
          code: 'FL1',
          emblem: 'https://crests.football-data.org/FL1.png'
        },
      ]
    }
  },
  mounted() {
    console.warn('oi')
  },
  methods: {
  },
>>>>>>> 0b78401c55593c9debce0aa4ff22d2afa2794503
}
</script>

<style>

/*--------------------------------------------------------------
# Sidebar
--------------------------------------------------------------*/
.sidebar {
  position: fixed;
  top: 60px;
  left: 0;
  bottom: 0;
  width: 300px;
  z-index: 996;
  transition: all 0.3s;
  padding: 20px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #aab7cf transparent;
  box-shadow: 0px 0px 20px rgba(1, 41, 112, 0.1);
  background-color: #fff;
}

@media (max-width: 1199px) {
  .sidebar {
    left: -300px;
  }
}

.sidebar::-webkit-scrollbar {
  width: 5px;
  height: 8px;
  background-color: #fff;
}

.sidebar::-webkit-scrollbar-thumb {
  background-color: #aab7cf;
}

@media (min-width: 1200px) {

  #main,
  #footer {
    margin-left: 300px;
  }
}

@media (max-width: 1199px) {
  .toggle-sidebar .sidebar {
    left: 0;
  }
}

@media (min-width: 1200px) {

  .toggle-sidebar #main,
  .toggle-sidebar #footer {
    margin-left: 0;
  }

  .toggle-sidebar .sidebar {
    left: -300px;
  }
}

.sidebar-nav {
  padding: 0;
  margin: 0;
  list-style: none;
}

.sidebar-nav li {
  padding: 0;
  margin: 0;
  list-style: none;
}

.sidebar-nav .nav-item {
  margin-bottom: 5px;
}

.sidebar-nav .nav-heading {
  font-size: 11px;
  text-transform: uppercase;
  color: #899bbd;
  font-weight: 600;
  margin: 10px 0 5px 15px;
}

.sidebar-nav .nav-link {
  display: flex;
  align-items: center;
  font-size: 15px;
  font-weight: 600;
  color: #4154f1;
  transition: 0.3;
  background: #f6f9ff;
  padding: 10px 15px;
  border-radius: 4px;
}

.sidebar-nav .nav-link i {
  font-size: 16px;
  margin-right: 10px;
  color: #4154f1;
}

.sidebar-nav .nav-link.collapsed {
  color: #012970;
  background: #fff;
}

.sidebar-nav .nav-link.collapsed i {
  color: #899bbd;
}

.sidebar-nav .nav-link:hover {
  color: #4154f1;
  background: #f6f9ff;
}

.sidebar-nav .nav-link:hover i {
  color: #4154f1;
}

.sidebar-nav .nav-link .bi-chevron-down {
  margin-right: 0;
  transition: transform 0.2s ease-in-out;
}

.sidebar-nav .nav-link:not(.collapsed) .bi-chevron-down {
  transform: rotate(180deg);
}

.sidebar-nav .nav-content {
  padding: 5px 0 0 0;
  margin: 0;
  list-style: none;
}

.sidebar-nav .nav-content a {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  color: #012970;
  transition: 0.3;
  padding: 10px 0 10px 40px;
  transition: 0.3s;
}

.sidebar-nav .nav-content a i {
  font-size: 6px;
  margin-right: 8px;
  line-height: 0;
  border-radius: 50%;
}

.sidebar-nav .nav-content a:hover,
.sidebar-nav .nav-content a.active {
  color: #4154f1;
}

.sidebar-nav .nav-content a.active i {
  background-color: #4154f1;
}

</style>