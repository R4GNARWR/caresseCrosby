<template>
    <section class="product">
        <DetailProduct />
    </section>
</template>

<script>
import store from "../store/store";
import {mapMutations, mapState} from "vuex";

import Breadcrumbs from "../components/UI/Breadcrumbs.vue";
import DetailProduct from "../components/detailProduct/DetailProduct.vue";

export default {
    components: {
    Breadcrumbs,
    DetailProduct,
},
    data() {
        return {
            product:[],
        };
    },
    watch: {
        '$route'(newRoute, oldRoute) {if (oldRoute && newRoute !== oldRoute.params.id) {
            window.scroll(0,0);
            this.product=[];
            this.full_photos=null
            this.updateProduct();
        }},
    },
    computed: {
        ...mapState(['pop_products'])
    },
    methods: {
        updateProduct(){
            if (this.pop_products[this.$route.params.id]){
                this.product = this.pop_products[this.$route.params.id];
                this.attributes = this.pop_products[this.$route.params.id].attributes;
                this.category = this.pop_products[this.$route.params.id].category;
                this.category.hide_name = true;
                this.full_photos = this.pop_products[this.$route.params.id].full_photos;
                this.similar_products = this.pop_products[this.$route.params.id]['similar_products'];
            }
            else{
                this.attributes=[];
                this.$API.getProductById(this.$route.params.id).then(value =>{
                    if (value.data.status == "OK"){
                        this.product = value.data.response.product?value.data.response.product:null;
                        this.attributes = value.data.response.attributes?value.data.response.attributes:null;
                        this.category = value.data.response.category?value.data.response.category:null;
                        this.category.hide_name = true;
                        
                        this.$API.getFullPhotos(this.$route.params.id).then(value => {
                            if(value.status ===200 && value.data.length>1) {
                                this.full_photos = value.data;
                            }
                            else this.$API.getFullPhoto(this.$route.params.id).then(value => {
                                if (value.status && value.data){
                                    this.product.photo = value.data
                                    this.full_photos = [value.data]
                                }
                            })
                        })
                    }
                    else this.$router.push('/')
                })
            }
        },
    },
    mounted() {
        this.updateProduct()
    },
};
</script>

<style lang="scss">
.product
{
    padding: 2.4rem 0 6rem 0;
}
</style>