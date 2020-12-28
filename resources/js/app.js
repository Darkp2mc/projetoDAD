require('./bootstrap')

window.Vue = require('vue')

import App from './App.vue'
import VueRouter from 'vue-router'
import Vue from 'vue';

Vue.use(VueRouter)

import LayoutComponent from './components/layout'
import LoginComponent from './components/login'
import ProductComponent from './components/product'
import WelcomeComponent from './components/welcome.vue'
import CartComponent from './components/cart.vue'
import UserComponent from './components/user.vue'
import MyselfComponent from './components/myself.vue'
import RegisterComponent from './components/register'
import MyselfEditComponent from './components/myselfEdit.vue'
import CookComponent from './components/dashboards/cook.vue'

import store from "./stores/global-store"

const routes = [
	{ path: '/', redirect: '/welcome' },
	{ path: '/login', name: "login", component: LoginComponent },
	{ path: '/products', component: ProductComponent },
	{ path: '/welcome', component: WelcomeComponent },
	{ path: '/cart', component: CartComponent },
	{ path: '/users', component: UserComponent },
	{ path: '/myself', component: MyselfComponent },
	{ path: '/register', component: RegisterComponent },
	{ path: '/edit_profile', component: MyselfEditComponent },
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


