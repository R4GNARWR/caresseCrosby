<template>
    <div class="form-control__wrap" :class="{'error': v$.$errors.length > 0}">
        <input class="form-control"
        :type="inputType ?? 'text'"
        :name="name"
        :placeholder="placeholder"
        :value="modelValue"
        :required="required ? 'true' : null"
        @input="$emit('update:modelValue', $event.target.value)">
        <div class="form-control__errors" v-for="error of v$.$errors" :key="error.$uid">
            <div class="form-control__errors-item">{{ error.$message }}</div>
        </div>
    </div>
</template>
<script>
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'

export default {
    props: {
        inputType: String,
        name: String,
        validationType: String,
        modelValue: String,
        placeholder: String,
        required: Boolean,
    },
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
                        required: helpers.withMessage("Пожалуйста, введите ваш телефон", required),
                    }
                };
                case 'email':
                return {
                    modelValue: {
                        required: helpers.withMessage("Пожалуйста, введите вашу электронную почту", required),
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
        } else if(this.required)
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
            this.$emit('input', event.target.value);
        },
        onChange(event) {
            this.$emit('change', event.target.value);
        },
    },
}   
</script>
<style lang="scss">
.form-control__wrap
{
    width: 100%;
    &.error
    {
        .form-control
        {
            border-bottom:1px solid #C11D1D;
        }
    }
}
.form-control
{
    padding: .4rem 0 1.8rem 0;
    width: 100%;
    background-color: transparent;
    border-bottom:1px solid #A6A5A3;
    outline: 0;
    &,
    &::placeholder
    {
        color:#A6A5A3;
        font-size: 1.6rem;
        line-height: 1.5em;
        letter-spacing: -0.128px;
    }
    &
    {
        color:$primary;
    }
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
        &,
        &::placeholder
        {
            font-size: 14px;
        }
        
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