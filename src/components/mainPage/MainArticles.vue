<template >
    <section class="main-section main-article" id="mainArticles">
        <v-container>
            <div class="section-head ">
                <div class="section-label">
                    Статьи
                </div>
                <router-link to="/articles" class="main-article__head-link">Все статьи</router-link>
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
            <swiper-slide class="swiper-slide" v-for="(item, index) in articles" :key="index" v-if="articles">
                <v-row>
                    <v-col lg="5" cols="12">
                        <div class="main-article__img">
                            <img :src="'https://static.ccrosby.ru/blogs/' + item.img" alt="">
                        </div>
                    </v-col>
                    <v-col lg="6" cols="12">
                        <div class="main-article__content">
                            <router-link class="main-article__content-label" :to="'/articles/' + index">
                                {{ item.title}}
                            </router-link>
                            <router-link class="main-article__content-text" :to="'/articles/' + index">
                                <div class="wrapper" v-for="(item, index) in JSON.parse(item.json_string)" :key="index">
                                    <span v-if="item.type === 'text'" >
                                        {{ item.content }}
                                    </span>
                                    <!-- <img :src="'https://static.ccrosby.ru/blogs/' + item" alt="" v-for="(item, index) in item.content" :key="index" v-if="item.type === 'img'"> -->
                                </div>
                            </router-link>
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
        <router-link class="swiper-cards__more d-md-none d-block text-center" to="/articles">Все статьи</router-link>
    </v-container>  
</section>
</template>
<script>
export default {
    data() {
        return {
            articles: []
        }
    },
    created() {
        this.$API.getBlogs().then(value => {
            if (value.data.success)
            this.articles = value.data.blogs;
        })
    },
}
</script>
<style lang="scss">
.swiper-articles
{
    margin-top: 7.4rem;
}
.main-article__head-link
{
    color: #867259;
    font-size: 1.8rem;
    line-height: 1.33em;
    letter-spacing: -0.18px;
    text-decoration: none;
}
.main-article
{
    .swiper-cards__more
    {
        justify-content: center;
    }
    .section-head
    {
        align-items: center;
    }
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
            text-decoration: none;
        }
        &-text
        {
            width: 90%;
            max-height: calc(8* 3.6rem);
            color: #707070;
            font-family: 'Inter';
            font-size: 2rem;
            line-height: 1.8em;
            letter-spacing: -0.2px;
            text-decoration: none;
            .wrapper span
            {
                display: none;
                -webkit-line-clamp: 8;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }
            .wrapper img
            {
                display: none;
            }
            .wrapper span:nth-child(1)
            {
                display: -webkit-box;
            }
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
@media (max-width: 960px) {
    .main-article__head-link
    {
        font-size: 14px;
    }
    .main-article
    {
        &__content
        {
            &-label
            {
                margin-bottom: 24px;
                font-size: 24px;
            }
            &-text
            {
                max-height: calc(3 *44px);
                font-size: 17px;
                line-height: 1.5em;
            }
        }
        &__swiper-nav
        {
            column-gap: 10px;
            .swiper-button
            {
                width: 32px;
                height: 32px;
            }
        }
    }
    .swiper-articles
    {
        padding-bottom: 48px;
    }
}
@media (max-width: 600px) {
    .main-article__head-link
    {
        display: none;
    }
    #mainArticles
    {
        padding: 32px 0 100px 0 !important;
    }
    .main-article
    {

        &__img
        {
            height: 327px;
            margin-bottom: 24px;
        }
        &__content
        {
            max-width: calc(100% - 24px);
            &-label
            {
                margin-bottom: 24px;
                font-size: 24px;
            }
            &-text
            {
                max-height: calc(6 *44px);
                font-size: 17px;
                line-height: 1.5em;
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