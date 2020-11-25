require('./bootstrap');

window.Vue = require('vue')

import App from './App.vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);


import LayoutComponent from './components/layout'
import LoginComponent from './components/login'

const routes = [
	{ path: '/login', component: LoginComponent },
	{ path: '/', component: LayoutComponent }
]

const router = new VueRouter({
	routes:routes
})


new Vue({
	router,
    render: h => h(App)
}).$mount('#app');
