<template>
    <section class="admin">
        <v-container>
            <div class="admin-row">
                <div class="admin-left__side">
                    <button class="btn btn-primary w-100 mb-5" @click="edit_cat = true; new_cat = true; parent_id = 0;">
                        Создать категорию
                    </button>
                    <div v-if="categories" class="cat_wrap">
                        <div class="cat_select" :class="{'active': cat.id === active_cat}" v-for="cat in categories" :key="cat.id" @click="get_cat_products(cat.id)">
                            <div class="cat_select__label">{{cat.name}}</div>
                            <div class="cat_select-body">
                                <div class="cat_select-img">
                                    <img :src="cat.photo" v-if="cat.photo !==null">
                                    <div v-else style="color: red">! нет фото</div>
                                </div>
                                <div class="cat_select-body__buttons">
                                    <button>Товары</button>
                                    <button @click="edit_cat = true; the_cat=cat">Изменить</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="admin-right__side">
                    <!-- todo заголовок категории   <h3 v-if="active_cat">{{active_cat}}</h3> <br>-->
                    <div class="admin-right__top">
                        <div class="admin-right__top-label">
                            Товары
                        </div>
                        <button class="btn btn-primary" v-if="active_cat" @click="create_product=true;">
                            <v-icon size="20px">mdi-plus</v-icon>
                            <b>Создать новый товар</b>
                        </button>
                    </div>
                    <v-row v-if="products && products.products && products.products.length>0">
                        <v-col lg="3" v-for="product in products.products">
                            <ProductCard :product="product"></ProductCard>
                        </v-col>
                    </v-row>
                    <div class="right_side" v-if="(!products || products.length<1) && !active_cat">Выберите категорию</div>
                </div>
            </div>
        </v-container>
    </section>
    <v-dialog class="cat-modal" v-model="edit_cat" width="90%" max-width="700px">
        <v-card>
            <div class="cat-modal__label" v-if="new_cat">Создать категорию:</div>
            <div class="cat-modal__label" v-else>Редактировать категорию:</div>
            <v-text-field class="text_input" v-model="the_cat.name" regular label="Имя категории"></v-text-field>
            <v-select
            v-if="!new_cat"
            class="text_input"
            v-model="the_cat.parentId"
            label="Выбрать родительскую категорию"
            :items="parents_categories"
            item-value="id"
            item-title="name"
            return-object
            ></v-select>
            <v-text-field
            class="text_input"
            v-model="the_cat.priority"
            regular
            label="Приоритет"
            v-mask="'####'"
            placeholder="...."></v-text-field>
            <v-file-input
            v-model="the_cat_photo"
            regular
            label="Загрузить фото категории"
            accept=".jpeg, .jpg, .png"
            value="">
        </v-file-input>
        <!-- <div style="display: flex; flex-direction: row; justify-content: space-around; width:100%" >
            <v-checkbox v-model="the_cat.use_multiplier=true" regular label="Делать наценку на товары"></v-checkbox>
        </div> -->
        <div v-if="the_cat_photo" style="color: red">Фотография обновится на сайте в течении 5 минут.</div>
        <div class="cat-modal__buttons">
            <button v-if="!new_cat" class="btn btn-danger mr-auto" @click="delete_cat"><v-icon>mdi-delete-outline</v-icon> Удалить категорию</button>
            <button class="btn btn-white" @click="edit_cat=false; new_cat = false;">Отмена</button>
            <button class="btn btn-primary" @click="update_category">Сохранить</button>
        </div>
    </v-card>
</v-dialog>

