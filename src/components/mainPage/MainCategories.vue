<template >
<section class="main-section" id="mainCategories">
        <v-container>
            <div class="section-head ">
                <div class="section-label">
                    Категории
                </div>
            </div>
            <div class="main-categories">
                <router-link class="main-categories__item" v-for="(item, index) in categories" :key="index" :to="'/catalog/'+item.id">
                    <div class="main-categories__item-logo">
                        <img :src="'/svg/categories'+Number(index+1)+'.svg'" alt="">
                    </div>
                    <div class="main-categories__item-name">
                        {{item.name}} 
                    </div>
                    <div class="main-categories__item-link">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <g clip-path="url(#clip0_207_716)">
                                <rect x="2.75781" y="19.8267" width="23.2823" height="2" transform="rotate(-45 2.75781 19.8267)" fill="#27231E"/>
                                <rect width="15.8544" height="2" transform="matrix(-0.999957 -0.00922422 0.00922422 0.999957 21.2246 2.77783)" fill="#27231E"/>
                                <rect width="15.8544" height="2" transform="matrix(0.00922422 0.999957 -0.999957 -0.00922422 21.2227 2.77637)" fill="#27231E"/>
                            </g>
                            <defs>
                                <clipPath id="clip0_207_716">
                                <rect width="24" height="24" fill="white"/>
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                </router-link>
            </div>
        </v-container>
    </section>
</template>
<script>
export default {
    data() {
        return {
            categories: [
                {
                    id: 24402,
                    name: "Нижнее белье",
                },
                {
                    id: 25035,
                    name: "Средства ухода",
                },
                {
                    id: 25031,
                    name: "Купальники",
                },
                {
                    id: 24420,
                    name: "Одежда",
                },
                {
                    id: 24473,
                    name: "Подарочные сертификаты",
                },
                {
                    id: 24449,
                    name: "Аксессуары"
                },
            ]
        }
    },
}
</script>
<style lang="scss">
    .main-categories
    {
        margin-top: 3.2rem;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        &__item
        {
            position: relative;
            padding: 2.4rem;
            height: 20rem;
            width: 100%;
            display: flex;
            flex-direction: column;
            border: 1px solid #E5E1DA;
            cursor: pointer;
            transition: .3s;
            text-decoration: none;
            &-logo
            {
                width: 4.5rem;
                height: 4.5rem;
                img
                {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                }
            }
            &-name
            {
                margin-top: auto;
                color: $primary;
                font-family: Inter;
                font-size: 3rem;
                line-height: 3.2rem;
                letter-spacing: -0.3px;
                transition: .3s;
            }
            &-link
            {
                position: absolute;
                right: 2.4rem;
                top: 2.4rem;
                width: 2.4rem;
                height: 2.4rem;
                svg,
                img
                {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                }
            }
            &:hover
            {
                border: 1px solid #867259;
                .main-categories__item-name
                {
                    color: #867259;
                }
                .main-categories__item-link
                {
                    svg g rect
                    {
                        fill: rgba(134, 114, 89, 1);
                    }
                }
            }
        }
    }
    @media (max-width: 600px) {
        .main-categories
        {
            margin-top: 40px;
            grid-template-columns: 1fr;
            &__item
            {
                flex-direction: row;
                align-items: center;
                column-gap: 16px;
                &-logo
                {
                    width: 32px;
                    height: 32px;
                }
                &-name
                {
                    width: 60%;
                    line-height: 1.2em;
                    font-size: 18px;
                    margin-top: initial;
                }
                &-link
                {
                    height: 24px;
                    width: 24px;
                    right: 24px;
                    top: 50%;
                    transform: translateY(-50%);
                }
            }
        }
    }
</style>