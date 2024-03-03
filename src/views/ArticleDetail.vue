<template>
    <section class="articles-detail" v-if="blog">
        <div class="articles-detail__img">
            <img v-if="blog.img" :src="'https://static.ccrosby.ru/blogs/' + blog.img" alt="">
        </div>
        <v-container>
            <div class="row">
                <v-col md="8" offset-md="2">
                    <div class="articles-detail__content">
                        <router-link class="btn-back" to="/articles">
                            <img src="/svg/arrow.svg" alt="">
                            Назад
                        </router-link>
                        <div class="articles-detail__content-label">
                            {{ blog.title }}
                        </div>

                        <div class="articles-detail__content-text"
                            v-for="item in JSON.parse(blog.json_string.replace(/(\\r)*\\n\\n/g, '<br>'))"
                            v-if="blog.json_string">
                            <div class="img" v-if="item.type === 'img'">
                                <img v-if="item.content.split(',').length === 1" :alt="blog.title"
                                    :src="'https://static.ccrosby.ru/blogs/' + item.content">
                                <swiper-container v-else class="swiper" :slidesPerView="1" :loop="true"
                                    :spaceBetween="28" :pagination="true">
                                    <swiper-slide class="swiper-slide img" v-for="img in item.content.split(',')">
                                        <img :alt="blog.title" :src="'https://static.ccrosby.ru/blogs/' + img">
                                    </swiper-slide>

                                </swiper-container>
                            </div>
                            <p v-if="item.type === 'text'" v-html="item.content">
                            </p>
                        </div>
                        <button class="ms-auto btn btn-danger" @click="deleteBlog(blog.title)"
                            v-if="user_info && user_info.role === 3">Удалить статью</button>
                        <DetailLinks></DetailLinks>
                    </div>
                </v-col>
            </div>
        </v-container>
    </section>
</template>

<script>
import DetailLinks from '../components/UI/DetailLinks.vue';
import { register } from 'swiper/element/bundle';
import { mapMutations, mapState } from "vuex";
import store from "../store/store";

export default {
    components: {
        DetailLinks
    },
    data() {
        return {
            blogs: [],
            blog: [],
        };
    },
    methods: {
        deleteBlog(title) {
            this.$API.delThisBlog(title).then(response => {
                if (response && response.status) {
                    this.$route.go(-1)
                }
            })
        }
    },
    computed: {
        ...mapState(['user_info', 'blogsList'])
    },
    beforeCreate() {
        if (!this.blogsList) {
            this.$API.getBlogs().then(value => {
                if (value.data.success) {
                    this.blogs = value.data.blogs;
                    store.commit('setBlogs', value.data.blogs)
                }
            })
        } else {
            this.blogs = this.blogsList
        }

    },
    created() {
        if (this.$route.params.id) {
            if (this.blogs && this.blogs.length > 0) {
                this.blog = this.blogs[this.$route.params.id];
            }
            else {
                if (!this.blogsList) {
                    this.$API.getBlogs().then(value => {
                        if (value.data.success) {
                            this.blogs = value.data.blogs;
                            this.blog = this.blogs[this.$route.params.id];
                            store.commit('setBlogs', value.data.blogs)
                        }
                    })
                } else {
                    this.blogs = this.blogsList;
                    this.blog = this.blogs[this.$route.params.id];
                }

            }
        }
        register()
    },
};
</script>

<style lang="scss">
.articles-detail {
    padding-bottom: 14.5rem;

    &__img {
        margin-bottom: 3.2rem;
        height: 40rem;
        width: 100%;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
        }
    }

    &__content {
        .btn-back {
            cursor: pointer;
            margin-bottom: 4rem;
        }

        &-label {
            margin-bottom: 5.5rem;
            color: $primary;
            font-size: 4.8rem;
            font-weight: 600;
            line-height: 1.15em;
            letter-spacing: -0.864px;
        }

        &-text {
            width: 100%;
            margin-bottom: 6.4rem;
            color: #27231F;
            font-size: 2rem;
            line-height: 1.8em;
            letter-spacing: -0.32px;

        }
    }

}

.articles-detail__content-text {
    p {
        margin-bottom: 2rem;
    }

    .img {
        margin-bottom: 2rem;
        height: 46rem;
        width: 100%;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .swiper-slide.img {
        width: 60rem;

        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }
}

@media (max-width: 960px) {
    .articles-detail {
        padding-bottom: 60px;

        &__img {
            margin-bottom: 24px;
            height: 260px;
        }

        &__content {
            .btn-back {
                margin-bottom: 24px;
                font-size: 14px;

                img {
                    width: 16px;
                    height: 16px;
                }
            }

            &-label {
                margin-bottom: 16px;
                font-size: 24px;
            }

            &-text {
                font-size: 14px;
            }
        }
    }
}

@media (max-width: 600px) {
    .articles-detail {
        &__img {
            height: 165px;
        }
    }
}
</style>
