<template>
    <section class="point-pick">
        <aside class="point-pick__aside">
            <v-autocomplete
            label="Выберите город"
            :items="cdek_cities"
            item-title="city"
            item-value="code"
            v-model="cityCode"
            @update:modelValue="(event) => updateRegion(event)"
            ></v-autocomplete>
        </aside>
        <div class="point-pick__map">
            <yandex-map :settings="settings"
            :coords="coords"
            :controls="[]"
            :zoom="16">
            <ymap-marker
            v-for="(item, index) in cdek_pvz" :key="index"
            :marker-id="index" 
            :coords="[item.location.latitude, item.location.longitude]"
            />
        </yandex-map>
        </div>
    </section>
</template>
<script>

import order from '../api/order';
import store from '../store/store';
import {mapMutations, mapState} from "vuex";
import { yandexMap, ymapMarker } from 'vue-yandex-maps';

export default {
    components: {
        yandexMap,
        ymapMarker
    },
    data() {
        return {
            mapEl: null,
            coords: [54.722170,56.022624],
            settings: {
                apiKey: '453f5758-6290-4de4-bae1-d645fb102e5c',
                lang: 'ru_RU',
                coordorder: 'latlong',
                enterprise: false,
                debug: false,
                version: '2.1'
            },
            cityCode: '',
        }
    },
    computed: {
        ...mapState(['cdek_cities','cdek_pvz']),
    },
    methods: {
        ...order,
        updateRegion(event) {
            this.getDeliveryPoints(event)
            const city = this.cdek_cities.find(item => item.code === event)
            this.coords = [city.latitude, city.longitude]
        }
    },
    created() {
        if(!this.cdek_cities) {
            this.getCitiesList()
        }
    },
}
</script>
<style lang="scss">
.point-pick
{
    display: flex;
}
.point-pick__aside
{
    padding: 10rem 3.9rem 5rem 7rem;
    width: 37rem;
}
.point-pick__map
{
    width: 100%;
    height: 80vh;
    .ymap-container
    {
        width: 100%;
        height: 100%;
    }
}
</style>