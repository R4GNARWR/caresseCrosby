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
                        <div class="cart-item__wrap last">
                            <div class="cart-item" v-for="(item, index) in cart" :key="index">
                                <div class="cart-item__img" v-if="item.photo">
                                    <img :src="item.photo" alt="">
                                </div>
                                <div class="cart-item__body">
                                    <div class="cart-item__body-label">
                                        <div class="name" v-if="item.name">{{item.name}}</div>
                                        <div class="price d-md-block d-none">{{Number((item.q * item.price)).toLocaleString()}}{{!(item.q *item.price).toString().split('.')[1] ? '' :(item.q *item.price).toString().split('.')[1].length===1 ?'' :''}} ₽</div>
                                    </div>
                                    <div class="cart-item__body-props">
                                        <div class="cart-item__body-props__item" v-if="item.size">
                                            {{item.size}}
                                        </div>
                                        <div class="cart-item__body-props__item" v-if="item.color">
                                            {{item.color}}
                                        </div>
                                    </div>
                                    <div class="cart-item__body-bottom">
                                        <div class="cart-item__body-count" v-if="item.q">
                                            <button class="minus" @click.prevent="changeQ(item, -1)">-</button>
                                            {{item.q}}
                                            <button class="plus" @click.prevent="changeQ(item, +1)">+</button>
                                        </div>
                                        <div class="cart-item__body-links">
                                            <button class="cart-item__body-links__item"  @click="addFavorite(item.id)">
                                                <v-icon icon="mdi-heart" color="#FF7171" v-if="the_heart(item)"></v-icon>
                                                <v-icon icon="mdi-heart-outline" color="#27231E" v-else></v-icon>
                                                В избранное

                                            </button>

                                            <button class="cart-item__body-links__item" @click="deleteFromCart(item.id)">
                                                <img src="/svg/delete.svg" alt="">
                                                Удалить
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div class="cart-item__body-label d-md-none d-block">
                                    <div class="price">{{Number((item.q * item.price)).toLocaleString()}}{{!(item.q *item.price).toString().split('.')[1] ? '' :(item.q *item.price).toString().split('.')[1].length===1 ?'' :''}} ₽</div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </v-col>
                <v-col md="4" cols=12 offset-md="1">
                    <div class="cart-summary">
                        <div class="cart-summary__label">Сумма заказа</div>
                        <div class="cart-summary__items">
                            <div class="cart-summary__item" v-if="cart.length && cartSum">
                                {{cart.length}} товара на сумму
                                <span>{{cartSum}} ₽</span>
                            </div>
                            
                        </div>
                        <div class="cart-summary__input">
                            <Input placeholder="Промокод"></Input>
                        </div>
                        <div class="cart-summary__total">
                            Итого
                            <span>{{the_sum}} ₽</span>
                        </div>
                        <div class="cart-summary__total-additional">
                            Бесплатная доставка от 10 000 ₽
                        </div>
                        <MainLink :destination="'/order'" class="btn-primary w-100">Перейти к оформлению</MainLink>
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </section>
</template>

<script>
import MainBtn from '../components/UI/MainBtn.vue';
import Input from '../components/UI/Input.vue';
import MainLink from '../components/UI/MainLink.vue';

import cart from '../api/cart';
import order from '../api/order';
import productCard from "../api/productCard";
import store from '../store/store';
import {mapMutations, mapState} from "vuex";

