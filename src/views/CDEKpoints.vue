<template>
    <section class="point-pick">
        <aside class="point-pick__aside">
            <v-autocomplete
            label="Выберите город"
            :items="cities"
            item-title="cityName"
            item-value="cityCode"
            v-model="cityCode"
            ></v-autocomplete>
        </aside>
        <div class="point-pick__map">
            
        </div>
    </section>
</template>
<script>

import order from '../api/order';
import store from '../store/store';
import {mapMutations, mapState} from "vuex";

export default {
    data() {
        return {
            cityCode: '',
            points: [],
            cities: [
            {
                cityName: 'Уфа',
                cityCode: 256
            },
            {
                cityName: 'Москва',
                cityCode: 44
            },
            ]
        }
    },
    methods: {
        ...order
    },
    created() {
        this.authCDEK()
        this.getCitiesList()
    },
    watch: {
        cityCode(newValue) {
            console.log(newValue)
            this.getDeliveryPoints(newValue)
        }
    }
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
</style>