<template>
    <section class="table-size-section">
        <v-container>
            <div class="breadcrumbs">
                <router-link class="breadcrumbs-item" to="/">Главная</router-link>
                <div class="breadcrumbs-divider">/</div>
                <a class="breadcrumbs-item active">Таблица размеров</a>
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
                                <Input :placeholder="'Обхват груди, см'" v-model="b2" ></Input>
                            </div>
                            <div class="table-size__calc-item">
                                <img src="/img/calc2.png" alt="" class="d-lg-block d-none">
                                <Input :placeholder="'Обхват под грудью, см'" v-model="b1"></Input>
                            </div>
                        </div>
                        <MainBtn class="btn-primary w-100" @click="showSize()" :disabled="readyToShow">Рассчитать размер</MainBtn>
                        <div class="table-size__calc-result" v-if="size_b && show">
                            Ваш размер: {{ size_b }}
                            <MainBtn @click="to_size_models" class="btn btn-white outline" >Показать модели</MainBtn>
                        </div>
                        <div class="table-size__calc-result" v-if="!size_b && show">
                            Невозможно расчитать размер, укажите правильные размеры
                        </div>
                    </div>
                </v-col>
                <v-col md="5" cols="12">
                    <div class="table-size__calc-label">Видео о том как правильно снять мерки</div>
                    <iframe class="table-size__calc-iframe" src="https://www.youtube.com/embed/D1-iP7rtnIg?si=я" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                </v-col>
                <v-col cols="12" v-if="products && products.length > 0  && showProducts">
                    <SwiperCards :slidesArray="products" name="Модели" v-if="products && products.length >0"></SwiperCards>
                </v-col>
                <v-col cols="12" v-else-if="showProducts">
                    <div class="table-size__calc-error">
                        {{status}}
                    </div>

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
                            <td>8</td>
                            <td>10</td>
                            <td>12</td>
                            <td>14</td>
                            <td>16</td>
                            <td>18</td>
                            <td>20</td>
                            <td>22</td>
                            <td>24</td>
                            <td>26</td>
                        </tr>
                        <tr>
                            <td class="first">Российский размер</td>
                            <td>40-42</td>
                            <td>42-44</td>
                            <td>44-46</td>
                            <td>46-48</td>
                            <td>48-50</td>
                            <td>50-52</td>
                            <td>52-54</td>
                            <td>54-56</td>
                            <td>56-58</td>
                            <td>58-60</td>
                        </tr>
                        <tr>
                            <td class="first">Америанский размер</td>
                            <td>XS</td>
                            <td>S</td>
                            <td>M</td>
                            <td>L</td>
                            <td>XL</td>
                            <td>XXL</td>
                            <td>XXXl</td>
                            <td>4Xl</td>
                            <td>5Xl</td>
                            <td>6XL</td>
                        </tr>
                        <tr>
                            <td class="first">Охват бедер (см)</td>
                            <td>90-95</td>
                            <td>95-100</td>
                            <td>100-105</td>
                            <td>105-110</td>
                            <td>110-115</td>
                            <td>115-120</td>
                            <td>120-125</td>
                            <td>125-130</td>
                            <td>130-135</td>
                            <td>135-95</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div class="table-size_wrapper">
                <table class="table-size small">
                    <thead>
                        <tr><th colspan="16">Размеры корректирующего белья</th></tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="first">Вес</td>
                            <td>50 кг</td>
                            <td>55 кг</td>
                            <td>60 кг</td>
                            <td>65 кг</td>
                            <td>70 кг</td>
                            <td>75 кг</td>
                            <td>80 кг</td>
                            <td>85 кг</td>
                            <td>90 кг</td>
                            <td>95 кг</td>
                            <td>100 кг</td>
                            <td>105 кг</td>
                            <td>110 кг</td>
                            <td>115 кг</td>
                        </tr>
                        <tr>
                            <td class="first">Рост<br>152 см</td>
                            <td>XS</td>
                            <td>S-M</td>
                            <td>S-M</td>
                            <td>L-XL</td>
                            <td>L-XL</td>
                            <td>XXL</td>
                            <td>XXL</td>
                            <td>XXL</td>
                            <td>XXL</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td class="first">Рост<br>155 см</td>
                            <td>XS</td>
                            <td>S-M</td>
                            <td>S-M</td>
                            <td>S-M</td>
                            <td>L-XL</td>
                            <td>L-XL</td>
                            <td>XXL</td>
                            <td>XXL</td>
                            <td>XXL</td>
                            <td>XXL</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td class="first">Рост<br>157 см</td>
                            <td>XS</td>
                            <td>S-M</td>
                            <td>S-M</td>
                            <td>S-M</td>
                            <td>L-XL</td>
                            <td>L-XL</td>
                            <td>L-XL</td>
                            <td>XXL</td>
                            <td>XXL</td>
                            <td>XXL</td>
                            <td>XXL</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td class="first">Рост<br>160 см</td>
                            <td>XS</td>
                            <td>S-M</td>
                            <td>S-M</td>
                            <td>S-M</td>
                            <td>S-M</td>
                            <td>L-XL</td>
                            <td>L-XL</td>
                            <td>L-XL</td>
                            <td>XXL</td>
                            <td>XXL</td>
                            <td>XXL</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td class="first">Рост<br>163 см</td>
                            <td>XS</td>
                            <td>S-M</td>
                            <td>S-M</td>
                            <td>S-M</td>
                            <td>S-M</td>
                            <td>L-XL</td>
                            <td>L-XL</td>
                            <td>L-XL</td>
                            <td>XXL</td>
                            <td>XXL</td>
                            <td>XXL</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td class="first">Рост<br>165 см</td>
                            <td>XS</td>
                            <td>S-M</td>
                            <td>S-M</td>
                            <td>S-M</td>
                            <td>S-M</td>
                            <td>L-XL</td>
                            <td>L-XL</td>
                            <td>L-XL</td>
                            <td>XXL</td>
                            <td>XXL</td>
                            <td>XXL</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td class="first">Рост<br>168 см</td>
                            <td>XS</td>
                            <td>S-M</td>
                            <td>S-M</td>
                            <td>S-M</td>
                            <td>S-M</td>
                            <td>L-XL</td>
                            <td>L-XL</td>
                            <td>L-XL</td>
                            <td>XXL</td>
                            <td>XXL</td>
                            <td>XXL</td>
                            <td>XXL</td>
                            <td>XXL</td>
                            <td>XXL</td>
                        </tr>
                        <tr>
                            <td class="first">Рост<br>170 см</td>
                            <td>XS</td>
                            <td>S-M</td>
                            <td>S-M</td>
                            <td>S-M</td>
                            <td>S-M</td>
                            <td>S-M</td>
                            <td>L-XL</td>
                            <td>L-XL</td>
                            <td>L-XL</td>
                            <td>XXL</td>
                            <td>XXL</td>
                            <td>XXL</td>
                            <td>XXL</td>
                            <td>XXL</td>
                        </tr>
                        <tr>
                            <td class="first">Рост<br>173 см</td>
                            <td>XS</td>
                            <td>S-M</td>
                            <td>S-M</td>
                            <td>S-M</td>
                            <td>S-M</td>
                            <td>S-M</td>
                            <td>L-XL</td>
                            <td>L-XL</td>
                            <td>L-XL</td>
                            <td>XXL</td>
                            <td>XXL</td>
                            <td>XXL</td>
                            <td>XXL</td>
                            <td>XXL</td>
                        </tr>
                        <tr>
                            <td class="first">Рост<br>175 см</td>
                            <td>XS</td>
                            <td>S-M</td>
                            <td>S-M</td>
                            <td>S-M</td>
                            <td>S-M</td>
                            <td>S-M</td>
                            <td>L-XL</td>
                            <td>L-XL</td>
                            <td>L-XL</td>
                            <td>XXL</td>
                            <td>XXL</td>
                            <td>XXL</td>
                            <td>XXL</td>
                            <td>XXL</td>
                        </tr>
                        <tr>
                            <td class="first">Рост<br>178 см</td>
                            <td>XS</td>
                            <td>S-M</td>
                            <td>S-M</td>
                            <td>S-M</td>
                            <td>S-M</td>
                            <td>S-M</td>
                            <td>L-XL</td>
                            <td>L-XL</td>
                            <td>L-XL</td>
                            <td>XXL</td>
                            <td>XXL</td>
                            <td>XXL</td>
                            <td>XXL</td>
                            <td>XXL</td>
                        </tr>
                        <tr>
                            <td class="first">Рост<br>183 см</td>
                            <td>-</td>
                            <td>S-M</td>
                            <td>S-M</td>
                            <td>S-M</td>
                            <td>S-M</td>
                            <td>S-M</td>
                            <td>S-M</td>
                            <td>L-XL</td>
                            <td>L-XL</td>
                            <td>L-XL</td>
                            <td>XXL</td>
                            <td>XXL</td>
                            <td>XXL</td>
                            <td>XXL</td>
                        </tr>
                        <tr>
                            <td class="first">Рост<br>185 см</td>
                            <td>-</td>
                            <td>-</td>
                            <td>S-M</td>
                            <td>S-M</td>
                            <td>S-M</td>
                            <td>S-M</td>
                            <td>S-M</td>
                            <td>L-XL</td>
                            <td>L-XL</td>
                            <td>L-XL</td>
                            <td>XXL</td>
                            <td>XXL</td>
                            <td>XXL</td>
                            <td>XXL</td>
                        </tr>
                        <tr>
                            <td class="first">Рост<br>188 см</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>S-M</td>
                            <td>S-M</td>
                            <td>S-M</td>
                            <td>L-XL</td>
                            <td>L-XL</td>
                            <td>L-XL</td>
                            <td>XXL</td>
                            <td>XXL</td>
                            <td>XXL</td>
                            <td>XXL</td>
                        </tr>
                        
                    </tbody>
                </table>
            </div>
        </v-container>
    </section>
