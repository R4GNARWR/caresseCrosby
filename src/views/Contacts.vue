<template>
    <section class="contacts">
        <v-container>
            <div class="breadcrumbs contacts-breadcrumbs">
                <router-link class="breadcrumbs-item" to="/">Главная</router-link>
                <div class="breadcrumbs-divider">/</div>
                <router-link class="breadcrumbs-item active" :to="this.$route.path">Контакты</router-link>
            </div>
            <div class="contacts-label">Контакты</div>
            <div class="contacts-props">
                <div class="contacts-props__item">
                    <img src="/svg/phone.svg" alt="">
                    <div class="contacts-props__item-content">
                        <a href="tel:79177471561:">+7 (917) 747-15-61</a>
                        <span>Пн. – Вс.: с 9:00 до 18:00</span>
                    </div>
                </div>
                <div class="contacts-props__item">
                    <img src="/svg/email.svg" alt="">
                    <div class="contacts-props__item-content">
                        <a href="mailto:ccrosbyru@yandex.ru">ccrosbyru@yandex.ru</a>
                    </div>
                </div>
                <div class="contacts-props__item">
                    <img src="/svg/placemark.svg" alt="">
                    <div class="contacts-props__item-content">
                        г. Уфа, ул. Менделеева 156/1
                    </div>
                </div>
            </div>
        </v-container>
        <div class="contacts-map">
            <YandexMap
            :coordinates="mapLatLng"
            :controls="[]"
            :zoom="16">
            <YandexMarker
            :coordinates="mapLatLng"
            marker-id="123123"
            :properties="{
                iconLayout: squareLayout,
            }"
            />
        </YandexMap>
    </div>
</section>
</template>
<script>
import Breadcrumbs from '../components/UI/Breadcrumbs.vue';
import MainBtn from '../components/UI/MainBtn.vue';
import { loadYmap } from 'vue-yandex-maps'

export default {
    components: {
        Breadcrumbs,
        MainBtn,
    },
    data() {
        return {
            mapLatLng: [54.722170,56.022624],
            squareLayout: null,
        };
    },
    async mounted() {
    await loadYmap();
    this.squareLayout = ymaps.templateLayoutFactory.createClass('<div class="placemark_layout_container"><div class="square_layout">$</div></div>')
  }
};
</script>

<style lang="scss">
.contacts
{
    padding: 2.4rem 0 0 0;
}
.contacts-breadcrumbs
{
    margin-bottom: 4rem;
}
.contacts-label
{
    margin-bottom: 8rem;
    color: $primary;
    font-size: 4rem;
    font-weight: 600;
    line-height: 1.2em;
    letter-spacing: -0.4px;
}
.contacts-props
{
    margin-bottom: 9rem;
    display: flex;
    column-gap: 14rem;
    flex-wrap: wrap;
    &__item
    {
        display: flex;
        column-gap: 1.6rem;
        img
        {
            width: 2rem;
            height: 2rem;
            object-fit: contain;
        }
        &-content
        {

            display: flex;
            flex-direction: column;
            row-gap: .8rem;
            color: $primary;
            font-size: 1.6rem;
            font-weight: 500;
            line-height: 1.5em;
            letter-spacing: -0.128px;
            a
            {
                text-decoration: none;
                color: inherit;
            }
            span
            {
                color: lighten($color: $primary, $amount: 50%);
                font-size: 1.4rem;
            }
        }
    }
}
.contacts-map
{
    height: 57rem;
    width: 100%;
    .yandex-container
    {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
}
@media (max-width: 960px)
{
    .contacts
    {
        padding: 32px 0 0 0;
    }
    .contacts-label
    {
        margin-bottom: 32px;
        font-size: 32px;
        font-weight: 500;
    }
    .contacts-props
    {
        margin-bottom: 32px;
        flex-direction: column;
        column-gap: 0;
        row-gap: 32px;
        &__item
        {
            column-gap: 16px;
            img
            {
                width: 20px;
                height: 20px;
            }
            &-content
            {
                row-gap: 8px;
                font-size: 16px;
                span
                {
                    font-size: 14px;
                }
            }
        }
    }
}
@media (max-width: 600px) {
    .contacts-map
    {
        height: 380px;
    }
}

</style>