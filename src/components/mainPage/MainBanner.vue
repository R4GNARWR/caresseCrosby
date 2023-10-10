<template >
    <section class="main-section" id="mainBanner">
        <v-container>
            <div class="main-banner">
                <img src="/img/banner.jpg" class="main-banner__background" alt="">
                <div class="main-banner__offset">

                </div>
                <div class="main-banner__content">
                    <div class="main-banner__content-label">
                        Получите консультацию
                    </div>
                    <div class="main-banner__content-text">
                        Определим правильный размер, подберем идеальное белье и ответим на все Ваши вопросы!
                    </div>
                </div>
                <MainBtn class="btn btn-primary main-banner__btn">
                    <img src="/svg/whatapp.svg" alt="">
                    Написать в What’s App
                </MainBtn>
            </div>
        </v-container>
    </section>
</template>
<script>
import MainBtn from '../UI/MainBtn.vue';
export default {
    
}
</script>
<style lang="scss">
.main-banner
{
    position: relative;
    padding: 3.2rem 5.6rem;
    height: 20rem;
    display: flex;
    align-items: center;
    
    &__offset
    {
        width: 15%;
        flex: 0 0 auto;
    }
    &__background
    {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        z-index: -1;
    }
    &__content
    {
        width: 60rem;
        flex: 0 0 auto;
        margin-left: auto;
        &-label
        {
            margin-bottom: .8rem;
            color: $primary;
            font-family: 'Inter';
            font-size: 4rem;
            font-weight: 600;
            line-height: 1.6em;
            letter-spacing: -0.4px;
        }
        &-text
        {
            width: 75%;
            color: #878775;
            font-family: 'Inter';
            font-size: 1.8rem;
            line-height: 1.77em; /* 177.778% */
            letter-spacing: -0.18px;
        }

    }
    .btn
    {
        flex-shrink: 0;
    }
}
@media (max-width: 1200px) {
    #mainBanner
    {
        display: none;
    }
}
</style>