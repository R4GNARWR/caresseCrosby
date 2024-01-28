<template>
    <section class="point-pick">
        <v-container>
            <aside class="point-pick__aside">
                <div class="point-pick__aside-label">
                    Оформление заказа
                </div>
                <v-autocomplete
                label="Выберите город"
                v-if="cdek_cities"
                :items="cdek_cities"
                item-title="city"
                item-value="code"
                v-model="cityCode"
                @update:modelValue="(event) => updateRegion(event)"
                ></v-autocomplete>
                
            </aside>
            <div class="point-pick__map">
                <yandex-map
                v-model="mapEl"
                :settings="{
                    location: {
                        center: centerCoords,
                        zoom: 12,
                        controls: [],
                    },
                }">
                <yandex-map-default-features-layer />
                <yandex-map-marker
                v-if="cdek_pvz"
                v-for="(item, index) in cdek_pvz" :key="index"
                :settings="{coordinates: [item.location.longitude, item.location.latitude]}"
                :position="`left-center top`"
                @click="choosePoint(item)"
                >
                <img
                class="map-marker pointer"
                alt=""
                :src="'/svg/map-placemark.svg'"
                />
            </yandex-map-marker>
            <yandex-map-default-scheme-layer/>
        </yandex-map>
    </div>
</v-container>
</section>
</template>
<script setup lang="ts">
import { ref, computed, onMounted, reactive, shallowRef } from 'vue'
import { useStore } from 'vuex'
import order from '../api/order'

import {
    YandexMap,
    YandexMapControls,
    YandexMapDefaultFeaturesLayer,
    YandexMapDefaultSchemeLayer,
    YandexMapMarker,
    YandexMapZoomControl,
} from 'vue-yandex-maps';

import type { YMap } from '@yandex/ymaps3-types';
import type { YMapLocationRequest } from '@yandex/ymaps3-types/imperative/YMap';


const store = useStore()
const cityCode = ref('Уфа')
const cdek_cities = computed(() => store.state.cdek_cities)
const cdek_pvz = computed(() => store.state.cdek_pvz)

const mapEl = shallowRef<null | YMap>(null);

let centerCoords = [56.022775, 54.722379];

const changeCenter = (latitude, longitude) => {
    console.log(latitude, longitude)
    mapEl?.value?.setLocation({
        center: [latitude, longitude],
        zoom: 12
    })
};

const choosePoint = (item) => {
    mapEl?.value?.setLocation({ center:[item.location.longitude, item.location.latitude] ,zoom: 18, duration: 400 })
}

const updateRegion = (event) => {
    if(event) {
        order.getDeliveryPoints(event)
        if(cdek_cities.value) {
            const city = cdek_cities.value.find(item => item.code === event)
            if(city) {
                changeCenter(city.longitude, city.latitude)
            }
        }
    }
}
onMounted(() => {
    if(!cdek_cities.value) {
        order.getCitiesList()
    }
    updateRegion(256)
})
</script>
<style lang="scss">
.point-pick{
    padding: 5rem 0 10rem 0;
    .v-container {
        display: flex;
        column-gap: 3.2rem;
    }
}
.point-pick__aside{
    width: 37rem;
    flex-shrink: 0;
}
.point-pick__aside-label {
    margin-bottom: 3.5rem;
    font-size: 2.8rem;
    font-weight: 500;
    line-height: 1.2em;
    letter-spacing: -0.05rem;
}
.point-pick__map
{
    width: 100%;
    height: 70vh;
    .ymap-container
    {
        width: 100%;
        height: 100%;
    }
}
.map-marker.pointer {
    cursor: pointer;
}
</style>