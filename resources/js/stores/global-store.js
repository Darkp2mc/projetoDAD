import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)
export default new Vuex.Store({
 	state: {
 		logged: null,
 		productList: [],
 		currentUser: null,
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
		}
	}
})