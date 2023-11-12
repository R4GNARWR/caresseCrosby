<template>
    <div class="catalog__filter-wrap"
    :style="{ paddingTop: catalogOffsetTop + 'px' }"
    :class="{'active': filterStatus}"
    >
    <div class="catalog__filter">
        <div class="catalog__filter-head">
            Фильтры
            <div class="catalog__filter-close" @click="$emit('updateFilterStatus')">
                <img src="/svg/close.svg" alt="">
            </div>
        </div>
        <div class="catalog__filter-filters">
            <FilterItem @update-filters="updateFilters" :filterObject="brands_search" :filterName="'Бренды'"></FilterItem>
            <FilterItem @update-filters="updateFilters" :filterObject="sizes_search" :filterName="'Размеры'"></FilterItem>
            <FilterItem @update-filters="updateFilters" :filterObject="colors_search" :filterName="'Цвета'"></FilterItem>
        </div>
        
    </div>
</div>

</template>
<script>

import search from '../../api/search'
import {mapState} from "vuex";

import FilterItem from '../UI/FilterItem.vue';

export default {
    components: {
        FilterItem
    },
    computed:{
        ...mapState(['headerPadding', 'brands_search','colors_search','sizes_search']),
    },
    data() {
        return {
            catalogOffsetTop: 0,
        }
    },
    methods: {
        setCatalogPadding() {
            if(window.innerWidth < 991) {
                this.catalogOffsetTop = this.paddingTop;
            } else {
                this.catalogOffsetTop = 0;
            }
        },
        ...search,
        updateFilters(filter) {
            this.$emit('updateFilter', filter)
        }
    },
    props: {
        filterStatus: Boolean,
    },
    mounted() {
        this.setCatalogPadding()
        window.addEventListener('resize', this.setCatalogPadding);
    },
    beforeDestroy() {
        // удаляем обработчик события при уничтожении компонента
        window.removeEventListener('resize', this.setCatalogPadding);
    },
    created() {
        this.for_created();
    },

}
</script>
<style lang="scss">

.catalog__filter
{
    display: flex;
    flex-direction: column;
    row-gap: 4.8rem;
    &-close
    {
        display: none;
        width: 20px;
        height: 20px;
        img
        {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }
    &-filters
    {
        display: flex;
        flex-direction: column;
        row-gap: 4.8rem;
    }
    &-head
    {
        display: none;
    }
}
@media (max-width: 960px) {
    .catalog__filter
    {
        padding-top: 30px;
        &-close
        {
            display: block;
        }
        &-head
        {
            margin-bottom: 24px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: $primary;
            font-size: 24px;
            font-weight: 500;
            line-height: 1.33em;
            letter-spacing: -0.24px;
            
        }
    }
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
        &-filters
        {
            height: 100%;
            overflow-y: scroll;
        }
    }
}
</style>