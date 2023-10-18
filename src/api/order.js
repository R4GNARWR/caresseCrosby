import store from "../store/store";

export default {
    make_the_order(){
        // this.$metrika.reachGoal('offer');
        let s, to_send;
            s='';   this.c_s?s+='sms; ':''; this.c_t?s+='telegram; ':'';    this.c_w?s+='whatsapp;':'';
            to_send={
                phone: this.phone, city: this.address.city?this.address.city:'город не указан',
                street:this.full_address,
                apartment:this.apartment, floor:'?',
                pickupPoint:null, comment:this.comment, email:this.email,
                deliveryTime: '10:00', deliveryDate:this.delivery_date,
                canals:s.length>0?" Для связи с клиетом желательно использовать: "+s:'',
            };

        this.$API.makeOrder(to_send).then(value => {
            if (value.data.success){
                this.clearCart();
                if (value.data.new_user) {
                    this.$API.tryAuth();
                    setTimeout(()=>this.$router.push("/Privat"), 500);
                }
                else if (this.loggedIn) this.$router.push("/Privat");
                else this.$router.push('/');
                store.commit('set_snack_message','Ваш заказ успешно оформлен. Мы свяжемся с вами в ближайшее время.','success')
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

}