<template>
    <section class="profile">
        <v-container>
            <div class="breadcrumbs text-page__breadcrumbs">
                <router-link class="breadcrumbs-item" to="/">Главная</router-link>
                <div class="breadcrumbs-divider">/</div>
                <a class="breadcrumbs-item active">Профиль</a>
            </div>
            <div class="profile-tabs">
                <router-link to="/profileData" class="active">
                    Мои данные
                </router-link>
                <router-link to="/profileOrders">
                    Заказы
                </router-link>
            </div>
            <v-row>
                <v-col md="7" cols="12">
                    <form action="" class="profile-data__form" v-if="user">
                        <div class="profile-data__form-line">
                            <MainInput placeholder="Адрес доставки*" validation-type="adress" v-model="user.city" :required="true"></MainInput>
                        </div>
                        <MainInput placeholder="Имя*"  validation-type="name" v-model="user.name" :required="true"></MainInput>
    
                        <div class="input-confirm">
                            <MainInput placeholder="Телефон*" validation-type="phone" v-model="user.phone" inputType="tel" :required="true"></MainInput>
                            <!-- <MainBtn v-show="!phoneConfirmed" class-name="btn-primary" data-fancybox data-src="#phoneAprovalModal">Подтвердить</MainBtn> -->
                        </div>
                        <div class="input-confirm">
                            <MainInput placeholder="Email" name="emailInput" validation-type="email" inputType="email" v-model="user.email" :required="true"></MainInput>
                            <!-- <MainBtn v-show="!emailConfirmed" class-name="btn-primary" data-fancybox data-src="#emailAprovalModal">Подтвердить</MainBtn> -->
                        </div>
                        <div class="profile-data__form-line" :key="index" v-if="sizes_search">
                            <InputsDropdown v-model="user.size_t" :listName="dropdownLabels[0]" :inpustArray="sizes_search[0]"></InputsDropdown>
                        </div>
                        <div class="profile-data__form-line"  :key="index" v-if="sizes_search">
                            <InputsDropdown v-model="user.size_b" :listName="dropdownLabels[1]" :inpustArray="sizes_search[1]" ></InputsDropdown>
                        </div>
                        <div class="profile-data__buttons">
                            <MainBtn class-name="btn-primary" type="submit" @click.prevent="handleSubmit">Сохранить</MainBtn>
                            <MainBtn class-name="btn-primary outline" @click.prevent="logout">Выйти</MainBtn>
                        </div>

                    </form>
                </v-col>
            </v-row>
        </v-container>
    </section>
    <ModalApproval id="emailAprovalModal"
    label="Изменение почты"
    subText="Мы отправили код подтверждения на <br>"
    destination="boss.gaynsetv23@gmail.com"></ModalApproval>
    <ModalApproval id="phoneAprovalModal"
    label="Изменение телефона"
    subText="Мы отправили код подтверждения на <br>"
    destination="+7 (950) 321-33-22"></ModalApproval>
</template>

<script>
import Breadcrumbs from '../components/UI/Breadcrumbs.vue';
import MainBtn from '../components/UI/MainBtn.vue';
import DetailLinks from '../components/UI/DetailLinks.vue';
import MainInput from '../components/UI/MainInput.vue';
import InputsDropdown from '../components/UI/InputsDropdown.vue';

import users from '../api/users'
import store from '../store/store'
import {mapState} from "vuex";

import useVuelidate from "@vuelidate/core";
import { helpers, required, email } from "@vuelidate/validators";

import { Fancybox } from "@fancyapps/ui";
import ModalApproval from '../components/modals/ModalApproval.vue';

export default {
    components: {
        Breadcrumbs,
        MainBtn,
        DetailLinks,
        MainInput,
        InputsDropdown,
        ModalApproval
    },
    data() {
        return {
            phoneConfirmed: false, emailConfirmed: false,
            user: store.state.user_info,
            dropdownLabels: [
                'Размер белья',
                'Размер одежды'
            ]
        };
    },
    setup() {
        return {
            v$: useVuelidate(),
        };
    },
    computed:{
        full_address: function() {
            let fa=this.user.street;
            if (this.user.apartment) fa +=' '+this.user.apartment;
            return fa;
        },
        ...mapState(['favorites', 'sizes_search'])
    },
    methods: {
        ...users,
        async handleSubmit() {
            var validationResult = await this.v$.$validate();
            
            if (!validationResult) {
                console.log("Validation failed");
                return;
            }
            this.save_user_data()
        },
        logout(){
            this.$API.logout()
            .then(value => {
                if(value.data.success) {
                    this.clearCart();
                    this.$store.commit('logout');
                    this.show_menu = false;
                    if (this.$route.path !='/') this.$router.push('/');
                }
            });
        },
        openEmailFancybox() {
            Fancybox.close();
            Fancybox.show(
            [{
                src: '#emailAprovalModal',
                type: 'inline',
            }]);
        },
        openPhoneFancybox() {
            Fancybox.close();
            Fancybox.show(
            [{
                src: '#phoneAprovalModal',
                type: 'inline',
            }]);
        },
    },
    created() {
        this.get_sizes();
    },
    beforeCreate() {
        if (!store.state.user_info.id) {
            this.$router.push("/");
        } 
    },
};
</script>

<style lang="scss">
.profile
{
    padding: 2.4rem 0 12rem 0;
    background: #FFFEFC;
}
.input-confirm
{
    display: flex;
    column-gap: 1rem;
    .btn
    {
        height: fit-content;
        flex-shrink: 1;
        padding: 1.1rem 2rem;
    }
}
.profile-tabs
{
    display: flex;
    column-gap: 4rem;
    margin-bottom: 4.8rem;
    a
    {
        color: #A6A5A3;
        font-size: 4rem;
        font-weight: 600;
        line-height: 1.2em;
        letter-spacing: -0.4px;
        text-decoration: none;
    }
    a.active
    {
        color: $primary;
        
    }
}
.profile-data__form
{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    row-gap: 3.2rem;
    column-gap: 3.2rem;
    &-line
    {
        grid-column: 2 span;
    }
}
.profile-data__buttons
{
    display: flex;
    column-gap: 2.5rem;
}
@media (max-width:600px) {
    .profile
    {
        padding: 32px 0 48px 0;
    }
    .profile-tabs
    {
        flex-direction: column;
        row-gap: 8px;
        a
        {
            font-size: 32px;
        }
    }
    .profile-data__form
    {
        grid-template-columns: 1fr;
        row-gap: 24px;
        & > *
        {
            grid-column: 1/1;
        }
    }
    .input-confirm
    {
        display: flex;
        flex-direction: column;
        row-gap: 24px;
        .btn
        {
            flex-shrink: 0;
            padding: 16px 40px; 
        }
    }
}
</style>