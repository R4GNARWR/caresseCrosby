<template>
    <section class="favorite">
        <v-container>
            <div class="breadcrumbs text-page__breadcrumbs">
                <router-link class="breadcrumbs-item" to="/">Главная</router-link>
                <div class="breadcrumbs-divider">/</div>
                <router-link class="breadcrumbs-item active" :to="this.$route.path">Избранное</router-link>
            </div>
            <v-row v-if="favorites && favorites.length>0">
                <v-col md="3" sm="4" cols="6" v-for="product of favorites" :key="product.id" >
                    <ProductCard :product="product"></ProductCard>
                </v-col>
            </v-row>
            <v-row v-else>
                <div class="v-col">
                    <div class="favorite-empty">
                        У вас пока нет "избранных" товаров
                    </div>
                </div>

            </v-row>
        </v-container>
    </section>
</template>

<script>
import {mapState, mapMutations} from "vuex";
import ProductCard from '../components/UI/ProductCard.vue';
import Breadcrumbs from "../components/UI/Breadcrumbs.vue";

export default {
    components: {
    ProductCard,
    Breadcrumbs
},
    computed:{
        ...mapState(['favorites'])
    },
    data() {
        return {};
    },
};
</script>

<style lang="scss">
.favorite
{
    padding-top: 2.4rem;
    padding-bottom: 17rem;
}
.favorite-empty
{min-height: 300px;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 4.8rem;
    color: $primary;
}

</style>