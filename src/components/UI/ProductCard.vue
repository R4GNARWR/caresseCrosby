<template>
    <div class="product-card">
        <div class="product-card__img">
            <img :src="product.photo" alt="">
            <div class="product-card__img-new">NEW</div>
            <div class="product-card__img-like">
                <v-icon icon="mdi-heart-outline" color="#27231E" v-if="!the_heart" @click="addFavor"></v-icon>
                <v-icon icon="mdi-heart" color="#FF7171" v-if="the_heart" @click="delFavor"></v-icon>
            </div>
        </div>
        <div class="product-card__info">
            <div class="product-card__info-name">{{product.name}}</div>
            <div class="product-card__info-props">
                <div class="product-card__info-props__price">
                    {{product.price}} руб
                </div>
                <div class="product-card__info-props__colors">
                    <div style="background-color: #EFD8C6;"></div>
                    <div style="background-color: #414141;"></div>
                </div>
            </div>
        </div>
        <router-link class="link" :to="{ name: 'Product', params: { id: product.id }}"></router-link>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import cart from "../../api/cart";
import productCard from "../../api/productCard";

export default {
    props:{
        product: Object,
    },
    computed:{
        ...mapState(['cart', 'favorites','colors_list']),
        com_color(){
            if (!this.product.color) return null;
            else return this.computed_color(this.product.color.trim());
        },
        cartQuantity() {
            let vm = this, q = 0;
            for (let cartPosition of vm.cart) {
                if (cartPosition.id === parseInt(vm.product.id)) {
                    q = cartPosition.q;
                    break;
                }
            }
            return q;
        },
        the_heart(){
            for (let f of this.favorites)
            if (f.id === this.product.id) {
                return true;
            }
            return false;
        },
    },
    methods:{
    ...productCard,
    ...cart,
    ...mapMutations(['add2cart']),
  }
}
</script>
<style lang="scss">
.product-card
{
    position: relative;
    &__img
    {
        margin-bottom: 1.2rem;
        position: relative;
        height: 44rem;
        img
        {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        &-new
        {
            position: absolute;
            left: 1.2rem;
            top: 1.2rem;
            padding: .2rem .8rem;
            color: $primary;
            font-size: 1.2rem;
            background-color: #BFB09D;
        }
        &-like
        {
            position: absolute;
            right: 1.2rem;
            top: 1.2rem;
            z-index: 200;
            cursor: pointer;
            i
            {
                font-size: 2rem;
            }
        }
    }
    &__info
    {    
        &-name
        {
            margin-bottom: .4rem;
            color: $primary;
            font-size: 1.6rem;
            line-height: 1.5em;
            letter-spacing: -0.16px;
        }
        &-props
        {
            display: flex;
            justify-content: space-between;
            &__price
            {
                color: $primary;
                font-size: 1.5rem;
                font-weight: 700;
                line-height: 1.5em; 
            }
            &__colors
            {
                display: flex;
                column-gap: .4rem;
                div
                {
                    width: 1.4rem;
                    height: 1.4rem;
                    border-radius: 50%;
                }
            }
        }
    }
}
@media (max-width: 600px) {
    .product-card
    {
        &__img
        {
            margin-bottom: 12px;
            height: 208px;
            &-new
            {
                left: 10px;
                top: 10px;
                padding: 2px 8px;
                font-size: 12px;
                background-color: #BFB09D;
            }
            &-like
            {
                position: absolute;
                right: 10px;
                top: 10px;
                cursor: pointer;
                i
                {
                    font-size: 20px;
                }
            }
        }
        &__info
        {    
            &-name
            {
                margin-bottom: 4px;
                font-size: 14px;
                letter-spacing: -0.056px;
                display: -webkit-box;
                height: 42px;
                -webkit-line-clamp: 2; // количество строк
                -webkit-box-orient: vertical;
                overflow: hidden;
            }
            &-props
            {
                display: flex;
                justify-content: space-between;
                &__price
                {
                    font-size: 13px;
                }
                &__colors
                {
                    column-gap: 4px;
                    div
                    {
                        width: 14px;
                        height: 14px;
                        border-radius: 50%;
                    }
                }
            }
        }
    }
}
</style>