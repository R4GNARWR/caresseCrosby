<template>
    <section class="contacts">
        <v-container>
            <div class="breadcrumbs contacts-breadcrumbs">
                <router-link class="breadcrumbs-item" to="/">Главная</router-link>
                <div class="breadcrumbs-divider">/</div>
                <a class="breadcrumbs-item active">Контакты</a>
            </div>
            <div class="contacts-label">Контакты</div>
            <div class="contacts-props">
                <div class="contacts-props__item">
                    <img src="/svg/phone.svg" alt="">
                    <div class="contacts-props__item-content">
                        <a href="tel:79177471561:">+7 (917) 747-15-61</a>
                        <span>Пн - пт 11:00-20:00</span><br>
                        <span>Сб, вск 11:00-19:00</span>
                    </div>
                </div>
                <div class="contacts-props__item">
                    <img src="/svg/email.svg" alt="">
                    <div class="contacts-props__item-content">
                        <a href="mailto:ccrosbyru@yandex.ru">ccrosbyru@yandex.ru</a>
                    </div>
                </div>
                <div class="contacts-props__item">
                    <img src="/svg/placemark.svg" alt="">
                    <div class="contacts-props__item-content">
                        г. Уфа, ул. Менделеева 156/1
                    </div>
                </div>
            </div>
        </v-container>
        <div class="contacts-map" @mousedown="checkMouse" @touchstart="checkMouse">
            <div class="map-loading" v-show="mapLoadStatus !== 'loaded'">
                Загрузка...
            </div>
            <yandex-map v-show="mapLoadStatus === 'loaded'" v-model="mapEl" :settings="{
            location: {
                center: [56.022775, 54.722379],
                zoom: 16,
                controls: [],
            },
        }">
                <yandex-map-default-scheme-layer />
                <yandex-map-default-features-layer />
                <yandex-map-marker :settings="{ coordinates: [56.022775, 54.722379] }" :position="`left-center top`">
                    <img class="map-marker" alt="" :src="'/svg/map-placemark.svg'" />
                </yandex-map-marker>
            </yandex-map>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, shallowRef, watchEffect } from 'vue';
import type { YMap } from '@yandex/ymaps3-types'
import Breadcrumbs from '../components/UI/Breadcrumbs.vue';
import MainBtn from '../components/UI/MainBtn.vue';
import {
    VueYandexMaps,
    YandexMap,
    YandexMapDefaultFeaturesLayer,
    YandexMapDefaultSchemeLayer,
    YandexMapMarker,
} from 'vue-yandex-maps';
import { useHead } from '@unhead/vue';

const components = {
    Breadcrumbs,
    MainBtn,
};

const mapEl = shallowRef<null | YMap>(null);
const mapLoadStatus = ref(VueYandexMaps.loadStatus);
const coords = [54.736637, 55.958040]

const to2Gis = () => {
    window.open('https://go.2gis.com/1xqkl', '_blank')?.focus();
};
useHead({
    title: "Контакты | Caresse Crosby",
    meta: [
        { content: "Контакты | Caresse Crosby" }
    ]
})
const checkMouse = () => {
    let drag = false;
    const mouseDrag = () => {
        drag = true;
    };
    const mouseLift = () => {
        if (!drag) {
            to2Gis();
        }
        window.removeEventListener("mousemove", mouseDrag);
        window.removeEventListener("touchmove", mouseDrag);
        window.removeEventListener("mouseup", mouseLift);
        window.removeEventListener("touchend", mouseLift);
    };
    window.addEventListener("mousemove", mouseDrag);
    window.addEventListener("touchmove", mouseDrag);
    window.addEventListener("mouseup", mouseLift);
    window.addEventListener("touchend", mouseLift);
}
</script>

<style lang="scss">
.contacts {
    padding: 2.4rem 0 0 0;
}

.contacts-breadcrumbs {
    margin-bottom: 4rem;
}

.contacts-label {
    margin-bottom: 8rem;
    color: $primary;
    font-size: 4rem;
    font-weight: 600;
    line-height: 1.2em;
    letter-spacing: -0.4px;
}

.contacts-props {
    margin-bottom: 9rem;
    display: flex;
    column-gap: 14rem;
    flex-wrap: wrap;

    &__item {
        display: flex;
        column-gap: 1.6rem;

        img {
            width: 2rem;
            height: 2rem;
            object-fit: contain;
        }

        &-content {

            display: flex;
            flex-direction: column;
            row-gap: .8rem;
            color: $primary;
            font-size: 1.6rem;
            font-weight: 500;
            line-height: 1.5em;
            letter-spacing: -0.128px;

            a {
                text-decoration: none;
                color: inherit;
            }

            span {
                color: lighten($color: $primary, $amount: 50%);
                font-size: 1.4rem;
            }
        }
    }
}

.ymaps3x0--main-engine-container {
    -webkit-filter: grayscale(100%);
    filter: grayscale(100%);
}

.contacts-map {
    height: 57rem;
    width: 100%;

    .map-loading {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2.8rem;
        color: #FFFFFF;
        background-color: #AAAAAA;
        border-top: 1px solid $primary;
    }

    .ymap-container {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
}

.map-marker {
    width: 5.6rem;
    height: 7.1rem;
    object-fit: contain;
}

@media (max-width: 960px) {
    .contacts-map {
        .map-loading {
            font-size: 20px;
        }
    }

    .contacts {
        padding: 32px 0 0 0;
    }

    .contacts-label {
        margin-bottom: 32px;
        font-size: 32px;
        font-weight: 500;
    }

    .contacts-props {
        margin-bottom: 32px;
        flex-direction: column;
        column-gap: 0;
        row-gap: 32px;

        &__item {
            column-gap: 16px;

            img {
                width: 20px;
                height: 20px;
            }

            &-content {
                row-gap: 8px;
                font-size: 16px;

                span {
                    font-size: 14px;
                }
            }
        }
    }

    .map-marker {
        width: 56px;
        height: 70px;
    }
}

@media (max-width: 600px) {
    .contacts-map {
        height: 380px;
    }
}
</style>
