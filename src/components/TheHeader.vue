<template >
    <header ref="headerElement">
        <v-container>
            <div class="header-top">
                <div class="header-left__col">
                    <div class="header-search__mobile d-lg-none d-flex">
                        <div class="header-menu__icon" @click="showMenu = !showMenu">
                            <img src="/svg/lines.svg" alt="">
                        </div>
                        <div class="header-search__icon" @click.stop="searchStatus = !searchStatus">
                            <img src="/svg/search.svg" alt="">
                        </div>
                    </div>

                    <router-link class="header-logo d-lg-flex d-none" to="/">
                        <img src="/svg/logo-header.svg" alt="">
                    </router-link>
                    <div class="header-location" >
                        <img src="/svg/placemark-outline.svg" alt="">
                        г. Уфа
                    </div>
                </div>
                <router-link class="header-logo d-lg-none d-block" to="/">
                    <img src="/svg/logo-header.svg" alt="">
                </router-link>
                <Search class="d-lg-block d-none"></Search>
                <div class="header-right__col">
                    <div class="header-contacts">
                        <div class="header-contacts__phone">
                            <img src="/svg/phone-outline.svg" alt="">
                            <a href="tel:+7 (917) 747-15-61">+7 (917) 747-15-61</a>
                        </div>
                        <!-- <div class="header-contacts__socials">
                            <a target="_blank" href="https://vk.com/ccrosby">
                                <img src="/svg/vk-circle.svg" alt="">
                            </a>
                            <a target="_blank" href="https://t.me/+79177471561">
                                <img src="/svg/telegram-circle.svg" alt="">
                            </a>
                        </div> -->
                    </div>
                    <div class="header-links">
                        <router-link class="header-links__item" to="/favorite">
                            <div class="count" v-if="favorites.length>0">{{favorites.length}}</div>
                            <img src="/svg/heart.svg" alt="">
                        </router-link>
                        <button @click="accountClick"  class="header-links__item d-md-block d-none">
                            <img src="/svg/account.svg" alt="">
                        </button>
                        <router-link class="header-links__item  " to="/cart">
                            <div class="count" v-if="cart.length>0">{{cart.length}}</div>
                            <img src="/svg/cart.svg" alt="">
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="header-catalog" :class="{'show': showMenu}">
                <div class="close-menu d-lg-none d-block" @click="showMenu =!showMenu">
                    <img src="/svg/close.svg" alt="">
                </div>
                <div class="header-catalog__inner">
                    <Search class="d-lg-none d-flex" :searchActive="true"></Search>
                    <nav class="header-catalog__list">
                        <div class="header-catalog__list-item" v-for="(item, index) in left_menu.slice(0,4)" :key="index" v-if="left_menu && windowWidth > 960">
                            <Dropdown :list-items="item.children"  v-if="item.children">
                                {{ item.name }}
                            </Dropdown>
                            <router-link :to="item.link" v-if="item.link">{{item.name}}</router-link>
                        </div>
                        <div class="header-catalog__list-item" v-for="(item, index) in left_menu" :key="index" v-if="left_menu && windowWidth < 960">
                            <Dropdown :list-items="item.children" class="no-arrow" v-if="item.children">
                                {{ item.name }}
                                <img src="/svg/arrow.svg" alt="" style="transform: rotate(-90deg);">
                            </Dropdown>
                            <button @click="item.action" v-if="item.action">{{item.name}}</button>
                            <router-link :to="item.link"  v-if="item.link">{{item.name}}</router-link>
                        </div>

                        <div class="header-catalog__list-item">
                            <router-link to="/giftCard">
                                <img src="/svg/gift.svg" alt="">
                                Подарочные сертификаты
                            </router-link>
                        </div>
                        <div class="header-catalog__list-item">
                            <router-link to="/sizeTable">
                                <img src="/svg/measuring.svg" alt="">
                                Подобрать размер
                            </router-link>
                        </div>
                        <div class="header-catalog__list-item d-lg-flex d-none">
                            <Dropdown :list-items="left_menu.slice(4, left_menu.length)" class="no-arrow"><img src="/svg/more.svg"  alt=""></Dropdown>
                        </div>
                    </nav>
                    <a class="header-catalog__btn" target="_blank" href="https://wa.me/79177471561?text=Здравствуйте%20у%20меня%20вопрос:">
                        <img src="/svg/whatsapp.svg" alt="">
                        Написать в Whats App
                    </a>
                    <div class="header-catalog__contacts d-lg-none d-flex">
                        <div class="header-contacts">
                            <div class="header-contacts__phone">
                                <img src="/svg/phone-outline.svg" alt="">
                                <a href="tel:+7 (917) 747-15-61">+7 (917) 747-15-61</a>
                            </div>
                            <div class="header-contacts__socials">
                                <a target="_blank" href="https://vk.com/ccrosby">
                                    <img src="/svg/vk-circle.svg" alt="">
                                </a>
                                <a target="_blank" href="https://t.me/+79177471561">
                                    <img src="/svg/telegram-circle.svg" alt="">
                                </a>
                            </div>
                        </div>
                        <div class="header-location">
                            <img src="/svg/placemark-outline.svg" alt="">
                            г. Уфа, ул. Менделеева 156/1
                        </div>
                    </div>
                </div>
            </div>
        </v-container>
        <ModalSearch :searchActive="searchStatus" @toggleSearch="closeSearch"></ModalSearch>
    </header>

