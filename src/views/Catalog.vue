<template>
    <keep-alive>
        <section class="catalog">
            <v-container>
                <div class="breadcrumbs text-page__breadcrumbs">
                    <router-link class="breadcrumbs-item" to="/">Главная</router-link>
                    <div class="breadcrumbs-divider">/</div>
                    <a class="breadcrumbs-item active">Каталог</a>
                </div>
                <v-row>
                    <v-col cols="12">
                        <div class="catalog__head">
                            <div class="catalog__head-left">
                                <div class="catalog__head-label" v-if="headerName">{{headerName}}</div>
                                <div class="catalog__head-count">{{totalAmount}} товара</div>
                            </div>
                            <div class="catalog__head-bottom">
                                <div class="catalog__head__filter-btn d-lg-none d-flex" @click="changeFilterVisibility()">
                                    <img src="/svg/filter.svg" alt="">
                                    Фильтры
                                </div>
                                <div class="catalog__head-select">
                                    <Dropdown :listItems = "sortTypes" @items-action="sortCatalog">{{ activeSortString }}</Dropdown>
                                </div>
                            </div>
                        </div>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col md="3" cols="12">
                        <CatalogFilter
                        :filterStatus="showFilters"
                        :brands_search="brandFilters"
                        :colors_search="colorFilter"
                        :sizes_search="sizesFilter"
                        :catalogListHeight="catalogHeight"
                        @updateFilter="updateFilter"
                        @updateFilterStatus="changeFilterVisibility()"></CatalogFilter>
                    </v-col>
                    <v-col md="9" cols="12">
                        <CatalogList
                        @update-catalog-height="updateCatalogHeight"
                        :productArray="productsComputed"
                        :searchStatus="status"></CatalogList>
                    </v-col>
                </v-row>
            </v-container>
            <ArrowScrollUp></ArrowScrollUp>
        </section>
    </keep-alive>
</template>
<script>

const filterSuccess = (a, b) => {
    a=Array.from(a)
    b=Array.from(b)

    let groupedFilter = {};
    for (var i=0; i<a.length; i++) {
        let p = a[i]["attributeId"];
        if (!groupedFilter[p]) { groupedFilter[p] = []; }
        groupedFilter[p].push(a[i]);
    }

    let groupedProductAttr = {};
    for (var i=0; i<b.length; i++) {
        let p = b[i]["attributeId"];
        if (!groupedProductAttr[p]) { groupedProductAttr[p] = []; }
        groupedProductAttr[p].push(b[i]);
    }

    let result = {}
    for (let k in groupedFilter){
        result[k]=false
        groupedFilter[k].forEach(a1=>{
            if (groupedProductAttr[k])
            groupedProductAttr[k].forEach(b1=>{
              if (a1.attributeValueId=== b1.attributeValueId) result[k]= true
            })
        })
        if (!result[k]) break
    }

    let final=true
    for (let r in result) final=final * result[r]
    return final
}

import { mapState, } from "vuex";
import CatalogFilter from "../components/catalog/CatalogFilter.vue";
import CatalogList from "../components/catalog/CatalogList.vue";
import Breadcrumbs from '../components/UI/Breadcrumbs.vue'
import Dropdown from "../components/UI/Dropdown.vue";
import search from './../api/search'
import ArrowScrollUp from "../components/UI/ArrowScrollUp.vue";
import store from "../store/store";

