<template>
    <v-container class="product-detail__wrap">
        <div class="breadcrumbs text-page__breadcrumbs">
            <router-link class="breadcrumbs-item" to="/">Главная</router-link>
            <div class="breadcrumbs-divider">/</div>
            <router-link class="breadcrumbs-item" :to="'/catalog/' + category.id">Каталог</router-link>
            <div class="breadcrumbs-divider">/</div>
            <a class="breadcrumbs-item active">{{product.name}}</a>
        </div>
        <section class="product-detail">
            <v-row>
                <v-col md="8" cols="12">
                    <div class="product-detail__images d-lg-grid d-none" v-if="!photosLoaded">
                        <img src="/img/loading.gif" v-for="(item, index) in 4" :key="index" alt="" >
                    </div>
                    <div class="product-detail__images d-lg-grid d-none" v-if="photosLoaded && full_photos">
                        <img v-lazy="item" v-for="(item, index) in full_photos.slice(0,4)" :key="index" alt="" >
                    </div>
                    <div class="no-photo" v-if="photosLoaded && !full_photos">
                        Вышлем фото по запросу
                    </div>
                    <div class="d-lg-none d-block" style="position: relative;">
                        <swiper-container
                        class="swiper product-detail__swiper"
                        slides-per-view="1"
                        loop= "true"
                        :pagination="{
                            clickable: true,
                            el: '.product-swiper__pagination'
                        }">
                        <swiper-slide class="swiper-slide" v-if="!photosLoaded">
                            <img src="/img/loading.gif" alt="">
                        </swiper-slide>
                        <swiper-slide class="swiper-slide" v-for="(item, index) in full_photos" :key="index" v-if="photosLoaded && full_photos">
                            <img v-lazy="item" alt="" >
                        </swiper-slide>
                        
                    </swiper-container>
                    <SwiperPagination class="product-swiper__pagination"></SwiperPagination>
                </div>
            </v-col>
            <v-col md="4" cols="12">
                <div class="product-detail__info">
                    <div class="product-detail__info-top">
                        <div class="product-detail__info-label">
                            {{product.name}}
                        </div>
                        <div class="product-detail__info-type">
                            {{category.name}}
                        </div>
                        <div class="product-detail__info-price" v-if="product.lowerPrice">
                            {{computed_price_string(product.lowerPrice.value)}} ₽
                        </div>
                    </div>
                    <div class="product-detail__info-color">
                        <div class="product-detail__info-color__name" v-if="colors">
                            Цвет: <span>{{colors[0].attributeValueText}}</span>
                        </div>
                    </div>
                    <div class="product-detail__info-sizes">
                        <div class="product-detail__info-sizes__item">
                            <div class="label">
                                Выберите размер
                                <a @click="openSizeModal()">Таблица размеров</a>
                            </div>
                            <div class="buttons">
                                <div class="buttons-item" v-for="item in sizes">
                                    <input type="radio" name="size" :value="item" v-model="product.size" >
                                    <label>{{item}}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="product-detail__info-buttons" v-if="!addToOrder">
                        <MainBtn v-if="!cartQuantity || cartQuantity===0" :disabled="!product.size" class-name="btn-primary" @click="handleAddToCart()">Добавить в корзину</MainBtn>
                        <div v-else class="product-detail__info-buttons-counter">
                            <button class="eq-minus" @click.prevent="changeQ(product, -1);">-</button>
                            {{cartQuantity}}
                            <button class="eq-plus" @click.prevent="changeQ(product, +1)">+</button>
                        </div>
                        <MainBtn class-name="btn-danger btn-icon" @click="delProduct(product.id)" v-if="user_info.role === 3">
                            <v-icon icon="mdi-trash-can-outline" color="#FF7171">
                            </v-icon>
                        </MainBtn>
                        <MainBtn class-name="btn-primary heart btn-icon" @click="addFavorite(product.id)" :class="{'active': the_heart}">
                            <v-icon icon="mdi-heart-outline" color="#FFF" v-if="!the_heart">
                            </v-icon>
                            <v-icon icon="mdi-heart" color="#FF7171" v-if="the_heart"></v-icon>
                            <div class="tooltip" v-if="!the_heart">Добавить в избранное</div>
                            <div class="tooltip" v-if="the_heart">Убрать из изранного</div>
                        </MainBtn>
                    </div>
                    <div class="product-detail__info-buttons" v-else>
                        <MainBtn :disabled="!product.size" class-name="btn-primary" @click="handleAddToCart()">Добавить в заказ</MainBtn>
                        <MainBtn class-name="btn-danger btn-icon" @click="delProduct(product.id)" v-if="user_info.role === 3">
                            <v-icon icon="mdi-trash-can-outline" color="#FF7171">
                            </v-icon>
                        </MainBtn>
                        <MainBtn class-name="btn-primary heart btn-icon" @click="addFavorite(product.id)" :class="{'active': the_heart}">
                            <v-icon icon="mdi-heart-outline" color="#FFF" v-if="!the_heart">
                            </v-icon>
                            <v-icon icon="mdi-heart" color="#FF7171" v-if="the_heart"></v-icon>
                            <div class="tooltip" v-if="!the_heart">Добавить в избранное</div>
                            <div class="tooltip" v-if="the_heart">Убрать из изранного</div>
                        </MainBtn>
                    </div>
                    <div class="product-detail__info-props">
                        <div class="product-detail__info-props__item">
                            <div class="name">
                                Бренд:
                            </div>
                            <div class="desc" v-for="attr of brand.slice(0,1)" :key="attr.attributeValueText" v-if="brand">
                                {{attr.attributeValueText}}
                            </div>
                            <div class="desc" v-else>
                                Данные отсутствует
                            </div>
                        </div>
                        <div class="product-detail__info-props__item" >
                            <div class="name">
                                Состав:
                            </div>
                            <div class="desc" v-for="attr of structure" :key="attr.attributeValueText" v-if="structure">
                                {{attr}},
                            </div>
                            <div class="desc" v-else>
                                Данные отсутствует
                            </div>
                        </div>
                        <div class="product-detail__info-props__item">
                            <div class="name">
                                Описание:
                            </div>
                            <div class="desc" v-if="product.description">
                                {{product.description}}
                            </div>
                            <div class="desc" v-else>
                                Описание отсутствует
                            </div>
                        </div>
                    </div>
                    <div class="product-detail__info-whatsapp">
                        <a target="_blank" class="btn btn-gold outline" href="https://wa.me/79177471561?text=Здравствуйте%20у%20меня%20вопрос:">
                            <img src="/svg/whatsapp-gold.svg" alt="">
                            Консультация в Whats App
                        </a>
                    </div>
                </div>
            </v-col>
        </v-row>
    </section>
    <ModalSizes id="modalSizes"></ModalSizes>
    <ModalToCart id="modalToCart" :product="product"></ModalToCart>
    <SwiperCards class="product-detail__section" name="Вам понравится" v-if="similar_products" :slidesArray="similar_products"></SwiperCards>
    <!--    <SwiperCards class="product-detail__section" name="С этим товаром покупают" v-if="similar_products" :slidesArray="products"></SwiperCards>-->
