<template>
    <Vue3StickySidebar containerSelector=".stickyContainer" :topSpacing="headerPadding + 40" :bottomSpacing="40"
        innerWrapperSelector=".catalog__filter-wrap" v-if="!isMobile">
        <div class="catalog__filter-wrap">
            <div class="catalog__filter">
                <div class="catalog__filter-filters">
                    <FilterItem @update-filters="updateFilters" :filterObject="brands_search" :filterName="'Бренды'"
                        v-if="brands_search && brands_search.length > 0"></FilterItem>
                    <FilterItem @update-filters="updateFilters" :filterObject="sizes_search" :filterName="'Размеры'"
                        v-if="sizes_search && sizes_search.length > 0"></FilterItem>
                    <FilterItem @update-filters="updateFilters" :filterObject="colors_search" :filterName="'Цвета'"
                        v-if="colors_search && colors_search.length > 0"></FilterItem>
                </div>
            </div>
        </div>
    </Vue3StickySidebar>
    <div class="catalog__filter-wrap" v-else  :class="{ 'active': filterStatus }">
        <div class="catalog__filter">
            <div class="catalog__filter-head">
                Фильтры
                <div class="catalog__filter-close" @click="$emit('updateFilterStatus')">
                    <img src="/svg/close.svg" alt="">
                </div>
            </div>
            <div class="catalog__filter-filters">
                <FilterItem @update-filters="updateFilters" :filterObject="brands_search" :filterName="'Бренды'"
                    v-if="brands_search && brands_search.length > 0"></FilterItem>
                <FilterItem @update-filters="updateFilters" :filterObject="sizes_search" :filterName="'Размеры'"
                    v-if="sizes_search && sizes_search.length > 0"></FilterItem>
                <FilterItem @update-filters="updateFilters" :filterObject="colors_search" :filterName="'Цвета'"
                    v-if="colors_search && colors_search.length > 0"></FilterItem>
            </div>
            <div class="catalog__filter-action">
                <MainBtn class-name="btn-primary" @click="$emit('updateFilterStatus')">Фильтровать</MainBtn>
            </div>
        </div>
    </div>
</template>
<script>
import Vue3StickySidebar from "vue3-sticky-sidebar";
import search from '../../api/search'
import { mapState } from "vuex";
import { useRouter } from 'vue-router';
import FilterItem from '../UI/FilterItem.vue';
import MainBtn from '../UI/MainBtn.vue'
export default {
    components: {
        FilterItem,
        MainBtn,
        Vue3StickySidebar
    },
    emits: ['updateFilter', 'updateFilterStatus'],
    computed: {
        isMobile() { return window.innerWidth < 960; },
        ...mapState(['headerPadding',]),
    },
    props: {
        filterStatus: Boolean,
        brands_search: Array,
        sizes_search: Array,
        colors_search: Array,
    },
    methods: {
        updateFilters(filter) {
            this.$emit('updateFilter', filter)
        },
        ...search,
    },
}
</script>
<style lang="scss">
.catalog__filter-wrap {
    position: relative;
}

.catalog__filter {
    display: flex;
    flex-direction: column;
    row-gap: 4.8rem;
    transition: 0s;

    &-close {
        display: none;
        width: 20px;
        height: 20px;

        img {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }

    &-filters {
        display: flex;
        flex-direction: column;
        row-gap: 4.8rem;
    }

    &-head {
        display: none;
    }
}

.catalog__filter-action {
    display: none;
}

@media (max-width: 960px) {
    .catalog__filter {
        padding-top: 30px;

        &-close {
            display: block;
        }

        &-head {
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

    .catalog__filter-wrap {
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
        background: rgb(9, 9, 9, .8);

        &.active {
            transform: translateX(0%);
            opacity: 1;
        }
    }

    .catalog__filter {
        padding: 32px 20px;
        width: 100%;
        height: 100%;
        background-color: #FFF;

        &-filters {
            height: 100%;
            overflow-y: scroll;
        }
    }

    .catalog__filter-action {
        display: block;
    }
}
</style>