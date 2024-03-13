<template>
    <section class="gift-card">
        <v-container>
            <div class="breadcrumbs text-page__breadcrumbs">
                <router-link class="breadcrumbs-item" to="/">Главная</router-link>
                <div class="breadcrumbs-divider">/</div>
                <a class="breadcrumbs-item active">Подарочные сертификаты</a>
            </div>
            <div class="gift-card__label">Подарочные online-сертификаты</div>
            <div class="gift-card__banner">
                <v-row class="h-100">
                    <v-col md="6" cols="12" class="h-100">
                        <div class="gift-card__banner-content">
                            <div class="gift-card__banner-content__label d-lg-block d-none">Отличный подарок близкому
                                человеку, особенно если он далеко.</div>
                            <div class="gift-card__banner-content__label d-lg-none d-block">Что подарить подруге, маме
                                или
                                пышногрудой коллеге на праздник?</div>
                            <ul class="gift-card__banner-content__list">
                                <li>Подарив сертификат, вы точно не ошибетесь с размером</li>
                                <li>Вы сами устанавливаете номинал сертификата.</li>
                                <li>Плати online прямо сейчас, удобно!</li>
                                <li>Срок действия сертификата не ограничен.</li>
                                <li>Использовать сертификат можно в <br> интернет-магазине и шоу-руме.</li>
                            </ul>
                            <!-- <div class="gift-card__banner-content__btn">
                                <a class="btn btn-primary w-ft" href="#sendCard">Оформить карту</a>
                            </div> -->
                        </div>
                    </v-col>
                </v-row>
            </div>
            <v-row>
                <v-col md="5" cols="12">
                    <div class="gift-card__execution-img">
                        <img src="/img/about1.jpg" alt="">
                    </div>
                </v-col>
                <v-col md="7" cols="12" id="sendCard">
                    <form class="gift-card__execution-content">
                        <div class="gift-card__execution-content__label">Отличный подарок близкому человеку, особенно
                            если
                            он далеко.</div>
                        <div class="gift-card__execution-content__text">
                            Нечаянная радость может случиться в любой момент. Для этого совсем не нужен повод. Это легко
                            сделать в один клик.
                        </div>
                        <div class="gift-card__execution-content__formlabel">
                            Оформить сертификат
                        </div>
                        <v-row class="gift-card__execution-content__row">
                            <v-col md="12" cols="12">
                                <div class="gift-card__execution-content__row-col">
                                    <!--                                    <h3>Отправитель</h3>-->
                                    <MainInput :placeholder="'Ваше имя*'" autocomplete="name" v-model="lid.from"
                                        ref="firstInput" :required="true" validation-type="name">
                                    </MainInput>
                                    <MainInput :placeholder="'Телефон*'" autocomplete="tel" v-model="lid.phoneFrom"
                                        :required="true" input-type="tel" validation-type="phone"></MainInput>
                                    <MainInput :placeholder="'E-mail'" autocomplete="email" input-type="email"
                                        v-model="lid.emailFrom" validation-type="email"></MainInput>
                                </div>
                            </v-col>
                            <!--                            <v-col md="6" cols="12">-->
                            <!--                                <div class="gift-card__execution-content__row-col">-->
                            <!--                                    <h3>Получатель</h3>-->
                            <!--                                    <MainInput :placeholder="'Имя*'" v-model="lid.for" :required="true"></MainInput>-->
                            <!--                                    <MainInput :placeholder="'Телефон*'" v-model="lid.phonefor" :required="true"-->
                            <!--                                        input-type="tel" validation-type="phone"></MainInput>-->
                            <!--                                    <MainInput :placeholder="'E-mail'" input-type="email" v-model="lid.emailToSend"-->
                            <!--                                        validation-type="email"></MainInput>-->
                            <!--                                </div>-->
                            <!--                            </v-col>-->
                        </v-row>
                        <div class="gift-card__execution-content__form">
                            <MainInput :placeholder="'Номинал в рублях'" v-model="lid.cost" :required="true"
                                class="inline" input-type="number">
                            </MainInput>
                            <!--                            <MainInput :placeholder="'Когда отправить сертификат получателю'" v-model="lid.whenSend"-->
                            <!--                                class="inline" input-type="date" :min="minDate" validation-type="date"></MainInput>-->
                            <MainInput :placeholder="'Ваше пожелание получателю'" v-model="lid.text" class="inline"
                                input-type="text" max="1000"></MainInput>
                        </div>
                        <div class="gift-card__execution-content__form-bottom">
                            Если у вас возникнут вопросы, звоните в службу поддержки по телефону: <a href="">+7 (917)
                                747-15-61</a> <br>
                            Нажимая кнопку «Отправить», я подтверждаю свою дееспособность, даю согласие на обработку
                            моих
                            персональных данных в соответствии с <a href="">политикой конфиденциальности</a>
                        </div>
                        <MainBtn class-name="btn-primary" type="submit" @click.prevent="handleSubmit"
                            :disabled="!sendStatus">Получить сертификат
                        </MainBtn>
                    </form>
                </v-col>
            </v-row>
        </v-container>
    </section>
    <section class="cards-list">
        <v-container>
            <keep-alive>
                <SwiperCards :slidesArray="products.data.products" :name="'Подарочные сертификаты с доставкой'"
                    :catId="24473" v-if="products && products.data && products.data.products"></SwiperCards>
            </keep-alive>
        </v-container>
    </section>