</v-container>
</template>

<script>
import {mapMutations, mapState} from "vuex";
import { Fancybox } from '@fancyapps/ui';
import { register } from 'swiper/element/bundle';

import cart from "../../api/cart";
import productCard from "../../api/productCard";
import store from "../../store/store";

import SwiperCards from '../SwiperCards.vue';
import MainBtn from '../UI/MainBtn.vue';
import SwiperPagination from "../UI/SwiperPagination.vue";
import ModalToCart from "../modals/ModalToCart.vue";
import MainLink from "../UI/MainLink.vue";
import ModalSizes from "../modals/ModalSizes.vue";


export default {
    data() {
        return {
            product:[],
            attributes:[],
            category:"",
            full_photos:null,
            photosLoaded: false,
            similar_products:[],
        };
    },
    props: {},
    components: { MainBtn, SwiperCards, SwiperPagination, ModalToCart, MainLink, ModalSizes },
    computed:{
        sizes(){
            if (this.attributes && this.attributes.length>0){
                let sizes=[]
                for (let attr of this.attributes) if (attr.attributeId === 2 && attr.attributeValueText) sizes.push(attr.attributeValueText)
                
                this.product.size = sizes[0]
                return sizes.sort(function( a, b ) {return parseInt(a)-parseInt(b)});
            } else return null;
        },
        colors(){
            if (this.attributes && this.attributes.length>0){
                let colors=[]
                for (let attr of this.attributes) if (attr.attributeId === 6) colors.push(attr)
                return colors
            } else return null;
        },
        brand(){
            if (this.attributes && this.attributes.length>0){
                let brand=[]
                for (let attr of this.attributes) if (attr.attributeId === 1) brand.push(attr)
                return brand
            } else return null;
        },
        structure(){
            if (this.attributes && this.attributes.length>0){
                let structure=[]
                for (let attr of this.attributes) if (attr.attributeId === 3) structure.push(attr.attributeValueText)
                return structure
            } else return null;
        },
        videoLink(){
            if (this.attributes && this.attributes.length>0){
                let videoLink=null
                for (let attr of this.attributes) if (attr.attributeId === 9) videoLink = attr.attributeValueText
                return videoLink
            } else return '';
        },
        in_favor(){
            if (this.favorites.includes(this.favorites.find(el=>el.id===this.product.id))) return true
            else return false
        },
        cartQuantity() {
            let q = 0;
            let product = this.product
            for (let cartPosition of this.cart) {
                if(cartPosition.id && this.product.id) {
                    if (cartPosition.id === product.id) {
                        product.quantity = cartPosition.q;
                        product.m = cartPosition.m;
                        q = cartPosition.q;
                    }
                }
            }
            return q;
        },
        the_heart() {
            for (let f of this.favorites)
            if (f.id === this.product.id) {
                return true;
            }
            return false;
        },
        ...mapState(['headerPadding','user_info','cart','colors_list','favorites', 'pop_products','cat_products', 'addToOrder'])
    },
    methods: {
        openFancybox(){
            Fancybox.close();
            Fancybox.show(
            [
            {
                src: '#modalToCart',
                type: 'inline',
            },
            ],
            {
                closeButton: false,
            }
            );
        },
        openSizeModal() {
            Fancybox.close();
            Fancybox.show(
            [
            {
                src: '#modalSizes',
                type: 'inline',
            },
            ],
            {
                closeButton: false,
                dragToClose: false,
            }
            );
        },
        handleAddToCart() {

            if(this.addToOrder) {
                this.addProductToOrder(this.addToOrder)
            } else {
                this.addProductToCart()
                this.openFancybox()
            }

        },
        updateProduct(){
            if (this.pop_products[this.$route.params.id]){
                if(this.pop_products[this.$route.params.id].category.id === 24473) {
                    this.$router.push('/giftCard')
                    return
                }
                this.product = this.pop_products[this.$route.params.id];
                this.attributes = this.pop_products[this.$route.params.id].attributes;
                this.category = this.pop_products[this.$route.params.id].category;
                this.category.hide_name = true;
                this.full_photos = this.pop_products[this.$route.params.id].full_photos;
                this.similar_products = this.pop_products[this.$route.params.id]['similar_products'];
                if(this.full_photos) {
                    this.photosLoaded = true
                }
                
            }
            else{
                this.attributes=[];
                this.$API.getProductById(this.$route.params.id).then(value =>{
                    if (value.data.status == "OK") {
                        if(value.data.response && value.data.response.category.id && value.data.response.category.id === 24473) {
                            this.$router.push('/giftCard')
                            return
                        }
                        this.product = value.data.response.product?value.data.response.product:null;
                        this.attributes = value.data.response.attributes?value.data.response.attributes:null;
                        this.category = value.data.response.category?value.data.response.category:null;
                        this.category.hide_name = true;
                        this.pop_products[this.$route.params.id] = this.product;
                        this.pop_products[this.$route.params.id].attributes = this.attributes;
                        this.pop_products[this.$route.params.id].category = this.category;
                        
                        this.$API.getFullPhotos(this.$route.params.id).then(value => {
                            this.photosLoaded = true
                            if(value.status ===200 && value.data.length>1) {
                                this.full_photos = value.data;
                                this.pop_products[this.$route.params.id].full_photos = this.full_photos;
                                //similar products
                                this.search_sim_products(this.brand ? this.brand[0]: null, this.colors?this.colors[0]:null, this.product.name)
                                
                            } else this.$API.getFullPhoto(this.$route.params.id).then(value => {
                                if (value.status && value.data){
                                    this.product.photo = value.data
                                    this.full_photos = [value.data]
                                    this.pop_products[this.$route.params.id].full_photos = [value.data];
                                    //similar products
                                    this.search_sim_products(this.brand?this.brand[0]:null, this.colors?this.colors[0]:null, this.product.name)
                                    
                                }
                            })
                        })
                    } else this.$router.push('/')
                })
            }
        },
        delete_prod(){
            this.$API.deleteProduct(this.$route.params.id);
            this.cat_products[this.product.category_id] = null;
            this.$router.go(-1);
        },
        addFavorite(id) {
            if(!this.the_heart){
                this.addFavor(id)
                store.commit("set_snack_message", {msg:"Товар добавлен в избранные"});
            } else {
                this.delFavor(id)
            }
        },
        // handleSizeChange(value) {
        //     if(this.cart.length>0) {
        //         let size = value;
        //         let hasSize = false;
        //         for(let item in this.cart) {
        //             if(item.size === size) {
        //                 console.log(item.size === size);
        //                 hasSize = true;
        //                 break;
        //             }
        //         };
        //         if(!hasSize) {
        //             this.deleteFromCart(this.product.id)
        //         }
                
        //     }
        //     if(this.cartHasSize) {
        //         for(let item in this.cart) {
        //             if(item.id === this.product.id && item.size === this.product.size) {
        //                 this.product.quantity = item.q
        //                 this.product.quantity.m = item.m;
                        
        //             }
        //         }
        //     }
        // },
        ...cart, ...productCard,
        ...mapMutations([
        "add2cart",
        'cartItemChangeQ',
        'cartItemSetQ',
        'removeFromCart',
        ])
    },
    watch: {
        '$route'(newRoute, oldRoute) {
            if (newRoute && newRoute.name === "Product" && newRoute !== oldRoute.params.id) {
                window.scroll(0,0);
                this.product=[];
                this.full_photos=null
                this.updateProduct();
            }
        },
    },
    beforeCreate() {
        register()
    },
    mounted() {
        this.updateProduct()
    },
}
</script>
<style lang="scss">
.product-detail
{
    margin-bottom: 1.5rem;
    padding-bottom: 5.6rem;
    border-bottom: 1px solid #E9E9E9;
}
.product-detail__section
{
    padding: 1.5rem 0 !important;
}
.product-detail__images
{
    display: grid;
    column-gap: .4rem;
    row-gap: .4rem;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    img
    {
        width: 100%;
        height: 51rem;
        object-fit: cover;
    }
}
.product-detail .no-photo
{
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.9rem;
    line-height: 1.33em;
    grid-column: 2 span;
    grid-row: 2 span;
}
.product-detail__swiper
{
    .swiper-slide
    {
        img
        {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
}
.product-detail__info-label
{
    color: $primary;
    font-size: 2.8rem;
    font-style: normal;
    font-weight: 600;
    line-height: 1.2em;
    letter-spacing: -0.504px;
}
.product-detail__info-type
{
    margin-bottom: 1.6rem;
    color: #A6A5A3;
    font-size: 1.6rem;
    line-height: 1.5em;
    letter-spacing: -0.128px;
}
.product-detail__info-price
{
    margin-bottom: 3.2rem;
    color: $primary;
    font-size: 1.6rem;
    font-weight: 500;
    line-height: 1.5em;
    letter-spacing: -0.128px;
}
.product-detail__info-color
{
    
    &__name
    {
        margin-bottom: 1.8rem;
        color: $primary;
        font-size: 1.6rem;
        line-height: 1.5em;
        letter-spacing: -0.128px;
        span
        {
            color: #A6A5A3;
        }
    }
}
.product-detail__info-images
{
    display: flex;
    column-gap: 1.2rem;
    padding-bottom: 1.6rem;
    border-bottom: 1px solid #C0B09D;
    a
    {
        width: 4.4rem;
        height: 5.6rem;
        flex-shrink: 0;
        &.active
        {
            padding: 1px;
            border: 1px solid #C0B09D;
        }
        img
        {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
}
.product-detail__info-sizes
{
    padding-top: 1.6rem;
    margin-bottom: 3.2rem;
    display: flex;
    flex-direction: column;
    row-gap: 1.6rem;
    &__item
    {
        display: flex;
        flex-direction: column;
        row-gap: 1.6rem;
        .label
        {
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: $primary;
            font-size: 1.6rem;
            line-height: 1.5em;
            letter-spacing: -0.128px;
            a
            {
                color:#867B6E;
                font-size: 1.6rem;
                font-weight: 500;
                line-height: 1.5em;
                letter-spacing: -0.128px;
            }
        }
        .buttons
        {
            display: flex;
            flex-wrap: wrap;
            column-gap: .8rem;
            row-gap: .8rem;
            &-item
            {
                position: relative;
                input
                {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    opacity: 0;
                    cursor: pointer;
                }
                label
                {
                    padding: 0 4px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-width: 4rem;
                    height: 4rem;
                    color: $primary;
                    font-size: 1.6rem;
                    font-weight: 600;
                    line-height: 1em;
                    letter-spacing: -0.128px;
                    border: 1px solid#D3D2D1;
                    transition: .2s;
                }
                &:hover
                {
                    label
                    {
                        background-color: #CBBDAE;
                    }
                }
                input:checked ~ label
                {
                    color: #FFF;
                    background-color: $primary;
                    border: $primary;
                }
            }
        }
    }
}
.product-detail__info-buttons
{
    display: flex;
    column-gap: .8rem;
    &-counter
    {
        flex-grow: 1;
        border: 1px solid #867B6E;
        padding: 1.4rem 3.2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.6rem;
        column-gap: 1.6rem;
    }
    .btn:nth-child(1)
    {
        flex-grow: 1;
    }
    .btn.heart:hover
    {
        position: relative;
        .tooltip
        {
            opacity: 1;
        }
        i
        {
            color: $primary !important;
        }
    }
    .btn.heart.active:hover
    {
        i
        {
            color: #FF7171 !important;
        }
    }
}
.product-detail__info-props
{
    margin-top: 3.2rem;
    display: flex;
    flex-direction: column;
    row-gap: 2.4rem;
    &__item
    {
        display: flex;
        flex-direction: column;
        row-gap: .4rem;
        .name
        {
            color: #A6A5A3;
            font-size: 1.6rem;
            line-height: 1.5em;
            letter-spacing: -0.128px;
        }
        .desc
        {
            color: $primary;
            font-size: 1.6rem;
            line-height: 1.5em;
            letter-spacing: -0.128px;
        }
    }
}
.product-detail__info-whatsapp
{
    a
    {
        margin-top: 3.2rem;
        width: 100%;
    }
}
@media (max-width: 960px) {
    .product-detail .no-photo
    {
        font-size: 24px;
    }
    .btn.heart
    {
        width: auto;
    }
    .product-detail__info-buttons-counter
    {
        font-size: 16px;
        column-gap: 30px;
        button
        {
            padding: 10px;
            font-size: 25px;
        }
    }
    .product-detail__info-sizes__item .buttons-item
    {
        min-width: 40px;
    }
    .product-detail__section
    {
        padding: 16px 0 !important;
    }
    .product-detail__swiper
    {
        height: 580px;
    }
    .product-detail__info-label
    {
        margin-bottom: 2px;
        font-size: 24px;
    }
    .product-detail__info-type
    {
        margin-bottom: 16px;
        font-size: 14px;
    }
    .product-detail__info-price
    {
        margin-bottom: 32px;
        font-size: 14px;
    }
    .product-detail__info-color
    {
        &__name
        {
            margin-bottom: 16px;
            font-size: 14px;
            span
            {
                color: #A6A5A3;
            }
        }
    }
    .product-detail__info-images
    {
        column-gap: 12px;
        padding-bottom: 16px;
        a
        {
            width: 44px;
            height: 56px;
            flex-shrink: 0;
            &.active
            {
                padding: 1px;
                border: 1px solid #C0B09D;
            }
        }
    }
    .product-detail__info-sizes
    {
        padding-top: 16px;
        margin-bottom: 32px;
        row-gap: 16px;
        &__item
        {
            row-gap: 16px;
            .label
            {
                font-size: 14px;
                a
                {
                    font-size: 14px;
                }
            }
            .buttons
            {
                column-gap: 8px;
                row-gap: 8px;
                
                &-item
                {
                    label
                    {
                        width: auto;
                        height: 40px;
                        font-size: 14px;
                    }
                }
            }
        }
    }
    .product-detail__info-props
    {
        margin-top: 32px;
        row-gap: 24px;
        &__item
        {
            row-gap: 4px;
            .name,
            .desc
            {
                font-size: 14px;
            }
        }
    }
    .product-detail__info-whatsapp
    {
        a
        {
            margin-top: 32px;
        }
    }
}
@media (max-width: 600px) {
    .breadcrumbs
    {
        display: none;
    }
    
    .product-detail__info
    {
        max-width: 320px;
        margin-inline: auto;
    }
    .product-detail__wrap
    {
        max-width: 100% !important;
    }
}
</style>
