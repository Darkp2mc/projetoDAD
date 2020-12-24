import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)
export default new Vuex.Store({
 	state: {
 		logged: null,
 		productList: [],
 		currentUser: null,
 		shoppingCart: []
	},
	mutations: {
		clearProductList (state) {
			state.productList = []
		},
		setProductList (state, productList) {
			state.productList = productList
		},
		setCurrentUser (state, currentUser) {
			state.currentUser = currentUser
		},
		setShoppingCart(state, product){
			//this way is more efficient because when somebody add products usually is the same one consecutively
			state.shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
			if (state.shoppingCart.length - 1 == -1) {
				state.shoppingCart.push({"product": product, "quantity": 0})
			}
			for (var i = state.shoppingCart.length - 1; i >= 0; i--) {
				if(state.shoppingCart[i].product.id == product.id){
					state.shoppingCart[i].quantity++;
					break;
				}
				if (i = this.shoppingCart.length - 1) {
					state.shoppingCart.push({"product": product, "quantity": 0})
				}
			}
			localStorage.setItem('shoppingCart',JSON.stringify(state.shoppingCart));
		}
	}
})