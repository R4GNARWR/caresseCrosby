<template>
    <section class="articles-detail">
        <div class="articles-detail__img">
            <img src="/img/album3.png" alt="">
        </div>
        <v-container>
            <div class="row">
                <v-col md="8" offset-md="2">
                    <div class="articles-detail__content">
                        <div class="btn-back" @click="this.$router.go(-1)">
                            <img src="/svg/arrow.svg" alt="" >
                            Назад
                        </div>
                        <div class="articles-main__content-label">
                            Большая грудь — большая ответственность
                        </div>
                        <div class="articles-main__content-text">
                            Большая грудь - это, прежде всего, ответственный подход к своему здоровью, и даже эмоциональному состоянию. Девушке с большой грудью рекомендуется уделять особое внимание состоянию груди и обращаться к врачу-маммологу раз в год для профилактики. <br>
                            <br>
                            Поддерживать форму груди помогут занятие спортом, укрепление мышц спины и правильное белье, которое перераспределяет нагрузку на спину и плечи. Эмоциональное состояние поддерживать сложнее всего, ведь обладательнице большого бюста, с подросткового возраста приходится выслушивать в свой адрес множество некорректных замечаний и получать не самые этичные вопросы. <br><br>
                            Так у девушек рождается множество комплексов, неуверенность в себе, в своем теле и собственной красоте. Можете делиться фразами, которые слышали в свой адрес 
                            в комментариях. <br><br>
                            После такого информационного насилия, конечно, приходится восстанавливать эмоциональное состояние с психологами и другими специалистами. Большая грудь - это большая ответственность. <br><br>
                            Всегда нужно следить за собой внешне и внутренне и ни в коем случае не поддаваться на провокации со стороны. Сейчас, когда профессиональное белье становится все более доступным, девушкам легче принять свою красоту и, наконец, полюбить себя. Причем это касается не только подростков, но и девушек и женщин всех возрастов. <br><br>
                            Правильно подобранное белье дарит уверенность и повышает самооценку. Мы всегда готовы вам помочь не только с правильным подбором бюстгальтера, но и словом. <br>
                            Вы самые красивые, вы достойны всего самого лучшего!
                        </div>
                        <DetailLinks></DetailLinks>
                    </div>
                </v-col>
            </div>
        </v-container>
    </section>
</template>

<script>
import DetailLinks from '../components/UI/DetailLinks.vue';

export default {
    components: {
        DetailLinks
    },
    data() {
        return {};
    },
};
</script>

<style lang="scss">
.articles-detail
{
    padding-bottom: 14.5rem;
    &__img
    {
        margin-bottom: 3.2rem;
        height: 40rem;
        width: 100%;
        img
        {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: top;
        }
    }
    &__content
    {
        .btn-back
        {
            cursor: pointer;
            margin-bottom: 4rem;
        }
        &-label
        {
            margin-bottom: 5.5rem;
            color: $primary;
            font-size: 4.8rem;
            font-weight: 600;
            line-height: 1.15em;
            letter-spacing: -0.864px;
        }
        &-text
        {
            margin-bottom: 6.4rem;
            color: $primary;
            font-size: 4.8rem;
            font-weight: 600;
            line-height: 1.15em;
            letter-spacing: -0.864px;
        }
    } 
}
@media (max-width: 960px) {
    .articles-detail
    {
        padding-bottom: 60px;
        &__img
        {
            margin-bottom: 24px;
            height: 260px;
        }
        &__content
        {
            .btn-back
            {
                margin-bottom: 24px;
                font-size: 14px;
                img
                {
                    width: 16px;
                    height: 16px;
                }
            }
            &-label
            {
                margin-bottom: 16px;
                font-size: 24px;
            }
            &-text
            {
                font-size: 14px;
            }
        } 
    }
}
@media (max-width: 600px) {
    .articles-detail
    {
        &__img
        {
            height: 165px;
        }
    }
}
</style>