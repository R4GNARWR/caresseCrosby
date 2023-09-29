<template >
    <section class="main-section main-article" id="mainArticles">
        <v-container>
            <div class="section-head ">
                <div class="section-label">
                    Статьи
                </div>
            </div>
            <swiper-container
            class="swiper-articles"
            loop="true"
            slides-per-view="1"
            :navigation="{
                nextEl: '.main-article__navigation-next',
                prevEl: '.main-article__navigation-prev',
            }"
            >
            <swiper-slide class="swiper-slide" v-for="(item, index) in 4" :key="index">
                <v-row>
                    <v-col lg="5" cols="12">
                        <div class="main-article__img">
                            <img src="/img/article1.jpg" alt="">
                        </div>
                    </v-col>
                    <v-col lg="6" cols="12">
                        <div class="main-article__content">
                            <div class="main-article__content-label">
                                Caresse Crosby —  это женщина, которая изобрела и запатентовала первый бюстгальтер {{ index }}
                            </div>
                            <div class="main-article__content-text">
                                «Всегда да» - было девизом изобретательницы, гедонистки и писательницы Каресс Кроссби. <br> <br>Кросби изобрела современный бюстгальтер, основала новаторский печатный станок и всемирную организацию мира, а в 1935 году устроила самую легендарную вечеринку в Нью-Йорке — бал сюрреалистов.
                            </div>
                        </div>
                    </v-col>
                </v-row>
            </swiper-slide>
            
        </swiper-container>
        <div class="main-article__swiper-nav">
            <div class="swiper-button swiper-button-prev main-article__navigation-prev">
                <img src="/svg/swiper-prev.svg" alt="">
            </div>
            <div class="swiper-button swiper-button-next main-article__navigation-next">
                <img src="/svg/swiper-next.svg" alt="">
            </div>
        </div>
    </v-container>  
</section>
</template>
<script>
export default {
    
}
</script>
<style lang="scss">
.swiper-articles
{
    margin-top: 7.4rem;
}
.main-article
{
    .v-container
    {
        position: relative;
    }
    
    &__img
    {
        height: 56rem;
        width: 100%;
        img
        {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    &__content
    {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        &-label
        {
            margin-bottom: 3.5rem;
            color: $primary;
            font-family: 'Inter';
            font-size: 2.8rem;
            line-height: 1.75em;
            letter-spacing: -0.273px;
        }
        &-text
        {
            width: 90%;
            color: #707070;
            font-family: 'Inter';
            font-size: 2rem;
            line-height: 1.8em;
            letter-spacing: -0.2px;
        }
    }
    &__swiper-nav
    {
        position: absolute;
        right: 0;
        bottom: 0;
        display: flex;
        column-gap: 1.4rem;
        z-index: 10;
    }
}
@media (max-width: 600px) {
    .main-article
    {
        &__img
        {
            height: 327px;
            margin-bottom: 24px;
        }
        &__content
        {
            &-label
            {
                margin-bottom: 24px;
                font-size: 24px;
            }
            &-text
            {
                font-size: 17px;
            }
        }
        &__swiper-nav
        {
            margin-top: 32px; 
            justify-content: center;
            position: static;
            column-gap: 14px;
        }
    }

}

</style>