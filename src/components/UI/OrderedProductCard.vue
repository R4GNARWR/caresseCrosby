<template>
    <div class="product-card" v-if="product">
        <div class="product-card__img">
            <img v-lazy="product.productPhoto" alt="" v-if="product.productPhoto">
        </div>
        <div class="product-card__info" v-if="product">
            <div class="product-card__info-name" v-if="product.productTitle">{{product.productTitle}}</div>
            <div class="product-card__info-props">
                <div class="product-card__info-props__price" v-if="product.price">
                    {{product.price}} руб
                </div>
            </div>
            <div class="product-card__info-buttons">
                <button class="btn btn-primary" @click="editProduct = true" v-if="editProduct === false">Изменить</button>
            </div>
            <div class="product-card__info-edit" v-if="editProduct">
                <div class="product-card__info-edit__inputs">
                    <div>
                        <label>Цена</label>
                        <Input v-model="newPrice"></Input>
                    </div>
                    <div>
                        <label>Количество</label>
                        <Input v-model="newCount"></Input>
                    </div>
                </div>
                <button class="btn btn-primary" @click="updateOrderProduct">Сохранить</button>
            </div>
        </div>
    </div>
</template>
<script>
import Input from './Input.vue';
export default {
    components: { Input },
    data() {
        return {
            newPrice: this.product.price || 0,
            newCount: this.product.quantity || 1,
            editProduct: false,
        }
    },
    props: {
        product: [Object, Array],
    },
    methods: {
        updateOrderProduct(){
            this.$emit('updateProduct', this.product.orderProductId, this.newPrice, this.newCount)
            this.editProduct = false
        }
    },
}
</script>
<style lang="scss">
.product-card__info-buttons
{
    margin-bottom: 1.5rem;
    margin-top: 1.5rem;
    button
    {
        width: 100%;
        padding: 1rem;
    }
}
.product-card__info-edit
{
    display: flex;
    flex-direction: column;
    row-gap: 2rem;
    button
    {
        width: 100%;
        padding: 1rem;
    }
}
.product-card__info-edit__inputs
{
    display: flex;
    column-gap: .8rem;
}
</style>