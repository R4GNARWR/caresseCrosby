<template>
    <SwiperFullScreen :slidesArray="mainSlides" ></SwiperFullScreen>
    <MainProps></MainProps>
    <SwiperCards name="Хиты продаж" :slidesArray="[]"></SwiperCards>
    <MainCategories></MainCategories>
    <MainBanner></MainBanner>
    <SwiperCards name="Популярное" :slidesArray="[]"></SwiperCards>
    <MainAbout></MainAbout>
    <SwiperCards name="Новое поступление" :slidesArray="[]"></SwiperCards>
    <MainArticles></MainArticles>
</template>
<script>

import {mapState, mapMutations} from "vuex";
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

    },
    setup() {
    },
}
</script>

<style lang="">

</style>