export default {
    components: {
        Breadcrumbs,
        CatalogFilter,
        CatalogList,
        Dropdown,
        ArrowScrollUp
    },
    data() {
        return {
            sortTypes: [
            {
                name: 'По убыванию цены',
                value: 'priceDesc'
            },
            {
                name: 'По возрастанию цены',
                value: 'priceAsc'
            },
            ],
            status: 'По вашему запросу не удалось найти товары. Попробуйте изменить параметры поиска.',
            showFilters: false,
            activeSortString: 'Сортировать',
            activeSortValue: 'popularityDesc',
            description:"",
            products:[], brandFilters:null,sizesFilter:null,colorFilter:null,
            productsInitial:[],
            TotalAmount: 0,
            i:1,
            accept_product_request:false,
            no_result:false,
            filter:{
                "brand": {
                    "attributeId":1,
                    "attributeValueId":'',
                    "value":""
                },
                "sizes": {
                    "attributeId":2,
                    "attributeValueId":'',
                    "value":""
                },
                "colors": {
                    "attributeId":6,
                    "attributeValueId":'',
                    "value":""
                }
            },
            isLoading: false,
            catalogHeight: 0,
        }
    },
    computed:{
        productsComputed() {
            let productsFiltered = []
            if (this.saved_search_filters && this.saved_search_filters.length>0){
                for (let p of this.products)
                    if (p.attributes)
                        if (filterSuccess(this.saved_search_filters, p.attributes)) productsFiltered.push(p)
            } else {
                productsFiltered=this.products
            }
            switch (this.activeSortValue) {
                case 'priceAsc': {
                    productsFiltered.sort((a, b) => a.price - b.price);
                    break;
                }
                case 'priceDesc': {
                    productsFiltered.sort((a, b) => b.price - a.price);
                    break;
                }
                case 'popularityDesc': {
                    break;
                }
            }
            return productsFiltered
        },
        ...mapState(['headerPadding', 'categoriesTree', 'cat_products','brands_search', 'search_result', 'saved_search_filters', 'saved_search_path' ]),
        totalAmount() {
            return this.productsComputed?this.productsComputed.length:0
        },
        headerName() {
            const paramId = this.$route.params.brands;
            if(this.categoriesTree && !paramId) {
                const category = this.categoriesTree.find(element => Number(this.$route.params.id) === Number(element.id));
                return category ? category.name : 'Каталог';
            } else if(paramId && this.brands_search && this.filter["brand"].attributeValueId === paramId) {
                const brand = this.brands_search.find(element => Number(element.attributeValueId) === Number(paramId));
                if(brand) {
                    return brand.value;
                }
            } else {
                return 'Каталог';
            }
        }
    },
    methods: {
        sortCatalog(sortName, sortValue){
            if (sortValue) {
                this.activeSortString = sortName
                this.activeSortValue = sortValue
            }
        },
        updateCatalogHeight(height) {
            this.catalogHeight = height
        },
        changeFilterVisibility() {
            this.showFilters = !this.showFilters;
        },
        async update() {
            this.products = []
            this.productsInitial = []
            this.status = 'Поиск...'
            try {
                if(this.$route.params.id === 'search') {
                    if(this.search_result.query === this.$route.query.query && this.search_result) {
                        this.products = this.search_result.products;
                        this.sizesFilter = this.search_result.sizesFilter;
                        this.brandFilters = this.search_result.brandFilters;
                        this.colorFilter = this.search_result.colorFilter;
                        this.productsInitial = this.search_result.products;
                        this.accept_product_request = true;
                    } else {
                        const [productsResponse] = await Promise.all([
                        this.$API.searchProducts( this.$route.query.query, null, 1, null)
                        ]);
                        this.i = 1;
                        if (productsResponse && productsResponse.data && productsResponse.data.products && productsResponse.data.products.length > 0) {
                            this.products = productsResponse.data.products;
                            this.sizesFilter = productsResponse.data.sizes;
                            this.brandFilters = productsResponse.data.brands;
                            this.colorFilter = productsResponse.data.colors;
                            this.productsInitial = productsResponse.data.products;
                            this.accept_product_request = true;

                            this.search_result.products = productsResponse.data.products
                            this.search_result.sizesFilter = productsResponse.data.sizes;
                            this.search_result.brandFilters = productsResponse.data.brands;
                            this.search_result.colorFilter = productsResponse.data.colors;
                            this.search_result.query = this.$route.query.query
                        } else {
                            this.status = 'По вашему запросу не удалось найти товары. Попробуйте изменить параметры поиска.'
                        }
                    }
                } else {
                    if(this.cat_products[this.$route.params.id]) {
                        const saved = this.cat_products[this.$route.params.id]
                        this.products = saved.data.products;
                        this.productsInitial = saved.data.products;
                        this.sizesFilter = saved.data.sizes;
                        this.brandFilters = saved.data.brands;
                        this.colorFilter = saved.data.colors;
                        this.accept_product_request = true;
                    } else {
                        const [productsResponse, descriptionResponse ] = await Promise.all([
                        this.$API.getCategoryTopProducts(this.$route.params.id, 380, 570),
                        this.$API.getCatDescription(this.$route.params.id)
                        ])
                        if (descriptionResponse && descriptionResponse.data && descriptionResponse.data.success) {
                            this.description = descriptionResponse.data.description;
                        }
                        this.i = 1;
                        if (productsResponse && productsResponse.data && productsResponse.data.products && productsResponse.data.products.length > 0) {
                            this.products = productsResponse.data.products;
                            this.productsInitial = productsResponse;
                            this.sizesFilter = productsResponse.data.sizes;
                            this.brandFilters = productsResponse.data.brands;
                            this.colorFilter = productsResponse.data.colors;
                            this.accept_product_request = true;
                            if(!this.cat_products[this.$route.params.id]) {
                                this.cat_products[this.$route.params.id] = productsResponse;
                            }
                        } else {
                            this.status = 'По вашему запросу не удалось найти товары. Попробуйте изменить параметры поиска.'
                        }
                    }
                }
            } catch (error) {
                this.status = 'Ошибка поиска. Повторите попытку позднее'
                console.log(error);
            }

        },
        ...search,
        updateFilter(filter) {
          let skip = false
          window.scrollTo({top: 0, behavior: "smooth"});

          if(!this.saved_search_filters.some(item=> item && item.attributeValueId === filter.attributeValueId)) store.commit("addToFilters", filter);
          else {
            store.commit("delFromFilters", filter)
            skip = true
          }

          let upatedFilters={"brands":[],"colors":[],"sizes":[]}
            switch (filter.attributeId){
              case 1: upatedFilters.brands = this.brandFilters; break;
              case 2: upatedFilters.sizes = this.sizesFilter; break
              case 6: upatedFilters.colors = this.colorFilter; break
            }
            for (let p of this.products)
              if (p.attributes) {
                if (filterSuccess(this.saved_search_filters, p.attributes)) {
                  for (let attr of p.attributes){
                    if (attr.attributeId !== filter.attributeId) switch (attr.attributeId){
                      case 1: if (!upatedFilters.brands.some(item => item.attributeValueId === attr.attributeValueId)) upatedFilters.brands.push(attr); break;
                      case 2: if (!upatedFilters.sizes.some(item => item.attributeValueId === attr.attributeValueId)) upatedFilters.sizes.push(attr); break;
                      case 6: if (!upatedFilters.colors.some(item => item.attributeValueId === attr.attributeValueId)) upatedFilters.colors.push(attr); break;
                    }
                  }
                }
              }

          for (let f of this.brandFilters) if (!f.disabled || skip) f.disabled = !upatedFilters.brands.some(item => item.attributeValueId === f.attributeValueId);
          for (let f of this.sizesFilter) if (!f.disabled || skip) f.disabled = !upatedFilters.sizes.some(item => item.attributeValueId === f.attributeValueId);
          for (let f of this.colorFilter) if (!f.disabled  || skip) f.disabled = !upatedFilters.colors.some(item => item.attributeValueId === f.attributeValueId);

        },
    },
    watch: {
        '$route.params': function () {
            this.update();
            this.filter.brand = '';
            this.filter.sizes = '';
            this.filter.colors = '';
            this.i = 1;

            store.commit('setFilter', []);
            store.commit('setSearchPath', this.$route.fullPath)
        },
        '$route.query.query': function () {
            this.update();
            this.filter.brand = '';
            this.filter.sizes = '';
            this.filter.colors = '';
            this.i = 1;

            store.commit('setFilter', []);
        },
    },
    created() {
        if(!this.$route.params.brands)
        {
            this.update();
            // this.for_created();
        }
        store.commit('setSearchPath', this.$route.fullPath)
    },
    mounted() {
        const brands = this.$route.params.brands
        const sizes = this.$route.params.sizes
        //
        // if(this.saved_search_filters && this.$route.fullPath === this.saved_search_path) {
        //     this.filters = this.saved_search_filters
        // } else {
        //     store.commit('setFilter', []);
        // }

        if(brands && brands !== 'sizes') {
            this.filter.brand.attributeValueId = brands;
            if(this.brandFilters) {
                const brand = this.brandFilters.find((item) => {item.attributeValueId === brands})
                if(brand && !this.filters.includes(brand)) store.commit('addToFilters', brand)

            }
        }
        if(sizes) {
            this.filter.sizes.attributeValueId = sizes;
            if(this.sizesFilter) {
                const size = this.sizesFilter.find((item) => item.attributeValueId === sizes)
                if(size && !this.filters.includes(size)) store.commit('addToFilters', size)
            }
        }
        if(sizes || brands) {
            this.to_search();
        }
    },
}
</script>

