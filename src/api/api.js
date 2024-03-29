import axios from "axios";
import store from "../store/store";

export default  {
    Api_ready: false,
    axios: axios.create({baseURL: "https://api.ccrosby.ru/api/"}),
    // axios: axios.create({baseURL: "http://127.0.0.1:9080/api/"}),
    init(){
        this.axios.interceptors.request.use(
            config => {
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
                if (response) {
                    if(response.headers.xusertoken && !store.state.user_info.user_token)
                        store.commit('user_token', response.headers.xusertoken);
                }
                return response;
            },error => Promise.reject(error)
        );
    },

    getPopularProducts(){return this.axios.get('popular-products')},
    getHitsProducts(){return this.axios.get('hits-products')},
    getNewProducts(){return this.axios.get('new-products')},
    getParentsCategories(){this.axios.get('categories/parents').then(response=>{
                if(response.data && response.data.response.categories){
                    store.commit('setCategoriesTree', response.data.response.categories)
                }
            }).catch(error => {console.log(error); this.errored = true;});},
    getProjectCategories(){return this.axios.get('categories/parents', {params:{all_cat: true}})},
    getCategoryTopProducts(id, pW, pH, page){
        return this.axios.get('products', {params:{categoryId:id}})
        // return this.axios.get('categories/'+id+'/products', {params:{photoW:pW, photoH:pH, page:page}})
        .then(value => {
                if(value.data && value.data.success){
                    return value;
                }
            }).catch(error => {console.log(error); this.errored = true;});},
    getCatDescription(catID){return this.axios.get('categories/'+catID+'/description')},

    getProductById(id){return this.axios.get('products/'+id).then(value => {  return value;})},
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
    searchProducts(query,attr, page, category){return this.axios.get('products',{params: {attr:attr, query:query, per_page: 1000, page:page, category_id:category}}).then(value => {return value;})},

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
    },
    logout() {return this.axios.post('auth/logout')},
    saveUserData(to_send) {
        this.axios.put("account", to_send, {headers: {'Content-Type': 'application/json'}})
            .then(value => {
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
            }).catch(error => {
                {
                    console.log(error)
                }
            })
    },
    get_payments_history(){return this.axios.get('account/billing/history')},
    get_ordered_products(){return this.axios.get('account/ordered-products')},
    get_user_orders(){return this.axios.get('account/orders')},
    get_order_info(id){return this.axios.get('account/orders/' + id + '/products')},

    payment(amount, orderId, promocode, phone){ return this.axios.post("account/billing", {sum:Number(amount), orderId:orderId, promocode:promocode, phone:phone})},

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
    sentLid(lid) {
        const params = {}

        lid.for ? params.forWho = lid.for : null
        lid.from ? params.from = lid.from : null
        lid.emailToSend ? params.emailToSend = lid.emailToSend : null
        lid.emailFrom ? params.emailFrom = lid.emailFrom : null
        lid.phonefor ? params.phonefor = lid.phonefor.replace(/\D/g, '') : null
        lid.phoneFrom ? params.phoneFrom = lid.phoneFrom.replace(/\D/g, '') : null
        lid.cost ? params.cost = lid.cost : null
        lid.whenSend ? params.whenSend = new Date(lid.whenSend).toLocaleDateString('ru-RU') : null
        lid.text ? params.text = lid.text : null

        return this.axios.post("auth/lid", params)
    },

    //admin api
    create_new_cat(new_cat, photo){
        return this.axios.post('admin/new-category', new_cat,{}).then(value => {
            if (value.data.success && value.data.new_category_id){
                if (photo) {
                    let file_name = 'cat.'+value.data.new_category_id;
                    let fd = new FormData;
                    fd.append(file_name, photo);
                    this.axios.post('admin/photos', fd,{})
                }

            }
        });
    },
    update_new_cat(new_cat, photo){
        return this.axios.post('admin/update-category', new_cat,{}).then(value => {
                if (photo) {
                    let file_name = 'cat.'+new_cat.id;
                    let fd = new FormData;
                    fd.append(file_name, photo);
                    this.axios.post('admin/photos', fd,{})
                }
        }
        );

    },
    delete_category(id){
        return this.axios.get("admin/delete-category", {params:{category_id:id}})
    },

    createProduct(new_product){
        return this.axios.post('admin/create-product', new_product,{})
    },
    uploadPhoto(fd){return this.axios.post('admin/photos', fd, {})},
    addPhotosToProduct(pId,fileList){
        store.commit('loader','start');
        this.axios.post('admin/photos/' + pId + '/add-images', fileList, {})
            .then(value => {
                store.commit('loader','finish');
                window.location.reload()
            })
            .catch(error=> {
                store.commit('loader', 'finish');
                store.commit('set_snack_message',{ msg: error.message, type:'error'})
            })
    },

    delProductImg(pId,path){return this.axios.delete('admin/products/img/'+pId, {data:path})},
    deleteProduct(id) {return this.axios.delete("admin/products/"+id+"/delete")},

    getAttributeValues(group_id){
        return this.axios.get("attributes/"+ group_id + "/values")
    },

    getUsersList(){return this.axios.get("admin/users").then(value => {
        if (value.data.success){
            return value.data.users;
        } else return null;
    })},

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
    newCertificate(data){return this.axios.post("new-cert",data,{})},
    preOrder(product, phone, name, email){return this.axios.get('sms-payment/pre-order', {params:{product:product, phone:phone, name:name, email:email}})},

    orderToPay(orderId){return this.axios.put('sms-payment/order-to-pay/'+ orderId)},

    deleteProductFromOrder(orderId, productId){return this.axios.delete("admin/orders/"+orderId+"/products/"+productId)},
    addProductToOrder(orderId, productId, notice){return this.axios.post("admin/orders/"+orderId+"/products", {productId:productId, notice: notice})},


    // CDEK
    getCdekSettings(){
        return this.axios.get('get-cdek-settings').then(response => {
            if(response && response.status === 200 && response.data) {
                store.commit('setCdekCities', response.data.cities);
                if(store.state.cdek_has_errors === true) {
                    store.commit('setCdekError', true)
                }
            } else if(response && response.status > 299) {
                if(store.state.cdek_has_errors !== true) {
                    store.commit('setCdekError', true)
                }
            }
        })
    },
    getCdekCityPoints(cityCode){
        return this.axios.get('get-cdek-city-points',{params:{cityCode:cityCode}}).then(response => {
            if(response && response.status === 200 && response.data) {
                store.commit('setCdekPvz', response.data.points);
                if(store.state.cdek_has_errors === true) {
                    store.commit('setCdekError', true)
                }
            } else if(response && response.status > 299) {
                if(store.state.cdek_has_errors !== true) {
                    store.commit('setCdekError', true)
                }
            }

        })
    },
    getCdekDeliveryPrice(tariff, toLocation){
        store.commit('reset_snack_message')
        return this.axios.get('get-cdek-delivery-cost',{params:{tariff:tariff, toLocation:toLocation}}).then(response => {
            if(response && response.status === 200 && response.data) {
                if(response.data.period_min && response.data.total_sum) {
                    store.commit('setCdekMinTime', response.data.period_min)
                    store.commit('setCdekDeliveryPrice', response.data.total_sum)
                    if(store.state.cdek_has_errors === true) {
                        store.commit('setCdekError', false)
                    }
                } else {
                    store.commit('set_snack_message', { msg: 'Не удалось распознать адрес доставки', type:'error'})
                }

            } else if(response && response.status > 299) {
                if(store.state.cdek_has_errors !== true) {
                    store.commit('setCdekError', true)
                }
            }
        })
    },
    checkPromocode(promocode) {
        return this.axios.get('order/check-promocode', {params: {promocode:promocode}})
    }
}
