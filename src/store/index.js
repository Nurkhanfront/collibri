import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);


export default new Vuex.Store({
    state: {
        lang: localStorage.getItem('lang') !== null ? localStorage.getItem('lang') : 'ru',
        imgUrl: 'https://cdn.collibri.kz/',
        apiUrl: 'https://admin.collibri.kz/api/',
        catalogData: [],
        productItem: null,
        catalogFilter: [],
        favoritesArray: [],
        cartLength: [],
        loader: false,
        loadingProducts: false,
        nextPage: null,
        moreLoader: null,
        catalogDropdown: false,
        cartData: [],
        totalPrice: null
    },
    mutations: {
        SET_PRODUCTS(state, products) {
            state.catalogData = products;
        },

        SET_BRAND_PRODUCTS(state, products) {
            state.catalogData = products;
        },

        PRODUCT_ITEM(state, product) {
            state.productItem = product;
        },

        FILTER_PRODUCTS(state, products) {
            state.catalogFilter = products;
        },

        FILTER_BRAND_PRODUCTS(state, products) {
            state.catalogFilter = products;
        },

        MORE_PRODUCTS(state, products) {
            state.nextPage = products.products.next_page_url;
            products.products.data.forEach((element) => {
                state.catalogData.products.data.push(element)
            })
        },

        SORTED_PRODUCTS(state, products) {
            state.catalogData = products;
        },

        CHANGE_LANGUAGE(state) {
            state.lang = localStorage.getItem('lang')
            if (state.lang === 'en') {
                state.lang = 'ru'
                localStorage.setItem('lang', 'ru');
            } else {
                state.lang = 'en'
                localStorage.setItem('lang', state.lang)
            }
            document.body.classList.add('langLoader')
            setTimeout(() => {
                window.location.reload();
            }, 500);
        },

        CATALOG_DROPDOWN(state) {
            state.catalogDropdown = !state.catalogDropdown;
        },

        ADD_FAVORITES(state, product) {
            let favoriteStorage = JSON.parse(localStorage.getItem('favorite'));
            if (favoriteStorage == null) {
                localStorage.setItem('favorite', JSON.stringify([product]))
            } else if (state.favoritesArray == []) {
                favoriteStorage.push(product)
                localStorage.setItem('favorite', JSON.stringify(favoriteStorage))
                state.favoritesArray = favoriteStorage.length
            } else if (favoriteStorage.find(item => item.id == product.id)) {
                favoriteStorage.forEach((item, index) => {
                    if (item.id == product.id) {
                        favoriteStorage.splice(index, 1)
                    }
                })
                localStorage.setItem('favorite', JSON.stringify(favoriteStorage))
                state.favoritesArray = favoriteStorage.length
            } else {
                favoriteStorage.push(product)
                state.favoritesArray = favoriteStorage.length
                localStorage.setItem('favorite', JSON.stringify(favoriteStorage))
            }
        },

        ADD_TO_CART(state, product) {
            let cartList = JSON.parse(localStorage.getItem('cart_products'));
            if (cartList == null) {
                localStorage.setItem('cart_products', JSON.stringify([product.id]))
            } else if (state.cartLength == []) {
                cartList.push(product.id)
                localStorage.setItem('cart_products', JSON.stringify(cartList))
                state.cartLength = cartList.length
            } else if (cartList.find(item => item == product.id)) {
                cartList.forEach((item, index) => {
                    if (item == product.id) {
                        cartList.splice(index, 1)
                    }
                })
                localStorage.setItem('cart_products', JSON.stringify(cartList))
                state.cartLength = cartList.length
            } else {
                cartList.push(product.id)
                state.cartLength = cartList.length
                localStorage.setItem('cart_products', JSON.stringify(cartList))
            }
        },

        DELETE_PRODUCT(state, id) {
            let cartList = JSON.parse(localStorage.getItem("cart_products"));

            cartList = cartList.filter((t) => t !== id);

            state.cartLength = cartList.length

            localStorage.setItem("cart_products", JSON.stringify(cartList));
        },

        CART_TOTAL_PRICE(state, count) {
            for (let item of state.cartData) {
                Vue.set(item, 'count', 1)
                state.totalPrice.push(item.price * item.count);
            }

            state.totalPrice = state.totalPrice.reduce(function(sum, el) {
                return sum + el;
            });

            // return state.totalPrice;
        }



    },
    actions: {
        GET_PRODUCTS({ commit, state }, id) {
            state.loader = true
            axios
                .get(`${state.apiUrl}get-products`, {
                    params: {
                        lang: state.lang,
                        category_id: id
                    }
                })
                .then(function(response) {
                    const products = response.data;
                    commit('SET_PRODUCTS', products);
                    setTimeout(() => {
                        state.loader = false
                    }, 100);
                });
        },

        GET_BRAND_PRODUCTS({ commit, state }, id) {
            state.loader = true
            axios
                .get(`${state.apiUrl}get-brand-products`, {
                    params: {
                        lang: state.lang,
                        brand_id: id
                    }
                })
                .then(function(response) {
                    const products = response.data;
                    commit('SET_BRAND_PRODUCTS', products);
                    setTimeout(() => {
                        state.loader = false
                    }, 100);
                });
        },

        FILTER_BRAND_PRODUCTS({ commit, state }, { productId, brandId }) {
            let brand_id = brandId;
            axios.get(`${state.apiUrl}get-brand-products`, {
                    params: {
                        lang: state.lang,
                        brand_id: productId,
                        filter_id: brand_id,
                    }
                })
                .then((response) => {
                    const products = response.data;
                    commit('FILTER_BRAND_PRODUCTS', products);
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        FILTER_PRODUCTS({ commit, state }, { productId, filterId }) {
            let filter_id = filterId;
            state.loadingProducts = true
            axios.get(`${state.apiUrl}get-products`, {
                    params: {
                        lang: state.lang,
                        category_id: productId,
                        filter_id: filter_id,
                    }
                })
                .then((response) => {
                    const products = response.data;
                    commit('FILTER_PRODUCTS', products);
                    state.loadingProducts = false
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        GET_PRODUCT_PAGE({ commit, state }, url) {
            state.loader = true
            axios
                .get(`${state.apiUrl}product?lang=${state.lang}&slug=${url}`)
                .then(function(response) {
                    const product = response.data;
                    setTimeout(() => {
                        state.loader = false
                    }, 100);
                    commit('PRODUCT_ITEM', product)
                });
        },

        MORE_PRODUCTS({ commit, state }, { productId, page }) {
            state.moreLoader = true,
                axios
                .get(`${state.apiUrl}get-products`, {
                    params: {
                        lang: state.lang,
                        category_id: productId,
                        page: page
                    }
                })
                .then(function(response) {
                    setTimeout(() => {
                        state.moreLoader = null;
                        const products = response.data;
                        state.nextPage = products.products.next_page_url;
                        commit('MORE_PRODUCTS', products)
                    }, 1000);
                });
        },

        MORE_BRAND_PRODUCTS({ commit, state }, { productId, page }) {
            state.moreLoader = true,
                axios
                .get(`${state.apiUrl}get-brand-products`, {
                    params: {
                        lang: state.lang,
                        brand_id: productId,
                        page: page
                    }
                })
                .then(function(response) {
                    setTimeout(() => {
                        state.moreLoader = null;
                        const products = response.data;
                        state.nextPage = products.products.next_page_url;
                        commit('MORE_PRODUCTS', products)
                    }, 1000);
                });
        },

        SORTED_PRODUCTS({ commit, state }, { productId, sortedProduct }) {
            axios.get(`${state.apiUrl}get-products`, {
                    params: {
                        lang: state.lang,
                        category_id: productId,
                        order_by: sortedProduct,
                    }
                })
                .then((response) => {
                    const products = response.data;
                    commit('SORTED_PRODUCTS', products)
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        GET_CART_PRODUCTS({ commit, state }) {
            let cartProductsId = JSON.parse(localStorage.getItem("cart_products"));
            if (cartProductsId !== null && cartProductsId.length) {
                axios.get(`${state.apiUrl}card-product`, {
                        params: {
                            product_id: cartProductsId,
                            lang: state.lang,
                        },
                    })
                    .then((response) => {
                        state.cartData = response.data;
                        commit('CART_TOTAL_PRICE')
                    });
            }
        },


    },
    getters: {
        CATEGORY_PRODUCTS(state) {
            return state.catalogData;
        },
        BRAND_PRODUCTS(state) {
            return state.catalogData;
        },
        CATALOG_FILTER(state) {
            return state.catalogFilter;
        },
        PRODUCT_ITEM(state) {
            return state.productItem;
        },
        IMG_URL(state) {
            return state.imgUrl;
        },

        GET_FAVOURITE_COUNT(state) {
            return state.favoritesArray
        },

        GET_CART_LENGTH(state) {
            return state.cartLength
        },

        CART_PRODUCTS(state) {
            return state.cartData
        },

        totalPrice(state) {
            return state.totalPrice
        },
    }
})