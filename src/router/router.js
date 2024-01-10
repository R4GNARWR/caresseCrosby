import { createRouter, createWebHistory  } from 'vue-router'
import Home from '../views/Home.vue'
import Catalog from '../views/Catalog.vue'
import CatalogAll from '../views/CatalogAll.vue'
import Product from '../views/Product.vue'
import Favorite from '../views/Favorite.vue'
import Cart from '../views/Cart.vue'
import Order from '../views/Order.vue'
import OrderSuccess from '../views/OrderSuccess.vue'
import OrderError from '../views/OrderError.vue'
import Brands from '../views/Brands.vue'
import Articles from '../views/Articles.vue'
import ArticlesDetail from '../views/ArticleDetail.vue'
import PhotoAlbum from '../views/PhotoAlbum.vue'
import About from '../views/About.vue'
import ProfileData from '../views/ProfileData.vue'
import ProfileOrders from '../views/ProfileOrders.vue'
import CDEKpoints from '../views/CDEKpoints.vue'
import Contacts from '../views/Contacts.vue'
import Delivery from '../views/Delivery.vue'
import GiftCard from '../views/giftCard.vue'
import SizeTable from '../views/SizeTable.vue'
import NotFound from '../views/404.vue'

// Admin

import Admin from '../views/Admin.vue'
import BlogAdd from '../views/BlogAdd.vue'
import BlogEdit from '../views/BlogEdit.vue'
import EditOrder from '../views/EditOrder.vue'
import OrderToPay from '../views/OrderToPay.vue'
import CreateCertificate from '../views/CreateCertificate.vue'

let routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/catalog/:id?/:brands?/:sizes?',
    component: Catalog,
    name: 'Catalog'
  },
  {
    path: '/catalogAll',
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
    path: '/order/success',
    component: OrderSuccess,
  },
  {
    path: '/order/error',
    component: OrderError,
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
  {
    path: '/admin/',
    component: Admin
  },
  {
    path: '/admin/EditOrder/:id',
    component: EditOrder
  },
  {
    path: '/admin/OrderToPay/:id',
    component: OrderToPay
  },
  {
    path: '/admin/BlogAdd',
    component: BlogAdd
  },
  {
    path: '/admin/BlogEdit/:id',
    component: BlogEdit
  },
  {
    path: '/admin/CreateCert',
    component: CreateCertificate
  },
  {
    path: '/pick-point',
    component: CDEKpoints
  }
]

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.name === 'Catalog' && from.name === 'Product' && savedPosition) {
      setTimeout(() => {
        window.scrollTo({
          top: savedPosition.top,
        });
      }, 250);
    } else {
      window.scrollTo(0, 0);
    }
  }
})
