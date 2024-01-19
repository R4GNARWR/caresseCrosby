<template>
    <div class="catalog-list__wrap" ref="catalogList">
        <div class="catalog-list" v-if="productArray && productArray.length > 0">
            <ProductCard v-for="(item, index) in productArray" :key="index" :product="item"></ProductCard>
        </div>
        <div class="empty" v-else-if="searchStatus">
            {{searchStatus}}
        </div>
        <div class="empty" v-else-if="searchStatus">
            По вашему запросу не удалось найти товары. Попробуйте изменить параметры поиска.
        </div>
        <MainBtn class="btn btn-white w-100 d-none outline">Показать ещё</MainBtn>
        <!-- <Pagination class="catalog-pagination" v-if="productArray.length >= 50"></Pagination> -->
    </div>
    
</template>
<script>
import ProductCard from '../UI/ProductCard.vue';
import Pagination from '../UI/Pagination.vue';
import MainBtn from '../UI/MainBtn.vue';

export default {
    data() {
        return {
            listHeight: 0,
        }
    },
    components: {
        ProductCard,
        Pagination,
        MainBtn
    },
    props: {
        productArray: Array,
        isLoading: Boolean,
        searchStatus: String,
    },
    emits: ['update-catalog-height'],
    methods: {
        updateCatalogHeight() {
            if(this.$refs.catalogList.offsetHeight !== this.listHeight) {
                this.listHeight = this.$refs.catalogList.offsetHeight
                this.$emit('update-catalog-height', this.listHeight);
            }

        }
    },
    mounted() {
        window.addEventListener('scroll', this.updateCatalogHeight)
    },
}
</script>
<style lang="scss">
.catalog-list
{
    width: 100%;
    display: grid;
    grid-column-gap: 3.2rem;
    grid-template-columns: repeat(3, 1fr);
    grid-row-gap: 4rem;
}
.catalog-list__wrap
{
    min-height: 60rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .empty
    {
        font-size: 4.8rem;
        text-align: center;
        font-weight: 700;
        color: $primary;
    }
}
@media (max-width: 600px) {
    .catalog-list
    {
        margin-bottom: 32px;
        grid-template-columns: repeat(2, calc(50% - 1.6rem));
    }
    .catalog-pagination
    {
        margin-top: 32px;
    }
}
</style>