import { createRouter, createWebHistory  } from 'vue-router'
import Home from '../views/Home.vue'
import Catalog from '../views/Catalog.vue'
import CatalogAll from '../views/CatalogAll.vue'
import Product from '../views/Product.vue'
import Favorite from '../views/Favorite.vue'
import Cart from '../views/Cart.vue'
import Order from '../views/Order.vue'
import ThankPage from '../views/ThankPage.vue'
import Brands from '../views/Brands.vue'
import Articles from '../views/Articles.vue'
import ArticlesDetail from '../views/ArticleDetail.vue'
import PhotoAlbum from '../views/PhotoAlbum.vue'
import About from '../views/About.vue'
import ProfileData from '../views/ProfileData.vue'
import ProfileOrders from '../views/ProfileOrders.vue'
import Contacts from '../views/Contacts.vue'
import Delivery from '../views/Delivery.vue'
import GiftCard from '../views/giftCard.vue'
import SizeTable from '../views/SizeTable.vue'
import NotFound from '../views/404.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/catalog/:id',
      component: Catalog,
    },
    {
      path: '/catalog/',
      component: CatalogAll,
    },
    {
      path: '/product/:id',
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
      path: '/Favorite',
      component: Favorite,
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
    {
      path: '/profileData',
      component: ProfileData,
    },
    {
      path: '/profileOrders',
      component: ProfileOrders,
    },
    {
      path: '/contacts',
      component: Contacts
    },
    {
      path: '/:pathMatch(.*)*',
      component: NotFound
    },
    {
      path: '/delivery',
      component: Delivery
    },
    {
      path: '/sizeTable',
      component: SizeTable
    },
    {
      path: '/giftCard',
      component: GiftCard
    },
  ],
  scrollBehavior() {
    window.scrollTo(0,0);
  }
})
