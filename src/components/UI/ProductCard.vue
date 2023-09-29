<template >
    <div class="product-card">
        <div class="product-card__img">
            <img src="/img/product.png" alt="">
            <div class="product-card__img-new">NEW</div>
            <div class="product-card__img-like">
                <v-icon icon="mdi-heart-outline" color="#27231E"></v-icon>
            </div>
        </div>
        <div class="product-card__info">
            <div class="product-card__info-name">{{productData.name}}</div>
            <div class="product-card__info-props">
                <div class="product-card__info-props__price">
                    {{productData.price}} руб
                </div>
                <div class="product-card__info-props__colors">
                    <div style="background-color: #EFD8C6;"></div>
                    <div style="background-color: #414141;"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        productData: Object,
    }
    
}
</script>
<style lang="scss">
    .product-card
    {
        &__img
        {
            margin-bottom: 1.2rem;
            position: relative;
            height: 44rem;
            img
            {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            &-new
            {
                position: absolute;
                left: 1.2rem;
                top: 1.2rem;
                padding: .2rem .8rem;
                color: $primary;
                font-size: 1.2rem;
                background-color: #BFB09D;
            }
            &-like
            {
                position: absolute;
                right: 1.2rem;
                top: 1.2rem;
                cursor: pointer;
                i
                {
                    font-size: 2rem;
                }
            }
        }
        &__info
        {    
            &-name
            {
                margin-bottom: .4rem;
                color: $primary;
                font-size: 1.6rem;
                line-height: 1.5em;
                letter-spacing: -0.16px;
            }
            &-props
            {
                display: flex;
                justify-content: space-between;
                &__price
                {
                    color: $primary;
                    font-size: 1.5rem;
                    font-weight: 700;
                    line-height: 1.5em; 
                }
                &__colors
                {
                    display: flex;
                    column-gap: .4rem;
                    div
                    {
                        width: 1.4rem;
                        height: 1.4rem;
                        border-radius: 50%;
                    }
                }
            }
        }
    }
</style>