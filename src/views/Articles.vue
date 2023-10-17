<template>
    <section class="articles">
        <v-container>
            <Breadcrumbs></Breadcrumbs>
            <div class="articles-main">
                <v-row>
                    <v-col md="6" cols="12">
                        <div class="articles-main__img">
                            <img src="/img/article.jpg" alt="">
                        </div>
                    </v-col>
                    <v-col md="6" cols="12">
                        <div class="articles-main__content">
                            <div class="articles-main__content-label">
                                Большая грудь — большая ответственность
                            </div>
                            <div class="articles-main__content-text">
                                Большая грудь - это, прежде всего, ответственный подход к своему здоровью, и даже эмоциональному состоянию. Девушке с большой грудью рекомендуется уделять особое
                            </div>
                            <router-link to="articles/1" class="articles-main__content-more">Читать статью</router-link>
                        </div>
                    </v-col>
                </v-row>
            </div>
            <div class="articles-list">
                <v-row>
                    <v-col md="4" sm="6" cols="12" v-for="(item, index) in blogs" :key="index">
                        <ArticleCard :cardData="item" :cardId="index"></ArticleCard>
                    </v-col>
                </v-row>
                <MainBtn class-name="btn-white outline mx-auto d-lg-none d-block">Показать еще</MainBtn>
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
    .articles
    {
        padding-bottom: 60px;
    }
    .articles-main
    {
        margin-bottom: 32px;
        padding-top: 32px;
        padding-bottom: 32px;
        &__img
        {
        }
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