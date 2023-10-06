import { createRouter, createWebHistory  } from 'vue-router'
import Home from '../views/Home.vue'
import Catalog from '../views/Catalog.vue'
import Product from '../views/Product.vue'
import Cart from '../views/Cart.vue'
import Order from '../views/Order.vue'
import ThankPage from '../views/ThankPage.vue'
import Brands from '../views/Brands.vue'
import Articles from '../views/Articles.vue'
import ArticlesDetail from '../views/ArticleDetail.vue'
import PhotoAlbum from '../views/PhotoAlbum.vue'
import About from '../views/About.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/catalog',
      component: Catalog,
    },
    {
      path: '/catalog/:id',
      name: 'Product',
      component: Product,
    },
    {
      path: '/cart',
      component: Cart,
    },
    {
      path: '/order',
      component: Order,
    },
    {
      path: '/thankPage',
      component: ThankPage,
    },
    {
      path: '/brands',
      component: Brands,
    },
    {
      path: '/articles',
      component: Articles,
    },
    {
      path: '/articles/:id',
      name: 'ArticlesDetail',
      component: ArticlesDetail,
    },
    {
      path: '/photoAlbum',
      component: PhotoAlbum,
    },
    {
      path: '/about',
      component: About,
    },
  ],
})
