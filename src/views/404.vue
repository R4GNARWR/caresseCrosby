<template>
    <section class="error">
        <v-container>
            <Breadcrumbs></Breadcrumbs>
            <v-row>
                <v-col md="6" cols="12">
                    <div class="error-img">
                        <img src="/img/error-img.png" alt="">
                    </div>
                </v-col>
                <v-col md="6" cols="12">
                    <div class="error-content">
                        <div class="error-label__img">
                            <img src="/img/404.png" alt="">
                        </div>
                        <div class="error-label">
                            Страница, которую Вы ищете, не может быть найдена
                        </div>
                        <div class="error-text">
                            Возможно, запрашиваемая Вами страница была перенесена или удалена. Также возможно, Вы допустили небольшую опечатку при вводе адреса – такое случается даже с нами, поэтому еще раз внимательно проверьте
                        </div>
                        <MainLink class-name="btn-gold">На главную</MainLink>
                    </div>
                    
                </v-col>
            </v-row>
        </v-container>
    </section>
</template>
<script>
import Breadcrumbs from '../components/UI/Breadcrumbs.vue';
import MainLink from '../components/UI/MainLink.vue';


export default {
    components: {
        MainLink,
        Breadcrumbs
    },
    data() {
        return {};
    },
};
</script>
<style lang="scss">
.error
{
    padding: 2.4rem 0 6rem 0;
}
.error-img
{
    width: 100%;
    height: 50rem;
    img
    {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
}
.error-content
{
    display: flex;
    flex-direction: column;
}
.error-label__img
{
    margin-bottom: 5.6rem;
    width: 36rem;
    height: 14rem;
    img
    {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
    
}
.error-label
{
    margin-bottom: 2.1rem;
    color: #5B5B5B;
    font-size: 1.8rem;
    font-weight: 600;
}
.error-text
{
    margin-bottom: 4rem;
    color: #877F77;
    font-size: 1.4rem;
    line-height: 163.92%;
}
@media (max-width: 960px) {
    .error-img
    {
        height: 350px;
    }
    .error-label__img
    {
        margin-bottom: 18px;
        height: 200px;
        width: 100%;
        
    }
    .error-label
    {
        margin-bottom: 16px;
        font-size: 18px;
    }
    .error-text
    {
        margin-bottom: 24px;
        font-size: 14px;
    }
}
@media (max-width: 600px) {
    .error
    {
        padding: 32px 0 100px 0;
    }
    .error-img
    {
        height: 250px;
    }
    .error-label__img
    {
        height: 150px;
    }
}

</style>