<template >
    <section class="main-section" id="main-props">
        <v-container>
            <v-row>
                <v-col lg="3">
                    <div class="main-props__card">
                        <img src="/svg/props1.svg" alt="">
                        <div class="main-props__card-content">
                            <div class="main-props__card-content-label">Подберем точный размер</div>
                            <div class="main-props__card-content-text">Максимально точно подбираем размер под каждого клиента</div>
                        </div>
                    </div>
                </v-col>
                <v-col lg="3">
                    <div class="main-props__card">
                        <img src="/svg/props2.svg" alt="">
                        <div class="main-props__card-content">
                            <div class="main-props__card-content-label">Бесплатная доставка</div>
                            <div class="main-props__card-content-text">При заказе от суммы 10 000 руб. доставка за наш счет</div>
                        </div>
                    </div>
                </v-col>
                <v-col lg="3">
                    <div class="main-props__card">
                        <img src="/svg/props3.svg" alt="">
                        <div class="main-props__card-content">
                            <div class="main-props__card-content-label">Индивидуальный подход</div>
                            <div class="main-props__card-content-text">Удовлетворяем потребности каждого клиента</div>
                        </div>
                    </div>
                </v-col>
                <v-col lg="3">
                    <div class="main-props__card">
                        <img src="/svg/props4.svg" alt="">
                        <div class="main-props__card-content">
                            <div class="main-props__card-content-label">Разнообразие выбора</div>
                            <div class="main-props__card-content-text">У нас широкий ассортимент различных моделей и размеров </div>
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
</style>