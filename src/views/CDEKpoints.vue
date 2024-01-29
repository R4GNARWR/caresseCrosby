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
                <div class="point-pick__aside-list" @ref="pvzList">
                    <div class="point-pick__aside-card"
                    :class="{'active': chosenPVZ!.code === item.code}"
                    v-for="(item, index) in cdek_pvz"
                    :data-pvz-code="item.code"
                    :key="item.code"
                    @click="choosePoint(item)">
                        <div class="point-pick__aside-card__address">{{item.location.address}}</div>
                        <div class="point-pick__aside-card__time">С {{cdek_min_time}}</div>
                    </div>
                </div>
                <div class="point-pick__aside-action">
                    <main-btn class-name="btn-primary w-100" @click="savePvz">Выбрать</main-btn>
                </div>
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
                <yandex-map-default-scheme-layer/>
                <yandex-map-marker
                v-if="cdek_pvz"
                v-for="(item, index) in cdek_pvz" :key="item.code"
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
        </yandex-map>
    </div>
</v-container>
</section>
</template>
<script setup lang="ts">
import { ref, computed, onMounted,onUnmounted, reactive, shallowRef, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import order from '../api/order'
import api from '../api/api'

import {
    YandexMap,
    YandexMapDefaultFeaturesLayer,
    YandexMapDefaultSchemeLayer,
    YandexMapMarker,
} from 'vue-yandex-maps';

import type { YMap } from '@yandex/ymaps3-types';
import MainBtn from '../components/UI/MainBtn.vue';

let centerCoords = [56.022775, 54.722379];
let savedScroll = 0

const router = useRouter()
const store = useStore()

const cityCode = ref('Уфа')
const chosenPVZ = ref({code:''})
const pvzList = ref(null)


const mapEl = shallowRef<null | YMap>(null);

const cdek_cities = computed(() => store.state.cdek_cities)
const cdek_pvz = computed(() => store.state.cdek_pvz)
const cdek_min_time = computed(() => {
    const currentDate = new Date();
    const futureDate = new Date(currentDate.getTime() + store.state.cdek_min_time * 24 * 60 * 60 * 1000);
    const day = futureDate.getDate();
    const monthNumber = futureDate.getMonth() + 1;
    const monthList=[
    'Января',
    'Февраля',
    'Марта',
    'Апреля',
    'Мая',
    'Июня',
    'Июля',
    'Августа',
    'Сентября',
    'Ноября',
    'Декабря',
    ];
    const month = monthList[monthNumber]
    return `${day} ${month}`;

})

const changeCenter = (latitude, longitude) => {
    mapEl?.value?.setLocation({
        center: [latitude, longitude],
        zoom: 12
    })
};

const choosePoint = (item) => {
    mapEl?.value?.setLocation({ center:[item.location.longitude, item.location.latitude] ,zoom: 18, duration: 400 })
    chosenPVZ.value = item
    const element = document.querySelector(`.point-pick__aside-card[data-pvz-code='${item.code}']`);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth'});
        window.scrollTo(0,savedScroll)
    }
}
const saveScroll = () => {
    savedScroll = window.scrollY
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
const savePvz = () => {
    store.commit('setCdekChosenPvz', chosenPVZ.value)
    router.push('/order?deliveryType=pickup')
}
watch(cdek_pvz, (newVal, oldVal) => {
    if(newVal && newVal.length>0) {
        const firsrPvz = newVal[0]
        api.getCdekDeliveryPrice(138,{code: firsrPvz.code})
    }
})
onMounted(() => {
    if(!cdek_cities.value) {
        order.getCitiesList()
    }
    updateRegion(256)
    window.addEventListener('scroll', saveScroll)
})

onUnmounted(() => {
    window.removeEventListener('scroll', saveScroll)
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
    height: 70vh;
    flex-shrink: 0;
    display:flex;
    flex-direction: column;
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
.point-pick__aside-list {
    height:100%;
    display: flex;
    flex-direction: column;
    row-gap:2.4rem;
    scrollbar-color: #3f3f3f transparent;
    scrollbar-width: thin;
    overflow-y:scroll;
}
.point-pick__aside-card {
    padding: 1.6rem;
    padding-bottom: 1.6rem;
    border-bottom: 1px solid #e5e5e5;
    &.active {
        background-color: #27231F;
        .point-pick__aside-card__address,
        .point-pick__aside-card__time{
            color: #FFFFFF;
        }
    }
}
.point-pick__aside-card__address {
    margin-bottom: 1.6rem;
    color: #27231F;
    font-size: 2rem;
    font-weight: 600;
    line-height: 1.4em;
    letter-spacing: -0.028rem;
}
.point-pick__aside-card__time {
    color: #A6A5A3;
    font-size: 1.4rem;
    line-height: 1.4em;
    letter-spacing: -0.056px;
}
.point-pick__aside-action {
    margin-top: 2.4rem;
}
</style>