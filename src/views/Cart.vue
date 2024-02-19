<template>
    <section class="cart">
        <v-container>
            <v-row>
                <v-col cols="12">
                    <div class="cart-head">
                        <div class="cart-head__label">Корзина</div>
                        <div class="cart-head__count" v-if="cart">{{ cart.length }} товара</div>
                    </div>
                </v-col>
            </v-row>
        </v-container>
        <v-container>
            <v-row>
                <v-col md="7" cols=12>
                    <div class="cart-wrap">
                        <div class="cart-item__wrap last" v-for="(item, index) in cart" :key="index" >
                            <cartProduct :product="item"></cartProduct>
                        </div>
                    </div>
                </v-col>
                <v-col md="4" cols=12 offset-md="1">
                    <div class="cart-summary">
                        <div class="cart-summary__label">Сумма заказа</div>
                        <div class="cart-summary__items">
                            <div class="cart-summary__item">
                                {{cartQuantity + ' ' + productsComputedText}} на сумму
                                <span>{{cartSum}} ₽</span>
                            </div>
                            <div class="cart-summary__item">
                                Доставка
                                <span v-if="cdek_delivery_price && cartSum < 10000">{{cdek_delivery_price}}</span>
                                <span v-if="cartSum > 10000">Бесплатно</span>
                            </div>
                            <div class="cart-summary__item"  v-if="cdek_delivery_price && cdek_min_time">
                                Сроки доставки
                                <span>{{cdek_min_time}}-{{ cdek_min_time + 2 }} {{ daysComputed }}</span>
                            </div>
                            <div class="cart-summary__item" v-if="promocode">
                                Промокод: {{ promocode }}
                                <span class="minus" v-if="promocodeDiscount">- {{promocodeDiscount.toLocaleString()}} ₽</span>
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
                        <MainLink
                        :destination="'/order'"
                        class="btn-primary w-100"
                        :class="{'disabled':cart.length === 0}"
                        v-if="promocode.length === 0">
                        Перейти к оформлению
                    </MainLink>
                    <MainBtn class="btn-primary w-100" @click="handlePromocode()" v-else>
                        Активировать промокод
                    </MainBtn>
                </div>
            </v-col>
        </v-row>
    </v-container>
</section>
</template>

<script>
import MainBtn from '../components/UI/MainBtn.vue';
import MainInput from '../components/UI/MainInput.vue';
import MainLink from '../components/UI/MainLink.vue';

import cart from '../api/cart';
import order from '../api/order';
import productCard from "../api/productCard";
import cartProduct from '../components/cart/cartProduct.vue'
import {mapMutations, mapState} from "vuex";

export default {
    data(){return{
        p_e:false, s_e:false, t_e:false, w_e:false,
        c_p:true, c_s:false, c_t:false, c_w:false,
        phone:'', address: {}, email:'',
        comment:'',
        promocode: '',
        commission: 0, dates_available:[], hours:{},
        the_error: '',
    }},
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
        full_address(){return (this.address.index?this.address.index + ' ':'')+ (this.address.city?this.address.city+ ' ':'')+ (this.address.street?this.address.street + ' ':'')+ (this.address.building?this.address.building:'')},
        delivery_date(){return new Date()},
        cartSum() {
            let vm = this
            let sum = 0
            if(vm.cart){
                for (let cartPosition of vm.cart)
                sum += cartPosition.price * cartPosition.q;
                return Math.ceil(sum);
            } else return 0
        },
        the_sum(){
            if(this.cartSum + this.commission < 10000) {
                return this.cartSum+this.commission+this.cdek_delivery_price-this.promocodeDiscount
            } else {
                return this.cartSum+this.commission-this.promocodeDiscount
            }
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
                } else if(quantity%10 > 1 && quantity%10 < 5 && quantity > 20) {
                    return 'товара'
                } else if(quantity%10 >= 5 || quantity%10===0 && quantity > 20) {
                    return 'товаров'
                } else if(quantity%10===1) {
                    return 'товар'
                }
            } else {
                return 'товаров'
            }
        },
        order_is_ready(){
            if(this.cart.length>0
            && this.delivery_date
            && (this.full_address) && this.phone && this.commission
            && this.email
            )
            return true; else return false
        },
        ...mapState(['cart','project_params','user_info','loggedIn','favorites', 'cdek_delivery_price', 'cdek_min_time', 'promocodeDiscount'])
    },
    methods: {
        handlePromocode() {
            this.checkPromocode(this.promocode)
        },
        
        ...order
    },
    created() {
        this.getCitiesList()
        if (this.user_info.phone) this.phone = this.user_info.phone;
        if (this.user_info.apartment) this.address.apartment = this.user_info.apartment;
        if (this.user_info.email) this.email = this.user_info.email;
    },
    components: { MainBtn, MainInput, MainLink, cartProduct }
};
</script>

