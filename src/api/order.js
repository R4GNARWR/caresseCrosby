import { error } from "jquery";
import store from "../store/store";
import api from "./api";

export default {
    make_the_order(){
        // this.$metrika.reachGoal('offer');
        let s, to_send;
        s='';
        this.c_s?s+='sms; ':'';
        this.c_t?s+='telegram; ':'';
        this.c_w?s+='whatsapp;':'';
        to_send={
            phone: this.phone,
            city: this.address.city ? this.address.city : '',
            street:this.full_address,
            apartment:this.apartment,
            floor:'?',
            pickupPoint:null,
            comment:this.comment,
            email:this.email,
            deliveryTime: '10:00',
            deliveryDate:this.delivery_date,
            canals:s.length>0?" Для связи с клиетом желательно использовать: "+s:'',
        };
        this.$API.makeOrder(to_send).then(value => {
            if (value.data.success){
                this.clearCart();
                if (value.data.new_user) {
                    this.$API.tryAuth();
                    setTimeout(()=>this.$router.push("/profileData"), 500);
                }
                else if (this.loggedIn) this.$router.push("/profileData");
                else this.$router.push('/');
                const date = new Date().toLocaleString("en-US", {timeZone: "Asia/Yekaterinburg", hour12: false, hour: '2-digit'});
                let msg = {}
                if(date > 18 && date < 24) {
                    msg.msg = 'Чтобы оформить заказ мы свяжемся с вами завтра после 9:00'
                } else if(date < 9) {
                    msg.msg = 'Чтобы оформить заказ мы свяжемся с вами сегодня после 9:00'
                }else if(date >= 9 && date <= 18) {
                    msg.msg = 'Чтобы оформить заказ мы свяжемся с вами в течении часа'
                } else {
                    msg.msg = 'Ваш заказ успешно оформлен. Мы свяжемся с вами в ближайшее время, чтобы убедиться, верно ли вы подобрали размер.'
                }
                store.commit('set_snack_message',msg,'success')
            } else {
                if(value.data.errors)
                for (let e of Object.keys(value.data.errors)) this.the_error = value.data.errors[e];
                else this.the_error="Неизвестная ошибка"
                store.commit('set_snack_message', this.the_error,'error')
            }
        });
    },
    d_pick_func (val) {
        if (this.dates_available.indexOf(val) !== -1) {
            return true
        } else {
            return false
        }
    },
    async getDeliveryPoints(city) {
        api.getCdekCityPoints(city)
    },
    async getCitiesList() {
        api.getCdekSettings()
    },
    async checkPromocode(promocode) {
        api.checkPromocode(promocode).then(response => {
            if(response && response.status === 200) {
                if(response.data.success) {
                    store.commit('set_snack_message', {msg: response.data.message})
                    store.commit('setPromocode', response.data.sum)
                } else {
                    store.commit('set_snack_message', {msg: "Указанный промокод не найден!"},'error')
                }
            }
        }).catch(error => {
            {
                console.log(error)
            }
        })
    }
    
}
