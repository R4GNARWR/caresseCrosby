<template>
    <section class="photo-album">
        <v-container>
            <Breadcrumbs></Breadcrumbs>
            <div class="photo-album__label">
                Фотоальбомы
            </div>
            <v-row class="photo-album__row">
                <v-col md="4" sm="6" cols="12" v-for="(item, index) in 8" :key="index">
                    <div class="photo-album__item">
                        <Fancybox
                        class="photo-album__item-photos"
                        :options="{
                            Carousel: {
                            infinite: true,
                            },
                        }">
                            <img src="/img/album1.png" data-fancybox="gallery" alt="">
                            <img src="/img/album2.png" data-fancybox="gallery" alt="">
                            <img src="/img/album3.png" data-fancybox="gallery" alt="">
                            <img src="/img/album4.png" data-fancybox="gallery" alt="">
                            <img src="/img/album3.png" class="d-none" data-fancybox="gallery" alt="">
                            <img src="/img/album4.png" class="d-none" data-fancybox="gallery" alt="">
                        </Fancybox>
                        <div class="photo-album__item-label">
                            Магазин
                            <span>17 фото</span>
                        </div>
                    </div>
                </v-col>
                
            </v-row>
        </v-container>
    </section>
</template>

<script>
import Breadcrumbs from '../components/UI/Breadcrumbs.vue';
import MainBtn from '../components/UI/MainBtn.vue';
export default {
    components: {
        Breadcrumbs,
        MainBtn
    },
    data() {
        return {};
    },

};
</script>

<style lang="scss">
.photo-album__row
{
    row-gap: 6.4rem;
}
.photo-album
{
    padding: 2.4rem 0 12rem 0;
    &__label
    {
        margin-bottom: 5.6rem;
        color: $primary;
        font-size: 4rem;
        font-weight: 600;
        line-height: 1.2em;
        letter-spacing: -0.4px;
    }
}
.photo-album__item
{
    &-photos
    {
        margin-bottom: 1.8rem;
        height: 42rem;
        display: grid;
        grid-template-columns: repeat(2,1fr);
        grid-template-rows: repeat(2, 1fr);
        img
        {
            width: 100%;
            height: 100%;
            object-fit: cover;
            cursor: pointer;
        }
    }
    &-label
    {
        display: flex;
        align-items: flex-end;
        column-gap: 1.6rem;
        color: $primary;
        font-size: 2.8rem;
        font-weight: 500;
        line-height: 1.2em;
        letter-spacing: -0.504px;
        span
        {
            color:#A6A5A3;
            font-size: 1.8rem;
            font-weight: 500;
            line-height: 1.55em;
            letter-spacing: -0.216px;
        }
    }
}
@media (max-width: 960px) {
    .photo-album__row
    {
        row-gap: 32px;
    }
    .photo-album
    {
        padding: 32px 0 48px 0;
        &__label
        {
            margin-bottom: 36px;
            font-size: 32px;
        }
    }
    .photo-album__item
    {
        &-photos
        {
            margin-bottom: 18px;
            height: 260px;
        }
        &-label
        {
            width: 100%;
            font-size: 24px;
            justify-content: space-between;
            align-items: flex-end;
            span
            {
                font-size: 14px;
            }
        }
    }
}
@media (max-width: 600px) {
    .photo-album__item
    {
        &-photos
        {
            height: 320px;
        }
    }
}
</style>