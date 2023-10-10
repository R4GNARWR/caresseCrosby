<template >
    <header ref="headerElement">
        <v-container>
            <div class="header-top">
                <v-row>
                    <v-col md="5" class="search-col">
                        <div class="header-search__mobile d-lg-none d-flex">
                            <div class="header-search__icon ">
                                <img src="/svg/lines.svg" alt="">
                            </div>
                            <Search></Search>
                        </div>
                        <Search class="d-lg-flex d-none"></Search>
                    </v-col>
                    <v-col md="2" >
                        <router-link class="header-logo" to="/"> 
                            <img src="/svg/logo-header.svg" alt="">
                        </router-link>
                    </v-col>
                    <v-col md="5" >
                        <div class="header-links">
                            <router-link class="header-links__item" to="">
                                <img  src="/svg/heart.svg" alt="">
                            </router-link>
                            <router-link class="header-links__item d-md-block d-none" to="/profileData">
                                <img  src="/svg/account.svg" alt="">
                            </router-link>
                            <router-link class="header-links__item" to="/cart">
                                <img src="/svg/cart.svg" alt="">
                            </router-link>
                        </div>
                    </v-col>
                </v-row>
            </div>
            
            <div class="header-catalog">
                <v-row>
                    <v-col lg="12">
                        <nav class="header-catalog__list">
                            <div class="header-catalog__list-item">
                                <router-link to="/catalog">Нижнее белье</router-link>
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
                                <router-link to="/giftCard">Подарочные сертификаты</router-link>
                            </div>
                            <div class="header-catalog__list-item">
                                <router-link to="/sizeTable">Подобрать размер</router-link>
                            </div>
                        </nav>
                    </v-col>
                </v-row>
            </div>
            
            
        </v-container>
    </header>
    
    
</template>
<script>
import { useSettingsStore } from '../store/settingsStore';
import Search from './UI/Search.vue';

export default {
    components: { Search },
    data() {
        return {
            showMenu: false,
        };
    },
    methods: {
        changeSize() {
            console.log('changed');
            const headerHeight = this.$refs.headerElement.clientHeight;
            useSettingsStore().setHeaderPadding(headerHeight);
            this.$emit('update-offset-top', headerHeight);
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
    position: relative;
    border-bottom:1px solid #E5E1DA;
    padding: 1.1rem 0;
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
        width: 2.4rem;
        height: 2.4rem;
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
    width: 14rem;
    height: 5.6rem;
    margin-inline: auto;
    img
    {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
}
.search-col
{
    position: relative;
}
.header-search__mobile
{
    height: 100%;
    align-items: center;
    column-gap: 24px;
}
.header-catalog
{
    padding: 1.7rem 0;
    &__list
    {
        display: flex;
        justify-content: space-between;
        padding: 1.7rem 0 2rem 0;
        &-item
        {
            color: $primary;
            font-size: 1.6rem;
            font-weight: 400;
            line-height: 1em;
            letter-spacing: -0.16px;
            a
            {
                text-decoration: none;
                color: inherit;
                transition: .2s;
                &:hover
                {
                    color: lighten($primary, $amount: 30%);
                }
            }
        }
    }
}

@media (max-width: 960px) {
    .header-catalog
    {
        display: none;
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
                width: 24px;
                height: 24px;
            }
        }
        
    }
    
    .search-col
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