</template>
<script>
import { useVuelidate } from '@vuelidate/core'
import { mapState } from "vuex";
import store from "../store/store";

import Breadcrumbs from '../components/UI/Breadcrumbs.vue';
import MainInput from '../components/UI/MainInput.vue';
import MainBtn from '../components/UI/MainBtn.vue';
import MainLink from '../components/UI/MainLink.vue';
import SwiperCards from '../components/SwiperCards.vue'
import { sendMetrika } from '../utils/metrika';
import { isObject } from '@vueuse/core';

export default {
    components: {
        Breadcrumbs,
        MainBtn,
        MainLink,
        MainInput,
        SwiperCards
    },
    data() {
        return {
            lid: {
                from: '',
                for: '',
                emailFrom: '',
                emailToSend: '',
                phoneFrom: '',
                phonefor: '',
                cost: '',
                whenSend: '',
                text: '',
            },
            products: [],
            sendStatus: true,
        };
    },
    head() {
        return {
            title: "Подарочные сертификаты | Caresse Crosby",
            meta: [
                { content: "Подарочные сертификаты | Caresse Crosby" }
            ]
        }
    },
    computed: {
        minDate() {
            return new Date().toISOString().split("T")[0]
        },
        ...mapState(["categoriesTree", "cat_products"]),
    },
    setup() {
        return {
            v$: useVuelidate()
        }
    },
    methods: {
        async handleSubmit() {
            var validationResult = await this.v$.$validate();

            if (!validationResult) {
                let msg = {}
                msg.msg = 'Пожалуйста, заполните все поля!'
                store.commit('set_snack_message', msg)
                this.$refs.firstInput.$el.scrollIntoView({ behavior: "smooth" });
                return;
            }
            this.sendStatus = false
            this.$API.sentLid(this.lid).then(value => {
                if (value.data.success === true) {
                    sendMetrika('make_gift_card', 'reachGoal')
                    this.v$.$reset()
                    this.resetLid()
                    store.commit('set_snack_message', { msg: 'Все готово! Переходим на страницу оплаты )' })
                    this.sendStatus = true
                    setTimeout(() => {
                        console.log(value.data.link)
                        window.location.href = value.data.link
                    }, 2500)

                } else {
                    let msg = {}
                    msg.msg = ''
                    msg.color = 'red'
                    console.log(value.data.errors)
                    if (value.data.errors) {
                        for (let e of Object.keys(value.data.errors)) {
                            msg.msg += value.data.errors[e] + ' ';
                        }
                    } else if (value.data.error) {
                        msg.msg = "Номинал сертификата не соответствует политике компании."

                    }
                    store.commit('set_snack_message', msg)
                    this.sendStatus = true
                }
            })
        },
        async getProducts() {
            if (this.cat_products[24473]) {
                this.products = this.cat_products[24473];
            } else if (!this.cat_products[24473]) {
                try {
                    const response = await this.$API.getCategoryTopProducts(24473, 380, 570);
                    this.products = response;
                    this.cat_products[24473] = response;
                } catch (error) {
                    console.log(error);
                }
            }
        },
        resetLid() {
            this.lid = {
                from: '',
                for: '',
                emailFrom: '',
                emailToSend: '',
                phoneFrom: '',
                phonefor: '',
                cost: '',
                whenSend: '',
            }
        }
    },
    created() {
        this.getProducts()
    },
    mounted() {
        sendMetrika('open_gift_card', 'reachGoal')
    }
};
</script>

