<template>
  <section id="orderToPay">
    <v-container>
      <div v-if="order" class="static_page" style="text-align: left">
        <div class="order-to-pay__label">Ссылка на оплату заказа №{{orderId}} отправлена клиенту</div>
        <div class="order-to-pay__text">Имя покупателя: {{order.clientName}}</div>
        <div class="order-to-pay__text">Телефон: {{order.phone}}</div>
        <div class="order-to-pay__text">Адрес: {{order.city + order.street}}</div>
        <!-- <Products :products="products" version="paid" style="max-width: 900px"/> -->
        <OrderedProducts name="Товары" :slidesArray="products" v-if="products"></OrderedProducts>
      </div>
    </v-container>
  </section>
</template>

<script>
import OrderedProducts from '../components/OrderedProducts.vue';
import store from "../store/store";
import {mapState} from "vuex";
// import Products from "../components/Products";
export default {
  name: "OrderToPay",
  components: { OrderedProducts },
  data() {
    return {
      orderId: null,
      order: null,
      products: []
    };
  },
  head() {
        return {
            title: "Магазин удобного белья в Уфе | Caresse Crosby",
            meta: [
                { content: "Магазин удобного белья в Уфе | Caresse Crosby" }
            ]
        }
    },
  computed: {
    ...mapState(['user_info', 'loggedIn'])
  },
  created() {
    if (this.user_info.role !== 3) {
      store.commit("set_snack_message", { msg: "Нужен пользователь с правами администратора!", type:'error' });
      store.commit('loader','start')
      setTimeout(() => {
        store.commit('loader','finish')
        this.$router.push('/');
        }, 2500);
    }
    if (this.$route.params.id) {
      this.orderId = this.$route.params.id;
    }
    if (this.orderId) {
      this.$API.getOrderInfo(this.orderId).then(value => {
        this.order = value.data.order;
        this.products = value.data.products;
      });
    }
    // this.$API.orderToPay(this.orderId);
  },
}
</script>

<style scoped lang="scss">
#orderToPay
{
  padding: 5rem 0 10rem 0;
}
.order-to-pay__label
{
  font-size: 28px;
  line-height: 1.3em;
  margin-bottom: 30px;
}
.order-to-pay__text
{
  font-size: 18px;
  line-height: 1.3em;
  margin-bottom: 20px;
}
</style>
