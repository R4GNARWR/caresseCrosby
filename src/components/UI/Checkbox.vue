<template>
    <div class="checkbox-wrap">
        <input :type="type"
        :name="index+'__radio'"
        @input="$emit('update:modelValue', value)"
        ref="inputEl"
        :checked="isChecked"
        v-if="index && type && type==='radio'" @click="handleClick">
        <input v-else type="checkbox" :value="value"
        ref="inputEl"
        @input="$emit('update:modelValue', value)">
        <label for=""></label>
        {{value}}
    </div>
</template>
<script>
export default {
    data() {
        return {
            isChecked : false,
        }
    },
    emits: ['update:modelValue'],
    props: {
        type: String,
        index: null,
        value: [String, Number],
        modelValue: {
            type: [String, Number],
            default: null,
        },
    },
    created() {
        if (this.modelValue && this.value) {
            if(String(this.modelValue) === String(this.value)) {
                this.isChecked = true
            }
        }
    },
    watch: {
        modelValue(newValue) {
            if(String(newValue) === String(this.value)) {
                this.isChecked = true
            }
        },
    },
    methods: {
        handleClick() {
            if(this.$emit('click-event')) {
                this.$emit('click-event')
            }
        }
    },
}
</script>
<style lang="scss">
.checkbox-wrap
{
    position: relative;
    display: flex;
    align-items: center;
    column-gap: 1rem;
    color: $primary;
    font-size: 1.7rem;
    line-height: 1.4em;
    
    label
    {
        position: relative;
        display: block;
        width: 2rem;
        height: 2rem;
        border: 2px solid #827F7D;
        background-color: transparent;
        transition: .3s;
        &::after
        {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            display: block;
            width: 100%;
            height: 100%;
            opacity: 0;
            background-image: url('/svg/check.svg');
            background-position: center;
            
        }
    }
    input
    {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 10;
        opacity: 0;
        cursor: pointer;
    }
    input:checked + label
    {
        border: 2px solid #C0B09D;
        background-color: #C0B09D;
    }
    input:checked + label::after
    {
        opacity: 1;
    }
}
@media (max-width: 991px) {
    .checkbox-wrap
    {
        column-gap: 12px;
        font-size: 14px;
        line-height: 1.4em;
        
        label
        {
            width: 24px;
            height: 24px;
        }
    }
}
</style>