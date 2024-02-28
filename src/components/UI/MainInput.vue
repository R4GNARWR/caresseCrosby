<template>
    <div class="form-control__wrap" :class="{'error': v$.$errors.length > 0}">
        <label class="form-control__label">{{ placeholder }}</label>
        <input class="form-control"
        :type="inputType"   
        :name="name"
        :value="modelValue"
        :required="required"
        :id="inputId"
        :min="min"
        :autocomplete="inputType === 'email' ? 'email': ''"
        v-if="inputType !== 'tel' && inputType !== 'date'"
        @input="$emit('update:modelValue', $event.target.value)"
        @blur="$emit('blurEvent')">
        <input class="form-control tel"
        :type="inputType"
        :name="name"
        :value="modelValue"
        :required="required"
        :id="inputId"
        :min="min"
        maxlength="18"
        autocomplete="tel"
        v-if="inputType === 'tel'"
        @input="onInput($event)">
        <input class="form-control"
        :type="inputType"
        :name="name"
        :value="modelValue"
        :required="required"
        :id="inputId"
        :min="min"
        @focus="this.showPicker($event.target)"
        @input="$emit('update:modelValue', $event.target.value)"
        v-if="inputType === 'date'">
        <div class="form-control__errors" v-for="error of v$.$errors" :key="error.$uid">
            <div class="form-control__errors-item">{{ error.$message }}</div>
        </div>
    </div>
</template>
<script>
import { useVuelidate } from '@vuelidate/core'
import { vMaska, MaskInput } from "maska"
import { required, helpers, email, minLength} from '@vuelidate/validators'
export default {
    props: {
        inputType: {
            type: String,
            default: 'text'
        },
        name: String,
        validationType: String,
        modelValue: String,
        placeholder: String,
        required: {
            type: Boolean,
            default: false
        },
        min: null,
        inputId:String,
    },
    directives: { maska: vMaska },
    data() {
        return {
        }
    },
    setup () {
        return {
            v$: useVuelidate()
        }
    },
    validations() {
        if(this.required && this.validationType){
            switch(this.validationType) {
                case 'name':
                return {
                    modelValue: {
                        minLength: helpers.withMessage("Пожалуйста, введите полное имя", minLength(2)),
                        required: helpers.withMessage("Пожалуйста, введите ваше имя", required),
                    }
                };
                case 'surname':
                return {
                    modelValue: {
                        required: helpers.withMessage("Пожалуйста, введите вашу фамилию", required),
                    }
                };
                case 'phone':
                return {
                    modelValue: {
                        minLength: helpers.withMessage("Пожалуйста введите телефон полностью", minLength(17)),
                        required: helpers.withMessage("Пожалуйста, введите ваш телефон", required),
                    }
                };
                case 'email':
                return {
                    modelValue: {
                        required: helpers.withMessage("Пожалуйста, введите вашу электронную почту", required),
                        email: helpers.withMessage("Неправильный формат почты", email),
                    }
                };
                case 'date':
                return {
                    modelValue: {
                        required: helpers.withMessage("Пожалуйста, введите вашу дату рождения", required),
                    }
                };
                case 'adress':
                return {
                    modelValue: {
                        required: helpers.withMessage("Пожалуйста, введите адрес доставки", required),
                    }
                };
            }
        } else if(this.required && !this.validationType)
        {
            return {
                modelValue: {
                    required: helpers.withMessage("Поле должно быть заполнено", required),
                }
            };
        }
        
    },
    methods: {
        onInput(event) {
            let string = event.target.value
            this.$emit('update:modelValue', string);
        },
        showPicker(item) {
            item.showPicker()
        }
    },
    mounted() {
        new MaskInput(".tel", {
            mask: (value) => {
                if(value.startsWith('7') || value.startsWith('+7') || value.startsWith('9')) {
                    return '+7 (###) ###-##-##'
                } else {
                    return '+################'
                }
            },
            preProcess: (value) => value.startsWith('8') ? 7 + value.substring(1) : value
        })
    }
}   
</script>
<style lang="scss">
.form-control__wrap
{
    width: 100%;
    &.error
    {
        padding: inherit;
        .form-control
        {
            border-bottom:1px solid #C11D1D;
        }
    }
}
.form-control__label
{
    margin-bottom: .5em;
    color:#A6A5A3;
    font-size: 1.6rem;
    line-height: 1.5em;
    letter-spacing: -0.128px;
}
.form-control
{
    padding: .4rem 0 1.8rem 0;
    width: 100%;
    background-color: transparent;
    border-bottom:1px solid #A6A5A3;
    outline: 0;
    color:$primary;
    font-size: 1.6rem;
    line-height: 1.5em;
    letter-spacing: -0.128px;
}
.form-control__errors
{
    margin-top: .8rem;
    .form-control__errors-item
    {
        color: #C11D1D;
        font-size: 1.1rem;
        line-height: 1.45em;
        letter-spacing: 0.055px;
    }
}
@media (max-width: 960px) {
    .form-control
    {
        padding: 4px 0 16px 0;
        font-size: 14px;
        
    }
    .form-control__label
    {
        font-size: 14px;
    }
    .form-control__errors
    {
        margin-top: 8px;
        .form-control__errors-item
        {
            font-size: 11px;
        }
    }
}
</style>