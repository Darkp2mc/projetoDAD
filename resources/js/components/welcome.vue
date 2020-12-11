<template>
  <div class="center">
    <p id="text">Food Home</p>
    <a v-if="this.logged == null" id="text" class="login" href="#/login">Login</a>
    <a
      v-if="this.logged != null"
      id="text"
      class="login"
      href="#/welcome"
      v-on:click.prevent="logout();reloadPage()"
      >Logout</a
    >
    <p id="text" class="welcome">Welcome!</p>
    <a id="text" class="products" href="#/products">Products</a>
  </div>
</template>

<script>
var menu = document.getElementsByName("menuOptions");
var text = document.getElementById("text");
var newDom = "";
var animationDelay = 6;

menu.addClass("content-hidden").fadeOut();

for (let i = 0; i < text.innerText.length; i++) {
  newDom +=
    '<span class="char">' +
    (text.innerText[i] == " " ? "&nbsp;" : text.innerText[i]) +
    "</span>";
}

text.innerHTML = newDom;
var length = text.children.length;

for (let i = 0; i < length; i++) {
  text.children[i].style["animation-delay"] = animationDelay * i + "ms";
}

var welcomeSection = $(".center"),
  productsButton = welcomeSection.find(".products"),
  loginButton = welcomeSection.find(".login");

setTimeout(function () {
  welcomeSection.removeClass("content-hidden");
}, 500);

productsButton.on("click", function () {
  welcomeSection.addClass("content-hidden").fadeOut();
});
loginButton.on("click", function () {
  welcomeSection.addClass("content-hidden").fadeOut();
});
</script>

<script>
import LayoutComponent from "./layout.vue";
import ProductComponent from "./product.vue";
import WelcomeComponent from "./welcome.vue";

export default {
  data() {
    return {
      logged: null,
      welcomePage: true,
    };
  },
  methods: {
    reloadPage(){
    window.location.reload()
  },
    logout() {
      axios
        .post("/api/logout")
        .then((response) => {
          alert("You logged out");
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
          this.logged = true;
          console.dir(response.data);
        })
        .catch((error) => {
          console.log("Invalid Request");
        });
    },
  },
  mounted: function () {
    axios
      .get("/api/users/me")
      .then((response) => {
        console.log("User currently logged:");
        console.dir(response.data);
        this.logged = true;
      })
      .catch((error) => {
        console.log("Invalid Request");
      });
  },
};
</script>