<style lang="scss">
section.cart
{
    padding-top: 4rem;
    padding-bottom: 12rem;
}
.cart-head
{
    margin-bottom: 4rem;
    display: flex;
    align-items: center;
    column-gap: 2rem;
    &__label
    {
        color: $primary;
        font-size: 4rem;
        font-weight: 600;
        line-height: 1.2em;
        letter-spacing: -0.4px;
    }
    &__count
    {
        color: #A6A5A3;
        font-size: 1.6rem;
        line-height: 1.5em;
        letter-spacing: -0.128px;
    }
}
.cart-wrap
{
    display: flex;
    flex-direction: column;
}

.cart-summary
{
    &__label
    {
        margin-bottom: 2.4rem;
        color: $primary;
        font-size: 2.8rem;
        font-weight: 600;
        line-height: 1.2em;
        letter-spacing: -0.504px;
    }
    &__items
    {
        margin-bottom: 3.2rem;
        display: flex;
        flex-direction: column;
        row-gap: 1.2rem;
    }
    &__item
    {
        display: flex;
        justify-content: space-between;
        color: $primary;
        font-size: 1.6rem;
        line-height: 1.5em;
        letter-spacing: -0.128px;
        span
        {
            &.waiting
            {
                color: #A6A5A3;
            }
            &.minus
            {
                color: #C11D1D;
            }
        }
    }
    &__input
    {
        margin-bottom: 3.2rem;
    }
    &__total
    {
        margin-bottom: 1rem;
        display: flex;
        justify-content: space-between;
        color: $primary;
        font-size: 2.4rem;
        font-weight: 600;
        line-height: 1.33em;
        letter-spacing: -0.384px;
        span
        {
            text-transform: uppercase;
        }
        &-additional
        {
            margin-bottom: 3.2rem;
            color: #A6A5A3;
            font-size: 1.4rem;
            line-height: 1.4em;
            letter-spacing: -0.056px;
        }
    }
    &__offer
    {
        margin-top: 3.2rem;
        color: #A6A5A3;
        font-size: 1.4rem;
        line-height: 1.4em;
        letter-spacing: -0.056px;
        a
        {
            color: inherit;
        }
    }
}

@media (max-width: 600px) {
    .cart-head
    {
        margin-bottom: 32px;
        flex-direction: column;
        align-items: flex-start;
        row-gap: 8px;
        &__label
        {
            font-size: 32px;
        }
        &__count
        {
            font-size: 14px;
        }
    }
    
    .cart-summary
    {
        &__label
        {
            margin-bottom: 24px;
            font-size: 24px;
        }
        &__item
        {
            font-size: 14px;
        }
        &__items
        {
            margin-bottom: 32px;
            column-gap: 12px;
        }
        &__input
        {
            margin-bottom: 32px;
        }
        &__offer
        {
            margin-top: 8px;
            text-align: center;
            font-size: 12px;
            letter-spacing: normal;
            a
            {
                color: inherit;
            }
        }
        &__total
        {
            margin-bottom: 10px;
            font-size: 20px;
            span
            {
                text-transform: uppercase;
            }
            &-additional
            {
                margin-bottom: 32px;
                font-size: 12px;
            }
        }
    }
}
</style>
