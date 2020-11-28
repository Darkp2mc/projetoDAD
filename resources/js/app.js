require('./bootstrap')

window.Vue = require('vue')

import App from './App.vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)


import LayoutComponent from './components/layout'
import LoginComponent from './components/login'
import ProductComponent from './components/product'

const routes = [
	{ path: '/login', component: LoginComponent },
	{ path: '/products', component: ProductComponent },
	{ path: '/', redirect: '/products' }
]

const router = new VueRouter({
	routes:routes
})


new Vue({
	router,
	render: h => h(App),
	data:function(){
		return{
			products: []
		};
	}
}).$mount('#app')
