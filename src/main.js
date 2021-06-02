import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'
import axios from 'axios'
import VueTheMask from 'vue-the-mask'
import YandexShare from '@cookieseater/vue-yandex-share'
import VueSkeletonLoader from 'skeleton-loader-vue'
import VueCookies from 'vue-cookies'
import { locale, lang } from './lang/localeLang';
import Paginate from 'vuejs-paginate'

import { VLazyImagePlugin } from "v-lazy-image";

import './assets/sass/main.scss'

import '@invisiburu/vue-picker/dist/vue-picker.min.css'

const getImageFunc = {
    staticImgUrl: (img) => {
        return 'https://cdn.collibri.kz/' + img
    }
}

Vue.prototype.$axios = axios;
Vue.prototype.$locale = locale;
Vue.prototype.$lang = localStorage.getItem('lang') !== null ? localStorage.getItem('lang') : 'ru';
Vue.prototype.$staticImageUrl = getImageFunc;
Vue.use(Vuelidate);
Vue.use(VueTheMask);
Vue.component('yandex-share', YandexShare);
Vue.component('paginate', Paginate)
Vue.component('vue-skeleton-loader', VueSkeletonLoader);
Vue.use(VueCookies);
Vue.use(VLazyImagePlugin);






import "vue-slick-carousel/dist/vue-slick-carousel.css";
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";

Vue.config.productionTip = false

var vm = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');