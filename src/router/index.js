import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import CadastrarCompra from '../views/CadastrarCompra.vue'
import Compras from '../views/Compras.vue'
import Compra from '../views/Compra.vue'
import CadastrarFornecedor from '../views/CadastrarFornecedor.vue'
import Fornecedores from '../views/Fornecedores.vue'
import Fornecedor from '../views/Fornecedor.vue'
import CadastrarProduto from '../views/CadastrarProduto.vue'
import Produtos from '../views/Produtos.vue'
import Produto from '../views/Produto.vue'
import CadastrarCliente from '../views/CadastrarCliente.vue'
import Clientes from '../views/Clientes.vue'
import Cliente from '../views/Cliente.vue'
import CadastrarVenda from '../views/CadastrarVenda.vue'
import Vendas from '../views/Vendas.vue'
import Venda from '../views/Venda.vue'
import About from '../views/About.vue'
import Guard from '../services/middleware.js'
import Liga from '../views/Liga.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    beforeEnter: Guard.auth
  },
  {
    path: '/novo-fornecedor',
    name: 'novoFornecedor',
    component: CadastrarFornecedor
  },
  {
    path: '/fornecedores',
    name: 'fornecedores',
    component: Fornecedores
  },
  {
    path: '/fornecedor/:id',
    name: 'fornecedor',
    component: Fornecedor,
    props: true
  },
  {
    path: '/nova-compra',
    name: 'novaCompra',
    component: CadastrarCompra
  },
  {
    path: '/compras',
    name: 'Compras',
    component: Compras
  },
  {
    path: '/compra/:id',
    name: 'Compra',
    component: Compra,
    props: true
  },
  {
    path: '/novo-produto',
    name: 'novoProduto',
    component: CadastrarProduto
  },
  {
    path: '/produtos',
    name: 'produtos',
    component: Produtos
  },
  {
    path: '/produto/:id',
    name: 'produto',
    component: Produto,
    props: true
  },
  {
    path: '/novo-cliente',
    name: 'novoCliente',
    component: CadastrarCliente
  },
  {
    path: '/clientes',
    name: 'clientes',
    component: Clientes
  },
  {
    path: '/cliente/:id',
    name: 'cliente',
    component: Cliente,
    props: true
  },
  {
    path: '/nova-venda',
    name: 'novaVenda',
    component: CadastrarVenda
  },
  {
    path: '/vendas',
    name: 'vendas',
    component: Vendas
  },
  {
    path: '/venda/:id',
    name: 'venda',
    component: Venda,
    props: true
  },
  {
    path: '/liga/:code',
    name: 'liga',
    component: Liga,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