<v-dialog class="product-modal" v-model="create_product" width="90%" max-width="700px">
    <v-card>
        <div class="product-modal__label">Создать товар</div>
        <v-text-field class="text_input" v-model="the_product.name" regular label="Название товара"></v-text-field>
        <v-select
        class="text_input"
        v-model="the_product.categoryId"
        label="Категория товара"
        :items="categories"
        item-value="id"
        item-title="name"
        return-object></v-select>
        <v-file-input
        class="text_input"
        v-model="new_product_photo"
        multiple
        regular
        label="Загрузите фото товара"
        accept=".jpeg, .jpg, .png"
        value="" ></v-file-input>
        <div class="product-modal__inputs">
            <v-text-field v-model="the_product.sizes" regular label="Размеры: 44(38), 70G(70G), 70A(85A)"></v-text-field>
            <v-text-field v-model="the_product.brand" regular label="Бренд"></v-text-field>
        </div>
        <div class="product-modal__inputs">
            <v-text-field v-model="the_product.article" regular label="Артикул"></v-text-field>
            <v-text-field v-model="the_product.barcode" regular v-mask="'#############'" placeholder="............." label="Ш-код товара"></v-text-field>
            <!--        <v-text-field style="max-width: 20%" v-model="the_product.unit = 'шт'" regular label="Единица измерения"></v-text-field>-->
        </div>
        <div class="product-modal__inputs">
            <v-text-field v-model="the_product.price" regular placeholder="5 789.99" label="Цена"></v-text-field>
            <v-text-field v-model="the_product.old_price" regular placeholder="5 789.99" label="Старая Цена (для товаров по скидке)"></v-text-field>
        </div>
        <div style="margin: 20px; display: flex; flex-direction: row; justify-content: space-around; align-items: center">
            <v-radio-group column multiple v-model="labels" v-if="product_labels">
                <v-radio v-for="label in Object.entries(product_labels)" :key="label[0]" :value="label[0]">
                    <template v-slot:label>
                        <div :class="'dt_'+label[0]+' dt_label'" style="right: 40px">{{ label[1] }}</div>
                    </template>
                </v-radio>
                <div class="grey_button" @click="labels=[]" style="width: 100px">Очистить</div>
            </v-radio-group>
        </div>
        <div class="product-modal__color-pick">
            <div class="product-modal__color-pick__left">
                <v-menu>
                    <template v-slot:activator="{ on, attrs }">
                        <div class="select_button" v-if="!the_colors.length" v-bind="attrs" v-on="on">Выбeрите цвет</div>
                        <div class="select_button" v-else v-bind="attrs" v-on="on">Добавить цвет</div>
                    </template>
                </v-menu>
                <v-color-picker
                v-model="add_color"
                hide-inputs
                hide-canvas
                :swatches="swatches"
                show-swatches
                @update:modelValue="color_selected(add_color)"></v-color-picker>
            </div>
            <div class="product-modal__color-pick__right">
                <div class="product-modal__color-pick__list">
                    <v-menu top max-width="50%" v-if="the_colors" v-for="(color,index) in the_colors" :key="index">
                    <template v-slot:activator="{ on, attrs }">
                        <div class="product-modal__color-pick__item">
                            <div class="background" v-bind="attrs" v-on="on" :style="'background-color: ' +color"></div>
                            <div class="delete" @click="the_colors.splice(index,1)">×</div>
                        </div>
                    </template>
                </v-menu>
                </div>

            </div>
            <!-- <div class="row" style="margin: 20px auto 0 auto">
                <v-menu top max-width="50%" v-if="the_colors" v-for="(color,index) in the_colors" :key="index">
                    <template v-slot:activator="{ on, attrs }">
                        <div style="margin-left:20px; border: 1px solid #d7c6b0; border-radius: 5px;">
                            <div v-bind="attrs" v-on="on" :style="' width: 60px; height: 20px; background-color: ' +color"></div>
                            <div style="cursor: pointer" @click="the_colors.splice(index,1)">X</div>
                        </div>
                    </template>
                    <v-card>
                        <v-color-picker
                        v-model="the_colors[index]"
                        hide-sliders
                        hide-inputs
                        hide-canvas
                        :swatches="swatches"
                        show-swatches></v-color-picker>
                    </v-card>
                </v-menu>
            </div> -->
        </div>
        <v-textarea
        outlined
        label="Состав"
        v-model="the_product.structure"
        style="border-radius: 20px"></v-textarea>
        <v-textarea
        outlined
        label="Описание товара"
        v-model="the_product.description"
        style="border-radius: 20px"></v-textarea>
        <div class="product-modal__modals">
            <button class="btn btn-white" @click="create_product=false;">Отмена</button>
            <button class="btn btn-primary" @click="createProduct">Сохранить</button>
        </div>
    </v-card>
