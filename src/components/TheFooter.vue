<template >
    <footer>
        <v-container>
            <v-row>
                <v-col md="5" cols="12">
                    <div class="footer-left">
                        <div class="footer-left__logo">
                            <img src="/svg/logo.svg" alt="">
                        </div>
                        <!-- <div class="footer-left__text">
                            Подпишитесь на рассылку, чтобы всегда быть в курсе наших новостей
                        </div> -->
                        <div class="footer-left__info d-xl-flex d-none">
                            <div class="footer-left__info-conf">
                                <a target="_blank" href="/pdf/pers_data.pdf">ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ</a>
                            </div>
                            <div class="footer-left__info-offer">
                                <a target="_blank" href="/pdf/oferta.pdf">ОФЕРТА</a>
                            </div>
                            <div class="footer-left__info-copy">
                                <a href="">© ИП Король {{currentYear}}</a>
                            </div>
                        </div>
                    </div>
                </v-col>
                <v-col sm="4" md="2" cols="12" offset-md="1">
                    <div class="footer-links">
                        <router-link to="/catalogAll" class="footer-links__label">КАТАЛОГ</router-link>
                        <ul class="footer-links__list">
                            <!-- <li><router-link to="/#hits">Хиты продаж</router-link></li> -->
                            <li><router-link to="/catalog/24402">Бюстгалтеры</router-link></li>
                            <li><router-link to="/catalog/24403">Трусики</router-link></li>
                            <li><router-link to="/catalog/25035">Средства ухода</router-link></li>
                            <li><router-link to="/catalog/search/?query=купальник">Купальники</router-link></li>
                            <li><router-link to="/giftCard">Подарочные сертификаты</router-link></li>
                            <li><router-link to="/catalog/24449">Аксессуары</router-link></li>
                        </ul>
                    </div>
                </v-col>
                <v-col sm="4" md="2" cols="12" >
                    <div class="footer-links">
                        <router-link to="/about" class="footer-links__label">О МАГАЗИНЕ</router-link>
                        <ul class="footer-links__list">
                            <li><router-link to="/about">О нас</router-link></li>
                            <li><router-link to="/photoAlbum">Фотогалерея</router-link></li>
                            <li><router-link to="/articles">Статьи</router-link></li>
                        </ul>
                    </div>
                </v-col>
                <v-col sm="4" md="2" cols="12" >
                    <div class="footer-links">
                        <router-link to="/delivery" class="footer-links__label">ПОЛЬЗОВАТЕЛЯМ</router-link>
                        <ul class="footer-links__list">
                            <li><router-link to="/delivery">Доставка и оплата</router-link></li>
                            <!-- <li><a href="">Помощь</a></li> -->
                            <li><router-link to="/contacts">Контакты</router-link></li>
                        </ul>
                        <div class="footer-additional-info d-lg-flex d-none">
                            <div class="footer-socials">
                                <a target="_blank" href="https://wa.me/79177471561?text=Здравствуйте%20у%20меня%20вопрос:" @click="clickWhatsapp()"><img src="/svg/whatsapp.svg" alt=""></a>
                                <a target="_blank" href="https://vk.com/ccrosby"><img src="/svg/vk.svg" alt=""></a>
                                <a target="_blank" href="https://t.me/+79177471561"><img src="/svg/telegram.svg" alt=""></a>
                            </div>

                            <div class="footer-ip">
                                ИП Король Елена Сергеевна <br> ИНН: 744408493724 <br> ОГРН: 321028000158115
                            </div>
                        </div>
                    </div>
                </v-col>
                <v-col>
                    <div class="footer-additional-info d-lg-none d-flex">
                        <div class="footer-socials">
                            <a target="_blank" href="https://wa.me/79177471561?text=Здравствуйте%20у%20меня%20вопрос:"><img src="/svg/whatsapp.svg" alt=""></a>
                            <a target="_blank" href="https://vk.com/ccrosby"><img src="/svg/vk.svg" alt=""></a>
                            <a target="_blank" href="https://t.me/+79177471561"><img src="/svg/telegram.svg" alt=""></a>
                        </div>

                        <div class="footer-ip">
                            ИП Король Елена Сергеевна <br> ИНН: 744408493724 <br> ОГРН: 321028000158115
                        </div>
                    </div>
                </v-col>

                <v-col class="d-xl-none d-block" cols="12">
                    <div class="footer-left__info">
                            <div class="footer-left__info-conf">
                                <a target="_blank" href="/pdf/pers_data.pdf">ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ</a>
                            </div>
                            <div class="footer-left__info-offer">
                                <a target="_blank" href="/pdf/oferta.pdf">ОФЕРТА</a>
                            </div>
                            <div class="footer-left__info-copy">
                                <a href="">© ИП Король {{currentYear}}</a>
                            </div>
                        </div>
                </v-col>

            </v-row>
        </v-container>
    </footer>
