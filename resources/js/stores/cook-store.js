import Axios from "axios"
import Vue from "vue"
import Vuex from "vuex"
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)
export default new Vuex.Store({
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
        setProductList(state, orderList) {
            state.orderList = orderList
        },
        setCurrentOrder(state, currentOrder) {
            state.currentOrder = currentOrder
        },

    },
    getters: {
        getCurrentOrder: state => {
            return state.currentOrder
        },
    },
    actions: {
        getUserData(state) {
            return new Promise((resolve, reject) => {
                // Be sure to set the default value to `undefined` under the `state` object.
                axios.get("/api/users/me")
                    .then((response) => {
                        //console.log("User currently logged:");
                        //console.dir(response.data);
                        //this.logged = true;
                        //this.currentUser = response.data;
                        state.commit('setCurrentUser', response.data);
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

})