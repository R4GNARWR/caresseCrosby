<template>
    <SwiperFullScreen :slidesArray="mainSlides" ></SwiperFullScreen>
    <MainProps></MainProps>
    <SwiperCards name="Хиты продаж" :slidesArray="newProducts" v-if="newProducts"></SwiperCards>
    <MainCategories></MainCategories>
    <MainBanner></MainBanner>
    <SwiperCards name="Популярное" :slidesArray="newProducts" v-if="newProducts"></SwiperCards>
    <MainAbout></MainAbout>
    <SwiperCards name="Новое поступление" :slidesArray="newProducts" v-if="newProducts"></SwiperCards>
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
                    labelText: 'Узнайте свой <span> <br> настоящий </span> размер ♥',
                    labelColor: 'black',
                    yearColor: 'gold',
                    buttonText: 'Узнать размер',
                    buttonColor: 'primary',
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
                    buttonDestination: '/catalog',
                    backgroundImageSrc: '/img/mainSlider2.jpg'
                },
            ],
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
        }
    },
    created() {
        this.$API.getPopularProducts().then(value => {
            if (value.data.success) this.newProducts = value.data.products
        })
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