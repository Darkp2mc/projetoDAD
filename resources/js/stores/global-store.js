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
		setShoppingCart(state, data){

			state.shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
			//this way is more efficient because when somebody add products usually is the same one consecutively
			if (state.shoppingCart == null) {
				state.shoppingCart = [];
				state.shoppingCart.push({"currentUserId": data.currentUserId, "orderItem":[{"product": data.product, "quantity": 1}]})
			}
			else{
				for (var i = state.shoppingCart.length - 1; i >= 0; i--) {
					if (state.shoppingCart[i].currentUserId == data.currentUserId) {
						if (state.shoppingCart[i].orderItem.length - 1 == -1) {
							state.shoppingCart[i].orderItem.push({"product": data.product, "quantity": 0})
						}
						for (var j = state.shoppingCart[i].orderItem.length - 1; j>= 0; j--) {
							if(state.shoppingCart[i].orderItem[j].product.id == data.product.id){
								state.shoppingCart[i].orderItem[j].quantity++;
								break;
							}
						}
					}
				}
			}
			console.log(state.shoppingCart)
			localStorage.setItem('shoppingCart',JSON.stringify(state.shoppingCart));
		}
	}
})