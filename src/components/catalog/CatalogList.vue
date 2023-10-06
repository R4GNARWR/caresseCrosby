<template>
    <div class="catalog-list" v-if="productArray">
        <ProductCard v-for="(item, index) in productArray" :key="index" :productData="item"></ProductCard>
    </div>
    <MainBtn class="btn btn-white w-100 d-md-none d-block outline">Показать ещё</MainBtn>
    <Pagination class="catalog-pagination"></Pagination>
</template>
<script>

import ProductCard from '../UI/ProductCard.vue';
import Pagination from '../UI/Pagination.vue';
import MainBtn from '../UI/MainBtn.vue';

export default {
    components: {
        ProductCard,
        Pagination,
        MainBtn
    },
    props: {
        productArray: Array,
    }

}
</script>
<style lang="scss">
    .catalog-list
    {
        display: grid;
        column-gap: 3.2rem;
        grid-template-columns: repeat(3, 1fr);
        row-gap: 4rem;
    }
    @media (max-width: 600px) {
        .catalog-list
        {
            margin-bottom: 32px;
            grid-template-columns: repeat(2, 1fr);
        }
        .catalog-pagination
        {
            margin-top: 32px;
        }
    }
</style>