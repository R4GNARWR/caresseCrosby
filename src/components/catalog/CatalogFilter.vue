<template>
    <div class="catalog__filter-wrap"
    :style="{ paddingTop: catalogOffsetTop + 'px', minHeight: !isMobile ? catalogListHeight+'px' : 0}"
    :class="{'active': filterStatus}"
    ref="catalogFilterWrap">
    <div class="catalog__filter"
    :style="{
        minHeight: filtersComputedHeight+'px',
        position: !isMobile ? filterPosition : 'static' ,
        top: filterTop !=='auto' ? filterTop+'px': filterTop,
        bottom: filterBottom}"
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
            filterTop: 0,
            filterBottom: 'auto',
            filterScroll: 'unset',
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
        isMobile() {
            if(window.innerWidth < 960) {
                return true
            } else {
                return false
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
            if(window.innerWidth < 960) {
                this.catalogOffsetTop = this.paddingTop;
            } else {
                this.catalogOffsetTop = 0;
            }
            
        },
        updateFilters(filter) {
            this.$emit('updateFilter', filter)
        },
        setFilterValues() {
            this.windowHeight = window.innerHeight;
            this.filtersBounds = this.$refs.catalogFilter.getBoundingClientRect()
            this.savedTopOffset = this.filtersBounds.x
            this.filtersHeight = this.$refs.catalogFilter.offsetHeight;
            window.addEventListener('scroll', this.setFilterPositioning)
            window.addEventListener('resize', this.setCatalogPadding);
        },
        setFilterPositioning() {
            let newScroll = window.scrollY;
            
            if(this.$refs.catalogFilter) {
                this.filtersBounds = this.$refs.catalogFilter.getBoundingClientRect()
            }
            if(this.$refs.catalogFilter && this.filtersHeight !== this.$refs.catalogFilter.offsetHeight) {
                this.filtersHeight = this.$refs.catalogFilter.offsetHeight;
            }
            
            if(newScroll > this.currentScroll) {
                // листаем вниз
                if (this.filtersBounds.bottom - this.windowHeight + 40 <= 0 && this.filterScroll === 'unset') {
                    this.filterPosition = 'fixed'
                    this.filterTop = 'auto'
                    this.filterBottom = '40px'
                    this.filterScroll = 'bottom'
                }
                if(this.filterScroll === 'top') {
                    this.filterPosition = 'absolute'
                    this.filterTop = this.savedTop
                    this.filterBottom = 'auto'
                    this.filterScroll= 'unset'
                }
                if(newScroll + this.windowHeight - this.headerPadding + 40 >= this.catalogListHeight + this.savedTopOffset && this.catalogListHeight !== 0) {
                    this.filterPosition = 'absolute'
                    this.filterTop = 'auto'
                    this.filterBottom = '0'
                    this.filterScroll = 'unset'
                }
                if(this.filterScroll === 'bottom') {
                    this.savedTop = newScroll - this.filtersHeight/2.4 - 40
                }
            } else {
                // листаем вверх
                if(this.filterScroll === 'bottom') {
                    this.filterPosition = 'absolute'
                    this.filterTop = this.savedTop
                    this.filterBottom = 'auto'
                    this.filterScroll= 'unset'
                }
                if (this.filtersBounds.top - 40 - this.headerPadding >= 0 && this.filterScroll === 'unset') {
                    this.filterPosition = 'fixed'
                    this.filterTop = this.headerPadding + 40
                    this.filterBottom = 'auto'
                    this.filterScroll = 'top'
                }
                if(newScroll + this.headerPadding <= this.savedTopOffset + 40 && this.filterScroll === 'top') {
                    this.filterPosition = 'absolute'
                    this.filterTop = 0
                    this.filterBottom = 'auto'
                    this.filterScroll = 'unset'
                }
                if(this.filterScroll === 'top') {
                    this.savedTop = newScroll - this.headerPadding 
                }
            }
            this.currentScroll = newScroll;
        },
        ...search,
    },
    mounted() {
        this.setCatalogPadding()
        if(window.innerWidth > 960) {
            this.setFilterValues()
        } else {
            this.filterPosition = 'fixed'
        }

    },
    beforeDestroy() {
        // удаляем обработчик события при уничтожении компонента
        window.removeEventListener('scroll', this.setFilterPositioning)
        window.removeEventListener('resize', this.setCatalogPadding);
    },
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
        overflow-y: scroll;
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
        width: 100%;
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
