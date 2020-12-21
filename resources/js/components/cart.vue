<template>
  <div class="table-responsive">
    <h1 style="text-align: center; margin-top: 20px; margin-bottom: auto">
      {{ title }}
    </h1>
    <router-link to="/products" active-class="active">Products</router-link> -
    <router-link to="/login">Login</router-link>
    <a v-if="$root.logged" href="#" @click.prevent="logout">Logout</a>
    <a v-if="logged" href="#" @click.prevent="myself">Myself</a>
    <hr />
  </div>
</template>

<style>
nav cart.router-link-exact-active {
  text-align: center;
}
</style>

<script>
import productDetails from "./product.vue";

export default {
  components: {
    'productDetails': productDetails,
  },
  data: function () {
    return {
      title: "Shopping Cart",
      showSuccess: false,
      showFailure: false,
      successMessage: "",
      failMessage: "",
      currentUser: null,
      products: [],
    };
  },
  methods: {
    myself() {
      axios
        .get("/api/users/me")
        .then((response) => {
          console.log("User currently logged:");
          this.logged = true;
          console.dir(response.data);
        })
        .catch((error) => {
          console.log("Invalid Request");
        });
    },
  },
};
</script>