</v-dialog>
</template>

<script>
import {mapState} from "vuex";
import store from "../store/store";
import ProductCard from "../components/UI/ProductCard.vue";

export default {
    name: "Admin",
    components: {
        ProductCard
    },
    data(){
        return {
            categories:[], parents_categories:[],
            products:[],
            labels:[],
            edit_cat: false, new_cat: false, parent_id: 0,
            the_cat:{}, the_cat_photo: null,
            the_product:{}, create_product: false, new_product_photo: null, add_color:null, the_colors:[],
            active_cat: null,
            swatches: [
            ['#FFFFFF', '#BEBEBE', '#000000'],
            ['#FFFF00', '#fc7208', '#f10909'],
            ['#00e1ff', '#0025aa', '#810af5'],
            ['#ea0596', '#4b9906', '#006400'],
            ['#8B4513', '#FFDEAD', '#FFC1C1'],
            ],
        }
    },
    head() {
        return {
            title: "Магазин удобного белья в Уфе | Caresse Crosby",
            meta: [
                { content: "Магазин удобного белья в Уфе | Caresse Crosby" }
            ]
        }
    },
    computed: {
        ...mapState(['product_labels', 'project_params'])
    },
    created() {
        this.$API.getProjectCategories().then(value => {
            if (value.data.success){
                this.categories = value.data.response.categories;
                let b={}; b.id = 0; b.name = "Главная категория"
                this.parents_categories.push(b);
                for (let i of this.categories) if (i.parentId == 0) {
                    let a={};
                    a.id = i.id; a.name=i.name;
                    this.parents_categories.push(a);
                }
            }
        })
    },
    methods:{
        update_category(){
            if (this.new_cat) this.$API.create_new_cat(this.the_cat, this.the_cat_photo)
            // .then(window.location.reload(true));               //todo закрыть окно, обновить товары
            // .then(setTimeout(()=> window.location.reload(true),3000));
            else {
                this.the_cat.parentId = this.the_cat.parentId.id;
                if (this.the_cat.photo) this.the_cat.photo = "cat."+this.the_cat.id+this.the_cat.photo.slice(this.the_cat.photo.lastIndexOf('.'));
                this.$API.update_new_cat(this.the_cat, this.the_cat_photo)
                .then(window.location.reload(true));              //todo закрыть окно, обновить товары
                // .then(setTimeout(()=> window.location.reload(true),3000));
            }
        },
        delete_cat(){
            this.$API.delete_category(this.the_cat.id)
            .then(setTimeout(()=> window.location.reload(true),1000));
        },
        get_cat_products(id){
            this.products =[];
            this.loader = !this.loader;
            this.active_cat = id;
            this.$API.getCategoryTopProducts(id, 188, 285).then(value => {
                if (value) {
                    this.products = value.data
                }
            })
            this.the_product.categoryId=this.active_cat;
            window.scrollTo(0,0);
            this.create_product = false;
        },
        color_selected(color){
            if (this.the_colors.length === 1 && this.the_colors[0] ==='#FF0000') {
                this.the_colors[0] = color.hex
            } else {
                if(!this.the_colors.includes(color)) {
                    this.the_colors.push(color);
                }
            }
        },
        createProduct() {
            if (this.the_product && this.the_product.categoryId && this.the_product.categoryId.id) this.the_product.categoryId=this.the_product.categoryId.id
            if (this.the_colors && this.the_colors.length>0) this.the_product.colors = this.the_colors;
            if (this.labels && this.labels.length>0) this.the_product.labels = this.labels;
            store.commit('loader','start');
            this.$API.createProduct(this.the_product)
            .then(value => {
                if (value.data.success && value.data.new_product_id){
                    if (this.new_product_photo && this.new_product_photo.length>0) {
                        let fd = new FormData, i = 0;
                        for (let p of this.new_product_photo) {
                            let file_name = 'prod.' + value.data.new_product_id;
                            if (i>0) file_name+="_"+i;
                            i++;
                            fd.append(file_name, p);
                        }
                        this.$API.uploadPhoto(fd).then(value => {
                            if (value.data.success)this.get_cat_products(this.the_product.categoryId);
                            else store.commit('set_snack_message', {msg:"Произошла ошибка при загрузке изображения. Попробуйте использовать другое изображение. Если ошибка повторяеться, пишите на адрес 89373000011@yandex.ru", type:'error'})
                            this.the_product={}; this.labels=[]; this.add_color=null; this.new_product_photo=null; this.the_colors=[];
                            store.commit('loader','finish');
                        });
                    } else {
                        this.get_cat_products(this.the_product.categoryId);
                        this.the_product={}; this.labels=[]; this.add_color=null; this.new_product_photo=null; this.the_colors=[];
                        store.commit('loader','finish');
                    }
                }
                else {
                    let msg = {};
                    msg.color = 'red'
                    msg.msg = "! "
                    for (let e in value.data.errors) msg.msg+= value.data.errors[e]+ ' ';
                    store.commit('loader','finish');
                    store.commit('set_snack_message', msg);
                }
            }
            )
        }
    }
}
</script>

