<template>
    <div class="dropdown">
        <div class="dropdown__head" @click="listShow = !listShow" >
            <slot></slot>
            <img class="dropdown__head-arrow" src="/svg/arrow-black.svg" alt="">
        </div>
        <ul class="dropdown__body" :class="{'show': listShow}" @click.stop>
            <li v-for="(item, index) in listItems" :key="index">
                <router-link :to="item.link" v-if="item.link">{{item.name}}</router-link>
                <button v-else @click="clickItem(item.name)">{{item.name}}</button>
            </li>
            
        </ul>
    </div>
</template>
<script>
import { ref, onMounted } from 'vue'
export default {
    data() {
        return {
            listShow: false,
            listItemsPlaceholder: [
            {
                name: 'Трусы Antonia',
                link: '/catalog'
            },
            {
                name: 'Трусы Antonia',
                link: '/catalog'
            },
            {
                name: 'Трусы Antonia',
                link: '/catalog'
            },
            {
                name: 'Трусы Antonia',
                link: '/catalog'
            },
            {
                name: 'Трусы Antonia',
                link: '/catalog'
            },
            ]
        }
    },
    props: {
        listItems: Array,
    },
    methods: {
        clickItem(sortValue)
        {
            this.listShow = false
            this.$emit('items-action', sortValue)
            
        }
    },
}
</script>
<style lang="scss">
.dropdown
{
    position: relative;
    &.no-arrow
    {
        .dropdown__head-arrow
        {
            display: none;
        }
    }
    &__head
    {
        display: flex;
        align-items: center;
        column-gap: .8rem;
        color: $primary;
        font-size: 1.6rem;
        line-height: 1.5em;
        letter-spacing: -0.128px;
        cursor: pointer;
        &-arrow
        {
            width: 2rem;
            height: 2rem;
            object-fit: contain;
        }
    }
}
.dropdown__body
{
    padding: 0 1.6rem;
    display: none;
    background-color: #FFF;
    position: absolute;
    left: 0;
    top: calc(100% + 8px);
    width: 100%;
    min-width: 23.4rem;
    list-style: none;
    z-index: 200;
    &.show
    {
        display: block;
    }
    li
    {
        a
        {
            width: 100%;
            height: 100%;
            text-decoration: none;
            color: inherit;
            cursor: pointer;
        }
        margin-bottom: 1.2rem;
        color: $primary;
        font-size: 1.6rem;
        line-height: 1em;
    }
}
@media (max-width:960px) {
    .dropdown
    {
        &__head
        {
            column-gap: 8px;
            font-size: 16px;
            &-arrow
            {
                width: 20px;
                height: 20px;
            }
        }
    }
    .dropdown__body
    {
        padding: 0 16px;
        width: 100%;
        min-width: 200px;
        li
        {
            margin-bottom: 16px;
            font-size: 16px;
            line-height: 1.5em;
        }
    }
}
</style>