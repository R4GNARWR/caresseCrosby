<template >
    <section class="main-section" id="main-props">
        <v-container>
            <v-row>
                <v-col md="3" sm="6" cols="12">
                    <a href="https://wa.me/79177471561?text=Здравствуйте%20у%20меня%20вопрос:" target="_blank" class="main-props__card">
                        <img src="/svg/props1.svg" alt="">
                        <div class="main-props__card-content">
                            <div class="main-props__card-content-label">Сопровождение брафиттера</div>
                            <div class="main-props__card-content-text">Брафиттер с вами на всех этапах подбора белья онлайн</div>
                        </div>
                    </a>
                </v-col>
                <v-col md="3" sm="6" cols="12">
                    <div class="main-props__card">
                        <img src="/svg/props2.svg" alt="">
                        <div class="main-props__card-content">
                            <div class="main-props__card-content-label">Бесплатная доставка</div>
                            <div class="main-props__card-content-text">При заказе от суммы 10 000 руб. доставка за наш счет</div>
                        </div>
                    </div>
                </v-col>
                <v-col md="3" sm="6" cols="12">
                    <router-link to="/delivery" class="main-props__card">
                        <img src="/svg/props3.svg" alt="">
                        <div class="main-props__card-content">
                            <div class="main-props__card-content-label">Возврат и обмен</div>
                            <div class="main-props__card-content-text">Белье и купальники, купленные онлайн, подлежат обмену и возврату в течение 14 дней.</div>
                        </div>
                    </router-link>
                </v-col>
                <v-col md="3" sm="6" cols="12">
                    <div class="main-props__card">
                        <img src="/svg/props4.svg" alt="">
                        <div class="main-props__card-content">
                            <div class="main-props__card-content-label">Большой размерный и модельный ряд</div>
                            <div class="main-props__card-content-text">150 размеров бюстгальтеров, 10 размеров трусиков, большие размеры купальников. </div>
                        </div>
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </section>
</template>
<script>
export default {
    
}
</script>
<style lang="scss">
.main-props__card
{
    display: flex;
    column-gap: 2.4rem;
    align-items: center;
    text-decoration:none;
    img
    {
        width: 3.2rem;
        height: 3.2rem;
        object-fit: contain;
    }
    &-content
    {
        &-label
        {
            margin-bottom: .4rem;
            color: $primary;
            font-size: 1.8rem;
            font-weight: 500;
        }
        &-text
        {
            color: #9C9C9C;
            font-size: 1.4rem;
        }
    }
}
@media (max-width: 960px) {
    .main-props__card
    {
        
        column-gap: 24px;
        img
        {
            width: 32px;
            height: 32px;
        }
        &-content
        {
            &-label
            {
                font-size: 16px;
            }
            &-text
            {
                font-size: 13px;
            }
        }
    }
}
@media (max-width: 600px) {
    
}
</style>