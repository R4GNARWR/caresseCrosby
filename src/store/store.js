import Vuex from 'vuex'

export default new Vuex.Store({
  state: {
    contacts:{
      ooo_name: 'ИП Е.C.Король',
      full_name:"ИП Король Елена Сергеевна",
      requisites:["ИП Король Елена Сергеевна","ИНН: 744408493724","ОГРН: 321028000158115","Юридический адрес: 450080 г.Уфа ул.Менделеева 156/5-4."],
      email: "Ccrosbyru@yandex.ru",
      phone:"+79177471561",
      phone_string:"8 917 747 1561",
      time:["Пн-Пт: 11.00 - 20.00","Вс, Сб: 11.00 - 19.00"],

      address:"г.Уфа ул.Менделеева 156/1"

    },

    snack_message:{},
    headerPadding: 0,
    loader: 0,
    loggedIn: false,
    user_info: {},
    // user_position:[],
    // city:[],
    market_group: 4,
    categoriesTree: [],
    sub_categories:{},
    cat_products:{},
    pop_products:{},
    cart: [],
    favorites:[],
    order:null,
    // search
    colors_list: [
      {'#000000':['#000000','#483D8B', 'black','черный', 'noir','charc/blac', 'черный/телесный',]},
      {'#8B4513':['#BC8F8F', 'cappuccino', 'deep nude', 'коричневый',]},
      {'#FFDEAD':['#F5DEB3', '#FFEBCD', '#FFF8DC','honey', 'amaretto','latte', 'bare','chai','caramel','champagne',
          'linen','taup','бежевый','карамель', 'кремовый', 'песочный', 'светлый-бежевый', 'слоновая кость', 'телесный',
          'румяна','сливочный жемчуг'
        ]},
      {'#008000':['emerald', 'зеленый', 'хаки',]},
      {'#808080':['серый', 'grey marl', 'темно-серый', 'сланец',]},
      {'#DA70D6':['#FFE4E1', 'himp','пыльно-розовый','розовый', 'misty rose', 'лососевый','дикая роза','vintage',]},
      {'#000080':['#00008','темно-синий','пыльно-голубой', 'сапфировый синий', 'голубой', 'сиреневый','сиреневый',
          'navy', 'синий']},
      {'#FF0000':['#FF0000','винный','виный','терракотовый','малиновый', 'марсала', 'морозная ягода','mulberry', 'красный', 'оранжевый', 'оранжевый ']},
      {'#FFFFFF':['белый', 'ванильный','vanil', 'whit', 'айвори', ]},
      {'#FFFF00':['желтый', 'золотой',]},
      {'Multi!':['harlequine', 'multi',  'teal/pink', 'tribal pri', 'watercolou', 'леопардовый', 'синий+голубой+айвори',
          'синий+лососевый+айвори', 'тропический принт на белом фоне', 'хаки+терракот+айвори', ]},
    ],
    brands_search:[], colors_search:[], sizes_search:[], OneSize: null, search_result: [], search_settings:{},
    addToOrder: null,
  },
  mutations: {
    setHeaderPadding(state,value)
    {
        state.headerPadding = value
    },
    addToOrder(state, orderId){
      state.addToOrder = orderId},
    set_snack_message(state, msg, type) {
      state.snack_message.message = msg;
      state.snack_message.type = type?type:''
      setTimeout(()=> state.snack_message = {}, 5000);
    },
    errors_snack_message(state, errors){
      if (errors.length>0){
        state.snack_message = errors.toString();
        state.snack_bar_color = "orange"
      } //todo testing
    },
    loader(state, f){
      if (f ==='start') state.loader +=1;
      if (f ==='finish') state.loader -=1;
    },
    user_token(state, user_token) {
      state.user_info.user_token = user_token;
      localStorage.user_token = user_token;
    },
    loggedIn(state, user_info) {
      state.loggedIn = true;
      state.user_info = user_info;
    },
    logout(state) {
      state.loggedIn = false;
      state.user_info = [];
      state.user_info.user_token = '';
      localStorage.user_token = '';
    },

    setPopularProducts(state, pp) {
      state.pop_products = pp;
    },

    setCategoriesTree(state, categoriesArray) {
      state.categoriesTree = categoriesArray;
    },
    addSubCategories(state, params){
      state.sub_categories[params.parent_id]= params.sub_cats;
    },

    setCart(state, cart) {
      state.cart = cart;
    },
    setFavorites(state, favorites){
      state.favorites = favorites
    },
    clearCart(state) {
      state.cart = [];
    },
    add2cart(state, params) { // { productID, marketID, name, photo, price, quantity, unit }
      let	hasInCart = false;
      params.quantity = params.quantity || 1;

      for (let cartPosition of state.cart) {
        if (cartPosition.id === parseInt(params.productID)) {
          cartPosition.m = params.marketID;
          cartPosition.q = Number((parseFloat(params.quantity) + parseFloat(cartPosition.q)).toFixed((Number.isInteger(params.quantity) && Number.isInteger(cartPosition.q)) ? 0 : 1));
          cartPosition.name = params.name;
          cartPosition.photo = params.photo;
          cartPosition.price = parseFloat(params.price);
          cartPosition.unit = params.unit;
          cartPosition.size = params.size;
          cartPosition.color = params.color;
          hasInCart = true;
          break;
        }
      }
      if (!hasInCart) {
        state.cart.push({
          id: params.id,
          m: params.marketID,
          q: params.quantity,
          name: params.name,
          photo: params.photo,
          price: parseFloat(params.price),
          unit: params.unit,
          size: params.size,
          color: params.color,
        });
      }
    },

    cartItemSetQ(state, params) {
      params.quantity = params.quantity || 1;
      for (let cartPosition of state.cart) {
        if (cartPosition.id === parseInt(params.id)) {
          cartPosition.q = parseFloat(params.quantity);
          break;
        }
      }
    },
    cartItemChangeQ(state, params) {
      params.quantity = params.quantity || 1;
      for (let cartPosition of state.cart) {
        if (cartPosition.id === parseInt(params.id)) {
          cartPosition.q = parseFloat(cartPosition.q);
          cartPosition.q = (params.quantity_inc + cartPosition.q).toFixed((Number.isInteger(params.quantity_inc) && Number.isInteger(cartPosition.q)) ? 0 : 1);
          break;
        }
      }
    },
    removeFromCart(state, productID) {
      let removeIdx = -1;
      for (let [idx, cartPosition] of Object.entries(state.cart)) {
        if (cartPosition.id === parseInt(productID)) {
          removeIdx = idx;
          break;
        }
      }
      if (removeIdx > -1) {
        state.cart.splice(removeIdx, 1);
      }
    },

    setOrder(state, order) {
      state.order = order;
    },

    setUserPosition(state, position){
      state.user_position = position;
    },

    setBrands(state, brands){
      state.brands_search=[]
      state.brands_search.push({"attributeId" : 1, "attributeValueId" : 14435, "value" : "Умные купальники"}) //костыль про умные купальники
      for (let item of brands) state.brands_search.push(item)
    },
    setColors(state, colors){state.colors_search = colors},
    setSizes(state,sizes){state.sizes_search  = sizes},
    OneSize(state, attr){state.OneSize = attr},
    setSearchResult(state, sr){state.search_result = sr},
    setSearchSettings(state, sr){state.search_settings = sr},
  },
})
