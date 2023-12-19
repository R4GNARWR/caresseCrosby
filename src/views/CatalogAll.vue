<template>
    <section class="catalog">
        <v-container>
            <div class="breadcrumbs text-page__breadcrumbs">
                <router-link class="breadcrumbs-item" to="/">Главная</router-link>
                <div class="breadcrumbs-divider">/</div>
                <a class="breadcrumbs-item active">Каталог</a>
            </div>
            <v-row>
                <v-col cols="12" v-if="products && products.length > 0">
                    <SwiperCards v-for="(item, index) in products" :key="index" :slidesArray="item.products" :name="item.name" :catId="item.catId"></SwiperCards>
                </v-col>
            </v-row>
        </v-container>
        
    </section>
</template>

<script>
import { mapState } from "vuex";
import SwiperCards from "../components/SwiperCards.vue";

export default {
    components: {
        SwiperCards,
    },
    computed: {
        ...mapState(["categoriesTree", "market_group", "sub_categories", "cat_products"]),
    },
    data() {
        return {
            products: [],
        };
    },
    methods: {
        async pushAll() {
            const reversedTree = this.categoriesTree;
            for (const element of reversedTree) {
                const productsById = await this.getProducts(element.id);
                this.products.push({
                    products: productsById.data.products,
                    name: element.name,
                    catId: element.id,
                });
            }
        },
        async getProducts(catId) {
            let products = [];
            if (this.cat_products[catId]) {
                products = this.cat_products[catId];
                return products;
            } else if(!this.cat_products[catId]){
                try {
                    const response = await this.$API.getCategoryTopProducts(catId, 380, 570);
                    products = response;
                    this.cat_products[catId] = products;
                    return products;
                } catch (error) {
                    console.log(error);
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
    async created() {
        await this.pushAll();
    },
};

</script>

<style lang="scss">

</style>