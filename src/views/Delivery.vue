<template>
    <section class="text-page">
        <v-container>
            <Breadcrumbs class="text-page__breadcrumbs"></Breadcrumbs>
            <v-row>
                <v-col cols="12" v-for="(item, index) in 4" :key="index">
                    <div class="text-page__item">
                        <div class="text-page__item-head">
                            <img src="/svg/text-page1.svg" alt="">
                            Условия обмена
                        </div>
                        <div class="text-page__item-text">
                            Вы можете обменять товар, купленный онлайн в нашем магазине на идентичный товар иного размера/цвета <br> <br>
                            <b>Условия:</b>
                            <ul>
                                <li>Свяжитесь с сотрудником магазина что бы узнать информацию о возможности обмена, наличии товара для обмена.</li>
                                <li>Заполните заявление на обмен по форме, размещенной тут или переданной Вам в печатной форме при доставке Товара.</li>
                                <li>Заполненную форму вместе с Товаром, который хотите обменять документами о его приобретении передайте нам. </li>
                            </ul>
                            <b>После получения товара вы должны обраться с заявлением об омене в течение 7 дней!</b>
                        </div>
                    </div>
                </v-col>
            </v-row>
            
        </v-container>
    </section>
</template>
<script>
import Breadcrumbs from '../components/UI/Breadcrumbs.vue';
import MainBtn from '../components/UI/MainBtn.vue';

export default {
    components: {
        Breadcrumbs,
        MainBtn,
    },
    data() {
        return {};
    },
};
</script>

<style lang="scss">
.text-page__breadcrumbs
{
    margin-bottom: 4rem;
}
.text-page
{
    padding: 2.4rem 0 12rem 0;
    &__item
    {
        margin-bottom: 7.2rem;
        display: flex;
        flex-direction: column;
        row-gap: 2.4rem;
        &-head
        {
            display: flex;
            column-gap: 1.6rem;
            color: #27231E;
            font-size: 4rem;
            font-weight: 600;
            line-height: 1.2em;
            letter-spacing: -0.4px;
        }
        &-text
        {
            color: #27231F;
            font-size: 1.7rem;
            line-height: 1.64em;
            letter-spacing: -0.17px;
            ul
            {
                margin: 0.5em 0;
                padding-left: 1.5em;
            }
            b
            {
                font-weight: 700;
            }
        }
    }
}
@media (max-width: 960px) {
    .text-page
    {
        padding: 32px 0 61px 0;
        &__item
        {
            margin-bottom: 0;
            row-gap: 24px;
            &-head
            {
                column-gap: 8px;
                font-size: 32px;
            }
            &-text
            {
                font-size: 14px;
            }
        }
    }
}
</style>