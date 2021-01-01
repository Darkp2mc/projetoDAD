import Axios from "axios"
import Vue from "vue"
import Vuex from "vuex"
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const moduleCook = {
	// Plugin necessário para os dados não serem apagados
    // quando se fecha o browser
    plugins: [createPersistedState({
        storage: window.sessionStorage,
    })],
    state: {
        logged: null,
        orderList: [],
        currentOrder: null,
    },
    mutations: {
        clearOrderList(state) {
            state.orderList = []
        },
        setOrderList(state, orderList) {
            state.orderList = orderList
        },
        setCurrentOrder(state, currentOrder) {
            state.currentOrder = currentOrder
		},
		getOrders(state) {
			state.orderList = JSON.parse(localStorage.getItem('orderList'));

			if (state.orderList == null) {
				state.orderList = [];
			}
		},
    },
    getters: {
        getCurrentOrder: state => {
            return state.currentOrder
        },
    },
    actions: {
        getOrderData(state) {
            return new Promise((resolve, reject) => {
                // Be sure to set the default value to `undefined` under the `state` object.
                axios.get("/api/order")
                    .then((response) => {
                        //console.log(response.data);
                        state.commit('setOrderList', response.data);
                        resolve(response.data);
                    })
                    .catch((error) => {
                        //this.currentUser = null;
                        reject(error);
                        console.log("Invalid Request");
                    });
            })
        }
    },
}

