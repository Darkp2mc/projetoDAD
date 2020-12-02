require('./bootstrap')

window.Vue = require('vue')

import App from './App.vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import LayoutComponent from './components/layout'
import LoginComponent from './components/login'
import ProductComponent from './components/product'
import WelcomeComponent from './components/welcome'



const routes = [
	{ path: '/', component: WelcomeComponent },
	{ path: '/login', component: LoginComponent },
	{ path: '/products', component: ProductComponent }
]

const router = new VueRouter({
	routes: routes
})


new Vue({
	router,
	render: h => h(App)
}).$mount('#app')


