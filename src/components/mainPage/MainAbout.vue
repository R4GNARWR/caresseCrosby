<template >
<section class="main-section main-about" id="mainAbout">
    <v-container>
        <v-row>
            <v-col sm="5" cols="12">
                <div class="main-about__left">
                    <div class="main-about__left-name">
                        О бренде
                    </div>
                    <div class="main-about__left-label">
                        Caresse Crosby
                    </div>
                    <div class="main-about__left-img">
                        <img src="/img/about1.jpg" alt="">
                        <img class="d-md-block d-none" src="/img/about2.jpg" alt="">
                    </div>
                </div>
            </v-col>
            <v-col sm="7" cols="12">
                <div class="main-about__right">
                    <div class="main-about__right-img">
                        <img class="d-md-none d-block" src="/img/about2.jpg" alt="">
                    </div>
                    <div class="main-about__right-label">
                        Caresse Crosby — это магазин удобного белья. Тщательно, кропотливо и вдумчиво мы подбираем товары.
                    </div>
                    <div class="main-about__right-text">
                        Процесс подбора белья тоже может быть приятным. Caresse Crosby — это салон брафиттинга. Поэтому мы точно знаем, что у женщины нет недостатков. Есть неподходящее белье. Эту задачу мы легко решим. И сделаем это красиво.
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
    .main-about__left
    {
        display: flex;
        flex-direction: column;
        height: 100%;
        &-name
        {
            color: $primary;
            font-size: 1.6rem;
            line-height: 1.5em;
            letter-spacing: -0.16px;
        }
        &-label
        {
            margin-bottom: 6.5rem;
            color: $primary;
            font-family: 'Inter';
            font-size: 6.4rem;
            font-weight: 500;
            line-height: 1.13em;
            letter-spacing: -0.64px;
        }
        &-img
        {
            margin-top: auto;
            width: 100%;
            height: auto;
            img
            {
                width: 100%;
                aspect-ratio: 1/1.02;
                object-fit: cover;
            }
        }
    }
    .main-about__right
    {
        display: flex;
        flex-direction: column;
        height: 100%;
        &-img
        {
            margin-left: auto;
            margin-bottom: 7.5rem;
            width: 57.25%;
            height: auto;
            img
            {
                width: 100%;
                aspect-ratio: 1/0.75;
                object-fit: cover;
            }
        }
        &-label
        {
            margin-top: auto;
            margin-bottom: 4.1rem;
            color: $primary;
            font-family: 'Inter';
            font-size: 2.8rem;
            line-height: 1.75em; 
            letter-spacing: -0.273px;
        }
        &-text
        {
            color: #707070;
            font-family: 'Inter';
            font-size: 2rem;
            line-height: 1.8em;
            letter-spacing: -0.2px;
        }
    }
    @media (max-width: 600px) {
        .main-about__left
        {
            &-name
            {
                font-size: 14px;
            }
            &-label
            {
                font-size: 40px;
            }
            &-img
            {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                column-gap: 16px;
                img
                {
                    width: 100%;
                    aspect-ratio: 1/1;
                }
            }
        }
        .main-about__right
        {
            &-img
            {
                margin: 0;
            }
            &-label
            {
                margin-top: initial;
                margin-bottom: 24px;
                font-size: 24px;
            }
            &-text
            {
                font-size: 17px;
            }
        }
    }
</style>