</template>
<script>
import { Fancybox } from "@fancyapps/ui";
import {mapState, mapMutations} from "vuex";

import Dropdown from './UI/Dropdown.vue';
import Search from './UI/Search.vue';
import ModalSearch from "./modals/ModalSearch.vue";
import { timestamp } from "@vueuse/core";


export default {
    components: { Search, Dropdown, ModalSearch },
    data() {
        return {
            menuItems: [],
            showMenu: false,
            windowWidth: 0,
            searchStatus: false,
        };
    },
    emits: [
        'update-offset-top'
    ],
    methods: {
        closeSearch() {
            this.searchStatus = false
        },
        showLoginForm(){
            Fancybox.show(
            [{
                src: '#loginForm',
                type: 'inline',
            }],
            {
                closeButton: false,
                mainClass: 'modal-base__wrap',
            });
        },
        changeSize() {
            let headerHeight = 0;
            if(this.$refs.headerElement) {
                headerHeight = this.$refs.headerElement.clientHeight
            }
            if(window.innerWidth > 950) {
                this.searchStatus = true;
            }
            this.$store.commit('setHeaderPadding', headerHeight)
            this.$emit('update-offset-top', headerHeight);
            this.windowWidth = window.innerWidth
        },
        accountClick(){
            if (!this.loggedIn) {
                Fancybox.show(
                [{
                    src: '#loginForm',
                    type: 'inline',
                }],
                {
                    closeButton: false,
                    mainClass: 'modal-base__wrap',
                });
            } else {
                Fancybox.close()
                this.$route.path !=='/profileData' ? this.$router.push('/profileData') : '';
            }
        },
        ask_sms(){
            this.$API.ask_sms(this.phone, this.email);
        },
        reg_it(){
            this.$metrika.reachGoal('registration')
            this.$API.registration(this.name, this.phone, this.email, this.password)
            .then(value => {
                if (value.data.success) {
                    this.the_error="Регистрация прошла успешно"
                    this.show_menu = false;
                    this.login();
                }
                else {
                    let msg={}
                    msg.msg='';
                    if (value.data.errors){
                        for (let e in value.data.errors){
                            msg.msg +=value.data.errors[e]+' ';
                        }
                    } else msg.msg ="Неизвестная ошибка"
                    msg.color = "red";
                    // this.$store.commit('set_snack_message',msg);
                }
            });
        },
        logout(){
            this.$API.logout()
            .then(value => {
                if(value.data.success) {
                    this.clearCart();
                    this.$store.commit('logout');
                    this.show_menu = false;
                    if (this.$route.path !='/') this.$router.push('/');
                }
            });
        },
        close_left_menu(){
            if (this.show_left_menu && !this.show_sizes) {this.show_left_menu=false; this.slm=false;}
        },
        sendLid(){
            this.$API.lid(this.name, this.phone, this.email, this.lidDate.toString())
            .then(value => {
                if (value.data.success) {
                    let msg={}
                    msg.msg="Ждем вас на примерку! Мы свяжемся с вами чтобы уточнить детали."
                    this.lidForm = false;
                    // this.$store.commit('set_snack_message',msg);
                }
                else {
                    let msg={}
                    msg.msg='';
                    if (value.data.errors){
                        for (let e in value.data.errors){
                            msg.msg +=value.data.errors[e]+' ';
                        }
                    } else msg.msg ="Неизвестная ошибка"
                    msg.color = "red";
                    // this.$store.commit('set_snack_message',msg);
                }
            });
        },
        ...mapMutations(['clearCart'])
    },
    watch:{
        '$route.fullPath': function () {
            this.showMenu = false;
            this.searchStatus = false
        },
    },
    computed:{
        ...mapState(['project_params', 'loggedIn', 'user_info', 'cart','favorites','categoriesTree']),
        left_menu() {
            let lm_catalog = [];
            let lm_swimsuit = {
                name: 'Купальники',
                children: []
            };
            let lm_underwear = {
                name: 'Нижнее белье',
                children: []
            };
            for (let category of this.categoriesTree) {
                if(category.id !== 24473)
                {
                    if(category.name === 'Купальники Раздельные' || category.name === "Купальники Слитные")
                    {
                        lm_swimsuit.children.push({ name: category.name, link: '/catalog/' + category.id })
                    } else if(category.name === 'Трусики'
                            || category.name === "Бюстгальтеры"
                            || category.name === "Коррекция"
                            || category.name === "Белье для кормления"
                            || category.name === "Спортивный бюстгальтер"
                            || category.name === "Специализированное белье"
                            || category.name === "Боди"){
                                lm_underwear.children.push({ name: category.name, link: '/catalog/' + category.id })
                    } else {
                        lm_catalog.push({ name: category.name, link: '/catalog/' + category.id });
                    }
                }
            }
            let lm = []
            if(this.windowWidth > 960) {
                lm = [
                lm_underwear,
                lm_swimsuit,
                ...lm_catalog,
                { name: 'Бренды', link: '/Brands' },
                { name: 'О нас', link: '/about' },
                { name: 'Контакты', link: '/contacts' },
                { name: 'Фотогалерея', link: '/photoAlbum' },
                { name: 'Статьи', link: '/articles' },
                { name: 'Доставка', link: '/delivery' },
                { name: 'Избранные товары', link: '/favorite' },
                ]
            } else {
                lm = !this.loggedIn
                ? [
                {
                    name: 'Войти в личный кабинет',
                    action: this.showLoginForm,
                },
                lm_underwear,
                lm_swimsuit,
                ...lm_catalog,
                { name: 'О нас', link: '/About' },
                { name: 'Избранные товары', link: '/favorite' },
                { name: 'Контакты', link: '/contacts' },
                { name: 'Фотогалерея', link: '/photoAlbum' },
                { name: 'Статьи', link: '/articles' },
                { name: 'Доставка', link: '/delivery' },
                ]
                : [
                {
                    name: 'Личный кабинет',
                    link: '/profileData',
                },
                {
                    name: 'Выйти',
                    action: this.showLoginForm,
                },
                lm_underwear,
                lm_swimsuit,
                { name: 'Избранные товары', link: '/favorite' },
                ...lm_catalog,
                { name: 'О нас', link: '/About' },
                { name: 'Контакты', link: '/Contacts' },
                { name: 'Фотогалерея', link: '/photoAlbum' },
                { name: 'Статьи', link: '/articles' },
                { name: 'Доставка', link: '/delivery' },
                ];
            }

            return lm;
        },
    },
    beforeCreate() {
        this.$API.tryAuth();
        this.$API.loadCart();
    },
    // created() {if (!this.categoriesTree.length) this.$API.getParentsCategories();},
    mounted() {
        if (!this.categoriesTree.length){
            this.$API.getParentsCategories();
        }
        this.changeSize();
        window.addEventListener('resize', this.changeSize);
    },
    beforeDestroy() {
        // удаляем обработчик события при уничтожении компонента
        window.removeEventListener('resize', this.changeSize);
    },

}
</script>
<style lang="scss">
header
{
    height: auto;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    background-color: #FFFEFD;
    box-shadow: 0px 6px 20px 0px rgba(63, 36, 5, 0.04);
}
.header-top
{
    margin-bottom: 1rem;
    padding: 1rem 6rem 1rem 6rem;
    position: relative;
    display: flex;
    align-items: center;
    column-gap: 3.2rem;
    border-bottom: 1px solid #E5E1DA;
}
.header-search__icon,
.header-menu__icon
{
    width: 24px;
    height: 24px;
    img
    {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
}
.header-links
{
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    column-gap: 4rem;
    &__item
    {
        position: relative;
        width: 2.4rem;
        height: 2.4rem;
        .count
        {
            position: absolute;
            right: 0;
            top: 0;
            transform: translateX(50%) translateY(-50%);
            display: flex;
            align-items: center;
            justify-content: center;
            width: 1.8rem;
            height: 1.8rem;
            border-radius: 100px;
            border: 1.6px solid#FFFEFD;
            background: #867B6E;
            color: #FFF;
            font-family: 'Inter';
            font-size: 1.2rem;
            font-weight: 500;
            line-height: 1.16rem;
        }
        img
        {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }

    }
}
.header-logo
{
    display: block;
    width: 25.8rem;
    height: 5.6rem;
    img
    {
        width: 100%;
        height: 100%;
        object-fit: contain;
        object-position: left;
    }
}
.header-left__col
{
    position: relative;
    display: flex;
    column-gap: 6.5rem;
    align-items: center;
}
.header-right__col
{
    position: relative;
    display: flex;
    align-items: center;
    column-gap: 6.5rem;
}
.header-contacts
{
    display: flex;
    align-items: center;
    column-gap: 2.4rem;
    &__phone
    {
        display: flex;
        column-gap: 1rem;
        img
        {
            width: 2rem;
            height: 2rem;
            object-fit: contain;
        }
        a
        {
            color: #827F7D;
            font-size: 1.6rem;
            line-height: 1em;
            letter-spacing: -0.128px;
            text-decoration: none;
        }
    }
    &__socials
    {
        display: flex;
        column-gap: 1.2rem;
        a
        {
            img
            {
                width: 2.4rem;
                height: 2.4rem;
                object-fit: contain;
            }
        }
    }
}
.header-search__mobile
{
    height: 100%;
    align-items: center;
    column-gap: 24px;
}
.header-location
{
    height: 100%;
    display: flex;
    align-items: center;
    column-gap: 1rem;
    color: #827F7D;
    font-size: 1.6rem;
    line-height: 1.5em;
    letter-spacing: -0.128px;
    img
    {
        width: 2rem;
        height: 2rem;
        object-fit: contain;
    }
}
.close-menu
{
    margin-bottom: 32px;
    width: 24px;
    height: 24px;
    cursor: pointer;
    img
    {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
}
.header-catalog__inner
{
    width: 100%;
    display: flex;
    column-gap: 6.4rem;
}

.header-catalog
{
    padding: .8rem 6rem 2.8rem 6rem;
    display: flex;
    &__list
    {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-grow: 1;
        &-item
        {
            color: $primary;
            font-size: 1.6rem;
            font-weight: 400;
            line-height: 1.5em;
            letter-spacing: -0.16px;
            a
            {
                display: flex;
                align-items: center;
                column-gap: .8rem;
                text-decoration: none;
                color: inherit;
                transition: .2s;
                img
                {
                    width: 2rem;
                    height: 2rem;
                    object-fit: contain;
                }
                &.router-link-active
                {
                    font-weight: bold;
                }
                &:hover
                {
                    color: lighten($primary, $amount: 30%);
                }
            }
        }
    }
    &__btn
    {
        display: flex;
        align-items: center;
        column-gap: 1rem;
        img
        {
            width: 2rem;
            height: 2rem;
            object-fit: contain;
        }
        color: #867B6E;
        font-size: 1.6rem;
        font-weight: 700;
        line-height: 1.5em;
        letter-spacing: -0.128px;

    }
}
@media (max-width: 1280px) {
    .header-catalog__inner
    {
        column-gap: 15px;
    }
    .header-catalog
    {
        &__list
        {
            &-item
            {
                font-size: 1.4rem;
            }
        }
    }
}
.header-search
    {
        .search-wrap
        {
            margin-bottom: 0;
        }
    }
@media (max-width: 960px) {
    .header-logo
    {
        img
        {
            object-position: center;
        }
    }
    .header-contacts,
    .header-location
    {
        display: none;
    }
    .header-top
    {
        border-bottom: 0;
    }

    .header-catalog__inner
    {
        padding: 0 0 20px 0;
        height: 100%;
        display: flex;
        flex-direction: column;
        overflow-y: scroll;
        .header-search
        {
            margin-bottom: 32px;
            width: 100%;
        }
    }
    .header-catalog
    {
        display: none;
        &.show
        {
            display: flex;
        }
        padding: 20px;
        position: absolute;
        top: 0;
        left: 0;
        width: 330px;
        height: 100vh;
        flex-direction: column;
        background: #FFFEFC;
        box-shadow: 0px 4px 58px 0px rgba(0, 0, 0, 0.25);
        &__list
        {
            margin-bottom: 36px;
            align-items: flex-start;
            flex-direction: column;
            flex-grow: 0;
            row-gap: 36px;
            &-item
            {
                font-size: 16px;
                a
                {

                    column-gap: 8px;
                    img
                    {
                        width: 20px;
                        height: 20px;
                    }

                }
            }
            .dropdown
            {
                .dropdown__body
                {
                    position: static;
                    margin-top: 16px;
                    background-color: transparent;
                }
            }
        }
        &__btn
        {
            text-decoration: none;
            column-gap: 10px;
            img
            {
                width: 20px;
                height: 20px;
            }
            font-size: 16px;
        }
        .header-search
        {
            height: auto;
        }
        .search-wrap
        {
            padding-top: 0;
            margin-bottom: 32px;
            width: 100%;
            left: initial;
            top: initial;
            display: block !important;
            input
            {
                padding: 8px 16px 8px 42px;
                border: 0;
                border-bottom: 1px solid #E9E9E9;
                box-shadow: none;
            }
        }
        .header-search__close
        {
            right: 8px;
        }
        .search-wrap
        {
            margin-bottom: 10px;
        }
        .search-result
        {
            background-color: #FFFFFF;
            &__item
            {
                padding: 4px 8px 4px 8px;
            }
        }

    }
    .header-catalog__contacts
    {
        margin-top: auto;
        display: flex;
        flex-direction: column;
        column-gap: 16px;
        .header-contacts,
        .header-location
        {
            display: flex;
        }
    }
    .header-contacts
    {
        margin-top: 32px;
        column-gap: 16px;
        &__phone
        {
            column-gap: 10px;
            img
            {
                width: 20px;
                height: 20px;
            }
            a
            {
                font-size: 16px;
            }
        }
        &__socials
        {
            a
            {
                img
                {
                    width: 24px;
                    height: 24px;
                }
            }

        }
    }
    .header-location
    {
        column-gap: 10px;
        img
        {
            width: 20px;
            height: 20px;
        }
        font-size: 16px;
    }
    .header-left__col
    {
        justify-content: flex-start;
        border-bottom: 0;
    }
    .header-right__col
    {
        justify-content: flex-end;
        border-bottom: 0;
    }
    .header
    {
        &-search
        {
            column-gap: 24px;
            span
            {
                display: none;
            }
            &__icon
            {
                width: 24px;
                height: 24px;
            }
        }
        &-logo
        {
            width: 126px;
            height: 36px;
        }
        &-links
        {
            column-gap: 24px;

            &__item
            {
                .count
                {
                    width: 16px;
                    height: 16px;
                    font-size: 12px;
                }
                width: 24px;
                height: 24px;
            }
        }

    }
    .header-left__col
    {
        position: static;
    }
}
@media (max-width: 600px) {
    .header-top
    {
        position: static;
    }
}
</style>
