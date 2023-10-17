<template>
    <div class="modal-auth" ref="modalEl" >
        <button class="close-modal" @click="closeFancybox()">
            <img src="/svg/close.svg" alt="">
        </button>
        <div class="modal-approval__label">Вход в аккаунт</div>
        <div class="modal-approval__text" >Мы отправим код для авторизации</div>
        <div class="modal-approval__input">
            <div class="modal-approval__input-text"></div>
            <Input placeholder="Телефон " v-model="phone"></Input>
        </div>
        <div class="modal-approval__divide modal-approval__text">или</div>
        <div class="modal-approval__input">
            <div class="modal-approval__input-text"></div>
            <Input placeholder="E-mail" v-model="email"></Input>
        </div>
        <div class="modal-approval__input" v-if="smsSended">
            <div class="modal-approval__input-text"></div>
            <Input placeholder="Пароль" v-model="password"></Input>
        </div>
        <MainBtn class-name="btn-primary w-100" @click="login" v-if="smsSended">Войти</MainBtn>
        <MainBtn class-name="btn-primary w-100" @click="sendSms" v-else>Отправить код</MainBtn>
        <button @click="openReg()">Зареги</button>
    </div>
</template>
<script>
import {mapState, mapMutations} from "vuex";
import { Fancybox } from '@fancyapps/ui';
import store from "../../store/store";

import Input from '../UI/Input.vue';
import MainBtn from '../UI/MainBtn.vue';

export default {
    components: { Input, MainBtn },
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
            Fancybox.close()
        },
        setPaddingModal() {
            if (window.innerWidth < 600) {
                this.$refs.modalEl.style.maxHeight = window.innerHeight - this.paddingTop + 'px';
            }
        },
        openReg(){
            Fancybox.close()
            Fancybox.show(
            [{
                src: '#regForm',
                type: 'inline',
            }],
            {
                closeButton: false,
                mainClass: 'modal-base__wrap',
            });
        },
        login(){
            this.$API.tryLogin(this.phone, this.email, this.password)
            .then(value => {
                if (value.data.success){
                    this.$store.commit("user_token", value.data.token);
                    this.$store.commit("loggedIn", value.data.user);
                    this.$router.push("/profileData");
                    this.closeFancybox
                }
                else
                if(value.data.errors){
                    let msg={}
                    msg.msg=''
                    msg.color = 'red'
                    for (let e of Object.keys(value.data.errors)) {
                        msg.msg += value.data.errors[e]+ ' ';
                    }
                    if (this.the_error === "Неверный пароль!") {
                        this.sms_available=true;
                        this.$store.commit('set_snack_message', msg)
                    } else {
                        this.the_error="Пользователь не найден";
                        store.commit('set_snack_message', this.the_error)
                    }
                }
            });
        },
        sendSms(){
            this.smsSended = true+
            this.$API.ask_sms(this.phone, this.email);
        },
        
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
    padding: 3.2rem;
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
