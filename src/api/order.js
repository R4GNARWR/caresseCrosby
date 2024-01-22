import store from "../store/store";

export default {
    make_the_order(){
        // this.$metrika.reachGoal('offer');
        let s, to_send;
            s='';   this.c_s?s+='sms; ':''; this.c_t?s+='telegram; ':'';    this.c_w?s+='whatsapp;':'';
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
                let msg = {}
                msg.msg = 'Ваш заказ успешно оформлен. Мы свяжемся с вами в ближайшее время, чтобы убедиться, верно ли вы подобрали размер.'
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
    async authCDEK() {
        try {
            let response = await fetch('https://api.cdek.ru/v2/oauth/token', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
                body: JSON.stringify({
                    'grant_type': 'client_credentials',
                    'client_id': 'PfkukfUZdSngbbW5Xx6val44l5aumMoQ',
                    'client_secret': 'h0yUCnejc90j89LuZLJt97HABYdmt2NO'
                }),
            });
            let data = await response.json();
            localStorage.setItem('cdek', JSON.stringify(data));
        } catch (error) {
            console.log(error);
        }
    },
    async getDeliveryPoints(code) {
        try {
            let response = await fetch('https://api.edu.cdek.ru/v2/deliverypoints?city_code='+code, {
                method: 'get', 
                headers: new Headers({
                    'Authorization': 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6WyJvcmRlcjphbGwiLCJwYXltZW50OmFsbCJdLCJleHAiOjE3MDM3OTMwNjgsImF1dGhvcml0aWVzIjpbInNoYXJkLWlkOnJ1LTAxIiwiY2xpZW50LWNpdHk60J3QvtCy0L7RgdC40LHQuNGA0YHQuiwg0J3QvtCy0L7RgdC40LHQuNGA0YHQutCw0Y8g0L7QsdC70LDRgdGC0YwiLCJhY2NvdW50LWxhbmc6cnVzIiwiY29udHJhY3Q60JjQnC3QoNCkLdCT0JvQky0yMiIsImFwaS12ZXJzaW9uOjEuMSIsImFjY291bnQtdXVpZDplOTI1YmQwZi0wNWE2LTRjNTYtYjczNy00Yjk5YzE0ZjY2OWEiLCJjbGllbnQtaWQtZWM1OmVkNzVlY2Y0LTMwZWQtNDE1My1hZmU5LWViODBiYjUxMmYyMiIsImNvbnRyYWN0LWlkOmRlNDJjYjcxLTZjOGMtNGNmNS04MjIyLWNmYjY2MDQ0ZThkZiIsImNsaWVudC1pZC1lYzQ6MTQzNDgyMzEiLCJzb2xpZC1hZGRyZXNzOmZhbHNlIiwiY29udHJhZ2VudC11dWlkOmVkNzVlY2Y0LTMwZWQtNDE1My1hZmU5LWViODBiYjUxMmYyMiIsImZ1bGwtbmFtZTrQotC10YHRgtC40YDQvtCy0LDQvdC40LUg0JjQvdGC0LXQs9GA0LDRhtC40Lgg0JjQnCJdLCJqdGkiOiJaVjBreEExU2NFakIwQko1LUhYdW0tblFiQjAiLCJjbGllbnRfaWQiOiJFTXNjZDZyOUpuRmlRM2JMb3lqSlk2ZU03OEpySmNlSSJ9.Q9WEfKj1HGCBdATJXVv4nXIC8Z_c8tJBo-TQ0Z05dPvcQOfZO7CpHnJPV8D1vHEf7dkPfnMGC1v5T_Q4tGa53HMPIdhaQ_s9RLyzLfLyeA7FTihpbDPFvO9KjGgNbCEQFOy7oWHI7yxMIzb-Hn1rfF6HlwKAyuqXvg9N46Rgyfg5ZnE4gcUBPYqvjWEmqVYMpCCXrYRQbTgPXnIAqSHxQAqhZf7vKhh_poZc7RoNIBOitXKpXkLANbjipkFA_c3LTFAWDTzzshtU-VmPpdCeZz8TBVLIPNQezty3jSxvuZnAiVG-9QK0oIAxU_SNkJbGhJZ8V2t_5qfV2IKtFnZnBA',
                }),
            });
            this.points = response
        } catch (error) {
            console.log(error)
        }
    },
    async getCitiesList() {
        try {
            let response = await fetch('https://api.edu.cdek.ru/v2/location/cities', {
                method: 'get', 
                headers: new Headers({
                    'Authorization': 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6WyJvcmRlcjphbGwiLCJwYXltZW50OmFsbCJdLCJleHAiOjE3MDM3OTMwNjgsImF1dGhvcml0aWVzIjpbInNoYXJkLWlkOnJ1LTAxIiwiY2xpZW50LWNpdHk60J3QvtCy0L7RgdC40LHQuNGA0YHQuiwg0J3QvtCy0L7RgdC40LHQuNGA0YHQutCw0Y8g0L7QsdC70LDRgdGC0YwiLCJhY2NvdW50LWxhbmc6cnVzIiwiY29udHJhY3Q60JjQnC3QoNCkLdCT0JvQky0yMiIsImFwaS12ZXJzaW9uOjEuMSIsImFjY291bnQtdXVpZDplOTI1YmQwZi0wNWE2LTRjNTYtYjczNy00Yjk5YzE0ZjY2OWEiLCJjbGllbnQtaWQtZWM1OmVkNzVlY2Y0LTMwZWQtNDE1My1hZmU5LWViODBiYjUxMmYyMiIsImNvbnRyYWN0LWlkOmRlNDJjYjcxLTZjOGMtNGNmNS04MjIyLWNmYjY2MDQ0ZThkZiIsImNsaWVudC1pZC1lYzQ6MTQzNDgyMzEiLCJzb2xpZC1hZGRyZXNzOmZhbHNlIiwiY29udHJhZ2VudC11dWlkOmVkNzVlY2Y0LTMwZWQtNDE1My1hZmU5LWViODBiYjUxMmYyMiIsImZ1bGwtbmFtZTrQotC10YHRgtC40YDQvtCy0LDQvdC40LUg0JjQvdGC0LXQs9GA0LDRhtC40Lgg0JjQnCJdLCJqdGkiOiJaVjBreEExU2NFakIwQko1LUhYdW0tblFiQjAiLCJjbGllbnRfaWQiOiJFTXNjZDZyOUpuRmlRM2JMb3lqSlk2ZU03OEpySmNlSSJ9.Q9WEfKj1HGCBdATJXVv4nXIC8Z_c8tJBo-TQ0Z05dPvcQOfZO7CpHnJPV8D1vHEf7dkPfnMGC1v5T_Q4tGa53HMPIdhaQ_s9RLyzLfLyeA7FTihpbDPFvO9KjGgNbCEQFOy7oWHI7yxMIzb-Hn1rfF6HlwKAyuqXvg9N46Rgyfg5ZnE4gcUBPYqvjWEmqVYMpCCXrYRQbTgPXnIAqSHxQAqhZf7vKhh_poZc7RoNIBOitXKpXkLANbjipkFA_c3LTFAWDTzzshtU-VmPpdCeZz8TBVLIPNQezty3jSxvuZnAiVG-9QK0oIAxU_SNkJbGhJZ8V2t_5qfV2IKtFnZnBA',
                }),
            });
            this.cities = response
        } catch (error) {
            console.log(error)
        }
    }

}
