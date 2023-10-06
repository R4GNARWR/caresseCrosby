<template>
    <section class="main-section">
        <v-container class="pa-0">
            <div class="section-head ">
                <div class="section-label">
                    {{name}}
                </div>
                <div class="swiper-navigation swiper-cards__navigation">
                    <div class="swiper-button swiper-button-prev swiper-cards__navigation-prev">
                        <img src="/svg/swiper-prev.svg" alt="">
                    </div>
                    <div class="swiper-button swiper-button-next swiper-cards__navigation-next">
                        <img src="/svg/swiper-next.svg" alt="">
                    </div>
                    
                </div>
            </div>
            
            <div class="swiper-cards">
                <swiper-container
                class="swiper"
                :slidesPerView="1"
                :loop= "true"
                :spaceBetween= "28"
                :navigation="{
                    nextEl: '.swiper-cards__navigation-next',
                    prevEl: '.swiper-cards__navigation-prev'
                }" 
                :breakpoints="{
                    0:
                    {
                        slidesPerView: 2,
                        spaceBetween: 16,
                    },
                    600: {
                        slidesPerView: 3,
                    },
                    960: {
                        slidesPerView: 4,
                    }
                }" 
                
                >
                <swiper-slide class="swiper-slide " v-for="product in slidesArray">
                    <ProductCard
                    :product-data="product"
                    ></ProductCard>
                </swiper-slide>
                
            </swiper-container>
            <a class="swiper-cards__more" href="">Смотреть все</a>
        </div>
        
    </v-container>
</section>
</template>
<script>
import {useProductsStore} from "../store/productsStore"
import { register } from 'swiper/element/bundle';
import ProductCard from './UI/ProductCard.vue';
export default {
    components: {
        ProductCard
    },
    props: {
        slidesArray: Array,
        name: String
    },
    computed: {
        colors(){return useProductsStore().colors_list}
    },
    data() {
        return {
            swiperParams:  {
                
            },
        }
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
    padding-bottom: .8rem;
    border-bottom: 1px solid rgba(83, 83, 83, .3) !important;
    
    &__more
    {
        margin-top: 3.2rem;
        margin-left: auto;
        color: $primary;
        font-size: 1.6rem;
        line-height: 1.5em;
        letter-spacing: -0.16px;
        text-decoration: none;
    }
}
@media (max-width: 600px) {
    .swiper-cards
    {
        margin-top: 40px;
        padding-bottom: 24px;
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