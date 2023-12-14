<template>
    <div class="article-card" v-if="cardData">
        <div class="article-card__img">
            <img :src="'https://static.ccrosby.ru/blogs/'+cardData.img" :alt="cardData.title">
        </div>
        <div class="article-card__body">
            <div class="article-card__body-label" v-html="cardData.title"></div>
            <router-link :to="'/articles/'+cardId" class="article-card__more">Читать статью</router-link>
        </div>

        <router-link :to="'/articles/'+cardId" class="link"></router-link>
    </div>
</template>
<script>
export default {
    props: {
        cardData: null,
        cardId: null,
    }
}
</script>
<style lang="scss">
.article-card
{
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 6px 20px 0px rgba(63, 36, 5, 0.04);
    padding: 2rem;
    &__img
    {
        margin-bottom: 3.1rem;
        height: 33rem;
        width: 100%;
        img
        {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    &__body
    {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        &-label
        {
            margin-bottom: 2rem;
            color: $primary;
            font-size: 3.2rem;
            font-weight: 600;
            line-height: 1.4em;
            letter-spacing: -0.576px;
        }
    }
}
.article-card__more
{
    margin-top: auto;
    font-size: 1.8rem;
    color: #867B6E;
    text-decoration: none;
}
@media (max-width: 960px) {
    .article-card
    {
        box-shadow: none;
        padding: 0 0 10px 0;
        border-bottom: 1px solid #867B6E;
    }

    .articles-list .v-row
    {
        margin-bottom: 32px;
    }
    .article-card__body-label
    {
        margin-bottom: 25px;
    }
    .article-card__more
    {
        font-size: 14px;
    }
}
@media (max-width: 600px) {
    .article-card
    {
        &__img
        {
            margin-bottom: 24px;
            height: 253px;
        }
        &__body
        {
            &-label
            {
                font-size: 24px;
            }
        }
    }
}
</style>