</template>

<script>
import search from "../api/search";
import {mapState} from "vuex";

import MainBtn from '../components/UI/MainBtn.vue';
import Input from '../components/UI/Input.vue';
import MainLink from '../components/UI/MainLink.vue';
import SwiperCards from "../components/SwiperCards.vue";

export default {
    components: {
        Input,
        MainBtn,
        MainLink,
        SwiperCards
    },
    data() {
        return {
            b1:null,
            b2:null,
            show: false,
            showProducts: false,
            products: null,
            filter:{
                "brand": {
                    "attributeId":1,
                    "attributeValueId":'',
                    "value":""
                },
                "sizes": {
                    "attributeId":2,
                    "attributeValueId":'',
                    "value":""
                },
                "colors": {
                    "attributeId":6,
                    "attributeValueId":'',
                    "value":""
                }
            },
            status: 'По вашему запросу не удалось найти товары. Попробуйте изменить параметры поиска.',
        };
    },
    computed:{
        readyToShow() {
            if(this.b1 && this.b2) {
                return false
            } else {
                return true
            }
        },
        size_b(){
            let arr=['A','B','C','D','DD','E','F','FF','G','GG','H','HH','J','JJ','K']
            if (Math.round((this.b1-8)/5)*5 && arr[Math.round((this.b2-this.b1)/2.54)-1]) return (Math.round((this.b1-8)/5)*5).toString()+arr[Math.round((this.b2-this.b1)/2.54)-1].toString();
            else return null;
        },
        ...mapState(['sizes_search'])
    },
    methods: {
        showSize() {
            this.show = true
        },
        to_size_models(){
            let size = this.sizes_search[0].find(element => element.value === this.size_b)
            if(!size) {
                size = this.sizes_search[1].find(element => element.value === this.size_b)
            }
            if(size) {
                this.filter["sizes"].attributeValueId = size.attributeValueId;
                this.filter["sizes"].value = size.value;
                this.to_search();
                this.showProducts = true;
            } else {
                this.showProducts = true;
            }
        },
        ...search
    },
    watch: {
        b1: function() {
            this.show = false;
            this.showProducts = false;
            this.products = null
            this.productsSearched = false
        },
        b2: function() {
            this.show = false;
            this.showProducts = false;
            this.products = null
            this.productsSearched = false
        },
    },
    created() {
        this.for_created()
    }
};
</script>

<style lang="scss">
.table-size-section
{
    padding: 2.4rem 0 15rem 0;
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
.table-size__calc-error
{
    padding: 5rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.8rem;
    text-align: center;
    text-transform: uppercase;
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
        text-wrap: nowrap;
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
    &.small
    {
        td
        {
            width: 8.13rem;
            height: 5.81rem;
        }
        td.first
        {
            width: 13.3rem;
        }
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
.table-size__calc-result
{
    display: flex;
    margin-top: 4rem;
    text-align: center;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-size: 2.4rem;
    line-height: 1.33em;
    .btn
    {
        width: 45%;
    }
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
            width: 64px;
            min-height: 64px;
        }
        th
        {
            padding: 10px 8px;
            font-size: 16px;
        }
        td
        {
            height: auto;
        }
        td.first
        {
            padding: 22px 8px;
        }
    }
    .table-size__text
    {
        margin-bottom: 48px;
        font-size: 14px;
    }
}
@media (max-width: 960px) {
    .table-size__calc-error
    {
        font-size: 24px;
    }
}
</style>
