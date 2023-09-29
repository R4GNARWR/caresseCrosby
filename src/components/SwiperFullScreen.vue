<template lang="">
    <v-container class="pa-0">
        <div class="swiperFullScreen">
            <swiper-container class="swiper" v-if="slidesArray" loop="true"
            :pagination="{
                clickable: true,
                el: '.swiper-fullscreen__pagination'
            }"
            >
                <swiper-slide class="swiper-slide" v-for="slide in slidesArray" >
                    <div class="swiper-fullscreen__content">
                        <div :class="'label ' + slide.labelColor" v-html="slide.labelText"></div>
                        <MainBtn :class="'w-ft btn-' + slide.buttonColor">{{slide.buttonText}}</MainBtn>
                    </div>
                    <img class="swiper-fullscreen__image" :src="slide.backgroundImageSrc" alt="">
                </swiper-slide>
                
            </swiper-container>
            <div class="swiper-fullscreen__pagination"></div>
        </div>
    </v-container>
    

</template>
<script>

import { register } from 'swiper/element/bundle';
import MainBtn from './UI/MainBtn.vue';

export default {
    components: {
        MainBtn
    },
    props: {
        slidesArray: Array,
    },
    data() {
        return {
            
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
        }
    }
}
.swiper-fullscreen
{
    &__content
    {
        display: flex;
        flex-direction: column;
        row-gap: 5rem;
        padding: 0 0 6rem 4rem;
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
    &__pagination
    {
        position: absolute;
        right: 5rem;
        bottom: 6rem;
        display: flex;
        column-gap: .8rem;
        z-index: 1;
        .swiper-pagination-bullet
        {
            width: 1rem;
            height: 2px;
            background: #D9D9D9;
            transition: .3s;
            &-active
            {
                width: 3rem;
                height: 2px;
                background: $primary;
            }
        }
    }
}

@media (max-width: 600px) {
    .swiperFullScreen
    {
        height: 680px;
        .swiper-slide
        {
            width: 100%;
            height: 100%;
        }
    }
    .swiper-fullscreen
    {
        &__content
        {
            flex-shrink: 1;
            position: static;
            padding: 92px 23px 67px 23px;
            width: 100%;
            height: 100%;
            max-height: -webkit-fill-available;
            .label
            {
                font-size: 48px;
            }
            .btn
            {
                margin-top: auto;
                max-width: -webkit-fill-available;
            }
        }
    }
}
</style>