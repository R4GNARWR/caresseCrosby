<template>
    <section class="order">
        <v-container>
            <v-row>
                <v-col md="7" cols=12 class="d-flex flex-column">
                    <div class="order-products">
                        <div class="order-label">
                            Ваш заказ
                            <span>{{cartQuantity + ' ' + productsComputedText}}</span>
                        </div>
                        <div class="order-products__wrap">
                            <a class="order-products__wrap-item" href="#" v-for="(item, index) in cart" :key="index">
                                <img :src="item.photo" alt="">
                                <div class="order-products__wrap-item-name">{{item.name}}</div>
                                <ul class="order-products__wrap-item-props">
                                    <li>{{item.size}}</li>
                                    <li>{{item.colors}}</li>
                                </ul>
                                <div class="order-products__wrap-item-price">
                                    {{Number((item.q * item.price)).toLocaleString()}}{{!(item.q *item.price).toString().split('.')[1] ? '' :(item.q *item.price).toString().split('.')[1].length===1 ?'' :''}} ₽
                                </div>
                            </a>
                        </div>
                        
                    </div>
                    <div class="order-delivery">
                        <div class="order-delivery__label">
                            Данные для доставки
                        </div>
                        <div class="order-type">
                            <div class="order-type__item" :class="{'active': deliveryType === 'courier'}" @click="changeDeliveryType('courier')" role="button">
                                <img :src="deliveryType === 'courier' ? '/svg/radio-active.svg' : '/svg/radio.svg'" alt="">
                                Курьером
                            </div>
                            <div class="order-type__item" :class="{'active': deliveryType === 'pickup'}"  @click="changeDeliveryType('pickup')" role="button">
                                <img :src="deliveryType === 'pickup' ? '/svg/radio-active.svg' : '/svg/radio.svg'" alt="">
                                Самовывоз
                            </div>
                        </div>
                        <div class="order-pickup__wrap" v-if="deliveryType === 'pickup'">
                            <div class="order-pickup__address" v-if="cdek_chozen_pvz && cdek_chozen_pvz.location">
                                {{ cdek_chozen_pvz.location.address }}
                            </div>
                            <router-link to="/pick-point" class="order-pickup">
                                Выбрать пункт самовывоза
                            </router-link>
                        </div>
                        
                        <div class="order-delivery__form" v-show="user_info">
                            <MainInput v-show="deliveryType === 'courier'" class="inline" placeholder="Адрес доставки*" v-model="address" :required="true" inputId="suggest" @blurEvent="blurAdressEvent"></MainInput>
                            <MainInput class="" placeholder="Имя*" v-model="name" :required="true"></MainInput>
                            <MainInput class="" placeholder="Фамилия"></MainInput>
                            <MainInput placeholder="Телефон*" validation-type="phone" v-model="phone" inputType="tel" :required="true"></MainInput>
                            <MainInput class="" placeholder="E-mail*" validationType="email" input-type="email" v-model="email" :required="true"></MainInput>
                        </div>
                    </div>
                </v-col>
                <v-col md="4" cols=12 offset-md="1">
                    <div class="cart-summary order-summary">
                        <div class="cart-summary__label">Сумма заказа</div>
                        <div class="cart-summary__items">
                            <div class="cart-summary__item">
                                {{cartQuantity + ' ' + productsComputedText}} на сумму
                                <span>{{the_sum}} ₽</span>
                            </div>
                            <div class="cart-summary__item">
                                Доставка
                                <span v-if="cdek_delivery_price && cartSum < 10000">{{cdek_delivery_price}}</span>
                                <span v-if="cdek_delivery_price && cartSum > 10000">Бесплатно</span>
                                <span class="waiting" v-if="!cdek_delivery_price">Рассчитывается</span>
                            </div>
                            <div class="cart-summary__item"  v-if="cdek_delivery_price && cdek_min_time">
                                Сроки доставки
                                <span>{{cdek_min_time}}-{{ cdek_min_time + 2 }} {{ daysComputed }}</span>
                            </div>
                            <div class="cart-summary__item" v-if="promocode">
                                Промокод: {{ promocode }}
                                <span class="minus" v-if="promocodeStatus">- 3 000 ₽</span>
                            </div>
                        </div>
                        <div class="cart-summary__input">
                            <MainInput placeholder="Промокод" v-model="promocode"></MainInput>
                        </div>
                        <div class="cart-summary__total">
                            Итого
                            <span>{{the_sum}} ₽</span>
                        </div>
                        <div class="cart-summary__total-additional">
                            Бесплатная доставка от 10 000 ₽
                        </div>
                        <MainBtn class="btn-primary w-100" @click="handleOrder()" :disabled="!order_is_ready" v-if="promocode.length === 0">
                            Оформить заказ
                        </MainBtn>
                        <MainBtn class="btn-primary w-100" @click="handlePromocode()" v-else>
                            Активировать промокод
                        </MainBtn>
                        <div class="cart-summary__offer">
                            Нажимая на кнопку «Оформить заказ», <br>
                            вы принимаете условия <a href="">Публичной оферты</a>
                        </div>
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </section>
</template>

