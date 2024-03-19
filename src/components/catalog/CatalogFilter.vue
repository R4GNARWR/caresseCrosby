<template>
    <div class="catalog__filter-wrap"
        :style="{ paddingTop: catalogOffsetTop + 'px', minHeight: !isMobile ? catalogListHeight + 'px' : 0 }"
        :class="{ 'active': filterStatus }" ref="catalogFilterWrap">
        <div class="catalog__filter" :style="{
            position: !isMobile ? filterPosition : 'static',
            top: filterTop !== 'auto' ? filterTop + 'px' : filterTop,
            bottom: filterBottom
        }" ref="catalogFilter">
            <div class="catalog__filter-head">
                Фильтры
                <div class="catalog__filter-close" @click="emit('updateFilterStatus')">
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
                <MainBtn class-name="btn-primary" @click="emit('updateFilterStatus')">Фильтровать</MainBtn>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, computed, onUnmounted, onMounted, watch, onUpdated } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';

import search from '../../api/search'

import FilterItem from '../UI/FilterItem.vue';
import MainBtn from '../UI/MainBtn.vue'

const catalogFilter = ref(null);
const catalogFilterWrap = ref(null);

const catalogOffsetTop = ref(0);
const currentScroll = ref(0);
const windowHeight = ref(0);
const filtersHeight = ref(null);
const filtersBounds = ref(null);
const filterPosition = ref('static');
const savedTop = ref(0);
const savedTopOffset = ref(0);
const filterTop = ref(0);
const filterBottom = ref('auto');
const filterScroll = ref('top');

const router = useRouter();
const route = useRoute();
const store = useStore();

const isMobile = computed(() => {
    return window.innerWidth < 960;
});

const headerPadding = computed(() => store.state.headerPadding);

const emit = defineEmits(['updateFilter', 'updateFilterStatus']);

const props = defineProps({
    filterStatus: Boolean,
    brands_search: Array,
    sizes_search: Array,
    colors_search: Array,
    catalogListHeight: Number,
});

const setCatalogPadding = () => {
    if (window.innerWidth < 960) {
        catalogOffsetTop.value = paddingTop;
    } else {
        catalogOffsetTop.value = 0;
    }
    setFilterValues()
    setFilterPositioning()
}

const updateFilters = (filter) => {
    emit('updateFilter', filter)
}

const setFilterValues = () => {
    windowHeight.value = window.innerHeight;
    if (catalogFilter.value) {
        filtersBounds.value = catalogFilter.value.getBoundingClientRect()
        if (catalogFilterWrap.value) {
            savedTopOffset.vaue = catalogFilterWrap.value.offsetTop;
        }
        filtersHeight.value = catalogFilter.value.offsetHeight;
    }
}

const setFilterPositioning = () => {
    if (props.catalogListHeight < filtersHeight.value) {
        filterPosition.value = 'static'
        return false
    }
    if (!filtersBounds.value) {
        return false
    }
    let newScroll = window.scrollY;

    if (catalogFilter.value) {
        filtersBounds.value = catalogFilter.value.getBoundingClientRect()
    }
    if (catalogFilter.value && filtersHeight.value !== catalogFilter.value.offsetHeight) {
        filtersHeight.value = catalogFilter.value.offsetHeight;
    }
    if (filtersBounds.value.top < newScroll) {
        filterPosition.value = 'fixed'
        filterTop.value = 'auto'
        filterBottom.value = '40px'
        filterScroll.value = 'bottom'
    }
    if (newScroll > currentScroll.value) {
        // листаем вниз
        if (filtersBounds.value.bottom - windowHeight.value + 40 <= 0 && filterScroll.value === 'unset') {
            filterPosition.value = 'fixed'
            filterTop.value = 'auto'
            filterBottom.value = '40px'
            filterScroll.value = 'bottom'
        }
        if (filterScroll.value === 'top') {
            filterPosition.value = 'absolute'
            filterTop.value = savedTop.value
            filterBottom.value = 'auto'
            filterScroll.value = 'unset'
        }
        if (newScroll + windowHeight.value - headerPadding.value + 40 >= props.catalogListHeight + savedTop.valueOffset && props.catalogListHeight !== 0) {
            filterPosition.value = 'absolute'
            filterTop.value = 'auto'
            filterBottom.value = '0'
            filterScroll.value = 'unset'
        }
        if (filterScroll.value === 'bottom') {
            savedTop.value = newScroll - filtersHeight.value / 2.4 - 40
        }
    } else {
        // листаем вверх
        if (filterScroll.value === 'bottom') {
            filterPosition.value = 'absolute'
            filterTop.value = savedTop.value
            filterBottom.value = 'auto'
            filterScroll.value = 'unset'
        }
        if (filtersBounds.value.top - 40 - headerPadding.value >= 0 && filterScroll.value === 'unset') {
            filterPosition.value = 'fixed'
            filterTop.value = headerPadding.value + 40
            filterBottom.value = 'auto'
            filterScroll.value = 'top'
        }
        if (newScroll + headerPadding.value <= savedTop.valueOffset && filterScroll.value === 'top') {
            filterPosition.value = 'absolute'
            filterTop.value = 0
            filterBottom.value = 'auto'
            filterScroll.value = 'unset'
        }
        if (filterScroll.value === 'top') {
            savedTop.value = newScroll - headerPadding.value
        }
    }
    currentScroll.value = newScroll;
}

watch(() => route.params, () => {
    setCatalogPadding()
})

watch(() => route.query.query, () => {
    setCatalogPadding()
})
onUpdated(() => {
    if (window.innerWidth > 960) {
        setCatalogPadding()
    }
})

onMounted(() => {
    if (window.innerWidth > 960) {
        setCatalogPadding()
    } else {
        filterPosition.value = 'fixed'
    }
    if (typeof setFilterPositioning === 'function') {
        window.addEventListener('scroll', setFilterPositioning);
    }
    if (typeof setCatalogPadding === 'function') {
        window.addEventListener('resize', setCatalogPadding);
    }
})
onUnmounted(() => {
    if (setFilterPositioning) {
        window.removeEventListener('scroll', setFilterPositioning);
    }
    if (setCatalogPadding) {
        window.removeEventListener('resize', setCatalogPadding);
    }
})

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
