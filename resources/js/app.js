require('./bootstrap')

window.Vue = require('vue')

import App from './App.vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import LayoutComponent from './components/layout'
import LoginComponent from './components/login'
import ProductComponent from './components/product'

//////////////////////////////////////////////////////////////////////////////

var text = document.getElementById('text');
var newDom = '';
var animationDelay = 6;

for (let i = 0; i < text.innerText.length; i++) {
	newDom += '<span class="char">' + (text.innerText[i] == ' ' ? '&nbsp;' : text.innerText[i]) + '</span>';
}

text.innerHTML = newDom;
var length = text.children.length;

for (let i = 0; i < length; i++) {
	text.children[i].style['animation-delay'] = animationDelay * i + 'ms';
}

var welcomeSection = $('.center'),
	productsButton = welcomeSection.find('.products'),
	loginButton = welcomeSection.find('.login');

setTimeout(function () {
	welcomeSection.removeClass('content-hidden');
}, 500);

productsButton.on('click', function () {
	welcomeSection.addClass('content-hidden').fadeOut();
});
loginButton.on('click', function () {
	welcomeSection.addClass('content-hidden').fadeOut();
});

//////////////////////////////////////////////////////////////////////////////


const routes = [
	{ path: '/login', component: LoginComponent },
	{ path: '/products', component: ProductComponent },
	{ path: '/', redirect: '/welcome' }
]

const router = new VueRouter({
	routes: routes
})


new Vue({
	router,
	render: h => h(App),
	data: function () {
		return {
			products: []
		};
	}
}).$mount('#app')


