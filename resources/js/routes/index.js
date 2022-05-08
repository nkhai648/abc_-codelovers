import Vue from 'vue';
import VueRouter from 'vue-router';
import { Home, Register, Products, Category } from '../components';
Vue.use(VueRouter)

export default new VueRouter({
    // mode: 'history',
    routes: [
        {
            path: '/',
            component: Home,
            name: "Home"
        },
        {
            path: '/register',
            component: Register,
            name: "Register"
        },
        {
            path: '/products',
            component: Products,
            name: "Products",
            // beforeEnter: (to, form, next) => {
            //     axios.get('/api/admin/authenticated')
            //         .then(next => {
            //             next()
            //         })
            //         .catch(() => {
            //             next({name: 'Login'})
            //         })
            // }
        },
        {
            path: '/category',
            component: Category,
            name: "Category",
            // beforeEnter: (to, form, next) => {
            //     axios.get('/api/admin/authenticated')
            //         .then(next => {
            //             next()
            //         })
            //         .catch(() => {
            //             next({name: 'Login'})
            //         })
            // }
        },
    ]
})