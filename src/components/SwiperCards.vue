<template>
    <section class="main-section">
        <v-container class="pa-0">
            <div class="section-head ">
                <div class="section-label" v-if="name">{{name}}</div>
                <div class="swiper-navigation swiper-cards__navigation" v-if="slidesArray && slidesArray.length > 4">
                    <div class="swiper-button swiper-button-prev swiper-cards__navigation-prev">
                        <img src="/svg/swiper-prev.svg" alt="">
                    </div>
                    <div class="swiper-button swiper-button-next swiper-cards__navigation-next">
                        <img src="/svg/swiper-next.svg" alt="">
                    </div>
                </div>
            </div>
        </v-container>
        <v-container class="pa-0 cards">
            <div class="swiper-cards">
                <swiper-container
                class="swiper"
                :slidesPerView="1"
                :spaceBetween= "28"
                :navigation="{
                    nextEl: '.swiper-cards__navigation-next',
                    prevEl: '.swiper-cards__navigation-prev'
                }" 
                :breakpoints="{
                    0:
                    {
                        slidesPerView: 2.3,
                        spaceBetween: 16,
                    },
                    600: {
                        slidesPerView: 3,
                    },
                    960: {
                        slidesPerView: 4,
                    }
                }">
                <swiper-slide class="swiper-slide " v-for="(product, index) in slidesArray" :key="index">
                    <ProductCard v-if="product"
                    :product="product"
                    ></ProductCard>
                </swiper-slide>
            </swiper-container>
            <router-link class="swiper-cards__more" :to="'/catalog/'+ catId" v-if="catId">Смотреть все</router-link>
        </div>
    </v-container>

</section>
</template>
<script>
import {mapState} from "vuex";
import { register } from 'swiper/element/bundle';
import ProductCard from './UI/ProductCard.vue';
export default {
    components: {
        ProductCard
    },
    props: {
        slidesArray: {
            type: Array,
            default: () => []
        },
        name: String,
        catId: [Number,String],
    },
    computed:{
        ...mapState(['colors_list']
        ),
    },
    beforeCreate() {
        register()
    },
}
</script>

<style lang="scss">
.swiper-cards
{
    display: flex;
    flex-direction: column;
    margin-top: 3.2rem;
    padding-bottom: 3.2rem;
    border-bottom: 1px solid rgba(83, 83, 83, .3) !important;
    
    &__more
    {
        transform: translateY(2.4rem);
        margin-left: auto;
        color: $primary;
        font-size: 1.6rem;
        line-height: 1.5em;
        letter-spacing: -0.16px;
        text-decoration: none;
    }
}
@media (max-width: 960px)
{
    .swiper-cards
    {
        padding-bottom: 48px;
        &__more
        {
            transform: translateY(24px);
            font-size: 16px;
            margin-bottom: -16px;
        }
    }
}
@media (max-width: 600px) {
    .main-section
    {
        .v-container.cards
        {
            max-width: 100%;
        }
    }
    .swiper-cards
    {
        margin-top: 40px;
        &__more
        {
            margin-top: 24px;
            margin-left: auto;
            margin-right: auto;
            font-size: 16px;
            color: $primary05;
        }
    }
    .swiper-navigation.swiper-cards__navigation
    {
        display: none;
    }
}
</style>