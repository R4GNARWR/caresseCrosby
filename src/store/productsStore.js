import { defineStore } from 'pinia'
import API from '../api/products';

export const useProductsStore = defineStore('products', {
    state: () => ({
        productsPopular: [],
        products: [],
        colors_list: [
          {'#000000':['#000000','#483D8B', 'black','черный', 'noir','charc/blac', 'черный/телесный',]},
          {'#8B4513':['#BC8F8F', 'cappuccino', 'deep nude', 'коричневый',]},
          {'#FFDEAD':['#F5DEB3', '#FFEBCD', '#FFF8DC','honey', 'amaretto','latte', 'bare','chai','caramel','champagne',
              'linen','taup','бежевый','карамель', 'кремовый', 'песочный', 'светлый-бежевый', 'слоновая кость', 'телесный',
              'румяна','сливочный жемчуг'
            ]},
          {'#008000':['emerald', 'зеленый', 'хаки',]},
          {'#808080':['серый', 'grey marl', 'темно-серый', 'сланец',]},
          {'#DA70D6':['#FFE4E1', 'himp','пыльно-розовый','розовый', 'misty rose', 'лососевый','дикая роза','vintage',]},
          {'#000080':['#00008','темно-синий','пыльно-голубой', 'сапфировый синий', 'голубой', 'сиреневый','сиреневый',
              'navy', 'синий']},
          {'#FF0000':['#FF0000','винный','виный','терракотовый','малиновый', 'марсала', 'морозная ягода','mulberry', 'красный', 'оранжевый', 'оранжевый ']},
          {'#FFFFFF':['белый', 'ванильный','vanil', 'whit', 'айвори', ]},
          {'#FFFF00':['желтый', 'золотой',]},
          {'Multi!':['harlequine', 'multi',  'teal/pink', 'tribal pri', 'watercolou', 'леопардовый', 'синий+голубой+айвори',
              'синий+лососевый+айвори', 'тропический принт на белом фоне', 'хаки+терракот+айвори', ]},
        ],
    }),
    actions: {
        async fetchPopularProducts() {
          try {
            const response = await API.getPopularProducts();
            if(response) {
              this.productsPopular = response.data;
            }
          } catch (error) {
            console.log(error);
          }
        },
        async fetchAllProducts() {
          try {
            const response = await API.getAllProducts();
            if(response) {
              this.products = response.data;
            }
          } catch (error) {
            console.log(error);
          }
        },
    },
})