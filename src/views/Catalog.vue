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
                            <div class="catalog__head-label" v-if="name">{{name}}</div>
                            <div class="catalog__head-count">{{products.length}} товара</div>
                        </div>
                        <div class="catalog__head-bottom">
                            <div class="catalog__head__filter-btn d-md-none d-flex" @click="changeFilterVisibility()">
                                <img src="svg/filter.svg" alt="">
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
                    <CatalogList :productArray="products"></CatalogList>
                </v-col>
            </v-row>
        </v-container>
        
    </section>
    
</template>
<script>
import {mapState, mapMutations} from "vuex";


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
    methods: {
        sortCatalog(sortName, sortValue){
            console.log('sort inited clicked', sortValue, sortName)
            if (sortValue) {
                this.activeSortString = sortName
            }
            switch (sortValue) {
                case 'priceAsc': {
                    this.products.sort((a, b) => {
                        if (a.price < b.price) return -1;
                        if (a.price > b.price) return 1;
                        return 0;
                    });
                    break;
                }
                case 'priceDesc': {
                    this.products.sort((a, b) => {
                        if (a.price < b.price) return 1;
                        if (a.price > b.price) return -1;
                        return 0;
                    });
                    break;
                }
                case 'popularityDesc': {
                    this.products.sort((a, b) => {
                        if (a.id < b.id) return 1;
                        if (a.id > b.id) return -1;
                        return 0;
                    });
                    break;
                }
            }
        },
        getName() {
            if(this.categoriesTree)
            {
                this.categoriesTree.forEach(element => {
                    if(Number(this.$route.params.id) === Number(element.id)) {
                        console.log(element.name)
                        this.name = element.name
                    }
                });
                if(this.name === '') {
                    this.name = 'Каталог'
                }
            }
            
        },
        changeFilterVisibility() {
            this.showFilters = !this.showFilters;
        },
        update(){
            
            this.$API.getCatDescription(this.$route.params.id).then(value => {
                if (value.data.success)this.description= value.data.description;
            }).catch(error => {console.log(error);});
            this.i=1;
            if (this.cat_products[this.$route.params.id]) {
                this.products = this.cat_products[this.$route.params.id]
                this.$API.getCategoryTopProducts(this.$route.params.id, 380, 570).then(value => {
                    this.products = value;
                    this.accept_product_request = true;
                })
            }
            else
            this.$API.getCategoryTopProducts(this.$route.params.id, 380, 570).then(value => {
                this.products = value;
                this.accept_product_request = true;
                this.cat_products[this.$route.params.id] = value;
            })
            this.getName()
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
        }
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
        name:'',
        description:"",
        products:[],
        i:1,
        accept_product_request:false,
        no_result:false,
        filter_selected: '',
        filter:{},
        start_filter:{},
    }
},
computed:{
    ...mapState(['headerPadding', 'categoriesTree', 'cat_products', ]
    ),
},
watch: {
    '$route.params.id': function () {
        this.update();
    },
    'categoriesTree': function() {
        this.getName()
    }
},
created() {
    this.update();
    this.for_created();
    
},
mounted() {
    this.getName
}
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