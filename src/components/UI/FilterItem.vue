<template>
    <div class="catalog__filter-item" v-if="filterName === 'Цвета'">
        <div class="catalog__filter-item__label">{{ filterName }}</div>
        <div class="catalog__filter-items" :class="{'all': showAll}">
            <div class="catalog__filter-item__input" v-for="filter in values" :key="filter.value" >
                <input type="radio" name="color" @click="clickFilter(filter, $event)">
                <label></label>
                <div class="catalog__filter-item__color" :style="{ backgroundColor: filter.color }"></div>
                <div class="catalog__filter-item__name">{{ filter.value }}</div>
            </div>
        </div>
        <button class="catalog__filter-item__button" @click="showFilters()">Посмотреть все</button>
    </div>
    <div class="catalog__filter-item" v-if="filterName === 'Бренды'">
        <div class="catalog__filter-item__label">{{ filterName }}</div>
        <div class="catalog__filter-items" :class="{'all': showAll}">
            <div class="catalog__filter-item__input" v-for="filter in values" :key="filter.value" >
                <input type="radio" name="brand" @click="clickFilter(filter, $event)">
                {{ filter.value }}
                <label></label>
            </div>
        </div>
        
        <button class="catalog__filter-item__button" @click="showFilters()">Посмотреть все</button>
    </div>
    <div class="catalog__filter-item" v-if="filterName === 'Размеры'">
        <div class="catalog__filter-item__label">{{ filterName }}</div>
        <div class="catalog__filter-items half" :class="{'all': showAll}" v-for="filter in values" :key="filter.value" v-if="values"> 
            <div class="catalog__filter-item__input" v-for="(item, index) in filter" :key="index" >
                <input type="radio" name="size" @click="clickFilter(item, $event)">
                {{ item.value }}
                <label></label>
            </div>
        </div>
        
        <button class="catalog__filter-item__button" @click="showFilters()">Посмотреть все</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showAll: false,
            values: [],
            currentFilter: null,
        };
    },
    emits: ['update-filters'],
    props: {
        filterObject: {
            type: [Array, Object],
            required: true,
        },
        filterName: {
            type: String,
            required: true,
        },
    },
    watch: {
        filterObject: {
            immediate: true,
            handler(newVal) {
                if (this.filterName === 'Размеры' && newVal) {
                    this.values = newVal;
                } else {
                    this.values = Array.isArray(newVal) ? newVal : newVal;
                }
            },
        },
    },
    methods: {
        showFilters() {
            this.showAll = !this.showAll;
        },
        clickFilter(filter, e) {
            if(filter) {
                if(this.currentFilter === filter){
                    e.target.checked = '';
                    this.currentFilter = null;
                    this.$emit('update-filters', {
                        attributeId: filter.attributeId,
                        attributeValueId: '',
                        value: filter.value
                    });
                } else {
                    this.currentFilter = filter;
                    this.$emit('update-filters', filter);
                }


            }
        },
    }
};
</script>

<style lang="scss">
.catalog__filter-items
{
    display: flex;
    flex-direction: column;
    row-gap: 1.2rem;
    height: calc(3.4rem * 6);
    overflow: hidden;
    &.half
    {
        height: calc(3.2rem * 3);
    }
    &.all
    {
        height: auto;
    }
}
.catalog__filter-item
{
    width: fit-content;
    display: flex;
    flex-direction: column;
    row-gap: 1.2rem;
    &__input
    {
        padding-left: 3.4rem;
        position: relative;
        display: flex;
        align-items: center;
        column-gap: 1rem;
        color: $primary;
        font-size: 1.7rem;
        line-height: 1.4em;
        letter-spacing: -0.17px;
        label
        {
            position: absolute;
            left: 0;
            top: 50%;
            display: block;
            width: 1.8rem;
            height: 1.8rem;
            flex-shrink: 0;
            content: '';
            border: 2px solid #827F7D;
            transform: translateY(-50%);
            transition: .1s;
        }
        input
        {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            z-index: 1;
            cursor: pointer;
        }
        & > input:checked ~ label
        {
            background-color: #827F7D;
        }
        
    }
    &__label
    {
        margin-bottom: 1.6rem;
        color: $primary;
        font-size: 1.7rem;
        font-weight: 700;
        line-height: 1.4em;
        letter-spacing: -0.17px;
    }
    &__button
    {
        display: inline-flex;
        margin-top: 1.6rem;
        color:#867B6E;
        font-size: 1.7rem;
        font-weight: 600;
        line-height: 1.4em;
        letter-spacing: -0.17px;
    }
    &__color
    {
        width: 2.2rem;
        height: 2.2rem;
        border-radius: 50%;
    }
}
@media (max-width: 991px) {
    .catalog__filter-item
    {
        row-gap: 12px;
        &__label
        {
            font-size: 17px;
            margin-bottom: 16px;
        }
        &__input
        {
            padding-left: 34px;
            column-gap: 10px;
            font-size: 17px;
            label
            {
                width: 18px;
                height: 18px;
            }
        }
        &__button
        {
            margin-top: 16px;
            font-size: 17px;
        }
    }
}
</style>