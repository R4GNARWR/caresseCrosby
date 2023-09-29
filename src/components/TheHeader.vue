<template >
    <header ref="headerElement">
        <v-container>
            <div class="header-top">
                <v-row>
                    <v-col lg="5">
                        <div class="header-search">
                            <div class="header-search__icon">
                                <img width="35" height="35" src="/svg/search.svg" alt="">
                            </div>
                            <span>Поиск</span> 
                        </div>
                    </v-col>
                    <v-col lg="2">
                        <div class="header-logo">
                            <img src="/svg/logo-header.svg" alt="">
                        </div>
                    </v-col>
                    <v-col lg="5">
                        <div class="header-links">
                            <a class="header-links__item" href="#">
                                <img  src="/svg/heart.svg" alt="">
                            </a>
                            <a class="header-links__item" href="#">
                                <img  src="/svg/account.svg" alt="">
                            </a>
                            <a class="header-links__item" href="#">
                                <img src="/svg/cart.svg" alt="">
                            </a>
                        </div>
                    </v-col>
                </v-row>
            </div>
            
            <div class="header-catalog">
                <v-row>
                    <v-col lg="12">
                        <nav class="header-catalog__list">
                            <div class="header-catalog__list-item">
                                <a href="">Нижнее белье</a>
                            </div>
                            <div class="header-catalog__list-item">
                                <a href="">Купальники</a>
                            </div>
                            <div class="header-catalog__list-item">
                                <a href="">Одежда</a>
                            </div>
                            <div class="header-catalog__list-item">
                                <a href="">Аксессуары</a>
                            </div>
                            <div class="header-catalog__list-item">
                                <a href="">Средства ухода</a>
                            </div>
                            <div class="header-catalog__list-item">
                                <a href="">Подарочные сертификаты</a>
                            </div>
                            <div class="header-catalog__list-item">
                                <a href="">Подобрать размер</a>
                            </div>
                        </nav>
                    </v-col>
                </v-row>
            </div>
            
            
        </v-container>
    </header>
    
    
</template>
<script>
export default {
    data() {
        return {
            
        }
    },
    methods: {
        changeSize(){
            const headerHeight = this.$refs.headerElement.clientHeight;
            this.$emit('update-offset-top', headerHeight);
        }
    },
    mounted() {
        this.changeSize
        window.addEventListener('resize',  this.changeSize);
    },
    beforeDestroy() {
        // удаляем обработчик события при уничтожении компонента
        window.removeEventListener('resize', this.changeSize);
    }
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
    background-color: #FFF;
}
.header-top
{
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
    width: 14rem;
    height: 4rem;
    margin-inline: auto;
    img
    {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
}
.header-search
{
    height: 100%;
    display: flex;
    align-items: center;
    column-gap: 1.2rem;
    span
    {
        color: $primary;
        font-size: 1.4rem;
        font-style: normal;
        font-weight: 500;
        line-height: 3.2rem;
        letter-spacing: -0.14px;
    }
    &__icon
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
</style>