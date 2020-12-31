require('./bootstrap')

window.Vue = require('vue')

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
	{ path: '/cook', component: CookComponent},
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


