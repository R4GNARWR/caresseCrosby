<template>
    <form class="modal-auth" ref="modalEl" @keyup.enter.prevent="">
        <button class="close-modal" @click="closeFancybox" type="button">
            <img src="/svg/close.svg" alt="">
        </button>
        <div class="modal-approval__label">Вход в аккаунт</div>
        <div class="modal-approval__text" >Мы отправим код для авторизации</div>
        <div class="modal-approval__input" v-if="!smsSended">
            <div class="modal-approval__input-text"></div>
            <MainInput placeholder="Телефон" input-type="tel" :validation-type="phone.length > 0 ? 'phone' : ''" v-model="phone"></MainInput>
        </div>
        <div class="modal-approval__divide modal-approval__text" v-if="!smsSended">или</div>
        <div class="modal-approval__input" v-if="!smsSended">
            <div class="modal-approval__input-text"></div>
            <MainInput placeholder="E-mail" v-model="email" input-type="email" :validation-type="email.length > 0 ? 'email' : ''" :required="phone.length === 0"></MainInput>
        </div>
        <div class="modal-approval__input" v-if="smsSended">
            <div class="modal-approval__input-text"></div>
            <MainInput placeholder="Пароль" v-model="password"></MainInput>
        </div>
        <MainBtn class-name="btn-primary w-100" type="submit" @click.prevent="login()" v-if="smsSended">Войти</MainBtn>
        <MainBtn class-name="btn-primary w-100" type="submit" @click.prevent="handleSubmit()" v-else>Отправить код</MainBtn>
        <!-- <button @click="openReg()">Зареги</button> -->
    </form>
</template>
<script>
import {mapState, mapMutations} from "vuex";
import { Fancybox } from '@fancyapps/ui';
import useVuelidate from "@vuelidate/core";
import store from "../../store/store";

import MainBtn from '../UI/MainBtn.vue';
import MainInput from "../UI/MainInput.vue";

export default {
    components: { MainBtn, MainInput },
    props: {
    },
    data() {
        return {
            phone: '',
            email: '',
            password: '',
            smsSended : false,
        }
    },
    computed:{
        ...mapState(['headerPadding',]
        ),
    },
    methods: {
        closeFancybox(){
            console.log('fancyclosing')
            Fancybox.close()
        },
        setPaddingModal() {
            if (window.innerWidth < 600) {
                if(this.$refs.modalEl)
                this.$refs.modalEl.style.maxHeight = window.innerHeight - this.paddingTop + 'px';
            }
        },
        async handleSubmit() {
            var validationResult = await this.v$.$validate();
            
            if (!validationResult) {
                console.log("Validation failed");
                return;
            }
            this.sendSms()
        },
        handleFormSubmit() {
            if(this.smsSended) {
                this.login()
            } else {
                this.handleSubmit()
            }
        },
        login(){
            this.$API.tryLogin(this.phone, this.email, this.password)
            .then(value => {
                if (value.data.success){
                    this.$store.commit("user_token", value.data.token);
                    this.$store.commit("loggedIn", value.data.user);
                    this.$router.push("/profileData");
                    this.phone = '';
                    this.email = '';
                    this.password = '';
                    this.smsSended = false;
                    let msg={}
                    msg.msg='Вы успешно вошли!'
                    msg.color = 'green'
                    this.$store.commit('set_snack_message', msg)
                    Fancybox.close()
                } else if(value.data.errors) {
                    let msg={}
                    msg.msg=''
                    msg.color = 'red'
                    for (let e of Object.keys(value.data.errors)) {
                        msg.msg += value.data.errors[e]+ ' ';
                    }
                    store.commit('set_snack_message', msg)
                }
            });
        },
        sendSms(){
            this.$API.ask_sms(this.phone.replace(/\D/g, "").substring(1), this.email).then(value => {
                if (value.data.success) {
                    this.smsSended = true;
                    let msg = {};
                    msg.msg = "Пароль отправлен! <br> Если вы не видите пароль на вашей почте, проверьте папку спам."
                    msg.color = "green";
                    store.commit('set_snack_message', msg);
                    
                } else {
                    if (value.data.errors) {
                        this.smsSended = false;
                        let msg = {}
                        msg.msg = ''
                        msg.color = 'red'
                        for (let e of Object.keys(value.data.errors)) msg.msg += value.data.errors[e] + ' ';
                        store.commit('set_snack_message', msg)
                    }
                }
            })
        },
    },
    setup() {
        return {
            v$: useVuelidate(),
        };
    },
    mounted() {
        this.setPaddingModal();
        window.addEventListener('resize', this.setPaddingModal);
    },
    beforeDestroy() {
        // удаляем обработчик события при уничтожении компонента
        window.removeEventListener('resize', this.setPaddingModal);
    }
}
</script>
<style lang="scss">
.modal-auth
{
    display: none;
    position: relative;
    max-height: 60rem;
    height: auto;
    width: 48rem;
    &.fancybox__content
    {
        padding: 3.2rem !important;
    }
    
}
.modal-approval__divide
{
    margin: -2.5rem 0 0rem 0;
    text-align: center;
}
@media (max-width: 960px) {
    .modal-auth
    {
        height: auto;
        max-height: 800px;
        width: 500px;
    }
}
@media (max-width: 600px) {
    .modal-auth
    {
        max-height: 90vh;
        height: 100%;
        width: 100%;
        padding: 48px 20px !important;
    }
}
</style>