<script>
import store from '../store/store';
import api from '../api/api';

import MainInput from '../components/UI/MainInput.vue';
import cart from '../api/cart';
import order from '../api/order';
import productCard from "../api/productCard";
import {mapMutations, mapState} from "vuex";

import useVuelidate from "@vuelidate/core";
import MainBtn from '../components/UI/MainBtn.vue';

export default {
    components: {
        MainInput,
        MainBtn,
    },
    data(){return{
        p_e:false, s_e:false, t_e:false, w_e:false,
        c_p:true, c_s:false, c_t:false, c_w:false,
        phone:'', name: '', surname: '', address: '', email: '',
        comment:'',
        promocode: '',
        promocodeStatus: false,
        commission: 0, dates_available:[], hours:{},
        the_error: '',
        deliveryType: null,
        suggestView: null,
        addressInterval: null,
    }},
    setup() {
        return {
            v$: useVuelidate(),
        };
    },
    computed:{
        daysComputed() {
            if(this.cdek_min_time) {
                let days = this.cdek_min_time+2
                if(days === 1) {
                    return 'день'
                } else if(days > 1 && days < 5 && days < 10) {
                    return 'дня'
                } else if(days >= 5 && days < 20) {
                    return 'дней'
                } else if(days % 10 > 1 && days % 10 < 5 && days > 20) {
                    return 'дня'
                } else if(days % 10 >= 5 || days % 10===0 && days > 20) {
                    return 'дней'
                } else if(days % 10===1) {
                    return 'день'
                }
            }
        },
        full_address(){
            if(this.deliveryType === 'courier') {
                return this.address
            } else if(this.cdek_chozen_pvz) {
                return 'Код пункта CDEK:' + this.cdek_chozen_pvz
            }
        },
        delivery_date(){return new Date()},
        cartSum() {
            let vm = this, sum = 0;
            for (let cartPosition of vm.cart) sum += cartPosition.price * cartPosition.q;
            return Math.ceil(sum);
        },
        the_sum(){return this.cartSum+this.commission+this.cdek_delivery_price},
        order_is_ready()
        {
            if(this.cart.length>0 &&
            this.delivery_date &&
            this.full_address &&
            this.cdek_delivery_price)
            return true
            else
            return false
        },
        cartQuantity() {
            let q = 0;
            if(this.cart && this.cart.length>0)
            {
                this.cart.forEach(element => {
                    q += Number(element.q)
                });
            }
            return q;
        },
        productsComputedText(){
            if(this.cart && this.cart.length > 0) {
                let quantity = this.cartQuantity
                if(quantity === 1) {
                    return 'товар'
                } else if(quantity > 1 && quantity < 5 && quantity < 10) {
                    return 'товара'
                } else if(quantity >= 5 && quantity < 10) {
                    return 'товаров'
                } else if(quantity >= 10 && quantity <= 20 ) {
                    return 'товаров'
                } else if(quantity % 10 > 1 && quantity % 10 < 5 && quantity > 20) {
                    return 'товара'
                } else if(quantity % 10 >= 5 || quantity % 10===0 && quantity > 20) {
                    return 'товаров'
                } else if(quantity % 10===1) {
                    return 'товар'
                }
            } else {
                return 'товаров'
            }
        },
        ...mapState(['cart','project_params','user_info','loggedIn','favorites','cdek_delivery_price', 'cdek_min_time', 'cdek_cities','cdek_pvz','cdek_chozen_pvz'])
    },
    methods:{
        addFavorite(id) {
            if(!this.the_heart){
                this.addFavor(id)
            } else {
                this.delFavor(id)
            }
        },
        the_heart(item){
            for (let f of this.favorites)
            if (f.id === item.id) {
                return true;
            }
            return false;
        },
        getDeliveryPrice() {
            if(this.cartSum < 10000) {
                if(this.address.length > 0) {
                    api.getCdekDeliveryPrice(139,{address: this.address})
                }
            }
        },
        blurAdressEvent() {
            this.addressInterval = setTimeout(()=> {
                this.getDeliveryPrice()
            }, 500)
        },
        async handleOrder() {
            var validationResult = await this.v$.$validate();
            
            if (!validationResult) {
                console.log("Validation failed");
                return;
            }
            this.make_the_order()
        },
        handlePromocode() {
            this.checkPromocode(this.promocode)
        },
        init() {
            this.suggestView = new ymaps.SuggestView('suggest');
            this.suggestView.events.add(['select'], (event) => {
                const address = event.get("item").displayName
                if(address) {
                    clearTimeout(this.addressInterval)
                    this.address = address;
                    this.getDeliveryPrice()
                }
            })
        },
        changeDeliveryType(value) {
            this.deliveryType = value
            store.commit('setCdekDeliveryPrice', null)
            if(value === 'courier') {
                store.commit('setCdekChosenPvz', null)
            } else {
                this.address = this.user_info.city || ''
            }
        },
        ...order, ...cart, ...productCard,
        ...mapMutations(['clearCart', 'cartItemChangeQ', 'cartItemSetQ', 'removeFromCart']),
    },
    created() {
        if (!document.head.querySelector('#ymaps')) {
            const script = document.createElement('script');
            
            script.onload = () => {
                ymaps.ready(this.init);
            };
            
            script.id = 'ymaps';
            script.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=453f5758-6290-4de4-bae1-d645fb102e5c&suggest_apikey=6d832aa2-715a-4c2f-bac8-daf07218d006";
            document.head.append(script);
        } else {
            ymaps.ready(this.init);
        }
        if(!this.cdek_cities) {
            this.getCitiesList()
        }
    },
    mounted() {
        this.email = this.user_info.email || ''
        this.phone = this.user_info.phone || ''
        this.name = this.user_info.name || ''
        this.surname = this.user_info.surname || ''
        if(this.user_info.city) {
            this.address = this.user_info.city || ''
            this.getDeliveryPrice()
        }
        
        if(this.$route.query && this.$route.query.deliveryType) {
            this.deliveryType = this.$route.query.deliveryType
        } else {
            this.deliveryType = 'courier'
        }
    },
    beforeUnmount() {
        if (this.suggestView) {
            this.suggestView.destroy();
        }
    }
};
</script>

