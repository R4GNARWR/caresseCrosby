<template>
    <section class="catalog">
        <v-container>
            <div class="breadcrumbs text-page__breadcrumbs">
                <router-link class="breadcrumbs-item" to="/">Главная</router-link>
                <div class="breadcrumbs-divider">/</div>
                <router-link class="breadcrumbs-item" :to="this.$route.path ">Каталог</router-link>
            </div>
            <v-row>
                <v-col cols="12">
                    <div class="catalog__head">
                        <div class="catalog__head-left">
                            <div class="catalog__head-label" v-if="headerName">{{headerName}}</div>
                            <div class="catalog__head-count">{{totalAmount}} товара</div>
                        </div>
                        <div class="catalog__head-bottom">
                            <div class="catalog__head__filter-btn d-md-none d-flex" @click="changeFilterVisibility()">
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
                    <CatalogFilter :filterStatus="showFilters" @updateFilter="updateFilter" @updateFilterStatus="changeFilterVisibility()"></CatalogFilter>
                </v-col>
                <v-col md="9" cols="12">
                    <CatalogList :productArray="productsComputed"></CatalogList>
                </v-col>
            </v-row>
        </v-container>
        
    </section>
    
</template>
<script>
import { mapState } from "vuex";
import CatalogFilter from "../components/catalog/CatalogFilter.vue";
import CatalogList from "../components/catalog/CatalogList.vue";
import Breadcrumbs from '../components/UI/Breadcrumbs.vue'
import Dropdown from "../components/UI/Dropdown.vue";
import search from './../api/search'

export default {
    components: {
        Breadcrumbs,
        CatalogFilter,
        CatalogList,
        Dropdown
    },
    data() {
        return {
            sortTypes: [
            {
                name: 'По популярности',
                value: 'popularityDesc'
            },
            {
                name: 'По убыванию цены',
                value: 'priceDesc'
            },
            {
                name: 'По возрастанию цены',
                value: 'priceAsc'
            },
            ],
            showFilters: false,
            activeSortString: 'По популярности',
            activeSortValue: 'popularityDesc',
            description:"",
            products:[],
            productsInitial:[],
            TotalAmount: 0,
            i:1,
            accept_product_request:false,
            no_result:false,
            filter_selected: '',
            filter:{
                "brand": {
                    "attributeId":1,
                    "attributeValueId":'',
                    "value":""},
                "sizes": {
                    "attributeId":2,
                    "attributeValueId":'',
                    "value":""
                },
                "colors": {
                    "attributeId":6,
                    "attributeValueId":'',
                    "value":""}},
            start_filter:{},
            isLoading: false,
        }
    },
    computed:{
        productsComputed() {

            if(this.products && !this.$route.params.brands) {
            let products = [...this.products]
            products.filter(element => Number(element.category_id) === Number(this.$route.params.id));
            switch (this.activeSortValue) {
                case 'priceAsc': {
                    products.sort((a, b) => a.price - b.price);
                    break;
                }
                case 'priceDesc': {
                    products.sort((a, b) => b.price - a.price);
                    break;
                }
                case 'popularityDesc': {
                    products = [...this.productsInitial];
                    break;
                }
            }
            return products
            
            } else if (this.products && this.$route.params.brands) {
                let products = [...this.products]
                switch (this.activeSortValue) {
                    case 'priceAsc': {
                        products.sort((a, b) => a.price - b.price);
                        break;
                    }
                    case 'priceDesc': {
                        products.sort((a, b) => b.price - a.price);
                        break;
                    }
                    case 'popularityDesc': {
                        products = [...this.products];
                        break;
                    }
                }
                return products
            } else {
                return this.productsInitial
            }

        },
        ...mapState(['headerPadding', 'categoriesTree', 'cat_products','brands_search' ]
        ),
        totalAmount() {
            return this.productsComputed.length
        },
        headerName() {
            const paramId = this.$route.params.brands;
            if(this.categoriesTree && !paramId) {
                const category = this.categoriesTree.find(element => Number(this.$route.params.id) === Number(element.id));
                return category ? category.name : 'Каталог';
            } else if(paramId && this.brands_search && this.filter["brand"].attributeValueId === paramId){
                const brand = this.brands_search.find(element => Number(element.attributeValueId) === Number(paramId));
                if(brand)
                return brand.value;
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
        changeFilterVisibility() {
            this.showFilters = !this.showFilters;
        },
        async update() {
            try {
                const [descriptionResponse, productsResponse] = await Promise.all([
                this.$API.getCatDescription(this.$route.params.id),
                this.cat_products[this.$route.params.id] || this.$API.getCategoryTopProducts(this.$route.params.id, 380, 570)
                ]);
                
                if (descriptionResponse.data.success) {
                    this.description = descriptionResponse.data.description;
                }
                this.i = 1;
                
                if (productsResponse) {
                    this.products = productsResponse;
                    this.productsInitial = productsResponse;
                    this.accept_product_request = true;
                    if(!this.cat_products[this.$route.params.id]) {
                        this.cat_products[this.$route.params.id] = productsResponse;
                    }
                }
            } catch (error) {
                console.log(error);
            }
        },
        ...search,
        updateFilter(filter) {
            if(filter.attributeValueId !== 0)
            {
                switch (filter.attributeId) {
                    case 1:
                    this.filter.brand = filter;
                    break;
                    case 2:
                    this.filter.sizes = filter;
                    break;
                    case 6:
                    this.filter.colors = filter;
                    break;
                } 
            }
            this.to_search();
        },
    },
    watch: {
        '$route.params.id': function () {
            this.update();
        },
    },
    created() {
        if(!this.$route.params.brands)
        {
            this.update();
            this.for_created();
        }

    },
    mounted() {
        if(this.$route.params.brands || this.$route.params.sizes) {
            this.filter.brand.attributeValueId = this.$route.params.brands || '';
            this.filter.sizes.attributeValueId = this.$route.params.sizes || '';
            this.to_search();
        }
        window.addEventListener("scroll", this.onScroll);
    },
    beforeUnmount() {
        window.removeEventListener("scroll", this.onScroll)
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
        margin-bottom: 40px;
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