<template>
    <div class="catalog__filter-wrap" :style="{ paddingTop: catalogOffsetTop + 'px' }">
        <div class="catalog__filter">
            <FilterItem v-for="filter in filters" :filterObject="filter"></FilterItem>
        </div>
    </div>

</template>
<script>

import FilterItem from '../UI/FilterItem.vue';
import { useSettingsStore } from '../../store/settingsStore';

export default {
    components: {
        FilterItem
    },
    computed: {
        paddingTop(){return useSettingsStore().getHeaderPadding},
    },
    methods: {
        setCatalogPadding() {
            if(window.innerWidth < 991) {
                this.catalogOffsetTop = this.paddingTop;
                console.log(this.catalogOffsetTop)
            } else {
                this.catalogOffsetTop = 0;
                console.log(this.catalogOffsetTop)
            }
        }
    },
    mounted() {
        this.setCatalogPadding
        window.addEventListener('resize', this.setCatalogPadding);
    },
    beforeDestroy() {
        // удаляем обработчик события при уничтожении компонента
        window.removeEventListener('resize', this.setCatalogPadding);
    },
    data() {
        return {
            catalogOffsetTop: 0,
            filters: [
            {
                name: 'Бренд',
                values: [
                'Name brand',
                'Satisfyer',
                'Antonia',
                'Vibes Mr. Rabbit',
                'Name brand',
                'Name brand',
                'Name brand',
                'Name brand',
                'Name brand',
                ],
            },
            {
                name: 'Размеры',
                values: [
                'XS',
                'XS-S',
                'S',
                'M',
                'M-L',
                'L',
                'XL',
                ],
            },
            {
                name: 'Цвета',
                values: [
                {
                    color: '#000',
                    name: 'Черный',
                },
                {
                    color: '#8B4513',
                    name: 'Коричневый',
                },
                {
                    color: '#FFDEAD',
                    name: 'Бежевый',
                },
                {
                    color: '#008000',
                    name: 'Зеленый',
                },
                {
                    color: '#808080',
                    name: 'Серый',
                },
                {
                    color: '#DA70D6',
                    name: 'Розовый',
                },
                {
                    color: '#000',
                    name: 'Фиолетовый',
                },
                ],
            },
            
            ]
        }
    },
    
}
</script>
<style lang="scss">

.catalog__filter
{
    display: flex;
    flex-direction: column;
    row-gap: 4.8rem;
}
@media (max-width: 960px) {
    .catalog__filter-wrap
    {
        padding-top: 70px;
        position: fixed;
        left: 0;
        top: 0;
        max-height: 100vh;
        height: calc(100vh);
        width: 100%;
        z-index: 1000;
        transform: translateX(-150%);
        opacity: 0;
        background: rgb(9, 9, 9,.8);
        &.active
        {
            transform: translateX(0%);
            opacity: 1;
        }
    }
    .catalog__filter
    {
        padding: 32px 20px;
        height: 100%;
        background-color: #FFF;
        overflow-y: scroll;
    }
}
</style>