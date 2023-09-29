<template>
    <SwiperFullScreen :slidesArray="mainSlides" ></SwiperFullScreen>
    <MainProps></MainProps>
    <SwiperCards name="Хиты продаж" v-if="products" :slidesArray="products"></SwiperCards>
    <MainCategories></MainCategories>
    <MainBanner></MainBanner>
    <SwiperCards name="Популярное" v-if="products" :slidesArray="products"></SwiperCards>
    <MainAbout></MainAbout>
    <SwiperCards name="Новое поступление" v-if="products" :slidesArray="products"></SwiperCards>
    <MainArticles></MainArticles>
</template>
<script>
import {useProductsStore} from "../store/productsStore"
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
                    labelText: 'Удобное белье <br> <span> существует </span>',
                    labelColor: 'white',
                    buttonText: 'В каталог',
                    buttonColor: 'white',
                    backgroundImageSrc: '/img/mainSlider1.jpg',
                },
                {
                    id: 2,
                    labelText: 'То, что ближе всего <br><span> - должно быть нежным </span>',
                    labelColor: 'white',
                    buttonText: 'В каталог2',
                    buttonColor: 'primary',
                    backgroundImageSrc: '/img/mainSlider2.jpg'
                },

            ]
        }
    },
    computed: {
        productsPopular(){return useProductsStore().productsPopular},
        products(){return useProductsStore().products.products},

    },
    setup() {
        const productsStore = useProductsStore();
        productsStore.fetchPopularProducts();
        productsStore.fetchAllProducts();
    },
}
</script>

<style lang="">

</style>