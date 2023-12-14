<template>
    <section class="profile">
        <v-container>
            <div class="breadcrumbs text-page__breadcrumbs">
                <router-link class="breadcrumbs-item" to="/">Главная</router-link>
                <div class="breadcrumbs-divider">/</div>
                <a class="breadcrumbs-item active">Профиль</a>
            </div>
            <div class="profile-tabs">
                <router-link to="/profileData">
                    Мои данные
                </router-link>
                <router-link to="/profileOrders" class="active">
                    Заказы
                </router-link>
            </div>
            <v-row>
                <v-col cols="12" v-for="(item, index) in orders" :key="index" v-if="orders && orders.length">
                    <div class="order__item">
                        <div class="order__item-head">
                            <div class="order__item-head__name">
                                {{getTime(item.date)}}
                                <span>Заказ № {{item.orderId}}</span>
                            </div>
                            <div class="order__item-head__summary">
                                <!-- Доставка: 700 ₽ -->
                                <span>Сумма: {{ getSum(products[item.orderId]) }} ₽</span>
                            </div>
                        </div>
                        <v-row>
                            <v-col md="6" cols="12">
                                <div class="order__item-body">
                                    <div class="order__item-body__prop">
                                        Статус:
                                        <span class="status">{{item.statusName}}</span>
                                    </div>
                                    <div class="order__item-body__prop">
                                        Дата оформления:
                                        <span>{{getTime(item.date)}}</span>
                                    </div>
                                    <!-- <div class="order__item-body__prop">
                                        Адрес доставки:
                                        <span>Краснодар, улица Героев-Разведчиков, д. 26/4, </span>
                                    </div> -->
                                    <!-- <div class="order__item-body__prop">
                                        Получатель:
                                        <span>Гайнцев Егор, тел. +7 950 279-37-31 <br>
                                            При получении может потребоваться паспорт</span>
                                        </div> -->
                                        <MainLink className="btn-gold d-lg-block d-none">Позвонить +7 917 747 15 61</MainLink>
                                    </div>
                                </v-col>
                                <v-col md="6" cols="12">
                                    <div class="order__item-photos">
                                        <swiper-container
                                        class="swiper"
                                        :loop= "true"
                                        :breakpoints="{
                                            0:{
                                                slidesPerView: 2,
                                                spaceBetween: 18,
                                            },
                                            600: {
                                                slidesPerView: 3,
                                                spaceBetween: 24,
                                            },
                                            960: {
                                                slidesPerView: 4,
                                                spaceBetween: 32,
                                            },
                                        }">
                                        <swiper-slide class="swiper-slide" v-for="(product, index) in products[item.orderId]" :key="index">
                                            <OrderCard :product="product"></OrderCard>
                                            <!-- <a class="order-products__wrap-item" href="#">
                                                <img src="/img/product-detail.jpg" alt="">
                                                <div class="order-products__wrap-item-name">{{product.productTitle}}</div>
                                                <ul class="order-products__wrap-item-props">
                                                    <li>Количество: {{ product.quantity + ' ' + product.productUnit }}</li>
                                                </ul>
                                                <div class="order-products__wrap-item-price">
                                                    {{Number((product.quantity * product.price)).toLocaleString()}}{{!(product.quantity *product.price).toString().split('.')[1] ? '' :(product.q *product.price).toString().split('.')[1].length===1 ?'' :''}} ₽
                                                </div>
                                            </a> -->
                                        </swiper-slide>
                                    </swiper-container>
                                    <MainLink className="btn-gold d-lg-none d-block">Позвонить +7 917 747 15 61</MainLink>
                                    <MainLink className="btn-primary">Написать в WhatsApp</MainLink>
                                </div>
                                
                            </v-col>
                        </v-row>
                    </div>
                </v-col>
                <v-col v-else>
                    <div class="order__empty">
                        У вас пока нет заказов
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </section>
</template>

<script>
import { register } from 'swiper/element/bundle';

import Breadcrumbs from '../components/UI/Breadcrumbs.vue';
import MainBtn from '../components/UI/MainBtn.vue';
import MainLink from '../components/UI/MainLink.vue';
import DetailLinks from '../components/UI/DetailLinks.vue';
import OrderCard from '../components/UI/OrderCard.vue'

