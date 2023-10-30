<template>
    <a class="order-products__wrap-item" href="#">
        <img :src="photo" alt="" v-if="photo">
        <div class="order-products__wrap-item-name">{{product.productTitle}}</div>
        <ul class="order-products__wrap-item-props">
            <li>Количество: {{ product.quantity + ' ' + product.productUnit }}</li>
        </ul>
        <div class="order-products__wrap-item-price">
            {{getSum(product)}} ₽
        </div>
    </a>
</template>
<script>
export default {
    data() {
        return {
            photo: []
        }
    },
    props: {
        product: null,
    },
    methods: {
        getSum(product) {
            let price = 0;
            price += product.price * product.quantity;
            const formattedPrice = price.toLocaleString("ru-RU");
            return formattedPrice;
        },
        getPhoto(id) {
            this.$API.getFullPhoto(id).then(value => {
                console.log(value)
                if(value.status ===200 && value.data.length>1) {
                    this.photo = value.data;
                }
            })
        },
    },
    mounted() {
        this.getPhoto(this.product.productId)
    },
}
</script>
<style lang="scss">

</style>