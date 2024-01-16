<template>
    <section class="contacts">
        <v-container>
            <div class="breadcrumbs contacts-breadcrumbs">
                <router-link class="breadcrumbs-item" to="/">Главная</router-link>
                <div class="breadcrumbs-divider">/</div>
                <a class="breadcrumbs-item active">Контакты</a>
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
        <div class="contacts-map" @mousedown="checkMouse" @touchstart="checkMouse">
            <yandex-map :settings="settings"
            :coords="coords"
            :controls="[]"
            :zoom="16">>
            <ymap-marker 
            marker-id="123" 
            :coords="coords"
            :icon="markerIcon"
            />
        </yandex-map>
        
    </div>
</section>
</template>

<script>
import Breadcrumbs from '../components/UI/Breadcrumbs.vue';
import MainBtn from '../components/UI/MainBtn.vue';
import { yandexMap, ymapMarker } from 'vue-yandex-maps';

export default {
    components: {
        Breadcrumbs,
        MainBtn,
        yandexMap,
        ymapMarker
    },
    data() {
        return {
            settings: {
                apiKey: '453f5758-6290-4de4-bae1-d645fb102e5c',
                lang: 'ru_RU',
                coordorder: 'latlong',
                enterprise: false,
                debug: false,
                version: '2.1'
            },
            coords: [54.722170,56.022624],
            markerIcon: {
                layout: 'default#imageWithContent',
                imageHref: '',
                imageSize: [56, 62],
                imageOffset: [0, 0],
                content: 'г. Уфа, ул. Менделеева 156/1',
                contentOffset: [-28, -31],  
                contentLayout: '<div class="placemark"><img src="/svg/map-placemark.svg"><div class="placemark-content">$[properties.iconContent]</div></div>'
            }
        };
    },
    methods: {
        to2Gis() {
            window.open('https://go.2gis.com/1xqkl', '_blank').focus()
        },
        checkMouse() {
            let drag = false
            const mouseDrag = () => {
                drag = true
            }
            const mouseLift = () => {
                if(!drag) {
                    this.to2Gis()
                }
                window.removeEventListener("mousemove", mouseDrag);
                window.removeEventListener("touchmove", mouseDrag);
                window.removeEventListener("mouseup", mouseLift);
                window.removeEventListener("touchend", mouseLift);
            }
            window.addEventListener("mousemove", mouseDrag);
            window.addEventListener("touchmove", mouseDrag);
            window.addEventListener("mouseup", mouseLift);
            window.addEventListener("touchend", mouseLift);
        }
    },
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
.ymaps-2-1-79-ground-pane {
    -webkit-filter: grayscale(100%);
}
.ymaps-2-1-79-copyrights-pane
{
    display: none;
}
.contacts-map
{
    height: 57rem;
    width: 100%;
    .ymap-container
    {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    
    
}
.placemark
{
    width: 56px;
    height: 62px;
    position: relative;
    img
    {
        width: 125%;
        height: 125%;
        object-fit: contain;
    }
    .placemark-content
    {
        position: absolute;
        top: 50%;
        left: calc(100% + 8px);
        transform: translateY(-50%);
        border: 1px solid #E9E9E9;
        background: #FFFEFD;
        box-shadow: 0px 6px 16px 0px rgba(120, 123, 156, 0.08);
        padding: 10px;
        color: #000;
        font-size: 16px;
        font-weight: 600;
        letter-spacing: -0.16px;
        white-space: nowrap;
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