import store from "../store/store";

export default {
    getVariants(callTime) {
        let vm = this;

        if (vm.keyPressedTime <= callTime) {
            if (vm.searchString.length>3) {
                vm.activeSearchVariantIdx = null;
                vm.$API.searchProductsVariants(vm.searchString)
                .then(response => {
                    if (vm.keyPressedTime <= callTime) {
                        if (response.data.success) {
                            if (response.data.products && response.data.products.length) {
                                vm.variants = response.data.products;
                                vm.searchResultsVisible = true;
                                vm.resultEmpty = false
                            } else {
                                vm.variants = [];
                                vm.resultEmpty = true
                            }

                        }
                    }
                })
                .catch(error => {
                    console.log(error);
                })
                ;
            }
            else {
                vm.variants = [];
                vm.searchResultsVisible = false;
            }
            vm.keyPressed = false;
        }
    },
    scrollToVariant() {
        let vm = this;
        try {
            vm.$refs.searchResultsScroller.children[vm.activeSearchVariantIdx].scrollIntoView({
                block: 'center',
                behavior: 'smooth'
            });
        } catch (e) {console.log(e)}
    },
    keydown(e) {
        let vm = this, t = (new Date()).getTime();
        switch (true) {
            case e && e.keyCode === 38: // up
            if (vm.activeSearchVariantIdx === null) {
                vm.activeSearchVariantIdx = vm.variants.length - 1;
                vm.scrollToVariant();
            }
            else {
                if (vm.activeSearchVariantIdx > 0) {
                    --vm.activeSearchVariantIdx;
                    vm.scrollToVariant();
                }
            }
            break;
            case e && e.keyCode === 40: // down
            if (vm.activeSearchVariantIdx === null) {
                vm.activeSearchVariantIdx = 0;
                vm.scrollToVariant();
            }
            else {
                if (vm.activeSearchVariantIdx < vm.variants.length - 1) {
                    ++vm.activeSearchVariantIdx;
                    vm.scrollToVariant();
                }
            }
            break;
            case e && e.keyCode === 13: // Enter
                if(vm.searchString.length > 3) {
                    this.$router.push('/catalog/search/?query=' + vm.searchString)
                }
            break;
            case e && e.keyCode === 27: // Esc
            vm.$refs.searchStringInput.blur();
            break;
            default:
            vm.keyPressedTime = t;
            setTimeout(() => vm.getVariants(t), 300);
        }
    },
    focus() {
        if (this.searchString && this.searchString.length) {
            this.keydown();
            this.$refs.searchStringInput.select();
            setTimeout(() => this.$refs.searchStringInput.setSelectionRange(0, 9999), 300);
        }
    },
    blur() {
        let vm = this;
        vm.keyPressedTime = (new Date()).getTime();
        vm.searchResultsVisible = false;
        vm.activeSearchVariantIdx = null;
        vm.variants = [];
    },


    for_created() {
        if (!store.state.brands_search.length){
            this.$API.getAttributeValues(1).then(value => {
                if (value.data.success && value.data.attributeValues) store.commit('setBrands', value.data.attributeValues);
                if (this.$route.query.brand) {
                    this.products=[]
                    for (let s in this.brands_search) {
                        if (this.brands_search[s].value === this.$route.query.brand){
                            this.filter['brand'] = this.brands_search[s];
                            this.search();
                        }
                    }
                    if (!this.filter['brand']){
                        this.no_result="Не удалось найти товары бренда "+this.$route.query.brand
                    }
                }
            })
            this.$API.getAttributeValues(2).then(value => {
                if (value.data.success && value.data.attributeValues) {
                    let sizes_search = value.data.attributeValues, sort_array_bra = [], sort_array_t = [],
                    sort_array = ['OneSize', 'XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL', '40', '42', '42-44', '44', '44-46', '46', '46-48', '48', '50', '50-52', '70', '75', '80'];
                    for (let i = 0; i < sizes_search.length; i++) {
                        if (['1', '6', '7', '8', '9'].includes(sizes_search[i]['value'][0]) && sizes_search[i]['value'].length > 2) sort_array_bra = sort_array_bra.concat(sizes_search[i])
                        else {
                            if (sizes_search[i]['value'] === 'OneSize') store.commit('OneSize',sizes_search[i]);
                            if (sort_array.includes(sizes_search[i]['value'])) {
                                sort_array_t[sort_array.indexOf(sizes_search[i]['value'])] = sizes_search[i];
                            } else sort_array_t.push(sizes_search[i])
                        }
                    }
                    sizes_search = [];
                    sizes_search[1] = sort_array_t;
                    sizes_search[0] = sort_array_bra.sort(function (a, b) {return parseInt(a.value) - parseInt(b.value)});
                    store.commit('setSizes', sizes_search);
                }
            });
            this.$API.getAttributeValues(6).then(value => {if (value.data.success && value.data.attributeValues) store.commit('setColors',value.data.attributeValues);})
        }
        if (store.state.search_result.length) this.products = store.state.search_result
        if (store.state.search_settings['brand'] && this.filter) this.filter['brand'] = store.state.search_settings['brand']
        if (store.state.search_settings['colors'] && this.filter) this.filter['colors'] = store.state.search_settings['colors']
        if (store.state.search_settings['sizes'] && this.filter) this.filter['sizes'] = store.state.search_settings['sizes']
        if (this.$route.params.size) {
            this.products=[]
            for (let s in this.sizes_search[0]) {
                if (this.sizes_search[0][s].value === this.$route.params.size){
                    this.filter['sizes'] = this.sizes_search[0][s];
                    this.search();
                }
            }
            if (!this.filter['sizes']){
                this.no_result="Не удалось найти товары с размером "+this.$route.params.size
            }
        }
    },

    to_search(){
        this.i=1;
        this.products=[];
        this.filter_selected='';
        this.search();
        this.status = 'Поиск...'
    },
    search(page) {
        if (!page) page=1;
        this.blur();
        this.no_result = false;
        this.$store.commit('setSearchSettings', {'brand':this.filter['brand'],'colors':this.filter['colors'],'sizes':this.filter['sizes']})

        if (this.filter['colors'] && Object.values(this.filter['colors'])[0] && Array.isArray(Object.values(this.filter['colors'])[0])) {
            Object.values(this.filter['colors'])[0].forEach(color => {
              store.state.colors_search.forEach(cs => {
                if (cs.value === color) {
                  let f = {};
                  f['brand'] = this.filter['brand'];
                  f['sizes'] = this.filter['sizes'];
                  f['colors'] = cs;
                  this.ss(f, page);
                }
              });
            });
          } else {
            this.ss(this.filter, page);
          }
        if (!store.state.loader && (!this.products || this.products.length<1)){this.no_result = "По вашему запросу не удалось найти товары. Попробуйте изменить параметры поиска или свяжитесь с нами по телефону: ";}
        else this.no_result=false;
    },
    ss(f, page) {
        if (!page) page = 1;
        let attr = '';
        let category = '';
        if (f['brand']) {
          attr += '1-' + f['brand'].attributeValueId + ',';
        }
        if (f['sizes']) {
          attr += '2-' + f['sizes'].attributeValueId + ',';
        }
        if (f['colors']) {
          attr += '6-' + f['colors'].attributeValueId + ',';
        }
        attr = attr.substr(0, attr.length - 1);

        if (!f['brand'].attributeValueId &&
        (f['sizes'] && !f['sizes'].attributeValueId) &&
        !f['colors'].attributeValueId) {
          this.products = this.initialProduct;
          return;
        }

        this.$API.searchProducts(this.searchString, attr, page, category).then(value => {
          if (value.data.success) {
            if(this.products)
            this.products = [...this.products, ...value.data.products];
            if(this.initialProduct)
            this.initialProduct = [...this.initialProduct, ...value.data.products];
            this.status = 'По вашему запросу не удалось найти товары. Попробуйте изменить параметры поиска.'
          }
          if (value.data.products.length === 50) this.accept_product_request = true;
        });

        if (
          f['sizes'] &&
          [
            'XS',
            'S',
            'M',
            'L',
            'XL',
            '2XL',
            '3XL',
            '4XL',
            '5XL',
            '40',
            '42',
            '42-44',
            '44',
            '44-46',
            '46',
            '46-48',
            '48',
            '50',
            '50-52',
            '70',
            '75',
            '80'
          ].includes(f['sizes']['value'])
        ) {
          let f1 = {};
          f1['brand'] = f['brand'];
          f1['colors'] = f['colors'];
          f1['sizes'] = this.OneSize;
          this.ss(f1, page);
        }

      },
    async onScroll() {
        if(this.accept_product_request && window.scrollY + window.innerHeight > document.querySelector('.catalog-list__wrap').clientHeight - 100) {
            this.accept_product_request = false;
            this.i++;
            this.search(this.i);
            const response = await this.$API.getCategoryTopProducts(this.$route.params.id, 380, 570, this.i)

            if(response) {
                this.productsInitial = [...this.productsInitial, ...response]
            }

        }
    },
}
