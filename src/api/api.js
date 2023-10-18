import axios from "axios";
import store from "../store/store";
import { error } from "jquery";

export default  {
    Api_ready: false,
    axios: axios.create({baseURL: "https://api.ccrosby.ru/api/"}),
    init(){
        this.axios.interceptors.request.use(
            config => {
                store.commit('loader', 'start');
                config.headers.xProjectId = '2';
                if(localStorage.user_token) {
                    config.headers.xUserToken = localStorage.user_token;
                    store.commit('user_token', localStorage.user_token);
                }
                config.headers.xMarketGroup = '4';
                return config;
            },
                error => Promise.reject(error),
        );
        this.axios.interceptors.response.use(
            response => {
                store.commit('loader', 'finish');
                if (response) {
                    if(response.headers.xusertoken && !store.state.user_info.user_token)
                        store.commit('user_token', response.headers.xusertoken);
                }
                return response;
            },error => Promise.reject(error)
        );
    },

    getPopularProducts(){return this.axios.get('popular-products')},
    getParentsCategories(){store.commit('loader');  this.axios.get('categories/parents').then(response=>{
                if(response.data && response.data.response.categories){
                    store.commit('loader');
                    store.commit('setCategoriesTree', response.data.response.categories)
                }
            }).catch(error => {console.log(error); this.errored = true;});},
    getProjectCategories(){return this.axios.get('categories/parents', {params:{all_cat: true}})},
    getCategoryTopProducts(id, pW, pH, page){return this.axios.get('categories/'+id+'/products', {params:{photoW:pW, photoH:pH, page:page}})
        .then(value => {
                if(value.data && value.data.response.products){
                    return value.data.response.products;
                }
            }).catch(error => {console.log(error); this.errored = true;});},
    getCatDescription(catID){return this.axios.get('categories/'+catID+'/description')},

    getProductById(id){ store.commit('loader'); return this.axios.get('products/'+id).then(value => { store.commit('loader'); return value;})},
    getFullPhoto(id){return this.axios.get('full-photo/'+id);},
    getFullPhotos(id){return this.axios.get('products/'+id+'/full-photos');},

    loadCart() {
        this.axios.get('cart/products').then(response => {
            if (response.data.success && response.data.products) {
                let cart =[];
                for (let product of response.data.products) {
                    cart.push({
                        id: product.productId,
                        m: product.market_id,
                        q: product.quantity,
                        name: product.title,
                        photo: product.photo,
                        price: product.price,
                        unit: product.unit,
                        size: product.notice
                    })
                }
                store.commit('setCart', cart);
            }
        }).catch(error => console.log('loadCart', error.message ? error.message : error))
        this.getFavorites();
    },
    put_to_cart(product) {return this.axios.post('cart/products', {productId: product.id, market_id: product.lowerPrice.market_id, quantity: product.unit === 'кг' ? .1 : 1, color: product.color, size:product.size}, {});},
    update_quantity_in_cart(product, quantity) {
        
        this.axios.put('cart/products/'+product, {quantity:quantity}, {headers: {'Content-Type': 'application/json',}}).then(response => {
                if (!response.data.success || !response.data.product){console.log('ahtung!!',response);}
            });},
    deleteFromCart(pId){return this.axios.delete('cart/products/'+pId);},

    addFavorite(id){
        if (store.state.favorites.includes(store.state.favorites.find(el=>el.id === id))){
            return store.state.favorites;
        } else
        return this.axios.post('favorite/'+id).then(value => {if (value.status===200) this.getFavorites()})},
    delFavorite(id){return this.axios.delete('favorite/'+id).then(value => {if (value.status===200) this.getFavorites()})},
    getFavorites(){return this.axios.get('favorites').then(value => {if (value.status ===200){store.commit('setFavorites', value.data);}})},

    searchProductsVariants(query){return this.axios.get('search-products', {params: {query: query }})},
    searchProducts(query,attr, page){return this.axios.get('products',{params:{attr:attr, query:query, per_page: 50, page:page}}).then(value => {return value;})},

    makeOrder(to_send){
        return this.axios.post('cart/checkout', to_send, {})
    },
   registration(name, phone, email, password){
        if (!name || name =='') name = "Любимый клиент";
        return this.axios.post('auth/reg', {name: name, phone: phone, email:email, password: password},{})
    },
    tryAuth(){
        this.axios.get('auth').then(value => {
            if (value.data.success && value.data.user.id>0){
                store.commit('loggedIn', value.data.user);
            }
        })
    },
    tryLogin(login, email, password){return this.axios.post('auth/login', {phone: login, email:email, password: password}, {})},
    ask_sms(phone, email) {
        return this.axios.post('auth/forgot', {phone: phone, email:email},{})
            .then(value => {
                if (value.data.success) {
                    let msg = {};
                    msg.msg = "Пароль отправлен!"
                    msg.color = "green";
                    store.commit('set_snack_message', msg);
                } else {
                    if (value.data.errors) {
                        let msg = {}
                        msg.msg = ''
                        msg.color = 'red'
                        for (let e of Object.keys(value.data.errors)) msg.msg += value.data.errors[e] + ' ';
                        store.commit('set_snack_message', msg)
                    }
                }
            })
    },
    logout() {return this.axios.post('auth/logout')},
    saveUserData(to_send) {
        store.commit('loader');
        this.axios.put("account", to_send, {headers: {'Content-Type': 'application/json'}})
            .then(value => {
                console.log(value)
                if (value.data.success) {
                    let msg = {}; msg.msg = 'Данные успешно сохранены!'; msg.color = '#d7c6b0'; store.commit('set_snack_message', msg);
                }
                if (value.data.errors) {
                    let msg = {}
                    msg.msg = ''
                    msg.color = 'red'
                    for (let e of Object.keys(value.data.errors)) msg.msg += value.data.errors[e] + ' ';
                    msg.msg +=" Не удалось сохранить изменения!"
                    store.commit('set_snack_message', msg)
                }
                store.commit('loader');
            }).catch(error => {
                {
                    console.log(error)
                }
            }) 
    },
    get_payments_history(){return this.axios.get('account/billing/history')},
    get_ordered_products(){return this.axios.get('account/ordered-products')},
    get_user_orders(){return this.axios.get('account/orders')},


    getAttributeValues(group_id){
        return this.axios.get("attributes/"+ group_id + "/values")
    },

    getOrderInfo(id){return this.axios.get("sms-payment/order-info",{params:{id:id}})},
    updateOrder(order){return this.axios.put("admin/orders/"+order.id,
        { house:order.house, street:order.street, city:order.city, phone: order.phone, comment:order.comment, commission:order.commission, apartment:order.apartment},
        {headers: {'Content-Type': 'application/json'}})},
    updateOrderProduct(orderId, products){
        for (let p in products){
            this.axios.put("admin/orders/"+orderId+"/product-update/"+products[p].orderProductId,
                {quantity:products[p].quantity, price:products[p].price, notice:products[p].notice},
                {headers: {'Content-Type': 'application/json'}})
        }
    },

    preOrder(product, phone, name, email){return this.axios.get('sms-payment/pre-order', {params:{product:product, phone:phone, name:name, email:email}})},

    orderToPay(orderId){return this.axios.put('sms-payment/order-to-pay/'+ orderId)},

    deleteProductFromOrder(orderId, productId){return this.axios.delete("admin/orders/"+orderId+"/products/"+productId)},
    addProductToOrder(orderId, productId, notice){return this.axios.post("admin/orders/"+orderId+"/products", {productId:productId, notice: notice})},


    payment(amount, orderId){ return this.axios.post("account/billing", {sum:amount, orderId:orderId})},

    getGallery(){
        return this.axios.get("banners/galleries")
    },
    delGallery(about){
        return this.axios.delete("banners/galleries/"+about)
    },
    changeGalleryName(oldName, newName){
        return this.axios.post("banners/galleries/change-name", {oldName:oldName, newName:newName})
    },
    delGalleryPhoto(path){
        return this.axios.delete("banners/galleries/photo/"+path.substr(path.lastIndexOf('/')))
    },

    createBlog(title, mainImg, json){return this.axios.post("blogs",{title:title, mainImg:mainImg, json_string:JSON.stringify(json)})},
    getBlogs(){return this.axios.get("blogs")},
    delThisBlog(title){return this.axios.delete("blogs/"+title)},
}