export default new Vuex.Store({
	modules:{
		cook: moduleCook,
	},

	// Plugin necessário para os dados não serem apagados
	// quando se fecha o browser
	plugins: [createPersistedState({
		storage: window.sessionStorage,
	})],
	state: {
		logged: null,
		productList: [],
		users: [],
		currentUser: null,
		shoppingCart: [],
		fetchedUser: null,
		totalProduts: null,
	},
	mutations: {
		getShoppingCart(state) {
			state.shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));

			if (state.shoppingCart == null) {
				state.shoppingCart = [];
			}
		},
		
		clearProductList(state) {
			state.productList = []
		},
		setProductList(state, productList) {
			state.productList = productList
		},
		setCurrentUser(state, currentUser) {
			state.currentUser = currentUser
		},
		setUserLoggedAtToNull(state){
			console.log(state.currentUser.logged_at)
			state.currentUser.logged_at = Date.parse(0)
			console.log(state.currentUser.logged_at)
		},
		setFetchedUser(state, user){
			state.fetchedUser = user; 
		},
		setShoppingCart(state, data) {
			state.shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
			//this way is more efficient because when somebody add products usually is the same one consecutively
			//
			if (state.shoppingCart == null) {
				state.shoppingCart = [];
				state.shoppingCart.push({ "currentUserId": data.currentUserId, "orderItem": [{ "product": data.product, "quantity": 1, "subTotal": parseFloat(data.product.price) }], "total": parseFloat(data.product.price) })
			}
			else if(state.shoppingCart.length == 0){
				state.shoppingCart = [];
				state.shoppingCart.push({ "currentUserId": data.currentUserId, "orderItem": [{ "product": data.product, "quantity": 1, "subTotal": parseFloat(data.product.price) }], "total": parseFloat(data.product.price) })
			}
			else {
				for (var i = state.shoppingCart.length - 1; i >= 0; i--) {
					if (state.shoppingCart[i].currentUserId == data.currentUserId) {
						if (state.shoppingCart[i].orderItem.length - 1 == -1) {
							state.shoppingCart[i].orderItem.push({ "product": data.product, "quantity": 1, "subTotal": parseFloat(data.product.price) });
							break;
						}
						for (var j = state.shoppingCart[i].orderItem.length - 1; j >= 0; j--) {
							if (state.shoppingCart[i].orderItem[j].product.id == data.product.id) {
								state.shoppingCart[i].orderItem[j].quantity++;
								state.shoppingCart[i].orderItem[j].subTotal += parseFloat(state.shoppingCart[i].orderItem[j].product.price);
								break;
							}
							else if (j == 0) {
								state.shoppingCart[i].orderItem.push({ "product": data.product, "quantity": 1, "subTotal": parseFloat(data.product.price) });
							}
						}
						break;
					}
					else if (i == 0) {
						state.shoppingCart.push({ "currentUserId": data.currentUserId, "orderItem": [{ "product": data.product, "quantity": 1, "subTotal": parseFloat(data.product.price) }], "total": parseFloat(data.product.price) })
					}
				}
			}
			localStorage.setItem('shoppingCart', JSON.stringify(state.shoppingCart));

		},

		changeItemQuantity(state, data) {
			state.shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));

			for (var i = state.shoppingCart.length - 1; i >= 0; i--) {
				if (state.shoppingCart[i].currentUserId = data.currentUserId) {
					state.shoppingCart[i].orderItem[data.id] = data.item;
					break;
				}
			}
			localStorage.setItem('shoppingCart', JSON.stringify(state.shoppingCart));
		},
		removeItemFromCart(state, data) {
			state.shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
			for (var i = state.shoppingCart.length - 1; i >= 0; i--) {
				if (state.shoppingCart[i].currentUserId = data.currentUserId) {
					state.shoppingCart[i].orderItem.splice(data.id, 1);
					break;
				}
			}
			localStorage.setItem('shoppingCart', JSON.stringify(state.shoppingCart));
		},
		removeItemFromCartProducts(state, data) {
			state.shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
			for (var i = state.shoppingCart.length - 1; i >= 0; i--) {
				if (state.shoppingCart[i].currentUserId = data.currentUserId) {
					for (var k = state.shoppingCart[i].orderItem.length - 1; k >= 0; k--) {
						if (state.shoppingCart[i].orderItem[k].product.id == data.productId) {
							state.shoppingCart[i].total -= state.shoppingCart[i].orderItem[k].product.price;
							state.shoppingCart[i].orderItem[k].quantity--;
							if (state.shoppingCart[i].orderItem[k].quantity == 0) {
								state.shoppingCart[i].orderItem.splice(k, 1);
							}
							else {
								state.shoppingCart[i].orderItem[k].subTotal -= state.shoppingCart[i].orderItem[k].product.price;
							}
						}
					}
					break;
				}
			}
			localStorage.setItem('shoppingCart', JSON.stringify(state.shoppingCart));
		},
		removeAllItemsFromCart(state, currentUserId) {
			state.shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
			if (state.shoppingCart == null)
				state.shoppingCart = [];

			for (var i = state.shoppingCart.length - 1; i >= 0; i--) {
				if (state.shoppingCart[i].currentUserId = currentUserId) {
					state.shoppingCart.splice(i, 1);
					break;
				}
			}
			localStorage.setItem('shoppingCart', JSON.stringify(state.shoppingCart));
		}
	},
	getters: {
		getCurrentUser: state => {
			return state.currentUser
		},
		getFetchedUser: state=>{
			return state.fetchedUser
		},
		getProductList: state=>{
			return state.productList
		},
		getUsers: state=>{
			console.log(state.users)
			return state.users
		},
		getTotalProducts: state=>{
			axios.get("api/products").then((response)=>{
				state.totalProduts= response.data.data.length;
			})
			return state.totalProduts
		}

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
		},
		setUsers(state) {
			return new Promise((resolve, reject) => {
				// Be sure to set the default value to `undefined` under the `state` object.
				axios.get("/api/users")
					.then((response) => {
						//console.log("User currently logged:");
						//console.dir(response.data);
						//this.logged = true;
						//this.currentUser = response.data;
						state.users = response.data;
						//resolve(response.data);
					})
					.catch((error) => {
						//this.currentUser = null;
						reject(error);
						console.log("Invalid Request");
					});
			})
		},
		
	},

})