<style lang="scss">
.catalog
{
    padding-top: 2.4rem;
    padding-bottom: 15rem;
    .breadcrumbs
    {
        margin-bottom: 4rem;
    }
}
.catalog__head
{
    margin-bottom: 4rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &-left
    {
        display: flex;
        align-items: center;
        column-gap: 2rem;
    }
    &-label
    {
        color: $primary;
        font-size: 4rem;
        font-weight: 600;
        line-height: 1.2em;
        letter-spacing: -0.4px;
        white-space: nowrap;
    }
    &-count
    {
        color: #A6A5A3;
        font-size: 1.6rem;
        line-height: 1.5em;
        letter-spacing: -0.128px;
        white-space: nowrap;
    }
    &-select
    {
        .dropdown__body
        {
            right: 0;
            left: initial;
            li
            {
                text-align: right;
            }
        }
    }
    &-bottom
    {
        display: flex;
        justify-content: flex-end;
        width: 100%;
    }
    &__filter-btn
    {
        display: flex;
        align-items: center;
        column-gap: 8px;
        color: $primary;
        font-size: 14px;
        font-weight: 600;
        line-height: 16px;
        letter-spacing: -0.14px;
        img
        {
            width: 24px;
            height: 24px;
            object-fit: contain;
        }
    }
}
@media (max-width: 960px) {
    .catalog
    {
        padding-top: 32px;
    }
    .catalog__head
    {
        flex-direction: column;
        align-items: flex-start;
        &-left
        {
            margin-bottom: 40px;
            flex-direction: column;
            align-items: flex-start;
            column-gap: 8px;
        }
        &-label
        {
            white-space: initial;
            font-size: 32px;
        }
        &-count
        {
            font-size: 14px;
        }
        &-bottom
        {
            justify-content: space-between;
        }
    }
}

</style>
