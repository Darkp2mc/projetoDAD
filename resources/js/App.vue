<template>
  <div id="menuOptions" class="index">
    <router-view></router-view>
    <hr/>
  </div>
</template>

<script>
import LayoutComponent from "./components/layout";
import ProductComponent from "./components/product";
import WelcomeComponent from "./components/welcome";
import UserComponent from "./components/user";
import CartComponent from "./components/cart";

export default {
  components: {
    layout: LayoutComponent,
    user: UserComponent,
	product: ProductComponent,
	cart: CartComponent,
  },
  data() {
    return {
      welcomePage: false,
      logged: null,
    };
  },
  methods: {
    logout() {
      axios
        .post("/api/logout")
        .then((response) => {
          console.log("User has logged out");
        })
        .catch((error) => {
          console.log("Invalid Logout");
        });
    },
    myself() {
      axios
        .get("/api/users/me")
        .then((response) => {
          console.log("User currently logged:");
          console.dir(response.data);
        })
        .catch((error) => {
          console.log("Invalid Request");
        });
    },
  },
  mounted: function () {
    /*axios
      .get("/api/users/me")
      .then((response) => {
        console.log("User currently logged:");
        console.dir(response.data);
        this.logged = false;
      })
      .catch((error) => {
        console.log("Invalid Request");
        this.logged = true;
      });*/
  },
};
</script>
