<template>
    <section class="table-size-section">
        <v-container>
            <div class="breadcrumbs">
                <router-link class="breadcrumbs-item" to="/">Главная</router-link>
                <div class="breadcrumbs-divider">/</div>
                <router-link class="breadcrumbs-item" :to="this.$route.path">Таблица размеров</router-link>
            </div>
            <div class="table-size__label">
                Узнайте точный размер бюстгалтера
            </div>
            <v-row>
                <v-col md="7" cols="12">
                    <div class="table-size__calc-wrap">
                        <div class="table-size__calc-label">Калькулятор размера</div>
                        <div class="table-size__calc">
                            <div class="table-size__calc-item">
                                <img src="/img/calc1.png" alt="">
                                <Input :placeholder="'Обхват груди, см'"></Input>
                            </div>
                            <div class="table-size__calc-item">
                                <img src="/img/calc2.png" alt="" class="d-lg-block d-none">
                                <Input :placeholder="'Обхват под грудью, см'"></Input>
                            </div>
                        </div>
                        <MainBtn class="btn-primary w-100">Рассчитать размер</MainBtn>
                    </div>
                </v-col>
                <v-col md="5" cols="12">
                    <div class="table-size__calc-label">Видео о том как правильно снять мерки</div>
                    <iframe class="table-size__calc-iframe" src="https://www.youtube.com/embed/D1-iP7rtnIg?si=_evLVmbNr8Jv26cG" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                </v-col>
            </v-row>
            <div class="table-size_wrapper">
                <table class="table-size">
                    <thead>
                        <tr><th colspan="14">Соответствие размеров европейской и английской чашки бюстгальтеров</th></tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="first">Европейская шкала (EU) </td>
                            <td>D</td>
                            <td>E</td>
                            <td>F</td>
                            <td>G</td>
                            <td>H</td>
                            <td>I</td>
                            <td>J</td>
                            <td>K</td>
                            <td>L</td>
                            <td>M</td>
                            <td>N</td>
                            <td>O</td>
                            <td>P</td>
                        </tr>
                        <tr>
                            <td class="first">Английская шкала (UK)</td>
                            <td>D</td>
                            <td>DD</td>
                            <td>E</td>
                            <td>F</td>
                            <td>FF</td>
                            <td>G</td>
                            <td>GG</td>
                            <td>H</td>
                            <td>HH</td>
                            <td>J</td>
                            <td>JJ</td>
                            <td>K</td>
                            <td>KK</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div class="table-size__text">
                Определить размер трусиков намного проще, чем размер бюстгальтера - сантиметровой лентой измеряем обхват бедер (по наиболее выступающим точкам бедер и ягодиц). При измерении лента должна ложиться параллельно полу и обязательно быть натянутой.
            </div>
            <div class="table-size_wrapper">
                <table class="table-size">
                    <thead>
                        <tr><th colspan="14">Как определить размер трусиков?</th></tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="first">Размер на сайте </td>
                            <td>D</td>
                            <td>E</td>
                            <td>F</td>
                            <td>G</td>
                            <td>H</td>
                            <td>I</td>
                            <td>J</td>
                            <td>K</td>
                            <td>L</td>
                            <td>M</td>
                            <td>N</td>
                            <td>O</td>
                            <td>P</td>
                        </tr>
                        <tr>
                            <td class="first">Российский размер</td>
                            <td>D</td>
                            <td>DD</td>
                            <td>E</td>
                            <td>F</td>
                            <td>FF</td>
                            <td>G</td>
                            <td>GG</td>
                            <td>H</td>
                            <td>HH</td>
                            <td>J</td>
                            <td>JJ</td>
                            <td>K</td>
                            <td>KK</td>
                        </tr>
                        <tr>
                            <td class="first">Америанский размер</td>
                            <td>D</td>
                            <td>E</td>
                            <td>F</td>
                            <td>G</td>
                            <td>H</td>
                            <td>I</td>
                            <td>J</td>
                            <td>K</td>
                            <td>L</td>
                            <td>M</td>
                            <td>N</td>
                            <td>O</td>
                            <td>P</td>
                        </tr>
                        <tr>
                            <td class="first">Охват бедер (см)</td>
                            <td>D</td>
                            <td>DD</td>
                            <td>E</td>
                            <td>F</td>
                            <td>FF</td>
                            <td>G</td>
                            <td>GG</td>
                            <td>H</td>
                            <td>HH</td>
                            <td>J</td>
                            <td>JJ</td>
                            <td>K</td>
                            <td>135-140</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </v-container>
    </section>
