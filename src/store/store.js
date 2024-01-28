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
    popular_products: null,
    hit_products:null,
    new_products:null,
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
  brands_search:[], colors_search:[], sizes_search:[], OneSize: null, search_result: {}, search_settings:{},
  addToOrder: null,
  cdek_cities:[
    {
      "code": 5,
      "city_uuid": "318ce2b1-d866-465d-90ec-e70000dcec45",
      "city": "Усинск",
      "fias_guid": "267fd50d-0077-4041-9594-18b1de5f2acb",
      "kladr_code": "1100000700000",
      "country_code": "RU",
      "country": "Россия",
      "region": "Республика Коми",
      "region_code": 1,
      "fias_region_guid": "c20180d9-ad9c-46d1-9eff-d60bc424592a",
      "sub_region": "городской округ Усинск",
      "longitude": 57.55701,
      "latitude": 65.994148,
      "time_zone": "Europe/Moscow",
      "payment_limit": -1.0
    },
    {
      "code": 6,
      "city_uuid": "8862f6b0-344c-4cd2-93ab-405ad9d9655d",
      "city": "Алтайское",
      "fias_guid": "a9958004-d348-442e-ae0d-b09aca9fdf25",
      "kladr_code": "2200300000100",
      "country_code": "RU",
      "country": "Россия",
      "region": "Алтайский край",
      "region_code": 2,
      "fias_region_guid": "8276c6a1-1a86-4f0d-8920-aba34d4cc34a",
      "sub_region": "Алтайский район",
      "longitude": 85.338182,
      "latitude": 51.952237,
      "time_zone": "Asia/Barnaul",
      "payment_limit": -1.0
    },
    {
      "code": 7,
      "city_uuid": "991bc48b-190c-4705-b56c-e8cb2a94e93f",
      "city": "Миасс",
      "fias_guid": "f2976e80-32e1-4284-8eda-06cf19239cd1",
      "kladr_code": "7400001000000",
      "country_code": "RU",
      "country": "Россия",
      "region": "Челябинская область",
      "region_code": 3,
      "fias_region_guid": "27eb7c10-a234-44da-a59c-8b1f864966de",
      "sub_region": "Миасский городской округ",
      "longitude": 60.101551,
      "latitude": 55.065257,
      "time_zone": "Asia/Yekaterinburg",
      "payment_limit": -1.0
    },
    {
      "code": 8,
      "city_uuid": "8e5f7600-d5ec-456c-a69e-4ed7ea31d175",
      "city": "Свирск",
      "fias_guid": "17e498bd-5f9e-4221-8998-5fa24a35ed2e",
      "kladr_code": "3800001600000",
      "country_code": "RU",
      "country": "Россия",
      "region": "Иркутская область",
      "region_code": 4,
      "fias_region_guid": "6466c988-7ce3-45e5-8b97-90ae16cb1249",
      "sub_region": "городской округ Свирск",
      "longitude": 103.342253,
      "latitude": 53.066572,
      "time_zone": "Asia/Irkutsk",
      "payment_limit": 0.0
    },
    {
      "code": 11,
      "city_uuid": "c16c32b0-facb-4195-aff3-db7740b1c1e1",
      "city": "Новотроицк",
      "fias_guid": "5cb431ac-6645-47b2-9716-5fccc9ec1d7f",
      "kladr_code": "5600000300000",
      "country_code": "RU",
      "country": "Россия",
      "region": "Оренбургская область",
      "region_code": 5,
      "fias_region_guid": "8bcec9d6-05bc-4e53-b45c-ba0c6f3a5c44",
      "sub_region": "городской округ Новотроицк",
      "longitude": 58.3017,
      "latitude": 51.196417,
      "time_zone": "Asia/Yekaterinburg",
      "payment_limit": -1.0
    },
    {
      "code": 12,
      "city_uuid": "706b7671-c4a4-48dd-9cc8-60b06a7d889c",
      "city": "Новый Уренгой",
      "fias_guid": "4136d0c1-3ff7-44c0-aa30-fa2e7eb96ef7",
      "kladr_code": "8900000600000",
      "country_code": "RU",
      "country": "Россия",
      "region": "Ямало-Ненецкий автономный округ",
      "region_code": 6,
      "fias_region_guid": "826fa834-3ee8-404f-bdbc-13a5221cfb6e",
      "sub_region": "городской округ Новый Уренгой",
      "longitude": 76.681,
      "latitude": 66.083963,
      "time_zone": "Asia/Yekaterinburg",
      "payment_limit": -1.0
    },
    {
      "code": 13,
      "city_uuid": "40dbb0ab-716e-4114-a0c7-fcea856dfd90",
      "city": "Белореченск",
      "fias_guid": "ce9dccce-d0a3-49c4-a934-3f8de7fbed2a",
      "kladr_code": "2300600100000",
      "country_code": "RU",
      "country": "Россия",
      "region": "Краснодарский край",
      "region_code": 7,
      "fias_region_guid": "d00e1013-16bd-4c09-b3d5-3cb09fc54bd8",
      "sub_region": "Белореченский район",
      "longitude": 39.86849,
      "latitude": 44.766017,
      "time_zone": "Europe/Moscow",
      "payment_limit": -1.0
    },
    {
      "code": 14,
      "city_uuid": "4a23995d-6ccc-4ba0-84da-c7fbe6707f9a",
      "city": "Пучеж",
      "fias_guid": "a85feb12-89e9-441d-956a-8510493cdc8d",
      "kladr_code": "3701400100000",
      "country_code": "RU",
      "country": "Россия",
      "region": "Ивановская область",
      "region_code": 8,
      "fias_region_guid": "0824434f-4098-4467-af72-d4f702fed335",
      "sub_region": "Пучежский район",
      "longitude": 43.168406,
      "latitude": 56.982087,
      "time_zone": "Europe/Moscow",
      "payment_limit": -1.0
    },
    {
      "code": 17,
      "city_uuid": "182cb3cf-d84a-47ef-90b5-f42d57aaf7cb",
      "city": "Пушкино",
      "fias_guid": "7f22cfa4-34fa-4fa0-bcb0-620cd8402cfa",
      "kladr_code": "5002700100000",
      "country_code": "RU",
      "country": "Россия",
      "region": "Московская область",
      "region_code": 9,
      "fias_region_guid": "29251dcf-00a1-4e34-98d4-5c47484a36d4",
      "sub_region": "Пушкинский городской округ",
      "longitude": 37.847164,
      "latitude": 56.011318,
      "time_zone": "Europe/Moscow",
      "payment_limit": -1.0
    },
    {
      "code": 19,
      "city_uuid": "af42acf3-f34e-4274-9f79-4a049bd6b3c9",
      "city": "Вилюйск",
      "fias_guid": "52297f9a-df7f-4d97-9260-342aed1f0718",
      "kladr_code": "1401100100000",
      "country_code": "RU",
      "country": "Россия",
      "region": "Республика Саха (Якутия)",
      "region_code": 10,
      "fias_region_guid": "c225d3db-1db6-4063-ace0-b3fe9ea3805f",
      "sub_region": "Вилюйский улус",
      "longitude": 121.623607,
      "latitude": 63.7549,
      "time_zone": "Asia/Yakutsk",
      "payment_limit": 0.0
    },
    {
      "code": 20,
      "city_uuid": "a6498d66-7e05-4f4d-ad26-a8c61e88c5ae",
      "city": "Радужный",
      "fias_guid": "394a840f-9502-406f-a8be-3a2aa9e8f075",
      "kladr_code": "8600001500000",
      "country_code": "RU",
      "country": "Россия",
      "region": "Ханты-Мансийский автономный округ - Югра",
      "region_code": 11,
      "fias_region_guid": "d66e5325-3a25-4d29-ba86-4ca351d9704b",
      "sub_region": "городской округ Радужный",
      "longitude": 77.458439,
      "latitude": 62.134265,
      "time_zone": "Asia/Yekaterinburg",
      "payment_limit": -1.0
    },
    {
      "code": 21,
      "city_uuid": "1d55ea42-d52a-4c80-b5d5-cc08be805d76",
      "city": "Егорьевск",
      "fias_guid": "17a3426e-add6-4b2e-b4b1-6f36da02b6ab",
      "kladr_code": "5000003900000",
      "country_code": "RU",
      "country": "Россия",
      "region": "Московская область",
      "region_code": 9,
      "fias_region_guid": "29251dcf-00a1-4e34-98d4-5c47484a36d4",
      "sub_region": "городской округ Егорьевск",
      "longitude": 39.035842,
      "latitude": 55.383055,
      "time_zone": "Europe/Moscow",
      "payment_limit": -1.0
    },
    {
      "code": 22,
      "city_uuid": "66518f47-8357-4fc6-b26e-0ca75982d008",
      "city": "Заборье-Судаково",
      "fias_guid": "21d763e8-3f57-44f6-8b36-7dfeecbb7a40",
      "country_code": "RU",
      "country": "Россия",
      "region": "Московская область",
      "region_code": 9,
      "fias_region_guid": "29251dcf-00a1-4e34-98d4-5c47484a36d4",
      "sub_region": "городской округ Домодедово",
      "longitude": 37.749858,
      "latitude": 55.371761,
      "time_zone": "Europe/Moscow",
      "payment_limit": -1.0
    },
    {
      "code": 24,
      "city_uuid": "39fa681a-bdaa-4ae1-8a2a-a579aafda313",
      "city": "Нижнеангарск",
      "fias_guid": "76dc6dc4-691a-4b43-99a4-215e0dc1cb41",
      "kladr_code": "0301700000100",
      "country_code": "RU",
      "country": "Россия",
      "region": "Республика Бурятия",
      "region_code": 12,
      "fias_region_guid": "a84ebed3-153d-4ba9-8532-8bdf879e1f5a",
      "sub_region": "Северо-Байкальский район",
      "longitude": 109.579094,
      "latitude": 55.788641,
      "time_zone": "Asia/Irkutsk",
      "payment_limit": -1.0
    },
    {
      "code": 26,
      "city_uuid": "1929ee63-7a40-4d45-8048-35ff44d9cf17",
      "city": "Талнах",
      "fias_guid": "f2791e51-9877-4e83-b771-cac6ecf85448",
      "country_code": "RU",
      "country": "Россия",
      "region": "Красноярский край",
      "region_code": 13,
      "fias_region_guid": "db9c4f8b-b706-40e2-b2b4-d31b98dcd3d1",
      "sub_region": "городской округ Норильск",
      "longitude": 88.390415,
      "latitude": 69.491663,
      "time_zone": "Asia/Krasnoyarsk",
      "payment_limit": -1.0
    },
  ],
  cdek_pvz: [
    {
      "code": "ALT9",
      "name": "5102 Постамат Халва",
      "uuid": "62a740f5-5c96-46c5-b462-e01d7364a3ca",
      "address_comment": "Совкомбанк",
      "nearest_station": "-",
      "work_time": "Пн-Пт 09:00-18:00",
      "phones": [
        {
          "number": "+74950090405"
        }
      ],
      "note": "Совкомбанк",
      "type": "POSTAMAT",
      "owner_code": "Халва",
      "take_only": true,
      "is_handout": true,
      "is_reception": false,
      "is_dressing_room": false,
      "is_ltl": false,
      "have_cashless": true,
      "have_cash": false,
      "allowed_cod": true,
      "office_image_list": [
        {
          "url": "https://pvzimage.cdek.ru/images/14205/54626_image"
        },
        {
          "url": "https://pvzimage.cdek.ru/images/14205/54624_image"
        }
      ],
      "work_time_list": [
        {
          "day": 1,
          "time": "09:00/18:00"
        },
        {
          "day": 2,
          "time": "09:00/18:00"
        },
        {
          "day": 3,
          "time": "09:00/18:00"
        },
        {
          "day": 4,
          "time": "09:00/18:00"
        },
        {
          "day": 5,
          "time": "09:00/18:00"
        }
      ],
      "weight_min": 0.0,
      "weight_max": 30.0,
      "dimensions": [
        {
          "width": 35,
          "height": 45,
          "depth": 38
        }
      ],
      "location": {
        "country_code": "RU",
        "region_code": 2,
        "region": "Алтайский край",
        "city_code": 6,
        "city": "Алтайское",
        "fias_guid": "a9958004-d348-442e-ae0d-b09aca9fdf25",
        "postal_code": "659650",
        "longitude": 85.33715,
        "latitude": 51.951164,
        "address": "ул. Советская, 138",
        "address_full": "659650, Россия, Алтайский край, Алтайское, ул. Советская, 138"
      },
      "fulfillment": false
    },
    {
      "code": "ALT5",
      "name": "На Советской 148",
      "uuid": "936b5bc6-8811-45ca-9e63-d51e03902138",
      "address_comment": "Пересечение улиц Советская и Партизанская. Магазин \"Аникс\".",
      "nearest_station": "Гастроном",
      "work_time": "Пн-Вс 09:00-19:00",
      "phones": [
        {
          "number": "+79588475215"
        }
      ],
      "email": "n.gridnev@cdek.ru",
      "note": "Пересечение улиц Советская и Партизанская. Магазин \"Аникс\".",
      "type": "PVZ",
      "owner_code": "CDEK",
      "take_only": false,
      "is_handout": true,
      "is_reception": true,
      "is_dressing_room": true,
      "is_ltl": false,
      "have_cashless": true,
      "have_cash": true,
      "allowed_cod": true,
      "office_image_list": [
        {
          "url": "https://pvzimage.cdek.ru/images/7437/22561_image"
        },
        {
          "url": "https://pvzimage.cdek.ru/images/7437/22567_image"
        },
        {
          "url": "https://pvzimage.cdek.ru/images/7437/22559_image"
        },
        {
          "url": "https://pvzimage.cdek.ru/images/7437/22569_image"
        },
        {
          "url": "https://pvzimage.cdek.ru/images/7437/22565_image"
        },
        {
          "url": "https://pvzimage.cdek.ru/images/7437/22563_image"
        }
      ],
      "work_time_list": [
        {
          "day": 1,
          "time": "09:00/19:00"
        },
        {
          "day": 2,
          "time": "09:00/19:00"
        },
        {
          "day": 3,
          "time": "09:00/19:00"
        },
        {
          "day": 4,
          "time": "09:00/19:00"
        },
        {
          "day": 5,
          "time": "09:00/19:00"
        },
        {
          "day": 6,
          "time": "09:00/19:00"
        },
        {
          "day": 7,
          "time": "09:00/19:00"
        }
      ],
      "location": {
        "country_code": "RU",
        "region_code": 2,
        "region": "Алтайский край",
        "city_code": 6,
        "city": "Алтайское",
        "fias_guid": "a9958004-d348-442e-ae0d-b09aca9fdf25",
        "postal_code": "659651",
        "longitude": 85.337204,
        "latitude": 51.952744,
        "address": "ул. Советская, 148",
        "address_full": "659651, Россия, Алтайский край, Алтайское, ул. Советская, 148"
      },
      "fulfillment": false
    }
  ],
},
mutations: {
  setHeaderPadding(state,value)
  {
    state.headerPadding = value
  },
  addToOrder(state, orderId){
    state.addToOrder = orderId
  },
  set_snack_message(state, msg) {
    state.snack_message.message = msg;
    state.snack_message.type = msg.type?msg.type:''
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
  setHitProducts(state, p) {
    state.hit_products = p;
  },
  setNewProducts(state, p) {
    state.new_products = p;
  },
  setHomePopularProducts(state, p) {
    state.popular_products = p;
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
  setCdekCities(state,sr) {state.cdek_cities = sr},
  setCdekPvz(state,sr) {state.cdek_pvz = sr},
},
})
