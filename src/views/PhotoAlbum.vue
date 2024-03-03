<template>
    <section class="photo-album">
        <v-container>
            <div class="breadcrumbs text-page__breadcrumbs">
                <router-link class="breadcrumbs-item" to="/">Главная</router-link>
                <div class="breadcrumbs-divider">/</div>
                <a class="breadcrumbs-item active">Фотоальбомы</a>
            </div>
            <div class="photo-album__label">
                Фотоальбомы
            </div>

            <v-row class="photo-album__row">
                <v-col md="4" sm="6" cols="12" v-for="(item, index) in Object.keys(galleries)" :key="index" v-if="galleries && Object.keys(galleries).length > 0">
                    <div class="photo-album__item">
                        <Fancybox
                        class="photo-album__item-photos"
                        :options="{
                            Carousel: {
                                infinite: true,
                            },
                        }">
                        <div v-for="(photos, i) in 4" :key="i">
                            <img :src="galleries[item][i]" :data-fancybox="'gallery' + index" alt="" v-if="galleries[item] && galleries[item][i]">
                            <div class="blank" alt="" v-else></div>
                        </div>
                        <img :src="photos" class="d-none" :data-fancybox="'gallery' + index" alt="" v-for="(photos, i) in galleries[item].slice(4,item.length)" :key="index">
                    </Fancybox>
                    <div class="photo-album__item-label">
                        {{ item }}
                        <span>{{ item.length }} фото</span>
                    </div>
                </div>
            </v-col>
            <v-col md="4" sm="6" cols="12" v-for="(item, index2) in 6" :key="index2" v-else>
                    <div class="photo-album__item">
                        <div class="photo-album__item-photos">
                        <div v-for="(photos, i) in 4" :key="i">
                            <div class="blank" alt=""></div>
                        </div>
                    </div>
                </div>
            </v-col>
    </v-row>
</v-container>
</section>
</template>

<script>
import Breadcrumbs from '../components/UI/Breadcrumbs.vue';
import MainBtn from '../components/UI/MainBtn.vue';
import { Fancybox } from '@fancyapps/ui';
import {mapState} from "vuex";
import store from "../store/store";

export default {
    components: {
        Breadcrumbs,
        MainBtn
    },
    data() {
        return {
            add:false,
            name:'',
            photos:null,
            galleries_ready:false,
            galleries: {},
            new_name:'',
        }
    },
    head() {
        return {
            title: "Фотогалерея | Caresse Crosby",
            meta: [
                { content: "Фотогалерея | Caresse Crosby" }
            ]
        }
    },
    methods: {
        saveNew() {
            store.commit('loader','start');
            if (this.$route.params.albumName && !this.name) this.name = this.$route.params.albumName

            if (this.photos && this.photos.length > 0) {
                let fd = new FormData, i = 0;
                for (let p of this.photos) {
                    let file_name = 'gal.' + Date.now()
                    if (i > 0) file_name += "_" + i;
                    i++;
                    fd.append(file_name, p);

                    let new_banner = {}
                    new_banner.file = file_name + p.name.substr(p.name.lastIndexOf('.'))
                    new_banner.name = this.name
                    new_banner.about = "gallery"
                    new_banner.header = this.name
                    new_banner.button = ''
                    new_banner.link = ''
                    this.$API.create_banner(new_banner)
                }
                this.$API.uploadPhoto(fd).then(value => {
                    if (value.data.success) {
                        store.commit('set_snack_message', {
                            msg: "Загрузка прошла успешно",
                            color: 'green'
                        })
                        this.get_galleries()
                    }
                    else store.commit('set_snack_message', {
                        msg: "Произошла ошибка при загрузке изображения. Попробуйте использовать другое изображение.",
                        color: 'red'
                    })
                    store.commit('loader','finish');
                });
            } else {
                store.commit('loader','finish');
                store.commit('set_snack_message', {
                    msg: "Изображений не найдено. Произошла ошибка при загрузке изображения. Попробуйте использовать другое изображение.",
                    type: 'error'
                })
            }
            this.photos = null;
        },
        get_galleries(){
            this.galleries_ready = false;
            this.$API.getGallery().then(value =>{
                if(value.data.success && value.data.banners){
                    for (let b of value.data.banners){
                        if (this.galleries[b.header]) this.galleries[b.header].push(b.file_name)
                        else {
                            this.galleries[b.header] = []; this.galleries[b.header].push(b.file_name)
                        }
                    }
                    this.galleries_ready = true;
                } else {
                    store.commit('set_snack_message', {
                        msg: "Фотоальбомы не найдены.",
                        color: 'red'
                    })
                }
            })
        },
        delGall(gallery){
            this.$API.delGallery(gallery);
            setTimeout(()=>this.get_galleries(),500);
        },
        changeName(oldName, newName){
            this.$API.changeGalleryName(oldName, newName.trim()).then(() => {
                this.$router.push(newName); this.get_galleries();});
            },
            delGalleryPhoto(path){
                this.$API.delGalleryPhoto(path);
                setTimeout(()=>this.get_galleries(),500);
            },
        },
        computed:{
            ...mapState(['user_info',]),
        },
        created() {
            this.get_galleries()
        }
    };
</script>

<style lang="scss">
.photo-album__row
{
    row-gap: 6.4rem;
}
.photo-album
{
    padding: 2.4rem 0 12rem 0;
    &__label
    {
        margin-bottom: 5.6rem;
        color: $primary;
        font-size: 4rem;
        font-weight: 600;
        line-height: 1.2em;
        letter-spacing: -0.4px;
    }
}
.photo-album__item
{
    &-photos
    {
        margin-bottom: 1.8rem;
        height: 42rem;
        display: grid;
        grid-template-columns: repeat(2,50%);
        grid-template-rows: repeat(2, 50%);
        img
        {
            width: 100%;
            height: 100%;
            object-fit: cover;
            cursor: pointer;
        }
        .blank
        {
            width: 100%;
            height: 100%;
            background: linear-gradient(100deg, #eceff1 30%, #f6f7f8 50%, #eceff1 70%);
            background-size: 400%;
            animation: blankAnimation 1.2s ease-in-out infinite;
        }
    }
    &-label
    {
        display: flex;
        align-items: flex-end;
        column-gap: 1.6rem;
        color: $primary;
        font-size: 2.8rem;
        font-weight: 500;
        line-height: 1.2em;
        letter-spacing: -0.504px;
        span
        {
            color:#A6A5A3;
            font-size: 1.8rem;
            font-weight: 500;
            line-height: 1.55em;
            letter-spacing: -0.216px;
        }
    }
}
@media (max-width: 960px) {
    .photo-album__row
    {
        row-gap: 32px;
    }
    .photo-album
    {
        padding: 32px 0 48px 0;
        &__label
        {
            margin-bottom: 36px;
            font-size: 32px;
        }
    }
    .photo-album__item
    {
        &-photos
        {
            margin-bottom: 18px;
            height: 260px;
        }
        &-label
        {
            width: 100%;
            font-size: 24px;
            justify-content: space-between;
            align-items: flex-end;
            span
            {
                font-size: 14px;
            }
        }
    }
}
@media (max-width: 600px) {
    .photo-album__item
    {
        &-photos
        {
            height: 320px;
        }
    }
}
</style>
