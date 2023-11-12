<template>
    <div class="modal-sizes">
        <button class="close-modal" @click="closeFancybox()">
            <img src="/svg/close.svg" alt="">
        </button>
        <div class="modal-sizes__inner">
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
        </div>
    </div>
</template>
<script>
import { Fancybox } from '@fancyapps/ui';

export default {
    methods: {
        closeFancybox(){
            Fancybox.close()
        },
    }
}
</script>
<style lang="scss">
.modal-sizes
{
    display: none;
    position: relative;
    border-radius: 4rem;
    background-color: #FFFFFF;
    max-width: 80vw !important;
    max-height: 90vh !important;
    overflow: hidden;
    &.fancybox__content
    {
        padding: 6rem 4rem 4rem 4rem !important;
    }
    
}
.modal-sizes__inner
{
    overflow-y: scroll;
    max-height: 100%;
    scrollbar-width: none;
}
.close-modal
{
    width: 4rem;
    height: 4rem;
}
@media (max-width: 960px) {
    .modal-sizes.fancybox__content
    {
        padding: 60px 20px 20px 20px !important;
        .close-modal
        {
            right: 20px;
            top: 24px;
        }
    }
}
</style>