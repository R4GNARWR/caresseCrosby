<template>
    <section class="profile">
        <v-container>
            <Breadcrumbs></Breadcrumbs>
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
                    <form action="" class="profile-data__form">
                        <div class="profile-data__form-line">
                            <Input placeholder="Адрес доставки*" v-model="adress" :required="true"></Input>
                        </div>
                        <Input placeholder="Имя*" validation-type="name" v-model="name" :required="true"></Input>
                        <Input placeholder="Фамилия*" validation-type="surname" v-model="surname" :required="true"></Input>
                        <Input placeholder="Отчество" v-model="lastName" ></Input>
                        <Input placeholder="Дата рождения*" validation-type="date" v-model="dateOfBirth" inputType="date" :required="true"></Input>
                        <div class="input-confirm">
                            <Input placeholder="Телефон*" validation-type="phone" v-model="phoneNumber" inputType="tel" :required="true"></Input>
                            <MainBtn v-show="!phoneConfirmed" class-name="btn-primary" data-fancybox data-src="#phoneAprovalModal">Подтвердить</MainBtn>
                        </div>
                        <div class="input-confirm">
                            <Input placeholder="Email" validation-type="email" v-model="email" :required="true"></Input>
                            <MainBtn v-show="!emailConfirmed" class-name="btn-primary" data-fancybox data-src="#emailAprovalModal">Подтвердить</MainBtn>
                        </div>
                        <div class="profile-data__form-line">
                            <InputsDropdown></InputsDropdown>
                        </div>
                        <MainBtn class-name="btn-primary" type="submit" @click.prevent="handleSubmit">Сохранить</MainBtn>
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
import Input from '../components/UI/Input.vue';
import InputsDropdown from '../components/UI/InputsDropdown.vue';



import useVuelidate from "@vuelidate/core";
import { helpers, required, email } from "@vuelidate/validators";

import { Fancybox } from "@fancyapps/ui";
import ModalApproval from '../components/modals/modalApproval.vue';

export default {
    components: {
    Breadcrumbs,
    MainBtn,
    DetailLinks,
    Input,
    InputsDropdown,
    ModalApproval
},
    data() {
        return {
            adress: '',
            name: '',
            surname: '',
            lastName: '',
            dateOfBirth: '',
            phoneNumber: '',
            email: 'gaintsevmail@gmail.com',
            phoneConfirmed: false, emailConfirmed: false
        };
    },
    setup() {
        return {
            v$: useVuelidate(),
        };
    },
    validations() {
        return {
            emailInput: {
                required: helpers.withMessage("Поле должно быть заполнено", required),
                email: helpers.withMessage("Неправильный формат почты", email),
            },
        };
    },
    methods: {
        async handleSubmit() {
            var validationResult = await this.v$.$validate();
            
            if (!validationResult) {
                console.log("Validation failed");
                return;
            }
            
            // Validation Successful, can submit the form now.
            console.log("Validation successful");
            // submit();
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