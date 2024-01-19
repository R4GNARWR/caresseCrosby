<template>
    <div class="catalog__filter-wrap"
    :style="{ paddingTop: catalogOffsetTop + 'px', minHeight: catalogListHeight+'px'}"
    :class="{'active': filterStatus}"
    ref="catalogFilterWrap">
    <div class="catalog__filter"
    :style="{minHeight: filtersComputedHeight+'px', position: filterPosition, top: filterTop !=='auto' ? filterTop+'px': filterTop, bottom: filterBottom}"
    ref="catalogFilter">
    <div class="catalog__filter-head">
        Фильтры
        <div class="catalog__filter-close" @click="$emit('updateFilterStatus')">
            <img src="/svg/close.svg" alt="">
        </div>
    </div>
    <div class="catalog__filter-filters">
        <FilterItem @update-filters="updateFilters" :filterObject="brands_search" :filterName="'Бренды'" v-if="brands_search && brands_search.length > 0"></FilterItem>
        <FilterItem @update-filters="updateFilters" :filterObject="sizes_search" :filterName="'Размеры'" v-if="sizes_search && sizes_search.length > 0"></FilterItem>
        <FilterItem @update-filters="updateFilters" :filterObject="colors_search" :filterName="'Цвета'" v-if="colors_search && colors_search.length > 0"></FilterItem>
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
    data() {
        return {
            catalogOffsetTop: 0,
            currentScroll: 0,
            windowHeight: 0,
            filtersHeight: 0,
            filtersBounds: null,
            filterPosition: 'static',
            savedTop: 0,
            savedTopOffset: 0,
            filterTop: 'auto',
            filterBottom: 'auto',
            currentDirection: '',
        }
    },
    computed:{
        filtersComputedHeight() {
            if(this.catalogListHeight > this.filtersHeight) {
                return this.filtersHeight
            } else {
                return this.catalogListHeight
            }
        },
        ...mapState([
        'headerPadding',
        ]),
    },
    props: {
        filterStatus: Boolean,
        brands_search: Array,
        sizes_search: Array,
        colors_search: Array,
        catalogListHeight: Number,
    },
    methods: {
        setCatalogPadding() {
            if(window.innerWidth < 991) {
                this.catalogOffsetTop = this.paddingTop;
            } else {
                this.catalogOffsetTop = 0;
            }
        },
        updateFilters(filter) {
            this.$emit('updateFilter', filter)
        },
        // setFilterPositioning() {
        //     if(this.$refs.catalogFilter) {
        //         this.filtersBounds = this.$refs.catalogFilter.getBoundingClientRect()
        //     }
        //     let newScroll = window.scrollY;
            
        //     if(this.$refs.catalogFilter && this.filtersHeight !== this.$refs.catalogFilter.offsetHeight) {
        //         this.filtersHeight = this.$refs.catalogFilter.offsetHeight;
        //     }
        //     if(newScroll > this.currentScroll) {
        //         // листаем вниз
        //         this.savedTop = newScroll - 40 - (this.filtersHeight - this.windowHeight )
        //         if (this.filtersBounds.bottom - this.windowHeight + 40 <= 0 ) {
        //             this.filterPosition = 'fixed'
        //             this.filterTop = 'auto'
        //             this.filterBottom = '40px'
        //         }
        //         this.currentDirection = 'bottom'
        //     } else {
        //         // листаем вверх
        //         if(this.filterPosition === 'fixed' && this.currentDirection !== 'top') {
        //             this.filterPosition = 'absolute'
        //             this.filterTop = this.savedTop
        //             this.filterBottom = 'auto'
        //         }
        //         if (this.filtersBounds.top - 40 - this.headerPadding >= 0) {
        //             this.filterPosition = 'fixed'
        //             this.filterTop = this.headerPadding + 40
        //             this.filterBottom = 'auto'
        //         }
        //         this.currentDirection = 'top'
        //     }
        //     this.currentScroll = newScroll;
        // },
        ...search,
    },
    mounted() {
        this.setCatalogPadding()
        // this.windowHeight = window.innerHeight;
        // this.filtersBounds = this.$refs.catalogFilter.getBoundingClientRect()
        // this.savedTopOffset = this.filtersBounds.x
        // this.filtersHeight = this.$refs.catalogFilter.offsetHeight;
        // window.addEventListener('scroll', this.setFilterPositioning)
        // window.addEventListener('resize', this.setCatalogPadding);
    },
    // beforeDestroy() {
    //     // удаляем обработчик события при уничтожении компонента
    //     window.removeEventListener('scroll', this.setFilterPositioning)
    //     window.removeEventListener('resize', this.setCatalogPadding);
    // },
}
</script>
<style lang="scss">
.catalog__filter-wrap
{
    position: relative;
}
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
