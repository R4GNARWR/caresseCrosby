<template>
    <div class="form-control__wrap">
        <input class="form-control" type="text" :placeholder="placeholderText">
    </div>
</template>
<script>
export default {
    props: {
        placeholderText: String,
    }
}
</script>
<style lang="scss">
.form-control__wrap
{
    width: 100%;
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
}
</style>