export default {
    data(){return{
        p_e:false, s_e:false, t_e:false, w_e:false,
        c_p:true, c_s:false, c_t:false, c_w:false,
        phone:'', address: {}, email:'',
        comment:'',
        commission: 250, dates_available:[], hours:{},
        the_error: '',
    }},
    computed:{
        full_address(){return (this.address.index?this.address.index + ' ':'')+ (this.address.city?this.address.city+ ' ':'')+ (this.address.street?this.address.street + ' ':'')+ (this.address.building?this.address.building:'')},
        delivery_date(){return new Date()},
        count(){
            if (this.cart.length>0){
                let a='';
                let b = 0;
                for (let q in this.cart) b = b+this.cart[q]['q']
                if (b==1) a='Товар'; if (b>1) a='Товары';
                // if ((this.cart.length>4 && this.cart.length<21) || b>4) a='товаров';
                return a;//b+' '+a;
            } else return 0;
        },
        cartSum() {
            let vm = this, sum = 0;
            for (let cartPosition of vm.cart) sum += cartPosition.price * cartPosition.q;
            return Math.ceil(sum);
        },
        the_sum(){return this.cartSum+this.commission},
        order_is_ready(){
            if(this.cart.length>0
            && this.delivery_date
            && (this.full_address) && this.phone && this.commission
            && this.email
            )
            return true; else return false
        },
        ...mapState(['cart','project_params','user_info','loggedIn','favorites' ])
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
        ...order, ...cart, ...productCard,
        ...mapMutations(['clearCart', 'cartItemChangeQ', 'cartItemSetQ', 'removeFromCart']),
    },
    
    created() {
        // if (this.user_info.city) {this.address.city = this.user_info.city; this.geocode_address()}
        if (this.user_info.phone) this.phone = this.user_info.phone;
        if (this.user_info.apartment) this.address.apartment = this.user_info.apartment;
        // if (this.user_info.street) {this.address.street = this.user_info.street; this.geocode_address()}
        if (this.user_info.email) this.email = this.user_info.email;
        // if (!this.address && store.state.user_position.length > 0) {
            //     setTimeout(() => this.address = this.get_point_location(store.state.user_position), 1200);
            // } else if (!this.address) {
                //     this.$getLocation().then(value => {
                    //         setTimeout(() => this.address = this.get_point_location(value), 1200);
                    //     }).catch(error => {
                        //         console.log(error);
                        //         this.errored = true;
                        //     });
                        // }
        },
        components: { MainBtn, Input, MainLink }
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
            .cart-item
            {
                &__wrap
                {
                    border-bottom: 1px solid #E9E9E9;
                    padding-bottom: 3.2rem;
                    margin-bottom: 3.2rem;
                }
                display: flex;
                column-gap: 3.2rem;
                
                &__img
                {
                    width: 19.2rem;
                    img
                    {
                        width: 100%;
                        aspect-ratio: 1/1.5;
                        object-fit: cover;
                    }
                    
                }
                &__body
                {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    &-label
                    {
                        margin-bottom: 2.4rem;
                        display: flex;
                        justify-content: space-between;
                        color: $primary;
                        .name
                        {
                            font-size: 2rem;
                            font-weight: 600;
                            line-height: 1.4em;
                            letter-spacing: -0.28px;
                        }
                        .price
                        {
                            font-size: 1.8rem;
                            font-weight: 500;
                            line-height: 1.55em;
                            letter-spacing: -0.216px;
                        }
                    }
                    &-props
                    {
                        margin-bottom: 2.4rem;
                        display: flex;
                        flex-direction: column;
                        row-gap: .8rem;
                        &__item
                        {
                            display: flex;
                            column-gap: .4rem;
                            color: #A6A5A3;
                            font-size: 1.6rem;
                            line-height: 1.5em;
                            letter-spacing: -0.128px;
                            span
                            {
                                color: $primary;
                            }
                        }
                    }
                    &-count
                    {
                        display: flex;
                        align-items: center;
                        column-gap: 3rem;
                        color: $primary;
                        font-size: 1.6rem;
                        font-weight: 500;
                        line-height: 1.5em;
                        letter-spacing: -0.128px;
                        &.minus,
                        &.plus
                        {
                            cursor: pointer;
                        }
                    }
                    &-links
                    {
                        display: flex;
                        justify-content: flex-end;
                        column-gap: 4rem;
                        &__item
                        {
                            display: flex;
                            align-items: center;
                            column-gap: 2rem;
                            color: #A6A5A3;
                            font-size: 1.6rem;
                            font-weight: 500;
                            line-height: 1.5em;
                            letter-spacing: -0.128px;
                            img
                            {
                                width: 2.4rem;
                                height: 2.4rem;
                                object-fit: contain;
                            }
                        }
                    }
                }
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
                .cart-item
                {
                    &__wrap
                    {
                        display: flex;
                        flex-direction: column;
                        padding-bottom: 16px;
                        margin-bottom: 16px;
                        &.last
                        {
                            border-bottom: 0;
                        }
                    }
                    column-gap: 16px;
                    &__img
                    {
                        width: 85px;
                        img
                        {
                            width: 100%;
                            aspect-ratio: 1/1.5;
                            object-fit: cover;
                        }
                        
                    }
                    &__body
                    {
                        &-label
                        {
                            margin-bottom: 4px;
                            .name
                            {
                                font-size: 12px;
                            }
                            .price
                            {
                                font-size: 16px;
                            }
                        }
                        &-bottom
                        {
                            margin-bottom: 16px;
                            display: flex;
                            justify-content: space-between;
                        }
                        &-props
                        {
                            margin-bottom: 24px;
                            row-gap: 4px;
                            &__item
                            {
                                column-gap: 4px;
                                font-size: 12px;
                            }
                        }
                        &-count
                        {
                            column-gap: 12px;
                            font-size: 14px;
                            border-radius: 22px;
                            border: 1px solid var(--foundation-brown-y-100, #DAD1C6);
                            padding: 5px 16px;
                        }
                        &-links
                        {
                            column-gap: 16px;
                            &__item
                            {
                                column-gap: 0;
                                font-size: 0;
                                img
                                {
                                    width: 20px;
                                    height: 20px;
                                }
                            }
                        }
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