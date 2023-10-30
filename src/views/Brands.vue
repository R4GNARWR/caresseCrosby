<template>
    <section class="brands">
        <v-container>
            <Breadcrumbs></Breadcrumbs>
            <div class="brands-label">
                Бренды
            </div>
            <div class="brands-wrap">
                <div class="brand-card" v-for="(item, index) in brands_search" :key="index">
                    <div class="brand-card__text">
                        {{item.value}}
                    </div>
                    <!-- <div class="brand-card__hover">
                        <div class="brand-card__hover-label">{{item.value}}</div>
                        <div class="brand-card__hover-text">Бренд нижнего белья, французской компании  по производству нижнего белья, основанной  в 1876 году Франсуа Огюстом Гамишоном.</div>
                    </div> -->
                    <router-link :to="'/catalog/brands/'+item.attributeValueId" class="link"></router-link>
                </div>
            </div>
        </v-container>
    </section>
</template>

<script>
import {mapState, mapMutations} from "vuex";

import Breadcrumbs from '../components/UI/Breadcrumbs.vue';
import MainBtn from '../components/UI/MainBtn.vue';
export default {
    components: {
        Breadcrumbs,
        MainBtn
    },
    data() {
        return {};
    },
    computed:{
        ...mapState(['brands_search',]),
    },
};
</script>

<style lang="scss">
    .brands
    {
        padding: 2.4rem 0 16rem 0;
    }
    .brands-wrap
    {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
    }
    .brands-label
    {
        margin-bottom: 6rem;
        color: $primary;
        font-size: 4rem;
        font-weight: 600;
        line-height: 1.2em;
        letter-spacing: -0.4px;
    }
    .brand-card
    {
        position: relative;
        height: 18.6rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #DAD1C6;
        transition: .4s;
        img
        {
            position: absolute;
            width: 80%;
            height: 80%;
            opacity: 1;
            object-fit: contain;
            transition: .4s;
        }
        &__text
        {
            font-size: 5.2rem;
            line-height: 1.33em;
        }
        &__hover
        {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            padding: 3.5rem 1.4rem;
            opacity: 0;
            transition: .4s;
            &-label
            {
                margin-bottom: 1.2rem;
                color:#FFFEFD;
                text-align: center;
                font-size: 2.4rem;
                font-weight: 600;
                line-height: 1.33em;
                letter-spacing: -0.384px;
            }
            &-text
            {
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
                overflow: hidden;
                color: #FFFEFD;
                text-align: center;
                font-size: 1.6rem;
                line-height: 1.5em;
                letter-spacing: -0.128px;
            }
        }
        &:hover
        {
            background-color: #867B6E;
            .brand-card__hover
            {
                opacity: 1;
            }
            .brand-card__text
            {
                color: #FFFEFD;
            }
            img
            {
                opacity: 0;
            }
        }
    }
    @media (max-width: 960px)
    {
        .brands-wrap
        {
            grid-template-columns: repeat(2, 1fr);
        }
    }
    @media (max-width: 600px) {
        .brands
        {
            padding: 48px 0 60px 0;
        }
        .brands-label
        {
            margin-bottom: 48px;
            font-size: 32px;
        }
        .brand-card
        {
            height: 70px;
            &__hover
            {
                &-label
                {
                    font-size: 10px;
                }
                &-text
                {
                    font-size: 8px;
                }
            }
        }
    }
</style>