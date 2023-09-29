<template >
    <footer>
        <v-container>
            <v-row>
                <v-col cols="5">
                    <div class="footer-left">
                        <div class="footer-left__logo">
                            <img src="/svg/logo.svg" alt="">
                        </div>
                        <div class="footer-left__text">
                            Подпишитесь на рассылку, чтобы всегда быть в курсе наших новостей
                        </div>
                        <div class="footer-left__info">
                            <div class="footer-left__info-conf">
                                <a href="">ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ</a>
                            </div>
                            <div class="footer-left__info-offer">
                                <a href="">ОФЕРТА</a>
                            </div>
                            <div class="footer-left__info-copy">
                                <a href="">© 2023</a>
                            </div>
                        </div>
                    </div>
                </v-col>
                <v-col cols="2" offset="1">
                    <div class="footer-links">
                        <div class="footer-links__label">КАТАЛОГ</div>
                        <ul class="footer-links__list">
                            <li><a href="">Новинки</a></li>
                            <li><a href="">Популярное</a></li>
                            <li><a href="">Нижнее белье</a></li>
                            <li><a href="">Средства ухода</a></li>
                            <li><a href="">Купальники</a></li>
                            <li><a href="">Подарочные сертификаты</a></li>
                            <li><a href="">Аксессуары</a></li>
                        </ul>
                    </div>
                </v-col>
                <v-col cols="2">
                    <div class="footer-links">
                        <div class="footer-links__label">КАТАЛОГ</div>
                        <ul class="footer-links__list">
                            <li><a href="">О нас</a></li>
                            <li><a href="">Фотогалерея</a></li>
                            <li><a href="">Статьи</a></li>
                        </ul>
                    </div>
                </v-col>
                <v-col cols="2">
                    <div class="footer-links">
                        <div class="footer-links__label">КАТАЛОГ</div>
                        <ul class="footer-links__list">
                            <li><a href="">Доставка и оплата</a></li>
                            <li><a href="">Помощь</a></li>
                            <li><a href="">Контакты</a></li>
                        </ul>
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </footer>
</template>
<script>
export default {
    
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
            margin-bottom: 2.4rem;
            color: #FFF;
            font-family: 'Inter';
            font-size: 1.8rem;
            line-height: 110%;
            letter-spacing: -0.18px; 
            text-transform: uppercase;
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
    
}
</style>