</template>

<script>
import Breadcrumbs from '../components/UI/Breadcrumbs.vue';
import MainBtn from '../components/UI/MainBtn.vue';
import Input from '../components/UI/Input.vue';

export default {
    components: {
        Input,
        Breadcrumbs,
        MainBtn
    },
    data() {
        return {};
    },
};
</script>

<style lang="scss">
.table-size-section
{
    padding: 2.4rem 0 15rem 0;
}
.table-size__calc-wrap
{
    margin-bottom: 9rem;
}
.table-size__label
{
    margin-bottom: 3.7rem;
    color: $primary;
    font-size: 4rem;
    font-weight: 600;
    line-height: 1.2em;
    letter-spacing: -0.4px;
}
.table-size__calc-label
{
    margin-bottom: 2.4rem;
    color: #827F7D;
    font-size: 2rem;
    font-weight: 500;
    line-height: 1.4em;
    letter-spacing: -0.28px;
}
.table-size__calc
{
    margin-bottom: 2.9rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 3.2rem;
    &-item
    {
        img
        {
            margin-bottom: 1.5rem;
            width: 100%;
            height: 20rem;
        }
    }
    &-iframe
    {
        width: 100%;
        height: 35rem;
    }
}
table.table-size
{
    width: 100%;
    margin-bottom: 5.3rem;
    border-collapse: collapse;
    th,td
    {
        padding: 1.9rem 2.38rem;
        border: 1px solid var(--foundation-black-g-50, #E9E9E9);
        font-size: 1.4rem;
        font-weight: 500;
        line-height: 1.4em;
        letter-spacing: -0.056px;
    }
    
    th
    {
        color: $primary;
        font-size: 1.8rem;
        font-weight: 700;
        line-height: 1.55em;
        letter-spacing: -0.216px;
        text-align: left;
    }
    td
    {
        text-align: center;
        width: 8.13rem;
        height: 5.81rem;
    }
    td.first
    {
        text-align: left;
        width: 25.3rem;
    }
    &__text
    {
        margin-bottom: 6.2rem;
        color: $primary;
        font-size: 1.6rem;
        line-height: 1.5em;
        letter-spacing: -0.128px;
    }
}
.table-size__text
{
    margin-bottom: 4.8rem;
    color: $primary;
    font-size: 1.6rem;
    line-height: 1.5em;
    letter-spacing: -0.128px;
}
@media (max-width: 960px) {
    .table-size-section
    {
        padding: 32px 0 48px 0;
    }
    .table-size__calc-wrap
    {
        .btn
        {
            padding-top: 16px !important;
            padding-bottom: 16px !important;
        }
    }
    .table-size__calc-label
    {
        margin-bottom: 16px;
        font-size: 16px;
    }
    .table-size__calc
    {
        margin-bottom: 44px;
        grid-template-columns: repeat(1, 1fr);
        row-gap: 16px;
        &-item
        {
            img
            {
                margin-bottom: 32px;
                height: 172px;
            }
        }
        &-iframe
        {
            margin-bottom: 44px;
            height: 210px;
        }
    }
    .table-size_wrapper
    {
        overflow-x: scroll;
    }
    table.table-size
    {
        margin-bottom: 24px;
        th,td
        {
            padding: 22px 27px;
            font-size: 14px;
        }
        th
        {
            padding: 10px 8px;
            font-size: 16px;
        }
        td
        {
            width: 64px;
            min-height: 64px;
            height: auto;
        }
        td.first
        {
            padding: 22px 8px;
            width: 100%;
            display: flex;
        }
    }
    .table-size__text
    {
        margin-bottom: 48px;
        font-size: 14px;
    }
    
}
</style>