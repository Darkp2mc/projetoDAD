require('./bootstrap')

window.Vue = require('vue')

import App from './App.vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import LayoutComponent from './components/layout'
import LoginComponent from './components/login'
import ProductComponent from './components/product'
import WelcomeComponent from './components/welcome.vue'
import CartComponent from './components/cart.vue'
import UserComponent from './components/user.vue'

const routes = [
	{ path: '/', redirect: '/welcome' },
	{ path: '/login', component: LoginComponent },
	{ path: '/products', component: ProductComponent },
	{ path: '/welcome', component: WelcomeComponent },
	{ path: '/cart', component: CartComponent },
	{ path: '/users', component: UserComponent},
]

const router = new VueRouter({
	routes: routes,
})


new Vue({
	router,
	render: h => h(App)
}).$mount('#app')


