<template>
    <section class="swiperFullScreen-section">
        <div class="pa-0">
            <div class="swiperFullScreen">
                <swiper-container class="swiper" v-if="slidesArray"
                :loop="true"
                :pagination="{
                    clickable: true,
                    el: '.swiper-fullscreen__pagination'
                }"
                >
                <swiper-slide class="swiper-slide" v-for="slide in slidesArray" >
                    <v-container>
                        <div class="swiper-fullscreen__content">
                            <div :class="'current-year ' + slide.yearColor" >
                                {{ year }}
                            </div>
                            <div class="swiper-fullscreen__content-bottom">
                                <div :class="'label ' + slide.labelColor" v-html="slide.labelText"></div>
                                <MainLink :destination="slide.buttonDestination" :class="'w-ft btn-' + slide.buttonColor">{{slide.buttonText}}</MainLink>
                            </div>
                        </div>
                    </v-container>
                    
                    <img class="swiper-fullscreen__image" :src="slide.backgroundImageSrc" alt="">
                </swiper-slide>
                
            </swiper-container>
            <!-- <SwiperPagination class="swiper-fullscreen__pagination" /> -->
        </div>
    </div>
</section>

</template>
<script>

import { register } from 'swiper/element/bundle';
import SwiperPagination from './UI/SwiperPagination.vue';
import MainLink from './UI/MainLink.vue';

export default {
    components: {
        SwiperPagination,
        MainLink
    },
    props: {
        slidesArray: Array,
    },
    data() {
        return {
            
        }
    },
    computed: {
        year() {
            return new Date().getFullYear();
        }
    },
    beforeCreate() {
        register()
    },
}
</script>

<style lang="scss">
.swiperFullScreen
{
    position: relative;
    height: 60rem;
    width: 100%;
    .swiper{
        width: 100%;
        height: 100%;
        .swiper-slide
        {
            position: relative;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: flex-end;
            justify-content: flex-start;
            .v-container
            {
                height: 100%;
            }
        }
    }
    
}
.current-year
{
    color: #A7976F;
    font-size: 1.6rem;
    line-height: 1.5em;
    letter-spacing: -0.16px;
    &.gold
    {
        color: #A7976F;
    }
    &.white
    {
        color: #FFF;
    }
    &.black
    {
        color: $primary;
    }
}
.swiper-fullscreen
{
    &__content
    {
        display: flex;
        flex-direction: column;
        padding: 6rem 0;
        height: calc(100% - 12rem);
        &-bottom
        {
            margin-top: auto;
            display: flex;
            flex-direction: column;
            row-gap: 5rem;
        }
        .label
        {
            
            color: #FFF;
            font-size: 5.6rem;
            font-style: normal;
            font-weight: 400;
            line-height: 136%;
            letter-spacing: -0.56px;
            &.white
            {
                color: #FFF;
            }
            &.black
            {
                color: $primary;
            }
            span
            {
                font-style: italic;
            }
        }
    }
    &__image
    {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
        z-index: -1;
    }
    
}
@media (max-width: 9600px)
{
    .current-year
    {
        margin-bottom: 24px;
        font-size: 14px;
    }
}
@media (max-width: 600px) {
    .swiperFullScreen-section .v-container
    {
        max-width: 100%;
    }
    .swiperFullScreen
    {
        height: 680px;
        .swiper .swiper-slide
        {
            width: 100%;
            height: 100%;
            justify-content: flex-start;
            align-items: flex-start;
        }
    }

    .swiper-fullscreen
    {
        &__content
        {
            &-bottom
            {
                margin-top: 0;
                display: flex;
                flex-direction: column;
                height: 100%;
            }
            align-self: stretch;
            display: flex;
            max-height: 100%;
            padding: 92px 23px 65px 23px;
            height: calc(100% - 92px - 65px);
            .label
            {
                font-size: 48px;
            }
            .btn
            {
                width: auto;
                align-self: stretch;
                margin-top: auto;
            }
        }
    }
    
}
</style>