require('./bootstrap');

window.Vue = require('vue')

import App from './App.vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);


import LayoutComponent from './components/layout'

const routes = [
	{ path: '/', component: LayoutComponent }
]

const router = new VueRouter({
	routes:routes
})


new Vue({
	router,
    render: h => h(App)
}).$mount('#app');
