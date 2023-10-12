<template >
    <header ref="headerElement">
        <v-container>
            <div class="header-top">
                <div class="header-left__col">
                    <div class="header-search__mobile d-lg-none d-flex">
                        <div class="header-search__icon " @click="showMenu = !showMenu">
                            <img src="/svg/lines.svg" alt="">
                        </div>
                        <Search></Search>
                    </div>
                    <Search class="d-lg-flex d-none"></Search>
                    <div class="header-contacts">
                        <div class="header-contacts__phone">
                            <img src="/svg/phone-outline.svg" alt="">
                            <a href="">+7 (917) 747-15-61</a>
                        </div>
                        <div class="header-contacts__socials">
                            <a href="">
                                <img src="/svg/vk-circle.svg" alt="">
                            </a>
                            <a href="">
                                <img src="/svg/telegram-circle.svg" alt="">
                            </a>
                        </div>
                    </div>
                </div>
                <router-link class="header-logo" to="/"> 
                    <img src="/svg/logo-header.svg" alt="">
                </router-link>
                <div class="header-right__col">
                    <div class="header-location">
                        <img src="/svg/placemark-outline.svg" alt="">
                        г. Уфа, ул. Менделеева 156/1
                    </div>
                    <div class="header-links">
                        <router-link class="header-links__item" to="">
                            <div class="count">2</div>
                            <img  src="/svg/heart.svg" alt="">
                        </router-link>
                        <router-link class="header-links__item d-md-block d-none" to="/profileData">
                            <img  src="/svg/account.svg" alt="">
                        </router-link>
                        <router-link class="header-links__item" to="/cart">
                            <div class="count">2</div>
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
                    <Search class="d-lg-none d-flex"></Search>
                    <nav class="header-catalog__list">
                        <div class="header-catalog__list-item">
                            <Dropdown :list-items="menuLinksUnderwear">Нижнее белье</Dropdown>
                        </div>
                        <div class="header-catalog__list-item">
                            <router-link to="/catalog">Купальники</router-link>
                        </div>
                        <div class="header-catalog__list-item">
                            <router-link to="/catalog">Одежда</router-link>
                        </div>
                        <div class="header-catalog__list-item">
                            <router-link to="/catalog">Аксессуары</router-link>
                        </div>
                        <div class="header-catalog__list-item">
                            <router-link to="/catalog">Средства ухода</router-link>
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
                            <Dropdown :list-items="linksMore" class="no-arrow"><img src="/svg/more.svg"  alt=""></Dropdown>
                        </div>
                    </nav>
                    <div class="header-catalog__btn">
                        <img src="/svg/whatsapp.svg" alt="">
                        Написать в Whats App
                    </div>
                    <div class="header-catalog__contacts d-lg-none d-flex">
                        <div class="header-contacts">
                            <div class="header-contacts__phone">
                                <img src="/svg/phone-outline.svg" alt="">
                                <a href="">+7 (917) 747-15-61</a>
                            </div>
                            <div class="header-contacts__socials">
                                <a href="">
                                    <img src="/svg/vk-circle.svg" alt="">
                                </a>
                                <a href="">
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
    </header>
    
    
</template>
<script>
import { useSettingsStore } from '../store/settingsStore';
import Dropdown from './UI/Dropdown.vue';
import Search from './UI/Search.vue';

export default {
    components: { Search, Dropdown },
    data() {
        return {
            showMenu: false,
            menuLinksUnderwear: [
            {
                name: 'Категория 1',
                link: '/catalog'
            },
            {
                name: 'Категория 2',
                link: '/catalog'
            },
            {
                name: 'Категория 3',
                link: '/catalog'
            },
            {
                name: 'Категория 4',
                link: '/catalog'
            },
            {
                name: 'Категория 5',
                link: '/catalog'
            },
            ],
            linksMore: [
            {
                name: 'Ссылка 1',
                link: '/'
            },
            {
                name: 'Ссылка 2',
                link: '/'
            },
            {
                name: 'Ссылка 3',
                link: '/'
            },
            ]
        };
    },
    methods: {
        changeSize() {
            console.log('changed');
            const headerHeight = this.$refs.headerElement.clientHeight ?? 0;
            useSettingsStore().setHeaderPadding(headerHeight);
            this.$emit('update-offset-top', headerHeight);
        }
    },
    watch:{
        $route (to, from){
            this.showMenu = false;
        }
    },
    mounted() {
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
    display: flex;
    column-gap: 5.5rem;
    position: relative;
    padding: 1rem 0 2rem 0;
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
    }
}
.header-left__col
{
    position: relative;
    display: flex;
    align-items: center;
    flex-grow: 1;
    justify-content: space-between;
    border-bottom:1px solid #E5E1DA;
}
.header-right__col
{
    position: relative;
    display: flex;
    align-items: center;
    flex-grow: 1;
    justify-content: space-between;
    border-bottom:1px solid #E5E1DA;
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
    padding: .8rem 0 2.8rem 0;
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

@media (max-width: 960px) {
    .header-contacts,
    .header-location
    {
        display: none;
    }
    .header-catalog__inner
    {
        padding: 0 0 20px 0;
        height: 100%;
        display: flex;
        flex-direction: column;
        overflow-y: scroll;
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
            position: relative;
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
            .header-search__icon
            {
                display: block;
                top: 8px;
                left: 8px;
            }
        }
        .header-search__close
        {
            right: 8px;
            top: 12px;
        }
        .search-result
        {
            padding-bottom: 0;
            box-shadow: none;
            &__item
            {
                padding: 4px 16px 4px 0px;
            }
        }
        .header-search__icon.static
        {
            display: none;
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