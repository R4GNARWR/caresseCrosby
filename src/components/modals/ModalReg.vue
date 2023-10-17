<template>
    <div class="modal-reg" ref="modalEl" >
        <button class="close-modal" @click="closeFancybox()">
            <img src="/svg/close.svg" alt="">
        </button>
        <div class="modal-approval__label">Регистрация аккаунта</div>
        <div class="modal-approval__input">
            <Input placeholder="Имя " v-model="name"></Input>
        </div>
        <div class="modal-approval__input">
            <Input placeholder="Телефон " v-model="phone"></Input>
        </div>
        <div class="modal-approval__input">
            <Input placeholder="E-mail" v-model="email"></Input>
        </div>
        <div class="modal-approval__input">
            <Input placeholder="Пароль" v-model="password"></Input>
        </div>
        <div class="modal-approval__input">
            <Input placeholder="Повторите пароль" v-model="passwordAprove"></Input>
        </div>
        <MainBtn class-name="btn-primary w-100" @click="handleSubmit" >Зарегистрироваться</MainBtn>
    </div>
</template>
<script>
import {mapState, mapMutations} from "vuex";
import { Fancybox } from '@fancyapps/ui';

import useVuelidate from "@vuelidate/core";
import { sameAs } from "@vuelidate/validators";

import store from "../../store/store";

import Input from '../UI/Input.vue';
import MainBtn from '../UI/MainBtn.vue';

export default {
    components: { Input, MainBtn },
    props: {
    },
    data() {
        return {
            name: '',
            phone: '',
            email: '',
            password: '',
            passwordAprove: '',
            smsSended : false,
        }
    },
    computed:{
        ...mapState(['headerPadding',]
        ),
    },
    validations () {
        return {
            passwordAprove: {
                sameAsPassword: sameAs(this.password)
            }
        }
    },
    methods: {
        async handleSubmit() {
            var validationResult = await this.v$.$validate();
            
            if (!validationResult) {
                return;
            }
            this.reg_it()
        },
        closeFancybox(){
            Fancybox.close()
        },
        setPaddingModal() {
            if (window.innerWidth < 600) {
                this.$refs.modalEl.style.maxHeight = window.innerHeight - this.paddingTop + 'px';
            }
        },
        reg_it(){
            this.$API.registration(this.name, this.phone, this.email, this.password)
            .then(value => {
                if (value.data.success) {
                    this.the_error="Регистрация прошла успешно"
                    this.login();
                }
                else {
                    let msg={}
                    msg.msg='';
                    if (value.data.errors){
                        for (let e in value.data.errors){
                            msg.msg +=value.data.errors[e]+' ';
                        }
                    } else msg.msg ="Неизвестная ошибка"
                    msg.color = "red";
                }
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
.modal-reg
{
    display: none;
    position: relative;
    max-height: 80rem;
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
    .modal-reg
    {
        height: auto;
        max-height: 800px;
        width: 500px;
    }
}
@media (max-width: 600px) {
    .modal-reg
    {
        max-height: 90vh;
        height: 100%;
        width: 100%;
        padding: 48px 20px !important;
    }
}
</style>