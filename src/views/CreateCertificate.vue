<template>
    <section class="create-certificate">
        <v-container>
            <div class="create-certificate__label">Заявка на сертификат</div>

            <div class="create-certificate__form">
                <MainInput
                label="Имя (от кого)"
                v-model="theFrom"
                placeholder="Имя (от кого)"
                aria-required="true"/>
                <MainInput v-model="forWho" type="text" label="Имя получателя" placeholder="Имя получателя" aria-required="true"/>
                <MainInput v-model="emailToSend" type="text"
                label="Эл. почта (кому)"
                placeholder="Эл. почта (кому)" aria-required="true"/>
                <MainInput v-model="phoneFrom" type="text"
                label="Телефон (от кого)"
                input-type="tel" validation-type="phone"
                placeholder="Телефон (от кого)" aria-required="true"/>
                <MainInput v-model="phoneFor" type="text"
                label="Телефон (кому)"
                input-type="tel" validation-type="phone"
                placeholder="Телефон (кому)" aria-required="true"/>
                <MainInput v-model="cost" type="number"
                @click="message=''"

                label="Номинал (руб.)"
                placeholder="Номинал (руб.)" aria-required="true"/>
                <MainInput v-model="whenSend" type="text" label="Когда отправить сертификат получателю" aria-required="true"/>
                <v-textarea v-model="theText"
                variant="outlined"
                label="Сопроводительный текст"
                placeholder="Сопроводительный текст" aria-required="true"
                class=""
                ></v-textarea>
                <div class="create-certificate__message">
                    <p v-if="message">
                        {{message}} <br>
                        <b v-if="message!=='Номинал сертификата не соответствует политики компании.'">Сертификат необходимо отправить получателю в оговоренное время.</b>
                    </p>
                </div>
                <div class="create-certificate__buttons">
                    <button
                    v-if="cost>0 && !certificate"
                    class="btn btn-primary"
                    @click="createCertificate">
                    Выпустить сертификат
                </button>
                <button
                v-if="certificate"
                class="btn btn-primary"
                @click="startPayment(cost, 0, certificate)">
                Ссылка на оплату
            </button>
            <a
            class="btn btn-white "
            v-if="certificate && link" :href="link" target="_blank">
            Скачать сертификат
        </a>
    </div>
</div>
</v-container>

</section>
</template>

<script>
import store from "../store/store";
import {mapState} from "vuex";
import cart_methods from "../api/cart";
import MainInput from "../components/UI/MainInput.vue";

export default {
    name: "CreateCert",
    data() {
        return {
            theFrom: "", forWho: "", emailToSend: "", phoneFrom: "", phoneFor: "",
            cost: "", whenSend: "", theText: "",
            certificate: null, message: "", link: ""
        };
    },
    head() {
        return {
            title: "Магазин удобного белья в Уфе | Caresse Crosby",
            meta: [
                { content: "Магазин удобного белья в Уфе | Caresse Crosby" }
            ]
        }
    },
    computed: {
        ...mapState(['user_info', 'loggedIn'])
    },
    methods: {
        createCertificate() {
            let data = {
                theFrom: this.theFrom,
                forWho: this.forWho,
                emailToSend: this.emailToSend,
                phoneFrom: this.phoneFrom,
                phoneFor: this.phoneFor,
                theText: this.theText,
                cost: this.cost
            };
            this.$API.newCertificate(data).then(value => {
                if (value.data.success) {
                    this.certificate = value.data.code;
                    this.link = value.data.link;
                }
                else {
                    this.message = value.data.error;
                }
            });
        },
        startPayment(amount, orderID, code) {
            store.commit('loader','start');
            this.$API.payment(amount, orderID, code, this.phoneFrom).then(value => {
                if (value.data.success && value.data.location.length > 10) {
                    store.commit('loader','finish');
                    this.message = "Ссылка на оплату успешно сформированна и отправлена заказчику по смс. В случае необходимости, отправьте ее любым удобным способом: " + value.data.location;
                }
                else {
                    if (value.data.errors.sberError)
                        this.att_message = value.data.errors.sberError;
                    this.attention = true;
                    store.commit('loader','finish');
                }
            });
        }
    },
    created() {
        setTimeout(() => {
            if (this.user_info.role !== 3) {
                store.commit("set_snack_message", { msg: "Нужен пользователь с правами администратора!", type:'error' });
                setTimeout(() => {this.$router.push('/');}, 2500);
            }
        }, 3000);
        this.theFrom = this.$route.query.from;
        this.forWho = this.$route.query.fw;
        this.emailToSend = this.$route.query.et;
        this.phoneFrom = this.$route.query.pf;
        this.phoneFor = this.$route.query.pfor;
        this.cost = !isNaN(parseInt(this.$route.query.cost)) ? this.$route.query.cost : 0;
        this.whenSend = this.$route.query.ws;
        this.theText = this.$route.query.text;
    },
    components: { MainInput }
}
</script>

<style scoped lang="scss">
.create-certificate
{
    padding: 0 0 10rem 0;
}
.create-certificate__label
{
    margin-bottom: 5rem;
    font-size: 3.6rem;
    line-height: 1.33em;
    font-weight: 500;
}
.order_input{
    width: 200px;
    padding: 0 !important;
    margin: 0 20px 0 25px !important;
}
.create-certificate__message
{
    font-size: 1.6rem;
    line-height: 1.33em;
}
.create-certificate__buttons
{
    justify-content: flex-start;
    display: flex;
    column-gap: 2rem;
    align-items: center;
}
.create-certificate__form
{
    .form-control__wrap
    {
        margin-bottom: 2.5rem;
    }
}
@media (max-width: 960px) {
    .create-certificate__label
    {
        font-size: 24px;
    }
    .create-certificate__message
    {
        font-size: 14px;
    }
}
</style>