export default {
    components: {
        Breadcrumbs,
        MainBtn,
        MainLink,
        DetailLinks,
        OrderCard
    },
    data() {
        return {
            orders: [],
            products: {}
        };
    },
    beforeCreate() {
        register()
    },
    methods: {
        async getOrders() {
            try {
                const value = await this.$API.get_user_orders();
                this.orders = value.data.orders
                for (let order of value.data.orders) {
                    let orderId = order.orderId
                    const orderedProducts = await this.$API.get_order_info(orderId)
                    this.products[orderId] =  orderedProducts.data.products
                }
            } catch (error) {
                console.log(error);
            }
        },
        getTime(string) {
            const date = new Date(string);
            
            const options = {
                day: "numeric",
                month: "long",
                hour: "numeric",
                minute: "numeric"
            };
            
            const formattedDate = date.toLocaleString("ru-RU", options);
            return formattedDate
        },
        getSum(array) {
            let price = 0;
            if (array && array.length > 0) {
                for (let product of array) {
                    price += product.price * product.quantity;
                }
            }
            const formattedPrice = price.toLocaleString("ru-RU");
            return formattedPrice;
        }
    },
    
    created() {
        this.getOrders()
    }
    
};
</script>

<style lang="scss">
.order__item
{
    margin-bottom: 4rem;
    border: 1px solid #E9E9E9;
}
.order__empty
{
    font-size: 36px;
    padding: 50px;
    text-align: center;
}
.order__item-head
{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.6rem 2.4rem;
    background: #F4F4F4;
    &__name
    {
        display: flex;
        flex-direction: column;
        row-gap: .4rem;
        color: $primary;
        font-size: 2rem;
        font-weight: 600;
        line-height: 1.4em;
        letter-spacing: -0.28px;
        span
        {
            color: #827F7D;
            font-size: 1.4rem;
            line-height: 1.4em;
            letter-spacing: -0.056px;
        }
    }
    &__summary
    {
        display: flex;
        column-gap: 2.4rem;
        color: #827F7D;
        font-size: 2rem;
        font-weight: 500;
        line-height: 1.4em;
        letter-spacing: -0.28px;
        span
        {
            color: $primary;
            font-size: 2rem;
            font-weight: 500;
            line-height: 1.4em;
            letter-spacing: -0.28px;
        }
    }
}
.order__item-body
{
    height: 100%;
    padding: 3.2rem 0 2.4rem 2rem;
    display: flex;
    flex-direction: column;
    row-gap: 1.6rem;
    &__prop
    {
        display: flex;
        flex-direction: column;
        color:#827F7D;
        font-size: 1.6rem;
        line-height: 1.5em;
        letter-spacing: -0.128px;
        span
        {
            color: #27231F;
            font-size: 1.6rem;
            line-height: 1.5em;
            letter-spacing: -0.128px;
        }
    }
    .btn
    {
        margin-top: auto;
    }
}
.order__item-photos
{
    padding: 3.2rem 2rem 2.4rem 0;
    display: flex;
    flex-direction: column;
    row-gap: 2rem;
    height: 100%;
    &__wrap
    {
        padding-left: 4rem;
        display: grid;
        column-gap: 3.2rem;
        grid-template-columns: repeat(4, 1fr);
    }
    .btn
    {
        margin-top: auto;
    }
}
@media (max-width: 960px) {
    .order__item-head
    {
        padding: 16px;
        flex-direction: column;
        row-gap: 16px;
        align-items: flex-start;
        &__name
        {
            row-gap: 0;
            font-size: 16px;
            span
            {
                font-size: 12px;
            }
        }
        &__summary
        {
            column-gap: 24px;
            font-size: 14px;
            span
            {
                font-size: 14px;
            }
        }
    }
    .order__item-photos
    {
        padding: 0 16px 24px 16px;
        &__wrap
        {
            margin-bottom: 24px;
            padding-left: 0;
        }
    }
    .order__item-body
    {
        padding: 24px 16px 16px 16px;
        row-gap: 16px;
        &__prop
        {
            font-size: 14px;
            span
            {
                font-size: 14px;
            }
        }
    }
    .order__item-photos
    {
        margin-bottom: 32px;
    }
}
</style>