<style lang="scss">
.order
{
    padding: 4rem 0 14rem 0;
}
.v-list-item-title {
    font-size: 1.6rem !important;
}

.order-label
{
    margin-bottom: 4rem;
    color: $primary;
    font-size: 4rem;
    font-weight: 600;
    line-height: 1.2em;
    letter-spacing: -0.4px;
    span
    {
        display: none;
    }
}
.order-products
{
    margin-bottom: 3.2rem;
    padding-bottom: 3.2rem;
    border-bottom: 1px solid #E9E9E9;
}
.order-products__wrap
{
    
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    column-gap: 3.2rem;
    row-gap: 3.2rem;
    &-item
    {
        text-decoration: none;
        img
        {
            width: 100%;
            height: 16rem;
            object-fit: cover;
        }
        &-name
        {
            margin-bottom: .4rem;
            color: $primary;
            font-size: 1.4rem;
            line-height: 1.4em;
            letter-spacing: -0.056px;
        }
        &-props
        {
            margin-bottom: .4rem;
            display: flex;
            flex-direction: column;
            list-style: none;
            row-gap: .4rem;
            li
            {
                color: #A6A5A3;
                font-size: 1.2rem;
                line-height: 1.33em;
            }
        }
        &-price
        {
            color: $primary;
            font-size: 1.4rem;
            font-weight: 600;
            line-height: 1.42em;
            letter-spacing: -0.056px;
        }
    }
}
.order-delivery
{
    &__label
    {
        margin-bottom: 3.2rem;
        color: $primary;
        font-size: 2.8rem;
        font-weight: 500;
        line-height: 1.2em;
        letter-spacing: -0.504px;
    }
    &__form
    {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        column-gap: 3.2rem;
        row-gap: 3.2rem;
        .split {
            display: flex;
            align-items: center;
            column-gap: 1.6rem;
        }
        *.inline
        {
            grid-column: span 2;
        }
    }
}
.order-type
{
    margin-bottom: 3.2rem;
    width: 100%;
    display: flex;
    column-gap: 1.6rem;
}
.order-type__item
{
    position: relative;
    padding: 1.6rem;
    display: flex;
    align-items: center;
    column-gap: 1.2rem;
    flex-grow: 1;
    border: 1px solid #E9E9E9;
    transition: .3s;
    &.active
    {
        border: 1px solid #1B1916;
    }
    input
    {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: pointer;
    }
    color: #27231F;
    font-size: 1.6rem;
    line-height: 1.5em;
    letter-spacing: -0.128px;
}
.order-pickup__wrap
{
    border-bottom: 1px solid #E9E9E9;
    border-top: 1px solid #E9E9E9;
    padding: 3.2rem 0;
    margin-bottom: 3.2rem;
    display: flex;
    align-items: center;
    column-gap: 1.6rem;
}
.order-pickup__address
{
    flex-basis: 60%;
    font-size: 2.8rem;
    line-height: 1.5em;
}
.order-pickup
{
    width: 100%;
    padding: 2rem;
    display: block;
    border: 1px solid #867B6E;
    color: #867B6E;
    font-size: 1.7rem;
    font-weight: 600;
    line-height: 1.4em;
    letter-spacing: -0.204px;
    text-align: center;
    text-decoration: none;
}
@media (max-width: 1280px) {
    .order-products__wrap
    {
        grid-template-columns: repeat(4, 1fr);
    }
}
@media (max-width: 960px) {
    .order
    {
        padding: 32px 0 60px 0;
    }
    .v-list-item-title {
        font-size: 16px !important;
        line-height: 120% !important;
    }
    .order-label {
        display: flex;
        flex-direction: column;
        margin-bottom: 32px;
        font-size: 32px;
        span
        {
            margin-top: 8px;
            display: block;
            color: #A6A5A3;
            font-size: 14px;
            line-height: 1em;
            letter-spacing: -0.056px;
        }
    }
    .order-products {
        order: 1;
        border-bottom: 0;
        padding-bottom: 0;
        margin-bottom: 8px;
    }
    .order-pickup {
        padding: 12px;
        font-size: 14px;
    }
    .order-type__item {
        padding: 14px;
        column-gap: 8px;
        font-size: 14px;
    }
    .order-type {
        margin-bottom: 24px;
    }
    .order-pickup__wrap{
        padding: 24px 0;
        margin-bottom: 16px;
        column-gap: 12px;
    }
    .order-products__wrap {
        &-item {
            img {
                margin-bottom: 16px;
                height: 165px;
            }
            &-name {
                margin-bottom: 4px;
                font-size: 12px;
            }
            &-props {
                margin-bottom: 0;
                row-gap: 4px;
                li {
                    font-size: 12px;
                }
            }
            &-price {
                display: none;
            }
        }
    }
    .order-delivery {
        margin-bottom: 48px;
        order: 0;
        &__label {
            margin-bottom: 32px;
            font-size: 32px;
        }
        &__form {
            grid-template-columns: repeat(1, 1fr);
            row-gap: 24px;
            .split {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                column-gap: initial;
                row-gap: 12px;
                .btn
                {
                    padding: 14px;
                    width: 100%;
                }
            }
            .form-control__wrap {
                grid-column: 2 span;
            }
        }
    }
    .order-summary
    {
        .cart-summary__input
        {
            display: none;
        }
    }
    
}
@media (max-width: 600px) {
    .order-products__wrap
    {
        grid-template-columns: repeat(3, 1fr);
    }
}
</style>