<style lang="scss">
.gift-card {
    padding: 2.5rem 0 12rem 0;

    &__label {
        margin-bottom: 4rem;
        color: $primary;
        font-size: 4rem;
        font-weight: 600;
        line-height: 1.2em;
        letter-spacing: -0.4px;
    }

    &__banner {
        margin-bottom: 12rem;
        height: 77rem;
        position: relative;
        background-image: url('/img/gift-card-banner.png');
        background-size: cover;

        &::after {
            content: '';
            display: block;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: #F7F7E8;
            z-index: -1;
        }
    }
}

.gift-card__banner {
    &-content {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 2rem 0 4rem;

        &__label {
            margin-bottom: 3.3rem;
            color: $primary;
            font-size: 3.2rem;
            font-weight: 500;
            line-height: 1.25em;
            letter-spacing: -0.32px;
        }

        &__list {
            margin-bottom: 7.5rem;
            padding-left: 1.5em;
            display: flex;
            flex-direction: column;
            row-gap: 3rem;
            list-style: decimal;
            color: #827F7D;
            font-size: 2rem;
            line-height: 1.8em;
            letter-spacing: -0.32px;
        }

        .btn {
            padding-left: 8rem !important;
            padding-right: 8rem !important;
        }
    }
}

.gift-card__execution {
    &-img {
        width: 100%;
        height: 100%;

        img {
            height: 100%;
            width: 100%;
            object-fit: cover;
        }
    }

    &-content {
        &__label {
            margin-bottom: 3.5rem;
            color: $primary;
            font-size: 4.8rem;
            font-weight: 600;
            line-height: 1.1em;
            letter-spacing: -0.864px;
        }

        &__text {
            margin-bottom: 4.2rem;
            color: $primary;
            font-size: 2rem;
            line-height: 1.8em;
            letter-spacing: -0.32px;
        }

        &__formlabel {
            margin-bottom: 3.5rem;
            color: #27231F;
            font-size: 2.8rem;
            font-weight: 500;
            line-height: 1.2em;
            letter-spacing: -0.504px;
        }

        &__form {
            margin-top: 3.2rem;
            margin-bottom: 4.2rem;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            column-gap: 3.2rem;
            row-gap: 3.2rem;

            .form-control__wrap.inline {
                grid-column: 2 span;
            }

            &-bottom {
                margin-bottom: 6.2rem;
                color: #827F7D;
                font-size: 1.4rem;
                line-height: 1.4em;
                letter-spacing: -0.056px;

                a {
                    text-decoration: none;
                    color: inherit;
                }
            }
        }
    }
}

.cards-list {

    .swiper-cards__more {
        display: none;
    }

    .section-head {
        margin-bottom: 4rem;

        .section-label {
            font-size: 3.6rem;
        }
    }
}

.gift-card__execution-content__row-col {
    display: flex;
    flex-direction: column;
    row-gap: 3.2rem;

    h3 {
        font-size: 2rem;
        font-weight: 400;
    }
}

@media (max-width: 960px) {
    .gift-card {
        &__label {
            margin-bottom: 28px;
            font-size: 32px;
        }
    }

    .gift-card__banner {
        &-content {
            &__list {
                margin-bottom: 40px;
                row-gap: 25px;
                font-size: 14px;
                line-height: 1.2em;
            }
        }

    }

    .gift-card__execution {
        &-img {
            margin-bottom: 48px;

            img {
                height: 360px;
            }
        }

        &-content {
            &__label {
                margin-bottom: 24px;
                font-size: 32px;
            }

            &__text {
                margin-bottom: 32px;
                font-size: 14px;
            }

            &__formlabel {
                margin-bottom: 24px;
                font-size: 20px;
            }

            &__form {
                margin-bottom: 24px;
                grid-template-columns: repeat(1, 1fr);
                column-gap: 0;
                row-gap: 24px;

                .form-control__wrap {
                    grid-column: 1;
                }

                &-bottom {
                    margin-bottom: 32px;
                    font-size: 14px;
                }
            }
        }
    }

    .gift-card__execution-content__row-col {
        row-gap: 24px;

        h3 {
            font-size: 18px;
        }
    }
}

@media (max-width: 600px) {
    .gift-card {
        &__banner {
            margin-bottom: 50px;
            height: 500px;
            background-image: url('/img/gift-card-banner-mobile.png');
            background-position: top;
        }
    }

    .gift-card__banner {
        &-content {
            justify-content: flex-start;
            padding: 34px 24px 0 24px;

            &__label {
                margin-bottom: 40px;
                font-size: 24px;
            }

            &__list {
                margin-bottom: 40px;
                row-gap: 33px;
                font-size: 14px;
                line-height: 1.2em;
            }

            .btn {
                width: 100%;
            }
        }
    }
}
</style>
