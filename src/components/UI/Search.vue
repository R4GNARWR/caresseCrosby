<template>
    <div class="header-search">
        <div class="header-search__icon static" style="cursor: pointer" @click="searchVisible = !searchVisible">
            <img src="/svg/search.svg" alt="">
            Поиск
        </div>
        <div class="search-wrap" :class="{'show': searchVisible}">
            <div class="header-search__icon">
                <img src="/svg/search.svg" alt="">
            </div>
            <input type="text" placeholder="Поиск">
            <div class="header-search__close"  @click="searchVisible = !searchVisible">
                <img src="/svg/close.svg" alt="">
            </div>
            <div class="search-result">
                <router-link class="search-result__item" to="" v-for="(item, index) in 6" :key="index">
                    <div class="search-result__item-name">Трусы Antonia</div>
                    <div class="search-result__item-type">(Трусики)</div>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            searchVisible: false,
        }
    },
    methods: {
        
    }
}
</script>
<style lang="scss">
.header-search
{
    height: 100%;
    display: flex;
    align-items: center;
    column-gap: 1.2rem;
    
    &__icon
    {
        img
        {
            position: absolute;
            left: 1.6rem;
            top: 1.4rem;
            width: 2.4rem;
            height: 2.4rem;
            z-index: 2;
        }
        padding-left: 5.2rem;
        color: $primary;
        font-size: 1.4rem;
        font-style: normal;
        font-weight: 500;
        line-height: 3.2rem;
        letter-spacing: -0.14px;
        
    }
}
.search-wrap
{
    display: none;
    position: absolute;
    left: 0;
    top: 1.2rem;
    width: 100%;
    height: auto;
    z-index: 2;
    &.show
    {
        display: block;
    }
    input
    {
        padding: 1.6rem 1.6rem 1.6rem 5.2rem;
        width: 100%;
        height: 100%;
        border-bottom: 1px solid #C0BFBD;
        background-color: #FFF;
        outline: 0;
        box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.08);
        border: 1px solid #E9E9E9;
        z-index: 1;
        &,
        &::placeholder
        {
            color: $primary;
            font-size: 1.4rem;
            font-style: normal;
            font-weight: 500;
            line-height: 3.2rem;
            letter-spacing: -0.14px;
        }
    }
}
.header-search__close
{
    position: absolute;
    right: 1.6rem;
    top: 1.8rem;
    width: 1.6rem;
    height: 1.6rem;
    cursor: pointer;
}
.search-result
{
    display: block;
    border-top: 1px solid #C0BFBD;
    background-color: #FFFEFD;
    box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.08);
    &__item
    {
        display: flex;
        flex-direction: column;
        padding: .4rem 1.6rem .8rem 1.6rem;
        text-decoration: none;
        transition: .2s;
        &-name
        {
            color: $primary;
            font-size: 1.6rem;
            line-height: 1.5em;
            letter-spacing: -0.128px;
        }
        &-type
        {
            color: #827F7D;
            font-size: 1.2rem;
            line-height: 1.33em;
        }
        &:hover
        {
            background-color: #F9F7F5;
        }
    }
}
@media (max-width: 960px) {
    .search-wrap
    {
        position: absolute;
        width: 540px;
        left: 0;
        top: calc(100%);
        .header-search__icon
        {
            position: absolute;
            top: 6px;
            left: 12px;
        }
        input
        {
            padding: 8px 16px 8px 56px;
            height: auto;
            &, &::placeholder
            {
                font-size: 16px;
            }
        }
    }
    .header-search__icon.hide
    {
        display: block;
    }
    .header-search__icon,
    .header-search__icon.static
    {
        font-size: 0;
        width: 24px;
        height: 24px;
        padding: 0;
        img
        {
            position: static;
            width: 100%;
            height: 100%;
            object-fit: contain;
            transform: translateY(0);
        }
    }
    .header-search__close
    {
        right: 20px;
        top: 10px;
        width: 16px;
        height: 16px;
    }
    .search-result
    {
        padding-top: 16px;
        padding-bottom: 28px;
        &__item
        {
            padding: 4px 16px 4px 56px;
            &-name
            {
                font-size: 16px;
            }
            &-type
            {
                font-size: 12px;
            }
        }
    }
}
@media (max-width: 600px) {
    .search-wrap
    {
        width: 100vw;
        left: 0;
        top: 0;
        height: auto;
        padding-top: 32px;
        background-color: #FFF;
        z-index: 900;
    }
    .search-wrap .header-search__icon
    {
        top: 40px;
        left: 16px;
    }
    .header-search__close
    {
        top: 40px;
    }
    .search-wrap input
    {
        box-shadow: none;
        border: 0;
        padding-bottom: 12px;
    }
    .search-result
    {
        padding-top: 20px;
    }
}
</style>