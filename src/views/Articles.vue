<template>
    <section class="articles">
        <v-container>
            <div class="breadcrumbs text-page__breadcrumbs">
                <router-link class="breadcrumbs-item" to="/">Главная</router-link>
                <div class="breadcrumbs-divider">/</div>
                <a class="breadcrumbs-item active" >Статьи</a>
            </div>
            <div class="articles-main" v-if="blogs && blogs.length > 0">
                <v-row>
                    <v-col md="6" cols="12">
                        <div class="articles-main__img">
                            <img :src="'https://static.ccrosby.ru/blogs/' + blogs[0].img" alt="">
                        </div>
                    </v-col>
                    <v-col md="6" cols="12">
                        <div class="articles-main__content" >
                            <div class="articles-main__content-label">
                                {{ blogs[0].title }}
                            </div>
                            <div class="articles-main__content-text">
                                {{ JSON.parse(blogs[0].json_string)[0].content }}
                            </div>
                            <router-link to="articles/0" class="articles-main__content-more">Читать статью</router-link>
                        </div>
                    </v-col>
                </v-row>
            </div>
            <div class="articles-list">
                <v-row>
                    <v-col cols="12">
                        <div class="articles-more__label">
                            Другие статьи
                        </div>
                    </v-col>
                    
                    <v-col md="4" sm="6" cols="12" v-for="(item, index) in blogs.slice(1, blogs.length)" :key="index" v-if="blogs">
                        <ArticleCard :cardData="item" :cardId="index+1" v-if="item"></ArticleCard>
                    </v-col>
                </v-row>
                <!-- <MainBtn class-name="btn-white outline mx-auto d-lg-none d-block">Показать еще</MainBtn> -->
            </div>
        </v-container>
    </section>
</template>

<script>
import {mapState} from "vuex";

import ArticleCard from '../components/UI/ArticleCard.vue';
import Breadcrumbs from '../components/UI/Breadcrumbs.vue';
import MainBtn from '../components/UI/MainBtn.vue';
export default {
    components: {
        Breadcrumbs,
        ArticleCard,
        MainBtn
    },
    data() {
        return {
            actual_blog: null,
            blogs: [],
        }
    },
    computed:{
        ...mapState(['user_info',])
    },
    beforeCreate() {
        this.$API.getBlogs().then(value => {
            if (value.data.success) this.blogs = value.data.blogs;
        })
    },
    created() {
        if (this.$route.params.blogId) {
            if (this.blogs && this.blogs.length>0) this.actual_blog=this.blogs[this.$route.params.blogId];
            else this.$API.getBlogs().then(value => {
                if (value.data.success) this.blogs = value.data.blogs;
                this.actual_blog=this.blogs[this.$route.params.blogId];
            })
        }
    },
};
</script>

<style lang="scss">
.articles
{
    padding-top: 2.4rem;
    padding-bottom: 17rem;
}
.articles-more__label
{
    margin-bottom: -3rem;
    color: #27231E;
    font-size: 3.4rem;
    font-weight: 600;
    line-height: 1.2em;
    letter-spacing: -0.4px;
}

.articles-main
{
    margin-bottom: 6.4rem;
    padding-top: 4.8rem;
    padding-bottom: 4.8rem;
    border-bottom: 1px solid #E9E9E9;
    &__img
    {
        height: 33rem;
        width: 100%;
        img
        {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: top left;
        }
    }
    &__content
    {
        height: 100%;
        display: flex;
        flex-direction: column;
        &-label
        {
            margin-bottom: 2.4rem;
            color: $primary;
            font-size: 4.8rem;
            font-weight: 600;
            line-height: 1.15em;
            letter-spacing: -0.864px;
        }
        &-text
        {
            color:#827F7D;
            font-size: 2rem;
            line-height: 1.6em;
            letter-spacing: -0.32px;
            display: -webkit-box;
            -webkit-line-clamp: 4; // количество строк
            -webkit-box-orient: vertical;
            overflow: hidden;
        }
        &-more
        {
            margin-top: auto;
            color: #867B6E;
            font-size: 2rem;
            font-weight: 600;
            line-height: 1.2em;
            letter-spacing: -0.24px;
            text-decoration: none;
        }
    }
}
.articles-list
{
    .v-row
    {
        row-gap: 6.4rem;
    }
}
@media (max-width: 960px) {
    .articles-more__label
    {
        font-size: 28px;
        font-weight: 600;
    }
    .articles
    {
        padding-bottom: 60px;
    }
    .articles-main
    {
        margin-bottom: 32px;
        padding-top: 32px;
        padding-bottom: 32px;
        &__content
        {
            &-label
            {
                margin-bottom: 16px;
                font-size: 24px;
            }
            &-text
            {
                font-size: 14px;
            }
            &-more
            {
                margin-top: 24px;
                font-size: 14px;
            }
        }
    }
}
@media (max-width: 960px) {
    .articles-main
    {
        &__img
        {
            height: 165px;
        }
    }
}
</style>