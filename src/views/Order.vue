<template>
    <section class="order">
        <v-container>
            <v-row>
                <v-col md="7" cols=12 class="d-flex flex-column">
                    <div class="order-products">
                        <div class="order-label">
                            Ваш заказ
                            <span>3 товара</span>
                        </div>
                        <div class="order-products__wrap">
                            <a class="order-products__wrap-item" href="#" v-for="(item, index) in 6" :key="index">
                                <img src="/img/product-detail.jpg" alt="">
                                <div class="order-products__wrap-item-name">Nessa Selena Bra</div>
                                <ul class="order-products__wrap-item-props">
                                    <li>Размер: 75B</li>
                                    <li>Цвет: Бежевый</li>
                                </ul>
                                <div class="order-products__wrap-item-price">
                                    6 900 ₽
                                </div>
                            </a>
                        </div>
                        
                    </div>
                    <div class="order-delivery">
                        <div class="order-delivery__label">
                            Данные для доставки
                        </div>
                        <div class="order-delivery__form">
                            <Input class="inline" placeholder="Адрес доставки*"></Input>
                            <Input class="" placeholder="Имя*"></Input>
                            <Input class="" placeholder="Фамилия*"></Input>
                            <Input class="" placeholder="Телефон*"></Input>
                            <Input class="" placeholder="E-mail*"></Input>
                        </div>
                    </div>
                </v-col>
                <v-col md="4" cols=12 offset-md="1">
                    <div class="cart-summary order-summary">
                        <div class="cart-summary__label">Сумма заказа</div>
                        <div class="cart-summary__items">
                            <div class="cart-summary__item">
                                3 товара на сумму
                                <span>20 700 ₽</span>
                            </div>
                            <div class="cart-summary__item">
                                Доставка
                                <span class="waiting">Рассчитывается</span>
                            </div>
                            <div class="cart-summary__item">
                                Промокод: SALE20
                                <span class="minus">- 3 000 ₽</span>
                            </div>
                        </div>
                        <div class="cart-summary__input">
                            <Input placeholder="Промокод"></Input>
                        </div>
                        <div class="cart-summary__total">
                            Итого
                            <span>20 700 ₽</span>
                        </div>
                        <div class="cart-summary__total-additional">
                            Бесплатная доставка от 10 000 ₽
                        </div>
                        <MainBtn class="btn-primary w-100">Оформить заказ</MainBtn>
                        <div class="cart-summary__offer">
                            Нажимая на кнопку «Оформить заказ», <br>
                            вы принимаете условия <a href="">Публичной оферты</a>
                        </div>
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </section>
</template>

<script>
import Input from '../components/UI/Input.vue';
import MainBtn from '../components/UI/MainBtn.vue';

export default {
    components: {
        Input,
        MainBtn
    },
    data() {
        return {};
    },
};
</script>

<style lang="scss">
.order
{
    padding: 4rem 0 14rem 0;
}
.order-label
{
    margin-bottom: 4rem;
    color: $primary;
    font-size: 4rem;
    font-weight: 600;
    line-height: 1.2em;
    letter-spacing: -0.4px;
    span
    {
        display: none;
    }
}
.order-products
{
    margin-bottom: 3.2rem;
    padding-bottom: 3.2rem;
    border-bottom: 1px solid #E9E9E9;
}
.order-products__wrap
{

    display: grid;
    grid-template-columns: repeat(5, 1fr);
    column-gap: 3.2rem;
    row-gap: 3.2rem;
    &-item
    {
        text-decoration: none;
        img
        {
            width: 100%;
            height: 16rem;
            object-fit: cover;
        }
        &-name
        {
            margin-bottom: .4rem;
            color: $primary;
            font-size: 1.4rem;
            line-height: 1.4em;
            letter-spacing: -0.056px;
        }
        &-props
        {
            margin-bottom: .4rem;
            display: flex;
            flex-direction: column;
            list-style: none;
            row-gap: .4rem;
            li
            {
                color: #A6A5A3;
                font-size: 1.2rem;
                line-height: 1.33em;
            }
        }
        &-price
        {
            color: $primary;
            font-size: 1.4rem;
            font-weight: 600;
            line-height: 1.42em;
            letter-spacing: -0.056px;
        }
    }
}
.order-delivery
{
    &__label
    {
        margin-bottom: 3.2rem;
        color: $primary;
        font-size: 2.8rem;
        font-weight: 500;
        line-height: 1.2em;
        letter-spacing: -0.504px;
    }
    &__form
    {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        column-gap: 3.2rem;
        row-gap: 3.2rem;
        .form-control__wrap.inline
        {
            grid-column: span 2;
        }
    }
}
@media (max-width: 1280px) {
    .order-products__wrap
    {
        grid-template-columns: repeat(4, 1fr);
    }
}
@media (max-width: 960px) {
    .order
    {
        padding: 32px 0 60px 0;
    }
    .order-label
    {
        display: flex;
        flex-direction: column;
        margin-bottom: 32px;
        font-size: 32px;
        span
        {
            margin-top: 8px;
            display: block;
            color: #A6A5A3;
            font-size: 14px;
            line-height: 1em;
            letter-spacing: -0.056px;
        }
    }
    .order-products
    {
        order: 1;
        border-bottom: 0;
        padding-bottom: 0;
        margin-bottom: 8px;
    }
    .order-products__wrap
    {
        &-item
        {
            img
            {
                margin-bottom: 16px;
                height: 165px;
            }
            &-name
            {
                margin-bottom: 4px;
                font-size: 12px;
            }
            &-props
            {
                margin-bottom: 0;
                row-gap: 4px;
                li
                {
                    font-size: 12px;
                }
            }
            &-price
            {
                display: none;
            }
        }
    }
    .order-delivery
    {
        margin-bottom: 48px;
        order: 0;
        &__label
        {
            margin-bottom: 32px;
            font-size: 32px;
        }
        &__form
        {
            grid-template-columns: repeat(1, 1fr);
            row-gap: 24px;
            .form-control__wrap.inline
            {
                grid-column: initial;
            }
        }
    }
    .order-summary
    {
        .cart-summary__input
        {
            display: none;
        }
    }
}
@media (max-width: 600px) {
    .order-products__wrap
    {
        grid-template-columns: repeat(3, 1fr);
    }
}
</style>