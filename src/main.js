import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'
import axios from 'axios'
import VueTheMask from 'vue-the-mask'
import YandexShare from '@cookieseater/vue-yandex-share'
import VueSkeletonLoader from 'skeleton-loader-vue'
import { locale, lang } from './lang/localeLang';

import './assets/sass/main.scss'


Vue.prototype.$axios = axios;
Vue.prototype.$locale = locale;
Vue.prototype.$lang = localStorage.getItem('lang') !== null ? localStorage.getItem('lang') : 'ru';
Vue.use(Vuelidate)
Vue.use(VueTheMask)
Vue.component('yandex-share', YandexShare);
Vue.component('vue-skeleton-loader', VueSkeletonLoader);


import "vue-slick-carousel/dist/vue-slick-carousel.css";
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";

Vue.config.productionTip = false

var vm = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');