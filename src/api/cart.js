import $ from "jquery";
import store from "../store/store";

export default {
    deleteFromCart(cartPosition) {
        let vm = this;
        vm.removeFromCart(cartPosition);
        vm.$API.deleteFromCart(cartPosition);
    },
    addProductToOrder(orderId) {

        this.$API.addProductToOrder(orderId, this.product.id, this.product.size ? this.product.size : '').then(value => {
            if (value.data.success && value.data.product) {
                store.commit("addToOrder", null);
                this.$router.push('/Admin/EditOrder/' + orderId);
            }
            if (!value.data.success && value.data.errors.ah) store.commit('set_snack_message', { msg: "Товар уже есть в заказе.", type: 'error' })
        }).catch(error => {
            console.log(error);
            store.commit('set_snack_message', { msg: "Что то пошло не так!", type: 'error' })
        }
        )
    },
    changeQ(cartPosition, dir) {
        let quantity_inc = ((cartPosition.unit === 'кг') ? .1 : 1) * dir;
        let fin_q = null;
        if (cartPosition.q) {
            fin_q = Number(cartPosition.q) + Number(quantity_inc);
        } else if (cartPosition.quantity) {
            fin_q = Number(cartPosition.quantity) + Number(quantity_inc);
        }
        // console.log(quantity_inc, fin_q)
        if (fin_q > 0) {
            this.cartItemChangeQ({ id: cartPosition.id, quantity_inc: quantity_inc });
            this.$API.update_quantity_in_cart(cartPosition.id, fin_q)
        } else this.deleteFromCart(cartPosition.id);
    },
    setQ(cartPosition, q) {
        let vm = this;
        document.getElementById('input' + cartPosition.id).blur();
        q = q.toString().replace(',', '.');
        q = (cartPosition.unit === 'кг') ? parseFloat(q) : parseInt(q);
        if ((q > 0) && (Number(cartPosition.q).toFixed(2) !== Number(q).toFixed(2))) {
            vm.cartItemSetQ({ id: cartPosition.id, quantity: q });
            vm.$API.update_quantity_in_cart(cartPosition.id, q);
        }
        else {
            vm.$forceUpdate();
        }
    },
    // decreaseDisabled(cartPosition) {
    //     return Number(cartPosition.q) - Number((cartPosition.unit === 'кг') ? .1 : 1) <= 0;
    // },
    to_making_order() {
        this.show_cart = false;
        this.$router.push('/MakingAnOrder');
    },

    addProductToCart() {
        // this.$metrika.reachGoal('cart')
        // vm.to_cart_animation();
        let productLocal = this.product;
        if (productLocal && productLocal.id) {
            this.$API.put_to_cart(this.product)
                .then(response => {
                    if (!response.data.success || !response.data.product) {
                        let msg = {};
                        msg.msg = '(' + productLocal.id + '): ' + response.data.errors['price'];
                        msg.color = 'red'
                        // for (let e in response.data.errors) msg.msg+= response.data.errors[e]+ ' ';
                        store.commit('set_snack_message', msg);
                    }
                    else
                        this.add2cart({
                            id: productLocal.id,
                            marketID: productLocal.lowerPrice.market_id,
                            quantity: productLocal.unit === 'кг' ? .1 : 1,
                            price: productLocal.lowerPrice.value,
                            name: productLocal.name,
                            photo: productLocal.photo,
                            unit: productLocal.unit,
                            size: productLocal.size,
                            color: productLocal.color,
                        });
                });
        }
    },
    to_cart_animation() {
        let vm = this,
            prodContainer = document.getElementById('productItemBlock' + vm.product.id),
            box = prodContainer.getBoundingClientRect(),
            basket_left = document.getElementById('header_basket').getBoundingClientRect().left;
        $(document.getElementById('image' + vm.product.id).cloneNode(true))
            .css({
                position: 'fixed',
                left: box.left - 10,
                top: box.top - 10,
                width: 150,
                height: 150
            })
            .addClass('added active')
            .appendTo('body')
            .animate(
                {
                    'top': 0,
                    'left': basket_left,
                    'opacity': 0,
                    'width': 50,
                    'height': 50
                },
                600,
                function () { $(this).remove() }
            )
            ;
    },
    color_selected(id, color) {
        let the_id = id.toString() + color.toString();
        if (this.product.color != color) {
            document.getElementById(the_id).classList.remove('selected')
            document.getElementById(the_id).classList.add('selected')
            this.product.color = color;
        } else {
            this.product.color = null;
            document.getElementById(the_id).classList.remove('selected');
        }

    },
    computed_color(color) {
        let result = null;
        this.colors_list.forEach(colour => {
            if (Object.values(colour)[0].includes(color)) result = Object.keys(colour)[0];
        })
        if (result && result !== 'Multi!') result = 'background-color:' + result;
        return result
    },

    search_sim_products(brand, color, name) {
        let attr = '';
        name = name.slice(name.indexOf(' ') + 1, name.lastIndexOf(' '));
        name ? this.$API.searchProducts(name, '', 1).then(value => {
            if (value.data.success) value.data.products.forEach(p => {
                if (this.similar_products.length < 10 && p.id !== this.product.id && !this.similar_products.includes(this.similar_products.find(el => el.id === p.id))) { this.similar_products.push(p); }
            })
        }) : ''

        if (brand) { attr += '1-' + brand.attributeValueId + ','; }
        if (color) { attr += '6-' + color.attributeValueId + ','; }
        attr = attr.substr(0, attr.length - 1);
        if (this.similar_products && this.similar_products.length < 10 && attr.length > 0)
            this.$API.searchProducts('', attr, 1).then(value => {
                if (value.data.success) value.data.products.forEach(p => {
                    if (this.similar_products.length < 10 && p.id !== this.product.id && !this.similar_products.includes(this.similar_products.find(el => el.id === p.id))) { this.similar_products.push(p) }
                })
            })

        if (this.similar_products.length < 10 && brand) {
            attr = ''; attr += '1-' + brand.attributeValueId;
            this.$API.searchProducts('', attr, 1).then(value => {
                if (value.data.success) value.data.products.forEach(p => {
                    if (this.similar_products.length < 10 && p.id !== this.product.id && !this.similar_products.includes(this.similar_products.find(el => el.id === p.id))) { this.similar_products.push(p) }
                })
            })
        }

        if (this.similar_products.length < 10 && color) {
            attr = '';
            attr += '6-' + color.attributeValueId;
            this.$API.searchProducts('', attr, 1).then(value => {
                if (value.data.success) value.data.products.forEach(p => {
                    if (this.similar_products.length < 10 && p.id !== this.product.id && !this.similar_products.includes(this.similar_products.find(el => el.id === p.id))) { this.similar_products.push(p) }
                })
            })
        }
        this.pop_products[this.$route.params.id]['similar_products'] = this.similar_products;
    },
    preOrder() {
        this.product.size = "Предзаказ";
        this.addProductToCart();
    },
    computed_price_string(price) {
        let a //,b
        a = price.toString().split('.')[0].length > 2 ?
            price.toString().split('.')[0].slice(0, price.toString().split('.')[0].length - 3) +
            ' ' + price.toString().split('.')[0].slice(price.toString().split('.')[0].length - 3) :
            price.toString().split('.')[0].slice(0, price.toString().split('.')[0].length - 3) +
            price.toString().split('.')[0].slice(price.toString().split('.')[0].length - 3)
            ;

        // b= price?!price.toString().split('.')[1] ? '.00' : price.toString().split('.')[1].length<2 ? '.'+price.toString().split('.')[1]+'0' : '.'+price.toString().split('.')[1]:''
        return a//a+b
    }
}
