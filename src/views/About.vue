<template>
    <section class="about">
        <div class="about-image">
            <img src="/img/about-back.png" alt="">
        </div>
        <v-container>
            <v-row>
                <v-col md="8" offset-md="2">
                    <div class="about-label">
                        О нас
                    </div>
                    <div class="about-text">
                        Caresse Crosby- это магазин удобного белья. Тщательно, кропотливо и вдумчиво мы подбираем товары, чтобы все женщины почувствовали легкость, удовольствие и беззаботно отправились проживать свою счастливую жизнь. <br>
                        Процесс подбора белья тоже может быть приятным. <br>
                        <br>
                        Caresse Crosby- это салон брафиттинга. Поэтому мы точно знаем, что у женщины нет недостатков. Есть неподходящее белье. Эту задачу мы легко решим. И сделаем это красиво. <br>
                        <br>
                        Удобное белье существует!
                    </div>
                    <DetailLinks></DetailLinks>
                </v-col>
            </v-row>
            
        </v-container>
    </section>
</template>
<script>
import Breadcrumbs from '../components/UI/Breadcrumbs.vue';
import MainBtn from '../components/UI/MainBtn.vue';
import DetailLinks from '../components/UI/DetailLinks.vue';

export default {
    components: {
        Breadcrumbs,
        MainBtn,
        DetailLinks
    },
    data() {
        return {};
    },
    head() {
        return {
            title: "О нас | Caresse Crosby",
            meta: [
                { content: "О нас | Caresse Crosby" }
            ]
        }
    },
};
</script>

<style lang="scss">
.about
{
    padding-bottom: 14.5rem;
}
.about-image
{
    width: 100%;
    height: 480px;
    margin-bottom: 44px;
    img
    {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}
.about-label
{
    margin-bottom: 4.4rem;
    color: $primary;
    font-size: 4.8rem;
    font-weight: 600;
    line-height: 1.15em;
    letter-spacing: -0.864px;
}
.about-text
{
    color: $primary;
    font-size: 2rem;
    font-weight: 400;
    line-height: 1.8em;
    letter-spacing: -0.32px;
}
@media (max-width: 960px) {
    .about-image
    {
        height: 260px;
    }
    .about-label
    {
        margin-bottom: 16px;
        font-size: 32px;
    }
    .about-text
    {
        margin-bottom: 32px;
        font-size: 14px;
    }
    .about
    {
        padding-bottom: 60px;
    }
}
@media (max-width: 960px) {
    .about-image
    {
        height: 165px;
    }
}
</style>