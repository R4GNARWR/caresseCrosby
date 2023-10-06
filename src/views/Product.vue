<template>
    <section class="product">
        <v-container>
            <v-row>
                <v-col cols="12">
                    <Breadcrumbs />
                </v-col>
            </v-row>
            
        </v-container>
        <DetailProduct />
    </section>
</template>

<script>
import Breadcrumbs from "../components/UI/Breadcrumbs.vue";
import DetailProduct from "../components/detailProduct/DetailProduct.vue";

export default {
    components: {
        Breadcrumbs,
        DetailProduct,
    },
    data() {
        return {};
    },
};
</script>

<style lang="scss"></style>