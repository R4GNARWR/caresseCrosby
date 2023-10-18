import store from "../store/store";
import {mapMutations} from "vuex";

export default {

    logout(){
        this.$API.logout()
            .then(value => {
                if(value.data.success) {
                    this.clearCart();
                    store.commit('logout');
                    this.show_menu = false;
                    if (this.$route.path !='/') this.$router.push('/');
                }
            });
    },

    save_user_data() {
        this.user.sizes="";
        if (this.user.size_b) this.user.sizes += "b:"+this.user.size_b + " ";
        if (this.user.size_c) this.user.sizes += "c:"+this.user.size_c + " ";
        if (this.user.size_t) this.user.sizes += "t:"+this.user.size_t + " ";
        let to_send = JSON.stringify(this.user);
        console.log(to_send)
        this.$API.saveUserData(to_send);
    },
    get_sizes() {
        if (store.state.user_info.sizes){
            for (let size of store.state.user_info.sizes.split(" ")){
                if (size[0]=='b') this.user.size_b = size.slice(2);
                if (size[0]=='c') this.user.size_c = size.slice(2);
                if (size[0]=='t') this.user.size_t = size.slice(2);
            }
        }
    },

    ...mapMutations(['clearCart'])
}
