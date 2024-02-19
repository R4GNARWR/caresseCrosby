<template>
    <div v-if="filterObject">
      <div class="catalog__filter-item">
        <div class="catalog__filter-item__label">{{ filterName }}</div>
        <div class="catalog__filter-items" :class="{'all': showAll, 'shrink': values.length < 7}">
          <div class="catalog__filter-item__input" v-for="filter in values" :key="filter.value"
            :style="filter.disabled?'opacity: 0.5':''"
          >
            <input type="radio" :name="filter.value" @click="clickFilter(filter)" :disabled="filter.disabled"
                   :checked="saved_search_filters.some(item => item && item.attributeValueId === filter.attributeValueId)"
            >
              <div class="product-card__info-props__colors" v-if="filterName === 'Цвета'"><div :style="com_color(filter.value)"></div></div>
              {{ filter.value }}
            <label></label>
          </div>
        </div>

        <button class="catalog__filter-item__button" @click="toggleFilters()" v-if="!showAll && values.length > 6">Посмотреть все</button>
        <button class="catalog__filter-item__button" @click="toggleFilters()" v-if="showAll && values.length > 6">Скрыть</button>
      </div>
<!--        <div class="catalog__filter-item" v-if="filterName === 'Бренды'">-->
<!--            <div class="catalog__filter-item__label">{{ filterName }}</div>-->
<!--            <div class="catalog__filter-items" :class="{'all': showAll, 'shrink': values.length < 7}">-->
<!--                <div class="catalog__filter-item__input" v-for="filter in values" :key="filter.value" >-->
<!--                  <input type="radio" :name="filter.value" @click="clickFilter(filter)"-->
<!--                    :checked="filter.active"-->
<!--                    > &lt;!&ndash;                    :checked="saved_search_filters.some(item => item && item.attributeValueId === filter.attributeValueId)"&ndash;&gt;-->
<!--                    {{ filter.value }}-->
<!--                    <label></label>-->
<!--                </div>-->
<!--            </div>-->

<!--            <button class="catalog__filter-item__button" @click="toggleFilters()" v-if="!showAll && values.length > 6">Посмотреть все</button>-->
<!--            <button class="catalog__filter-item__button" @click="toggleFilters()" v-if="showAll && values.length > 6">Скрыть</button>-->
<!--        </div>-->
<!--        <div class="catalog__filter-item" v-if="filterName === 'Размеры'">-->
<!--            <div class="catalog__filter-item__label">{{ filterName }}</div>-->
<!--            <div class="catalog__filter-items" :class="{'all': showAll}">-->
<!--                <div class="catalog__filter-item__input" v-for="filter in values" :key="filter.value" >-->
<!--                    <input type="radio" :name="filter.value"-->
<!--                    @click="clickFilter(filter)"-->
<!--                    :checked="saved_search_filters.some(item => item && item.attributeValueId === filter.attributeValueId)"-->
<!--                    >-->
<!--                    <label></label>-->
<!--                    <div class="catalog__filter-item__color" :style="{ backgroundColor: filter.color }"></div>-->
<!--                    <div class="catalog__filter-item__name">{{ filter.value }}</div>-->
<!--                </div>-->
<!--            </div>-->
<!--            <button class="catalog__filter-item__button" @click="toggleFilters()" v-if="!showAll && values.length > 6">Посмотреть все</button>-->
<!--            <button class="catalog__filter-item__button" @click="toggleFilters()" v-if="showAll && values.length > 6">Скрыть</button>-->
<!--        </div>-->

<!--        <div class="catalog__filter-item" v-if="filterName === 'Цвета'">-->
<!--            <div class="catalog__filter-item__label">{{ filterName }}</div>-->
<!--            <div class="catalog__filter-items" :class="{'all': showAll}">-->
<!--                <div class="catalog__filter-item__input" v-for="filter in values" :key="filter.value" >-->
<!--                    <input type="radio" :name="filter.value"-->
<!--                    @click="clickFilter(filter)"-->
<!--                    :checked="saved_search_filters.some(item => item && item.attributeValueId === filter.attributeValueId)"-->
<!--                    >-->
<!--                    <label></label>-->
<!--                    <div class="catalog__filter-item__color" :style="{ backgroundColor: filter.color }"></div>-->
<!--                    <div class="catalog__filter-item__name">{{ filter.value }}</div>-->
<!--                </div>-->
<!--            </div>-->
<!--            <button class="catalog__filter-item__button" @click="toggleFilters()" v-if="!showAll && values.length > 6">Посмотреть все</button>-->
<!--            <button class="catalog__filter-item__button" @click="toggleFilters()" v-if="showAll && values.length > 6">Скрыть</button>-->
<!--        </div>-->
    </div>
