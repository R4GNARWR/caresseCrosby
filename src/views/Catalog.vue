<template>
    <section class="catalog">
        <v-container>
            <v-row>
                <v-col cols="12">
                    <div class="catalog__head">
                        <div class="catalog__head-left">
                            <div class="catalog__head-label">Купальники</div>
                            <div class="catalog__head-count">6299 товара</div>
                        </div>
                        <div class="catalog__head-bottom">
                            <div class="catalog__head__filter-btn d-md-none d-block">
                                <img src="svg/filter.svg" alt="">
                                Фильтры
                            </div>
                            <div class="catalog__head-select">
                                <v-select
                                v-model="select"
                                :items="items"
                                item-title="state"
                                label="Select"
                                return-object
                                single-line
                                ></v-select>
                            </div>
                        </div>
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <v-col md="3" cols="12">
                    <CatalogFilter></CatalogFilter>
                </v-col>
                <v-col md="9" cols="12">
                    <CatalogList :productArray="products"></CatalogList>
                </v-col>
            </v-row>
        </v-container>
        
    </section>
    
</template>
<script>
import {useSettingsStore} from "../store/settingsStore"
import {useProductsStore} from "../store/productsStore"
import CatalogFilter from "../components/catalog/CatalogFilter.vue";
import CatalogList from "../components/catalog/CatalogList.vue";

export default {
    components: {
        CatalogFilter,
        CatalogList
    },
    data() {
        return {
            select: { state: 'Florida'},
            items: [
            { state: 'Florida'},
            { state: 'Georgia'},
            { state: 'Nebraska'},
            { state: 'California'},
            { state: 'New York'},
            ],
        }
    },
    computed: {
        productsPopular(){return useProductsStore().productsPopular},
        products(){return useProductsStore().products.products},
        paddingTop(){return useSettingsStore().headerPadding}, 
    },
    setup() {
        const productsStore = useProductsStore();
        productsStore.fetchPopularProducts();
        productsStore.fetchAllProducts();
    },
}
</script>

<style lang="scss">
.catalog
{
    padding-top: 2.4rem;
    padding-bottom: 15rem;
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
        .v-field__input
        {
            padding: 4px 0;
        }
        .v-field--variant-filled .v-field__overlay
        {
            background-color: transparent;
        }
        .v-field__input
        {
            min-height: auto;
            height: auto;
        }
        .v-input__details
        {
            display: none;
        }
        .v-field__outline
        {
            &::before,
            &::after
            {
                border: 0 !important;
            }
            border: 0 !important;
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