</template>
<script>
export default {
    computed: {
        currentYear() {
            return new Date().getFullYear()
        }
    },
    methods: {
        clickWhatsapp() {
            sendMetrika('click_whatsapp', 'reachGoal')
        },
    },
}
</script>
<style lang="scss">
footer
{
    background: $primary;
    padding: 5.5rem 0 7.2rem 0;
}
.footer
{
    &-left
    {
        height: 100%;
        display: flex;
        flex-direction: column;
        &__logo
        {
            margin-bottom: 5.6rem;
            width: 20rem;
            height: 6rem;
            img
            {
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
        }
        &__text
        {
            margin-bottom: 7.5rem;
            padding-bottom: 1.8rem;
            width: 100%;
            color: rgba(255, 255, 255, .6);
            font-family: 'Inter';
            font-size: 1.4rem;
            line-height: 110%;
            letter-spacing: -0.14px;
            border-bottom: 1px solid rgba(255, 255, 255, .3);
        }
        &__info
        {
            margin-top: auto;
            display: flex;
            justify-content: space-between;
            color: #FFF;
            font-family: 'Inter';
            font-size: 1.4rem;
            line-height: 110%;
            letter-spacing: -0.14px;
            text-transform: uppercase;
            a
            {
                text-decoration: none;
                color: inherit;
            }
        }
    }
    &-links
    {
        &__label
        {
            display: block;
            margin-bottom: 2.4rem;
            color: #FFF;
            font-family: 'Inter';
            font-size: 1.8rem;
            line-height: 110%;
            letter-spacing: -0.18px; 
            text-transform: uppercase;
            text-decoration: none;
        }
        &__list
        {
            padding: 0;
            color: rgba(255, 255, 255, .4);
            font-family: 'Inter';
            font-size: 1.4rem;
            line-height: 110%;
            letter-spacing: -0.14px;
            list-style: none;

            li
            {
                margin-bottom: 1.5rem;
                a
                {
                    text-decoration: none;
                    color: inherit;
                    transition: .3s;
                    &:hover
                    {
                        color: rgba(255, 255, 255, .8);
                    }
                }
            }
        }
    }
    &-socials
    {
        margin-top: 5.3rem;
        display: flex;
        column-gap: 1.2rem;
        a img
        {
            width: 3.2rem;
            height: 3.2rem;
            object-fit: contain;
        }
    }
    &-ip
    {
        margin-top: 2rem;
        color: rgba(255, 255, 255, .2);
        font-size: 1.4rem;
        line-height: 160%;
        letter-spacing: -0.14px;
    }
}
.footer-additional-info
{
    display: flex;
    flex-direction: column;
}
@media (max-width: 960px) {
    .footer-left__text
    {
        margin-bottom: 0;
    }
    footer
    {
        padding: 48px 0;
    }
    .footer
    {
        &-left
        {
            &__logo
            {
                display: none;
            }
            &__text
            {
                margin-bottom: 8px;
                padding-bottom: 18px;
                font-size: 14px;
                line-height: 20px; /* 142.857% */
            }
            &__info
            {
                color: rgba(255, 255, 255, .4);
                font-size: 11px;
                line-height: 16px;
                letter-spacing: -.5px;
                column-gap: 16px;
                &-copy
                {
                    text-align: right;
                }
            }
        }
        &-links
        {
            &__label
            {
                font-size: 16px;
            }
            &__list
            {
                display: none;
            }
        }
    }
    .footer-additional-info
    {
        width: 100%;
        margin-top: 32px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        .footer-ip
        {
            margin-top: 0;
            order: 0;
            font-size: 12px;
        }
        .footer-socials
        {
            margin-top: 0;
            align-items: center;
            order: 1;
            a img 
            {
                width: 32px;
                height: 32px;
            }
        }
    }
}
</style>