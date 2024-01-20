<template>
    <SwiperFullScreen :slidesArray="mainSlides" ></SwiperFullScreen>
    <MainProps></MainProps>
    <SwiperCards id="hits" name="Хиты продаж" :slidesArray="hitProducts.slice(0, 20)" v-if="hitProducts && hitProducts.length > 0"></SwiperCards>
    <MainCategories></MainCategories>
    <MainBanner></MainBanner>
    <SwiperCards name="Популярное" :slidesArray="popularProducts.slice(0, 20)" v-if="popularProducts && popularProducts.length > 0"></SwiperCards>
    <MainAbout></MainAbout>
    <SwiperCards name="Новое поступление" :slidesArray="newProducts.slice(0, 20)" v-if="newProducts && newProducts.length > 0"></SwiperCards>
    <MainArticles></MainArticles>
</template>
<script>

import store from '../store/store';
import {mapMutations, mapState} from "vuex";

import SwiperFullScreen from "../components/SwiperFullScreen.vue";
import MainProps from "../components/mainPage/MainProps.vue";
import SwiperCards from "../components/SwiperCards.vue";
import MainCategories from "../components/mainPage/MainCategories.vue";
import MainBanner from "../components/mainPage/MainBanner.vue";
import MainAbout from "../components/mainPage/MainAbout.vue";
import MainArticles from "../components/mainPage/MainArticles.vue";

export default {
    components: {
        SwiperFullScreen,
        SwiperCards,
        MainProps,
        MainCategories,
        MainBanner,
        MainAbout,
        MainArticles
    },
    data() {
        return {
            mainSlides: [
            {
                id: 1,
                labelText: 'Узнайте свой <span> <br> настоящий </span> размер ♥',
                labelColor: 'white',
                yearColor: 'white',
                buttonText: 'Узнать размер',
                buttonColor: 'white',
                buttonDestination: '/sizeTable',
                backgroundImageSrc: '/img/mainSlider1.jpg',
            },
            {
                id: 2,
                labelText: 'То, что ближе всего <br><span> - должно быть нежным </span>',
                labelColor: 'white',
                yearColor: 'white',
                buttonText: 'В каталог',
                buttonColor: 'white',
                buttonDestination: '/catalogAll',
                backgroundImageSrc: '/img/mainSlider2.jpg'
            },
            ],
            popularProducts:[],
            hitProducts:[],
            newProducts:[],
            blogs:[],
            galleries: {},
        }
    },
    computed: {
        blogsToShow(){
            if (window.innerWidth>400 && window.innerWidth<899) return window.innerWidth/(0.32*window.innerWidth);
            if (window.innerWidth>900) return window.innerWidth/(0.22*window.innerWidth);
            else return window.innerWidth/(0.85*window.innerWidth);
        },
        photosToShow(){
            if (window.innerWidth<351) return 1.1;
            if (window.innerWidth>350 && window.innerWidth<400) return 1.2;
            if (window.innerWidth>400 && window.innerWidth<1025) return window.innerWidth/(0.42*window.innerWidth);
            if (window.innerWidth>1025 && window.innerWidth<1601) return window.innerWidth/(0.30*window.innerWidth);
            if (window.innerWidth>1600) return window.innerWidth/(0.22*window.innerWidth);
            else return window.innerWidth/(0.85*window.innerWidth);
        },
        ...mapState(['popular_products','hit_products','new_products'])
    },
    created() {
        if(!this.hit_products) {
            this.$API.getHitsProducts().then(value => {
                if (value.data.success) {
                    this.hitProducts = value.data.products
                    store.commit('setHitProducts', value.data.products)
                } 
            })
        } else {
            this.hitProducts = this.hit_products
        }
        if(!this.popular_products) {
            this.$API.getPopularProducts().then(value => {
                if (value.data.success) this.popularProducts = value.data.products
                store.commit('setHomePopularProducts', value.data.products)
            })
        } else {
            this.popularProducts = this.popular_products
        }
        if(!this.new_products) {
            this.$API.getNewProducts().then(value => {
                if (value.data.success) this.newProducts = value.data.products
                store.commit('setNewProducts', value.data.products)
            })
        } else {
            this.newProducts = this.new_products
        }
        this.$API.getGallery().then(value =>{
            if(value.data.success && value.data.banners) {
                for (let b of value.data.banners) {
                    if (this.galleries[b.header]) this.galleries[b.header].push(b.file_name)
                    else {
                        this.galleries[b.header] = [];
                        this.galleries[b.header].push(b.file_name)
                    }
                }
            }
        })
    },
}
</script>

<style lang="">

</style>