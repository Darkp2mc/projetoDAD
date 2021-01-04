require('./bootstrap')
window.Vue = require('vue')

import VueSocketIO from "vue-socket.io"
Vue.use(
    new VueSocketIO({
        debug: true,
        connection: "http://127.0.0.1:8080"
    })
)

import Toasted from 'vue-toasted'
Vue.use(Toasted, {
    position: 'top-center',
    duration: 5000,
    type: 'info',
})


import App from './App.vue'
import VueRouter from 'vue-router'
import Vue from 'vue';
import VueSimpleAlert from "vue-simple-alert";

Vue.use(VueRouter)
Vue.use(VueSimpleAlert);

import LayoutComponent from './components/layout'
import LoginComponent from './components/login'
import ProductComponent from './components/product'
import OrderComponent from './components/orders/order.vue'
import WelcomeComponent from './components/welcome.vue'
import CartComponent from './components/cart.vue'
import UserComponent from './components/user.vue'
import MyselfComponent from './components/myself.vue'
import RegisterComponent from './components/register'
import MyselfEditComponent from './components/myselfEdit.vue'
import CookComponent from './components/dashboards/cook.vue'
import DeliveryManComponent from './components/dashboards/deliveryman.vue'
import GlobalMessagesComponent from './components/globalMessages.vue'

import store from "./stores/global-store"

const routes = [
	{ path: '/', redirect: '/welcome' , props: true},
	{ path: '/login', name: "login", component: LoginComponent , props: true},
	{ path: '/products', component: ProductComponent, props: true},
	{ path: '/orders', component: OrderComponent , props: true},
	{ path: '/welcome', component: WelcomeComponent , props: true},
	{ path: '/cart', component: CartComponent , props: true},
	{ path: '/users', component: UserComponent , props: true},
	{ path: '/myself', component: MyselfComponent , props: true},
	{ path: '/register', component: RegisterComponent , props: true},
	{ path: '/edit_profile', component: MyselfEditComponent , props: true},
	{ path: '/cook', component: CookComponent, props: true},
	{ path: '/deliveryman', component: DeliveryManComponent, props: true},
	{ path: '/chat', component: GlobalMessagesComponent, props: true},
	{ path: '*', redirect: '/welcome' }

]

const router = new VueRouter({
	routes: routes,
})

new Vue({
	store,
	router,
	render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
    console.log(to)
    if (!store.state.currentUser) {
        if ((to.path === '/orders') || (to.path === '/edit_profile') || (to.path === '/users') || (to.path === '/cart') || (to.path === '/myself')) {
            console.log('Não tem permissões')
            next(false)
            return
        }
    }
    next()
})


