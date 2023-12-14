<template>
  <v-container>
    <div class="edit-order" v-if="order">
      <div class="edit-order__label" v-if="orderId">Изменить заказа №{{orderId}}</div>
      <div class="in_row" style="margin-top: 30px">
        <v-text-field
        regular
        class="order_input"
        v-model=order.clientName
        label="Имя покупателя"
        />
        <v-text-field
        class="order_input"
        v-model=order.phone
        label="Телефон"
        
        />
      </div>
      <div v-if="order" class="in_row">
        <v-text-field
        class="order_input"
        v-model= order.city
        label="Город:"
        />
        <v-text-field
        class="order_input"
        v-model= order.street
        label="Адрес:"
        />
        <!--        <v-text-field-->
        <!--            class="order_input"-->
        <!--            v-model= order.status-->
        <!--            title="Адрес:"-->
        <!--        />-->
      </div>
      
      <div class="in_row" v-if="order"><v-text-field class="order_input" v-model="order.comment" label="Примечание"/></div>
      
      <v-text-field class="order_input" v-model="order.commission" label="Стоимость доставки" type="number"/>
      
      <v-btn color="success" style="margin-bottom: 20px" @click="addToOrderSearch(orderId)">+ добавить товар в заказ</v-btn>
      <OrderedProducts v-if="products && products.length>0" :slides-array="products" name="Товары в заказе"/>
        
        <v-btn
        color="success" style="margin-right: 20px; margin-bottom: 20px;"
        v-if="products && products.length>0"
        @click="to_pay"
        >Сохранить и на оплату!</v-btn>
        <v-btn
        color="warning"
        style="margin-bottom: 20px;"
        v-if="products && products.length>0"
        @click="save_order"
        >Сохранить изменения</v-btn>
        <!--    <v-dialog-->
        <!--      style="background-color: #d7c6b0"-->
        <!--        v-model="addProduct"-->
        <!--    >-->
        <!--      <v-card style="border-radius: 20px; width: 100%; height: 100%; max-height: calc(60vw)">-->
          <!--        <v-card-title>-->
            
            <!--          <div class="dt_close_modal_window" @click="addProduct=false">-->
              <!--            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" class="the_cross" width="20px">-->
                <!--              <path d="M2,8 L8,2" class="p1"/>-->
                <!--              <path d="M2,2 L8,8" class="p3"/>-->
                <!--            </svg>-->
                <!--          </div>-->
                <!--        </v-card-title>-->
                <!--        <v-card-text>-->
                  <!--          <Search version="addProduct" :order_id="order.id" @addProductToOrder="(p)=>addProductToOrder(p)"/>-->
                    <!--        </v-card-text>-->
                    <!--      </v-card>-->
                    <!--    </v-dialog>-->
                  </div>
                </v-container>
                
              </template>
              
              <script>
              // import Products from "../components/Products";
              // import Search from "@/desk_top/views/Search"
              import {mapState} from "vuex";
              import store from "../store/store";
              import OrderedProducts from "../components/OrderedProducts.vue";
              
              export default {
                name: "EditOrder",
                data() {
                  return {
                    orderId: null,
                    order: null,
                    products: [],
                    // addProduct:false
                  };
                },
                computed: {
                  ...mapState(['user_info', 'loggedIn'])
                },
                components: { OrderedProducts },
                created() {
                  setTimeout(() => {
                        if (this.user_info.role !== 3) {
                              store.commit("set_snack_message", { msg: "Нужен пользователь с правами администратора!", color: "red" });
                              store.commit('loader');
                              setTimeout(() => {
                                    store.commit('loader');
                                    this.$router.push('/');
                                }, 2500);
                            }
                        }, 1000);
                        if (this.$route.params.id)
                        this.orderId = this.$route.params.id;
                        if (this.orderId)
                        this.$API.getOrderInfo(this.orderId).then(value => {
                          this.order = value.data.order;
                          this.products = value.data.products;
                        });
                      },
                      methods: {
                        addToOrderSearch(orderId) {
                          store.commit("addToOrder", orderId);
                          this.$router.push('/Search');
                        },
                        save_order() {
                          this.order.id = this.orderId;
                          this.$API.updateOrderProduct(this.order.id, this.products);
                          this.$API.updateOrder(this.order).then(() => {
                            store.commit("set_snack_message", { msg: "Изменения сохранены!" });
                          });
                        },
                        to_pay() {
                          this.save_order();
                          this.$router.push('/Admin/OrderToPay/' + this.orderId);
                        },
                      },
                      
                    }
                  </script>
                  
<style scoped>
  .edit-order
  {
    padding: 50px 0;
  }
  .edit-order__label
  {
    font-size: 28px;
    font-weight: 600;
    margin-bottom: 30px;
  }
  .edit-order__sublabel
  {
    font-size: 22px;
    font-weight: 600;
    margin-bottom: 30px;
  }
  .v-btn{
    font-size: 1.4rem;
    padding: 1.6rem 2.4rem;
    height: auto;
  }
  @media (max-width: 600px) {
    .v-btn
    {
      font-size: 12px;
      padding: 14px 18px;
    }
  }
</style>
                