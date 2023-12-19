<template>
    <div class="header-search" >
        <div class="search-wrap" >
            <div class="search__icon">
                <img src="/svg/search.svg" alt="">
            </div>
            <input type="text" placeholder="Поиск"
            v-model="searchString"
            ref="searchStringInput"
            @focus="focus"
            @keydown="keydown"
            >
            <div class="header-search__close d-lg-block d-none" @click="clearSearch">
                <img src="/svg/close.svg" alt="">
            </div>
            <div class="header-search__close d-lg-none d-block" @click="closeSearch">
                <img src="/svg/close.svg" alt="">
            </div>
        </div>

        <div class="search-result" v-if="variants && variants.length > 0">
            <router-link class="search-result__item" :to="'/product/'+item.id" v-for="(item, index) in variants.slice(0,6)" :key="index">
                <div class="search-result__item-name">{{item.product}}</div>
                <div class="search-result__item-type">({{item.category}})</div>
            </router-link>
        </div>
        <div class="search-result" v-else-if="searchString.length >= 4 && resultEmpty">
            <div class="empty">
                Таких товаров не найдено
            </div>
        </div>
    </div>
</template>
<script>
import SearchMethods from "../../api/search"
import {mapState} from "vuex";
import store from "../../store/store";
import vClickOutside from "click-outside-vue3"

export default {
    data() {
        return {
            products:[],
            no_result:false,
            searchString: '',
            keyPressedTime: 0,
            searchResultsVisible: false,
            variants: [],
            activeSearchVariantIdx: null,
            one_size_attr: null,
            filter_selected: '', filter:{}, start_filter:{},
            i:1,
            accept_product_request:false,
            resultEmpty: false,
        }
    },
    props: {
        searchActive: Boolean,
    },
    directives: {
        clickOutside: vClickOutside.directive
    },
    // created() {this.for_created();},
    computed: {
        ...mapState(['market_group','brands_search','colors_search','sizes_search','OneSize','colors_list', 'addToOrder', 'search_result', 'search_settings']),
        showSearch() {
            if(window.innerWidth > 950) {
                return true
            } else {
                return this.searchActive
            }
        },
    },
    methods: {
        clearSearch() {
            this.searchString = ''
            this.keydown()
        },
        closeSearch() {
            this.$emit('closeSearch')
        },
        ...SearchMethods
    },
    watch:{
        '$route.fullPath': function () {
            this.showMenu = false;
            this.searchStatus = false
            this.variants=[]
        },
    },
}
</script>

<style lang="scss">
.header-search
{
    position: relative;
    height: 100%;
    flex-grow: 1;
    display: flex;
    align-items: center;
    column-gap: 1.2rem;
}
.search-result
{
    .empty
    {
        text-align: center;
        padding: .25em 0;
        font-size: 2rem;
    }
}
.search-wrap
{
    margin-bottom: 10px;
    position: relative;
    display: block;
    width: 100%;
    height: auto;
    z-index: 2;
    input
    {
        padding: .4rem 1.2rem .4rem 4.4rem;
        width: 100%;
        height: 100%;
        background-color: #F4F4F4;
        outline: 0;
        border-radius: 12px;
        z-index: 1;
        &,
        &::placeholder
        {
            color: $primary;
            font-size: 1.4rem;
            font-style: normal;
            font-weight: 500;
            line-height: 3.2rem;
            letter-spacing: -0.14px;
        }
    }
}
.header-search__close
{
    position: absolute;
    width: 1.6rem;
    height: 1.6rem;
    right: 1.2rem;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    cursor: pointer;
    img
    {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
}
.search-result
{
    position: absolute;
    left: 0;
    top: 100%;
    width: 100%;
    background-color: #FFFEFD;
    border-radius: 0 0 12px 12px;
    box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.08);
    z-index: 100;
    &__item
    {
        display: flex;
        flex-direction: column;
        padding: .4rem 1.6rem .8rem 1.6rem;
        text-decoration: none;
        transition: .2s;
        &-name
        {
            color: $primary;
            font-size: 1.6rem;
            line-height: 1.5em;
            letter-spacing: -0.128px;
        }
        &-type
        {
            color: #827F7D;
            font-size: 1.2rem;
            line-height: 1.33em;
        }
        &:hover
        {
            background-color: #F9F7F5;
        }
    }
}
.search__icon
{
    position: absolute;
    left: 12px;
    top: 50%;
    width: 2.4rem;
    height: 2.4rem;
    transform: translateY(-50%);
    z-index: 200;
    img
    {
        width: 100%;
        height: 100%;
    }
}
@media (max-width: 1280px) {
    .header-search
    {
        width: 300px;
    }
}
@media (max-width: 960px) {
    .header-search
    {
        width: 400px;
    }
    header
    {
        position: relative;
    }
    .search-wrap
    {
        input
        {
            position: relative;
            padding: 8px 16px 8px 56px;
            height: auto;
            &, &::placeholder
            {
                font-size: 16px;
            }
        }
    }
    .search__icon.hide
    {
        display: block;
    }
    .search__icon
    {
        width: 24px;
        height: 24px;
    }
    .header-search__close
    {
        right: 20px;
        width: 16px;
        height: 16px;
        transform: translateY(-50%);
    }
    .search-result
    {
        padding-top: 16px;
        padding-bottom: 28px;
        &__item
        {
            padding: 4px 16px 4px 16px;
            &-name
            {
                font-size: 16px;
            }
            &-type
            {
                font-size: 12px;
            }
        }
    }
}
@media (max-width: 600px) {
    .header-search
    {
        width: 340px;
    }
    .search-wrap .search__icon
    {
        left: 16px;
    }
    .search-wrap input
    {
        box-shadow: none;
        border: 0;
        padding-bottom: 12px;
    }
    .search-result
    {
        padding-top: 20px;
    }
}
</style>
