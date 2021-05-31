import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "@/views/auth/Login";
import ForgotPassword from "@/views/auth/ForgotPassword";
import Register from "@/views/auth/Register";
import Restore from "@/views/auth/Restore";
import SendEmailStatus from "@/views/auth/SendEmailStatus";
import AccountPage from "@/views/AccountPage";

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/catalog/:slug/:id&page=:page',
        name: 'catalogPage',
        component: () =>
            import ('../views/Catalog.vue')
    },
    {
        path: '/new',
        name: 'new',
        component: () =>
            import ('../views/NewProducts.vue')
    },
    {
        path: '/best',
        name: 'best',
        component: () =>
            import ('../views/BestProduct.vue')
    },
    {
        path: '/about',
        name: 'about',
        component: () =>
            import ('../views/About.vue')
    },
    {
        path: '/product/:id',
        name: 'product',
        component: () =>
            import ('../views/ProductPage.vue')
    },
    {
        path: '/brands',
        name: 'brands',
        component: () =>
            import ('../views/Brands.vue')
    },
    {
        path: '/brands-inner/:slug/id=:id&page=:page',
        name: 'brandProducts',
        component: () =>
            import ('../views/BrandPage.vue')
    },
    {
        path: '/blogs',
        name: 'blogs',
        component: () =>
            import ('../views/Blogs.vue')
    },
    {
        path: '/blogs/:id',
        name: 'blogPage',
        component: () =>
            import ('../views/BlogPage.vue')
    },
    {
        path: '/contacts',
        name: 'contacts',
        component: () =>
            import ('../views/Contacts.vue')
    },
    {
        path: '/favorites',
        name: 'favorites',
        component: () =>
            import ('../views/Favorites_page.vue')
    },
    {
        path: '/cart',
        name: 'cart',
        component: () =>
            import ('../views/Cart_page.vue')
    },
    {
        path: '/ordering-page',
        name: 'ordering-page',
        component: () =>
            import ('../views/OrderingPage.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/forgot-password',
        name: 'ForgotPassword',
        component: ForgotPassword
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/restore',
        name: 'Restore',
        component: Restore
    },
    {
        path: '/send-email',
        name: 'SendEmailStatus',
        component: SendEmailStatus
    },
    {
        path: '/my-account',
        name: 'AccountPage',
        component: AccountPage
    },
]


const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
})

export default router