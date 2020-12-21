<template>
  <div class="table-responsive">
    <h1 style="text-align: center; margin-top: 20px; margin-bottom: auto">
      {{ title }}
    </h1>
    <router-link to="/products" active-class="active">Products</router-link> -
    <a id="text" href="#/welcome" v-on:click="logout();">Logout</a>
    <hr />
    <!-- <img :src="'public/storage/fotos/'+this.user.photo_url"> -->
    <h5>Name: {{ this.user.name }}</h5>
    <h5>Email: {{ this.user.email }}</h5>
    <h5>Type: {{ this.user.type }}</h5>
  </div>
</template>

<style>
nav cart.router-link-exact-active {
  text-align: center;
}
</style>

<script>
export default {
  data: function () {
    return {
      title: "Your profile",
      logged: true,
      user: {
        name: "",
        address: "",
        phone: "",
        nif: null,
        email: "",
        photo_url: "",
      },
    };
  },
  methods: {
    getUsers: function () {
      axios
        .get("/api/users/me")
        .then((response) => {
          this.currentUser = response.data;
          this.user = this.currentUser;
        })
        .catch((error) => {
          console.log("Invalid Request");
        });
    },
    logout() {
      axios
        .post("/api/logout")
        .then((response) => {
          this.currentUser = "";
          this.user = null;
          this.logged = false;
          console.log("User has logged out");
        })
        .catch((error) => {
          console.log("Invalid Logout");
        });
    },
  },
  mounted: function () {
    this.getUsers();
  },
};
</script>