<style lang="scss" scoped>
.admin-row
{
    padding: 3rem 0 10rem 0;
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid $primary;
}

.admin-left__side
{
    width: 24rem;
    flex-shrink: 0;
    .cat_select
    {
        display: flex;
        flex-direction: column;
        padding: 10px;
        border-bottom: 1px solid $primary;
        cursor: pointer;
        transition: .3s;
        &.active
        {
            cursor: initial;
            background-color: #f6f6f6;
        }
        .cat_select-img
        {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 6rem;
            height: 6rem;
            flex-shrink: 0;
            img
            {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        .cat_select-body
        {
            flex-grow: 1;
            display: flex;
            flex-direction: row;
            column-gap: .8rem;
        }
        .cat_select__label
        {
            font-size: 1.6rem;
            line-height: 1.3em;
            text-align: center;
            font-weight: 500;
        }
        .cat_select-body__buttons
        {
            margin-top: auto;
            display: flex;
            justify-content: start;
            column-gap: .8rem;
            button
            {
                flex-grow: 1;
                border: 1px solid #27231E;
                color: #27231E;
                font-size: 1.2rem;
                padding: .6rem 1rem;
            }
        }
    }
}
.admin-right__side
{
    padding: 0 0 0 4rem;
    flex-grow: 1;
}
.admin-right__top
{
    margin-bottom: 5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.admin-right__top-label
{
    font-size: 3.6rem;
    line-height: 1.33em;
    color: $primary;
}
.cat-modal__label,
.product-modal__label
{
    font-size: 2.4rem;
    margin-bottom: 2rem;
}
.cat-modal__buttons
{
    display: flex;
    column-gap: .8rem;
    .btn-white
    {
        border: 1px solid $primary;
    }
}
.cat-modal,
.product-modal
{
    .v-card
    {
        padding: 2rem 4rem;
    }
}
.product-modal__inputs
{
    display: flex;
    column-gap: 2rem;
    .v-input
    {
        flex-grow: 1;
    }
}
.product-modal__modals
{
    display: flex;
    justify-content: space-between;
}
.select_button
{
    margin-bottom: 2rem;
    font-size: 1.6rem;
}
.product-modal__color-pick
{
    margin-bottom: 2rem;
    display: flex;
    column-gap: 2rem;
}
.product-modal__color-pick__list
{
    display: flex;
    flex-wrap: wrap;
    column-gap: 2rem;
    row-gap: 2rem;
}
.product-modal__color-pick__item
{
    position: relative;
    width: 6rem;
    height: 6rem;
    .background
    {
        width: 100%;
        height: 100%;
    }
    .delete
    {
        position: absolute;
        right: 1rem;
        top: 0;
        font-size: 3rem;
        line-height: 1em;
        cursor: pointer;
        overflow: hidden;
    }
}
</style>
