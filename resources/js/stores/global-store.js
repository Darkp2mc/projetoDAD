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
	getters: {
		getProductList: state => state.productList,
		getCurrentUser: state => state.currentUserId,
  	},
	mutations: {
		getShoppingCart (state) {
    		state.shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
    		if(state.shoppingCart.length == 0)
    			state.shoppingCart = [];
    	},
		clearProductList (state) {
			state.productList = []
		},
		setProductList (state, productList) {
			state.productList = productList
		},
		setCurrentUser (state, currentUser) {
			state.currentUser = currentUser
		},
		setDepartments (state, products) {
		 	state.products = products
		},
		setShoppingCart(state, data){

			state.shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
			//this way is more efficient because when somebody add products usually is the same one consecutively
			if (state.shoppingCart.length == 0) {
				state.shoppingCart = [];
				state.shoppingCart.push({"currentUserId": data.currentUserId, "orderItem":[{"product": data.product, "quantity": 1, "subTotal": parseFloat(data.product.price)}], "total": parseFloat(data.product.price)})
			}
			else{
				for (var i = state.shoppingCart.length - 1; i >= 0; i--) {
					if (state.shoppingCart[i].currentUserId == data.currentUserId) {
						if (state.shoppingCart[i].orderItem.length - 1 == -1) {
							state.shoppingCart[i].orderItem.push({"product": data.product, "quantity": 1, "subTotal": parseFloat(data.product.price)});
							break;
						}
						for (var j = state.shoppingCart[i].orderItem.length - 1; j>= 0; j--) {
							if(state.shoppingCart[i].orderItem[j].product.id == data.product.id){
								state.shoppingCart[i].orderItem[j].quantity++;
								state.shoppingCart[i].orderItem[j].subTotal += parseFloat(state.shoppingCart[i].orderItem[j].product.price);
								break;
							}
							else if (j == 0) {
								state.shoppingCart[i].orderItem.push({"product": data.product, "quantity": 1, "subTotal": parseFloat(data.product.price)});
							}
						}
						break;
					}
					else if (i == 0) {
						state.shoppingCart.push({"currentUserId": data.currentUserId, "orderItem":[{"product": data.product, "quantity": 1, "subTotal": parseFloat(data.product.price)}], "total": parseFloat(data.product.price)})
					}
				}
			}
			localStorage.setItem('shoppingCart',JSON.stringify(state.shoppingCart));

		},
		changeItemQuantity(state, data){
			state.shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
			
			for (var i = state.shoppingCart.length - 1; i >= 0; i--) {
				if (state.shoppingCart[i].currentUserId = data.currentUserId) {
					state.shoppingCart[i].orderItem[data.id] = data.item;
					break;
				}
			}

			localStorage.setItem('shoppingCart',JSON.stringify(state.shoppingCart));
		},
		removeItemFromCart(state, data){
			state.shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
			for (var i = state.shoppingCart.length - 1; i >= 0; i--) {
				if (state.shoppingCart[i].currentUserId = data.currentUserId) {
					state.shoppingCart[i].orderItem.splice(data.id,1);
					break;
				}
			}
			localStorage.setItem('shoppingCart',JSON.stringify(state.shoppingCart));
		},
		removeAllItemsFromCart(state, currentUserId){
			state.shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
    		if(state.shoppingCart.length == 0)
    			state.shoppingCart = [];

			for (var i = state.shoppingCart.length - 1; i >= 0; i--) {
				if (state.shoppingCart[i].currentUserId = currentUserId) {
					state.shoppingCart.splice(i,1);
					break;
				}
			}
			localStorage.setItem('shoppingCart',JSON.stringify(state.shoppingCart));
		}
	}
})