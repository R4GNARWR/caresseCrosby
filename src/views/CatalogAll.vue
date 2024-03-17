<template>

    <section class="catalog catalogAll">
        <v-container>
            <div class="breadcrumbs text-page__breadcrumbs">
                <router-link class="breadcrumbs-item" to="/">Главная</router-link>
                <div class="breadcrumbs-divider">/</div>
                <a class="breadcrumbs-item active">Каталог</a>
            </div>
            <v-row>
                <v-col cols="12" v-if="!products || (products && products.length === 0)">
                    <div class="catalog-all__empty" :style="{ height: 'calc(100vh - 8.8rem - ' + headerPadding + 'px)' }"
                        v-html="status">
                    </div>
                </v-col>
                <v-col cols="12" v-if="products && products.length > 0">
                    <keep-alive>
                        <SwiperCards v-for="(item, index) in products" :key="index"
                            :slidesArray="item.products.slice(0, 12)" :name="item.name" :catId="item.catId">
                        </SwiperCards>
                    </keep-alive>
                </v-col>
            </v-row>
        </v-container>

    </section>

</template>

<script>
import { mapState } from "vuex";
import { onBeforeRouteLeave } from 'vue-router'
import SwiperCards from "../components/SwiperCards.vue";

export default {
    components: {
        SwiperCards,
    },
    computed: {
        ...mapState(["categoriesTree", "market_group", "sub_categories", "cat_products", "headerPadding"]),
    },
    data() {
        return {
            products: [],
            status: 'Загрузка...'
        };
    },
    head() {
        return {
            title: "Каталог | Caresse Crosby",
            meta: [
                { content: "Каталог | Caresse Crosby" }
            ]
        }
    },
    methods: {
        async pushAll() {
            const reversedTree = this.categoriesTree;
            for (const element of reversedTree) {
                const productsById = await this.getProducts(element.id);
                if (productsById && productsById.data && element) {
                    this.products.push({
                        products: productsById.data.products,
                        name: element.name,
                        catId: element.id,
                    });
                }
                if (this.products.length === 0) {
                    this.status = 'Товаров не найдено!'
                }
            }
        },
        async getProducts(catId) {
            let products = [];
            if (this.cat_products[catId]) {
                products = this.cat_products[catId];
                return products;
            } else if (!this.cat_products[catId]) {
                try {
                    const response = await this.$API.getCategoryTopProducts(catId, 380, 570);
                    products = response;
                    this.cat_products[catId] = products;
                    return products;
                } catch (error) {
                    console.log(error);
                    this.status = 'Произошла ошибка! <br> Попробуйте позднее или <br> свяяжитесь с администрацией'
                }
            }
        },
    },
    watch: {
        categoriesTree: {
            handler() {
                this.pushAll();
            },
            deep: true,
        },
    },
    setup() {
        onBeforeRouteLeave((to, from) => {
            store.commit('setSavedPosition', { path: from.fullPath, top: window.scrollY })
        })
    },
    async created() {
        await this.pushAll();
    },
};

</script>

<style lang="scss">
.catalog-all__empty {
    height: 80vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3.6rem;
    font-weight: 600;
    text-align: center;
}

@media (max-width: 960px) {
    .catalog-all__empty {
        font-size: 24px;
    }
}

@media (max-width: 600px) {
    .catalog.catalogAll {
        .v-container {
            padding: 0 20px;
            max-width: 100%;
        }
    }
}
</style>