<template >
    <section class="main-section" id="mainBanner">
        <v-container>
            <div class="main-banner">
                <picture>
                    <source media="(max-width: 960px)" srcset="/img/banner-mobile.jpg" />
                    <source media="(min-width: 960px)" srcset="/img/banner.jpg" />
                    <img src="/img/banner.jpg" class="main-banner__background"/>
                </picture>
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
                <a target="_blank" class="btn btn-primary main-banner__btn" href="https://wa.me/79177471561?text=Здравствуйте%20у%20меня%20вопрос:">
                    <img src="/svg/whatsapp.svg" alt="">
                    Написать в What’s App
                </a>
            </div>
        </v-container>
    </section>
</template>
<script>
import MainBtn from '../UI/MainBtn.vue';
export default {
    components: {
        MainBtn
    }
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
@media (max-width: 960px) {
    .main-banner
    {
        padding: 48px 20px;
        height: 530px;
        flex-direction: column;
        &__offset
        {
            display: none;
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
            width: 100%;
            margin-left: 0;
            &-label
            {
                margin-bottom: 16px;
                font-size: 32px;
            }
            &-text
            {
                margin-bottom: 24px;
                width: 100%;
                font-size: 16px;
            }
            
        }
        .btn
        {
            width: 100%;
            flex-shrink: 0;
        }
    }
    
}
@media (max-width: 960px) {
    .main-banner
    {
        padding: 32px 20px;
    }
}
</style>