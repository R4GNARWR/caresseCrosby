<template>
    <div class="article-card" v-if="cardData">
        <div class="article-card__img">
            <img :src="'https://static.ccrosby.ru/blogs/'+ cardData.img" :+alt="cardData.title">
        </div>
        <div class="article-card__body">
            <div class="article-card__body-label">
                {{cardData.title}}
            </div>
        </div>
        <router-link :to="'/articles/' + cardId" class="link"></router-link>
    </div>
</template>
<script>
export default {
    props: {
        cardData: [Object, Array],
        cardId: null,
    }
}
</script>
<style lang="scss">
.article-card
{
    position: relative;
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
        display: flex;
        flex-direction: column;
        &-label
        {
            color: $primary;
            font-size: 3.2rem;
            font-weight: 600;
            line-height: 1.4em;
            letter-spacing: -0.576px;
        }
    }
}
@media (max-width: 960px) {
    .articles-list .v-row
    {
        margin-bottom: 32px;
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