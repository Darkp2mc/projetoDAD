<template>
  <div class="center">
    <h1>Food Home</h1>

    <div class="btnProductsLogged" v-if="this.logged != false" v-on:click="products">Products</div>
    <div class="btnProducts" v-if="this.logged == false" v-on:click="products">Products</div>

    <div
      class="btnLogout"
      v-if="this.logged != false"
      href="#/welcome"
      v-on:click.prevent="
        logout();
        reloadPage();
      "
    >
      Logout
    </div>
    <div class="btnLogin" v-if="this.logged == false" v-on:click="login">Login</div>
    <div v-if="this.logged == false">
      <h2>Don't have an account?</h2>
      <div class="btnRegister" v-on:click="register">Register</div>
      <div class="debug" style="user-select: none;
  pointer-events: none;">⠀⠀⠀⠀⠀⠀</div>
    </div>
    <p v-if="this.logged != false" id="text" class="welcomeText">
      Welcome back {{ $store.state.currentUser.name }}!
    </p>
    <!--
    <p id="text">Food Home</p>
    <a v-if="this.logged == false" id="text" class="login" href="#/login">Login</a>
    <a
      v-if="this.logged != false"
      id="text"
      class="login"
      href="#/welcome"
      v-on:click.prevent="
        logout();
        reloadPage();
      "
      >Logout</a
    >
    <p v-if="this.logged == false" id="text" class="welcome">Welcome!</p>
    <p v-if="this.logged != false" id="text" class="welcome">
      Welcome back {{ $store.state.currentUser.name }}!
    </p>
    <div v-if="this.logged == false">
      <p id="text">Don't have an account?</p>
      <a id="text" class="register" href="#/register">Register</a>
    </div>
    <a id="text" class="products" href="#/products">Products</a>
  --></div>
</template>

<script>
import LayoutComponent from "./layout.vue";
import ProductComponent from "./product.vue";
import WelcomeComponent from "./welcome.vue";

export default {
  data() {
    return {
      logged: false,
      welcomePage: true,
    };
  },
  methods: {
    reloadPage() {
      window.location.reload();
    },
    logout: async function () {
      await axios
        .post("/api/logout")
        .then((response) => {
          this.$store.state.logged = false
          this.$store.commit("setCurrentUser", "");
          this.logged = false;
          console.log("User has logged out");
        })
        .catch((error) => {
          console.log("Invalid Logout");
        });
        await reloadPage();
    },
    register: function(){
      this.$router.push("/register");
    },
    login: function(){
      this.$router.push("/login");
    },
    products: function(){
      this.$router.push("/products");
    },
  },
  mounted: async function () {
    //this.logout();
    await axios
      .get("/api/users/me")
      .then((response) => {
        console.log("User currently logged:");
        console.dir(response.data);
        this.logged = true;
        this.$store.commit("setCurrentUser", response.data);
        this.$store.state.logged = true;
      })
      .catch((error) => {
        console.log(error);
      });
    //console.log("this.logged = "+this.logged);
  },
};
</script>

<style>

body {
  background-color: #10151b;
  background: url("./restaurante/restaurante.jpg");
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  font-family: "Oswald", sans-serif;
  -webkit-font-smoothing: antialiased;
  font-smoothing: antialiased;
}

h1 {
  margin-bottom: 15%;
  line-height: 0.95;
  color: #ffffff;
  font-weight: 900;
  font-size: 100px;
  text-transform: uppercase;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

h1:hover {
  font-size: 105px;
  color: #ffbe74;
}

h2 {
  position: absolute;
  margin-left: -500px;
  margin-top: 100px;
  line-height: 0.95;
  color: #ffffff;
  font-weight: 900;
  font-size: 20px;
  text-transform: uppercase;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.welcomeText:hover {
  font-size: 21px;
  color: #ffbe74;
}

.welcomeText {
  position: absolute;
  margin-right: 50%;
  margin-left: 50%;
  margin-top: -35%;
  line-height: 0.9;
  color: #ffffff;
  font-weight: 900;
  font-size: 20px;
  text-transform: uppercase;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.center {
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 50%;
}

.btnProductsLogged {
  position: absolute;
  margin-bottom: -100px;
  width: 170px;
  height: 60px;
  padding: 6px 0 0 3px;
  border: 2px solid #ffffff;
  border-radius: 2px;
  background: none;
  font-size: 16px;
  line-height: 45px;
  color: #fff;
  text-decoration: none;
  font-weight: 600;
  text-transform: uppercase;
  vertical-align: middle;
  text-align: center;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  -webkit-transition: background 0.4s, color 0.4s;
  transition: background 0.4s, color 0.4s;
  cursor: pointer;
}

.btnProductsLogged:hover {
  background: #ffffff;
  color: #10151b;
}

.btnProducts {
  position: absolute;
  margin-bottom: 180px;
  margin-right: -350px;

  width: 170px;
  height: 60px;
  padding: 6px 0 0 3px;
  border: 2px solid #ffffff;
  border-radius: 2px;
  background: none;
  font-size: 16px;
  line-height: 45px;
  color: #fff;
  text-decoration: none;
  font-weight: 600;
  text-transform: uppercase;
  vertical-align: middle;
  text-align: center;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  -webkit-transition: background 0.4s, color 0.4s;
  transition: background 0.4s, color 0.4s;
  cursor: pointer;
}

.btnProducts:hover {
  background: #ffffff;
  color: #10151b;
}

.btnLogout {
  position: absolute;
  margin-bottom: -230px;
  width: 170px;
  height: 60px;
  padding: 6px 0 0 3px;
  border: 2px solid #ffffff;
  border-radius: 2px;
  background: none;
  font-size: 16px;
  line-height: 45px;
  color: #fff;
  text-decoration: none;
  font-weight: 600;
  text-transform: uppercase;
  vertical-align: middle;
  text-align: center;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  -webkit-transition: background 0.4s, color 0.4s;
  transition: background 0.4s, color 0.4s;
  cursor: pointer;
}

.btnLogout:hover {
  background: #ffffff;
  color: #10151b;
}

.btnLogin {
  position: absolute;
  margin-bottom: 20px;
  margin-right: -350px;

  width: 170px;
  height: 60px;
  padding: 6px 0 0 3px;
  border: 2px solid #ffffff;
  border-radius: 2px;
  background: none;
  font-size: 16px;
  line-height: 45px;
  color: #fff;
  text-decoration: none;
  font-weight: 600;
  text-transform: uppercase;
  vertical-align: middle;
  text-align: center;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  -webkit-transition: background 0.4s, color 0.4s;
  transition: background 0.4s, color 0.4s;
  cursor: pointer;
}

.btnLogin:hover {
  background: #ffffff;
  color: #10151b;
}


.btnRegister {
  position: absolute;
  margin-top: 130px;
  margin-left: -430px;

  width: 170px;
  height: 60px;
  padding: 6px 0 0 3px;
  border: 2px solid #ffffff;
  border-radius: 2px;
  background: none;
  font-size: 16px;
  line-height: 45px;
  color: #fff;
  text-decoration: none;
  font-weight: 600;
  text-transform: uppercase;
  vertical-align: middle;
  text-align: center;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  -webkit-transition: background 0.4s, color 0.4s;
  transition: background 0.4s, color 0.4s;
  cursor: pointer;
}

.btnRegister:hover {
  background: #ffffff;
  color: #10151b;
}
</style>
