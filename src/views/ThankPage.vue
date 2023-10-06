<template>
    <section class="thank-page" :style="{minHeight: 'calc(100vh - '+ paddingTop + 'px)'}">
        <v-container>
            <div class="thank-page__content">
                <img src="/svg/logo-heart.svg" alt="">
                <div class="thank-page__content-label">
                    Благодарим вас за заказ!
                </div>
                <div class="thank-page__content-text">
                    В ближайшее время с вами свяжется менеджер  для уточнения деталей по заказу
                </div>
                <div class="thank-page__content-contacts">
                    <a href="">+7 (917) 747-15-61</a>
                    <span>
                        Время работы с 9:00 до 18:00 <br>
                        по Московскому времени
                    </span>
                </div>
                <div class="thank-page__content-end">
                    Спасибо, что выбрали  Caresse Crosby!
                </div>
                <MainLink class-name="btn-gold" destitation="/">
                    Вернутся на главную
                </MainLink>
            </div>
            
            <div class="thank-page__pattern thank-page__pattern-1">
                <img src="/svg/pattern.svg" alt="">
            </div>
            <div class="thank-page__pattern thank-page__pattern-2">
                <img src="/svg/pattern.svg" alt="">
            </div>
        </v-container>
    </section>
</template>

<script>
import { useSettingsStore } from '../store/settingsStore';
import Input from '../components/UI/Input.vue';
import MainBtn from '../components/UI/MainBtn.vue';
import MainLink from '../components/UI/MainLink.vue';

export default {
    components: {
        Input,
        MainBtn,
        MainLink
    },
    computed: {
        paddingTop(){return useSettingsStore().getHeaderPadding},
    },
    data() {
        return {};
    },
};
</script>

<style lang="scss">
.thank-page
{
    position: relative;
    display: flex;
    align-items: center;
    background-color: #FFFEFC;
}
.thank-page__pattern
{
    position: absolute;
    top: 0;
    width:92rem;
    height: 68rem;
    z-index: 0;
    img
    {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
    &-1
    {
        left: 0;
        transform: translateX(-50%);
    }
    &-2
    {
        right: 0;
        transform: translateX(50%);
    }
}
.thank-page__content
{
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 1;
    img
    {
        margin-bottom: 4rem;
        width: 6.8rem;
        height: 6.2rem;
        object-fit: contain;
    }
    &-label
    {
        margin-bottom: 1.6rem;
        color: $primary;
        font-size: 4rem;
        font-weight: 600;
        line-height: 1.2em;
        letter-spacing: -0.4px;
        text-align: center;
    }
    &-text
    {
        margin-bottom: 4rem;
        color:#827F7D;
        text-align: center;
        font-size: 1.7rem;
        line-height: 1.4em; 
        letter-spacing: -0.17px;
    }
    &-contacts
    {
        margin-bottom: 4rem;
        display: flex;
        align-items: center;
        column-gap: 2.4rem;
        a
        {
            color: #27231F;
            font-size: 2.4rem;
            font-weight: 500;
            line-height: 1.33em;
            letter-spacing: -0.384px;
            text-decoration: none;
        }
        span
        {
            color: #827F7D;
            font-size: 1.4rem;
            line-height: 1.4em;
            letter-spacing: -0.056px;
        }
    }
    &-end
    {
        margin-bottom: 4rem;
        color: #27231F;
        font-size: 1.7rem;
        line-height: 1.4em;
        letter-spacing: -0.17px;
    }
}

@media (max-width: 600px) {
    .thank-page__pattern
    {
        width: 532.356px;
        height: 400.966px;

        &-1
        {
            left: 0;
            transform: translateX(-65%);
        }
        &-2
        {
            display: none;
        }
    }
    .thank-page__content
    {
        img
        {
            margin-bottom: 24px;
            width: 68px;
            height: 62px;
        }
        &-label
        {
            margin-bottom: 40px;
            font-size: 32px;
        }
        &-text
        {
            margin-bottom: 24px;
            font-size: 14px;
        }
        &-contacts
        {
            flex-direction: column;
            margin-bottom: 24px;
            column-gap: 0;
            row-gap: 8px;
            a
            {
                font-size: 20px;
            }
            span
            {
                font-size: 12px;
            }
        }
        &-end
        {
            margin-bottom: 24px;
            font-size: 14px;
        }
    }
}
</style>