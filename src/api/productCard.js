
export default {
    show_adds(){
        if (this.$route.path != '/MakingAnOrder') {
            this.show_cart_button = true;
            this.card_style = 'm_enter_class';
        }
    },
    hide_adds(){
        this.show_cart_button=false;
        this.card_style='';
    },
    show_info_wind(){
        if (this.$route.path != '/MakingAnOrder') this.info_window=true;
    },
    addFavor(id){this.heart = true; this.$API.addFavorite(id)},
    delFavor(id){this.heart = false; this.$API.delFavorite(id)},

}
