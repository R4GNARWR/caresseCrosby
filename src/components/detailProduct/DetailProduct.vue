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
                        <img v-lazy="item" v-for="(item, index) in full_photos.slice(0,4)" :key="index" alt="" data-fancybox="gallery-product" >
                    </div>
                    <div class="no-photo" v-if="photosLoaded && !full_photos">
                        Вышлем фото по запросу
                    </div>
                    <div class="d-lg-none d-block" style="position: relative;">
                        <swiper-container
                        class="swiper product-detail__swiper"
                        slides-per-view="1"
                        :pagination="{
                            clickable: true,
                            el: '.product-swiper__pagination'
                        }"
                        loop= "true">
                            <swiper-slide class="swiper-slide" v-if="!photosLoaded">
                                    <img src="/img/loading.gif" alt="">
                            </swiper-slide>
                            <swiper-slide class="swiper-slide" v-for="(item, index) in full_photos" :key="index" v-if="photosLoaded && full_photos">
                                    <img v-lazy="item" alt="" data-fancybox="gallery-product-mobile">
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
                        <MainBtn class-name="btn-danger btn-icon" @click="delete_prod()" v-if="user_info.role === 3">
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
                        <MainBtn class-name="btn-danger btn-icon" @click="delete_prod()" v-if="user_info.role === 3">
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
let sortOrder={'36':26,'38':35,'40':48,'42':58,'44':67,'46':69,'48':71,'50':73,'70':101,'75':127,'80':153,"1(S-M)":0,"100C":1,"100D":2,"100DD":3,"100E":4,"100F":5,"100FF":6,"100G":7,"100GG":8,"100H":9,"100HH":10,"100I":11,"105D":12,"105DD":13,"105E":14,"105F":15,"105FF":16,"105G":17,"105GG":18,"105H":19,"105HH":20,"2 (M)":21,"2XL":22,"3 (L)":23,"3 (M-L)":24,"35-38":25,"36-38":27,"36-41":28,"36F":29,"36G":30,"36H":31,"36I":32,"36J":33,"37-38":34,"38C":36,"38D":37,"38E":38,"38F":39,"38G":40,"38H":41,"38I":42,"38J":43,"39-40":44,"39-41":45,"39-42":46,"3XL":47,"40-42":49,"40C":50,"40D":51,"40E":52,"40F":53,"40G":54,"40H":55,"40I":56,"40J":57,"42-44":59,"42D":60,"42E":61,"42F":62,"42G":63,"42H":64,"42I":65,"42J":66,"44-46":68,"46-48":70,"4XL":72,"50-52":74,"5XL":75,"60DD":76,"60E":77,"60F":78,"60FF":79,"60G":80,"60GG":81,"60H":82,"60HH":83,"60J":84,"60JJ":85,"60K":86,"65B":87,"65D":88,"65DD":89,"65E":90,"65F":91,"65FF":92,"65G":93,"65GG":94,"65H":95,"65HH":96,"65I":97,"65J":98,"65JJ":99,"65K":100,"70 D":102,"70 DD":103,"70 E":104,"70 F":105,"70 FF":106,"70A":107,"70B":108,"70C":109,"70D":110,"70DD":111,"70E":112,"70F":113,"70FF":114,"70G":115,"70GG":116,"70H":117,"70HH":118,"70I":119,"70J":120,"70JJ":121,"70K":122,"70L":123,"70M":124,"70N":125,"70С":126,"75 E":128,"75 F":129,"75 FF":130,"75 H":131,"75A":132,"75B":133,"75C":134,"75D":135,"75DD":136,"75E":137,"75F":138,"75FF":139,"75G":140,"75GG":141,"75H":142,"75HH":143,"75I":144,"75J":145,"75JJ":146,"75K":147,"75L":148,"75M":149,"75N":150,"75O":151,"75С":152,"80A":154,"80B":155,"80C":156,"80D":157,"80DD":158,"80E":159,"80F":160,"80FF":161,"80G":162,"80GG":163,"80H":164,"80HH":165,"80I":166,"80J":167,"80JJ":168,"80K":169,"80L":170,"80M":171,"80N":172,"80O":173,"85A":174,"85B":175,"85C":176,"85D":177,"85DD":178,"85E":179,"85F":180,"85FF":181,"85G":182,"85GG":183,"85H":184,"85HH":185,"85I":186,"85J":187,"85JJ":188,"85K":189,"85L":190,"85M":191,"85N":192,"85С":193,"90A":194,"90B":195,"90C":196,"90D":197,"90DD":198,"90E":199,"90F":200,"90FF":201,"90G":202,"90GG":203,"90H":204,"90HH":205,"90I":206,"90J":207,"90JJ":208,"90K":209,"90L":210,"90M":211,"90N":212,"90O":213,"90С":214,"95B":215,"95C":216,"95D":217,"95DD":218,"95E":219,"95F":220,"95FF":221,"95G":222,"95GG":223,"95H":224,"95HH":225,"95I":226,"95J":227,"95K":228,"95L":229,"denim melange) (L":230,"denim melange) (M":231,"denim melange) (S":232,"denim melange) (XL":233,L:234,"L Plus":235,"L tall":236,"L-XL":237,M:238,"M Plus":239,"M tall":240,"M-L":241,OneSize:242,OS:243,"quietgrey melange) (L":244,"quietgrey melange) (M":245,"quietgrey melange) (S":246,"quietgrey melange) (XL":247,S:248,"S Plus":249,"S tall":250,"S-M":251,XL:252,"XL Plus":253,"XL-2XL":254,XS:255,"XS-M":256,"XS-S":257,XXL:258,"Черный-Белый-Телесный (trio) (L":259,"Черный-Белый-Телесный (trio) (M":260,"Черный-Белый-Телесный (trio) (S":261,"Черный-Белый-Телесный (trio) (XL":262};
import {mapMutations, mapState} from "vuex";
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
                return sizes.sort(( a, b ) => { sortOrder[a] - sortOrder[b]});
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
            [{
                src: '#modalToCart',
                type: 'inline',
            }],
            {
                closeButton: false,
            });
        },
        openSizeModal() {
            Fancybox.close();
            Fancybox.show(
            [{
                src: '#modalSizes',
                type: 'inline',
            }],
            {
                closeButton: false,
                dragToClose: false,
            });
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
                    this.$router.replace({path: '/giftCard'})
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
                            this.$router.replace({path: '/giftCard'})
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
                                if (value.status && value.data) {
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
            this.$API.deleteProduct(this.$route.params.id).then(response => {
                if(response) {
                    this.cat_products[this.product.category_id] = null;
                    this.$router.go(-1);
                }
            });
        },
        addFavorite(id) {
            if(!this.the_heart){
                this.addFavor(id)
                store.commit("set_snack_message", {msg:"Товар добавлен в избранные"});
            } else {
                this.delFavor(id)
            }
        },
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
    mounted() {
        register()
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
