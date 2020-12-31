<template>
  <div id="menuOptions" class="index">
    <div>
        <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
            <div v-if="this.$store.state.logged == true">
                <img
                  style="width: 15%; border-radius: 50%"
                  :src="'storage/fotos/' + this.currentUser.photo_url"
                />
                {{ this.currentUser.name }}
              </h3>
            </div>
            <div class="container">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <!-- Left Side Of Navbar -->
                    <ul class="navbar-nav mr-auto">

                    </ul>

                    <!-- Right Side Of Navbar -->
                    <ul class="navbar-nav ml-auto">
                        <!-- Authentication Links -->
                        <li class="nav-item" v-if="!logged">
                            <router-link to="/login" class="nav-link" active-class="active">Login</router-link>
                        </li>
                        <li class="nav-item" v-if="!logged">
                            <router-link to="/register" class="nav-link" active-class="active">Register</router-link>
                        </li>
                        <li class="nav-item " v-if="logged">
                            <router-link to="/" class="nav-link" active-class="active" v-on:click.native="logout">Logout</router-link>
                        </li>
                        <li class="nav-item " v-if="logged">
                            <router-link to="/products" class="nav-link" active-class="active">Products</router-link>
                        </li>
                        <li class="nav-item " v-if="logged && currentUser.type=='C'">
                            <router-link to="/cart" class="nav-link" active-class="active">Cart</router-link>
                        </li>
                        <li class="nav-item " v-if="logged && currentUser.type=='C'">
                            <router-link to="/orders" class="nav-link" active-class="active">Orders</router-link>
                        </li>
                        <li class="nav-item " v-if="logged && currentUser.type=='EC'">
                            <router-link to="/cook" class="nav-link" active-class="active">Dashboard</router-link>
                        </li>
                        <li class="nav-item " v-if="logged && currentUser.type=='ED'">
                            <router-link to="/deliveryman" class="nav-link" active-class="active">Dashboard</router-link>
                        </li>
                    </ul>
                </div>
                
            </div>
        </nav>
    </div>
    <router-view @loginNav="loginNav" :currentUser="currentUser"></router-view>
    <hr />
  </div>
</template>

<script>
import SlidingPagination from 'vue-sliding-pagination';
import LayoutComponent from "./components/layout";
import ProductComponent from "./components/product";
import OrderComponent from "./components/orders/order";
import WelcomeComponent from "./components/welcome";
import UserComponent from "./components/user";
import CartComponent from "./components/cart";
import RegisterComponent from './components/register'

export default {
  components: {
    layout: LayoutComponent,
    user: UserComponent,
    product: ProductComponent,
    cart: CartComponent,
    register: RegisterComponent,
    order: OrderComponent
  },
  data: function(){
      return {
          logged: false,
          currentUser: null,
      };
  },
  mounted () {
      this.myself();
  },
  watch:{
    logged: function () {
      this.myself();
    }
  },
  methods: {
    logout: function () {
        axios.post('/api/logout').then(response => {
          console.log('User has logged out')
          this.logged = false
        })
        .catch(error => {
            console.log('Invalid Logout')
        })
    },
    myself: function () {
      axios
        .get("/api/users/me")
        .then((response) => {
          console.log("User currently logged:");
          this.currentUser = response.data;
          this.logged = true;
        })
        .catch((error) => {
          console.log("Invalid Request");
        });
    },
    loginNav: function (){
      this.logged = true;
    }
  }
};
</script>
