<template>
    <section class="product">

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

<style lang="scss">
.product
{
    padding: 2.4rem 0 6rem 0;
}
</style>