<template>
    <div class="cart-item" >
        <div class="cart-item__img" v-if="product.photo">
            <img :src="product.photo" alt="">
        </div>
        <div class="cart-item__body">
            <div class="cart-item__body-label">
                <div class="name" v-if="product.name">{{product.name}}</div>
                <div class="price d-md-block d-none">{{Number((product.q * product.price)).toLocaleString()}}{{!(product.q *product.price).toString().split('.')[1] ? '' :(product.q *product.price).toString().split('.')[1].length===1 ?'' :''}} ₽</div>
            </div>
            <div class="cart-item__body-props">
                <div class="cart-item__body-props__item" v-if="product.size">
                    {{product.size}}
                </div>
                <div class="cart-item__body-props__item" v-if="product.color">
                    {{product.color}}
                </div>
            </div>
            <div class="cart-item__body-bottom">
                <div class="cart-item__body-count" v-if="product.q">
                    <button class="minus" @click.prevent="changeQ(product, -1)">-</button>
                    {{product.q}}
                    <button class="plus" @click.prevent="changeQ(product, +1)">+</button>
                </div>
                <div class="cart-item__body-links">
                    <button class="cart-item__body-links__item"  @click="addFavorite(product.id)">
                        <v-icon icon="mdi-heart" color="#FF7171" v-if="the_heart"></v-icon>
                        <v-icon icon="mdi-heart-outline" color="#27231E" v-else></v-icon>
                        В избранное
                    </button>
                    
                    <button class="cart-item__body-links__item" @click="deleteFromCart(product.id)">
                        <img src="/svg/delete.svg" alt="">
                        Удалить
                    </button>
                </div>
            </div>
        </div>
        <div class="cart-item__body-label d-md-none d-block">
            <div class="price">{{Number((product.q * product.price)).toLocaleString()}}{{!(product.q *product.price).toString().split('.')[1] ? '' :(product.q *product.price).toString().split('.')[1].length===1 ?'' :''}} ₽</div>
        </div>
    </div>
</template>
<script>
import cart from '../../api/cart';
import order from '../../api/order';
import productCard from "../../api/productCard";
import {mapMutations, mapState} from "vuex";

export default {
    props: {
        product: null,
    },
    computed:{
        ...mapState(['cart','favorites' ]),
        the_heart() {
            for (let f of this.favorites)
            if (f.id === this.product.id) {
                return true;
            }
            return false;
        },
    },
    methods: {
        ...mapMutations(['clearCart', 'cartItemChangeQ', 'cartItemSetQ', 'removeFromCart']),
        addFavorite(id) {
            if(!this.the_heart){
                this.addFavor(id)
            } else {
                this.delFavor(id)
            }
        },

        ...cart, ...productCard,
    }
}
</script>
<style lang="scss">
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
                white-space: nowrap;
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
@media (max-width: 600px) {
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
}
</style>