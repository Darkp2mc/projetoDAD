import Axios from "axios"
import Vue from "vue"
import Vuex from "vuex"
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

Vue.use(Vuex)
export default new Vuex.Store({
	// Plugin necessário para os dados não serem apagados
	// quando se fecha o browser
	plugins: [createPersistedState({
        storage: window.sessionStorage,
    })],
	state: {
		logged: null,
		productList: [],
		currentUser: null,
		shoppingCart: []
	},
	mutations: {
		clearProductList(state) {
			state.productList = []
		},
		setProductList(state, productList) {
			state.productList = productList
		},
		setCurrentUser(state, currentUser) {
			state.currentUser = currentUser
		},
		setShoppingCart(state, data) {

			state.shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
			//this way is more efficient because when somebody add products usually is the same one consecutively
			if (state.shoppingCart == null) {
				state.shoppingCart = [];
				state.shoppingCart.push({ "currentUserId": data.currentUserId, "orderItem": [{ "product": data.product, "quantity": 1, "subTotal": parseFloat(data.product.price) }], "total": parseFloat(data.product.price) })
			}
			else {
				for (var i = state.shoppingCart.length - 1; i >= 0; i--) {
					if (state.shoppingCart[i].currentUserId == data.currentUserId) {
						if (state.shoppingCart[i].orderItem.length - 1 == -1) {
							state.shoppingCart[i].orderItem.push({ "product": data.product, "quantity": 1, "subTotal": parseFloat(data.product.price) });
							state.shoppingCart[i].total += parseFloat(state.shoppingCart[i].orderItem[j].product.price);
							break;
						}
						for (var j = state.shoppingCart[i].orderItem.length - 1; j >= 0; j--) {
							if (state.shoppingCart[i].orderItem[j].product.id == data.product.id) {
								state.shoppingCart[i].orderItem[j].quantity++;
								state.shoppingCart[i].orderItem[j].subTotal += parseFloat(state.shoppingCart[i].orderItem[j].product.price);
								state.shoppingCart[i].total += parseFloat(state.shoppingCart[i].orderItem[j].product.price);
								break;
							}
							else if (j == 0) {
								state.shoppingCart[i].orderItem.push({ "product": data.product, "quantity": 1, "subTotal": parseFloat(data.product.price) });
								state.shoppingCart[i].total += parseFloat(state.shoppingCart[i].orderItem[j].product.price);
							}
						}
						break;
					}
					else if (i == 0) {
						state.shoppingCart.push({ "currentUserId": data.currentUserId, "orderItem": [{ "product": data.product, "quantity": 1, "subTotal": parseFloat(data.product.price) }], "total": parseFloat(data.product.price) })
					}
				}
			}
			console.log(state.shoppingCart)
			localStorage.setItem('shoppingCart', JSON.stringify(state.shoppingCart));
		},
		cleanCart() {
			state.shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));

			localStorage.setItem('shoppingCart', JSON.stringify(state.shoppingCart));
		}
	},
	getters: {
		getCurrentUser: state => {
			return state.currentUser
		},
	},
	actions: {
		getUserData(context) {
			return new Promise((resolve, reject) => {
				// Be sure to set the default value to `undefined` under the `state` object.
				if (typeof this.state.currentUser === 'undefined') {
					axios.get("/api/users/me")
						.then((response) => {
							//console.log("User currently logged:");
							//console.dir(response.data);
							//this.logged = true;
							//this.currentUser = response.data;
							context.commit('setCurrentUser', response.data);
							resolve(response.data);
						})
						.catch((error) => {
							//this.currentUser = null;
							reject(error);
							console.log("Invalid Request");
						});
				}
				else {
					resolve(this.state.currentUser);
				}
			})
		}
	},
	
})