</template>

<script>
import {mapState} from "vuex";
// import store from "../../store/store";
export default {
    data() {
        return {
            showAll: false,
            values: [],
            // currentFilter: [],
        };
    },
    emits: ['update-filters'],
    props: {
        filterObject: Array,
        filterName: String
    },
    computed: {
        ...mapState(['saved_search_filters','colors_list' ]),
    },
    watch: {
        filterObject: {
            immediate: true,
            handler(newVal) {
                // if (this.filterName === 'Бренды' && newVal) {
                //     this.values = newVal;
                // } else {
                    this.values = Array.isArray(newVal) ? newVal : newVal;
                // }
            },
        },
        // '$route.params.id': {
        //     handler() {
        //         const inputFields = document.querySelectorAll("input[type='radio']");
        //         inputFields.forEach((input) => {
        //             input.checked = false;
        //         });
        //     }
        // },
    },
    methods: {
        toggleFilters() {this.showAll = !this.showAll;},
        clickFilter(filter) {this.$emit('update-filters', filter);},
      com_color(value){
        let color = null;
        if(this.colors_list && this.colors_list.length > 0) {
          this.colors_list.forEach(element => {
            if(Object.values(element)[0].includes(value)) {
                color = element
              }
            });
          }
          if(color) {
            let result = 'background-color:' + Object.getOwnPropertyNames(color)+';';
            if (Object.getOwnPropertyNames(color)[0] ==='#FFFFFF') result+= ' border: 1px solid #827F7D;';
            if (Object.getOwnPropertyNames(color)[0] ==='Multi!') result='background:linear-gradient(90deg, Red, Orange, Yellow, Green, Blue, Indigo,violet);'
            return result
          } else {
            return false
          }


      },
    },
    // created() {
    //     if(this.filterName === 'Бренды' && this.$route.params.brands !== 'sizes') {
    //         const routeBrand = Number(this.$route.params.brands)
    //         const brand = this.values.find(item => item.attributeValueId === routeBrand)
    //     //     this.currentFilter.push(brand)
    //     //     this.saved_search_filters.forEach((item) => {
    //     //         if(item.attributeId === 1) {
    //         //         this.currentFilter.push(item)
    //             // }
    //         // })
    //     }
    //     if(this.filterName === 'Размеры') {
    //         const routeSize = Number(this.$route.params.sizes)
    //         const Size = this.values.find(item => item.attributeValueId === routeSize)
    //     //     // this.currentFilter.push(Size)
    //     //     this.saved_search_filters.forEach((item) => {
    //     //         if(item.attributeId === 2) {
    //     //             // this.currentFilter.push(item)
    //     //         }
    //     //     })
    //     } //else {
    //         // this.saved_search_filters.forEach((item) => {
    //     //         if(item.attributeId === 6) {
    //     //             // this.currentFilter.push(item)
    //     //         }
    //     //     })
    //     // }
    // }
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
    &.shrink
    {
        height: auto;
    }
    &.half
    {
        height: calc(3.2rem * 3);
    }
    &.all
    {
        // height: calc(3.2rem * 9);
        // overflow-y: scroll;
        // scrollbar-color: #3f3f3f transparen;
        // scrollbar-width: thin;
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
            &::before{
                content: '';
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-image: url('/svg/checkbox.svg');
                background-position: center;
                opacity: 0;
                z-index: 1;
                transition: .1s;
            }
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
            border: 2px solid #C0B09D;
            &::before
            {
                opacity: 1;
            }
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
@media (max-width: 960px) {
    .catalog__filter-items
    {
        display: flex;
        flex-direction: column;
        row-gap: 1.2rem;
        height: calc(28px * 6);
        overflow: hidden;
        &.half
        {
            height: calc(28px * 3);
        }
        &.all
        {
            height: auto;
        }
    }
    .catalog__filter-item
    {
        row-gap: 12px;
        &__label
        {
            font-size: 17px;
            line-height: 1.5em;
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
