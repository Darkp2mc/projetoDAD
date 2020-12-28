<template>
  <div class="jumbotron">
    <h2>Login</h2>
    <div class="form-group">
      <label for="inputEmail">Email</label>
      <input
        type="email"
        class="form-control"
        v-model="credentials.email"
        name="email"
        id="inputEmail"
        placeholder="Email address"
      />
    </div>
    <div class="form-group">
      <label for="inputPassword">Password</label>
      <input
        type="password"
        class="form-control"
        v-model="credentials.password"
        name="password"
        id="inputPassword"
      />
    </div>
    <div class="form-group">
      <a class="btn btn-default" v-on:click.prevent="login">Login</a>
      <a class="btn btn-default" v-on:click.prevent="cancel()">Cancel</a>
      <div class="btn btn-xs btn-danger" v-if="failedMessage"></div>
      <strong>{{ failedMessage }}</strong>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      credentials: {
        email: "",
        password: "",
      },
      failedMessage: "",
      welcomePage: false,
    };
  },
  methods: {
    cancel: function () {
      this.$router.push("/welcome");
    },
    login: async function() {
      console.dir(this.credentials);
      //mudar de página depois do login: this.$router.push('/products')
      await axios.get("/sanctum/csrf-cookie").then((response) => {
        axios
          .post("/api/login", this.credentials)
          .then((response) => {
            if (response.data.blocked == 1) {
              alert("Your account is blocked");
              this.failedMessage = "Your account is blocked";
              this.logout()
            }
            else{
              console.log("User has logged in");
              this.$router.push("/products");
              this.$store.commit('setCurrentUser',this.response.data);
              this.$store.state.logged = true
            }
          })
          .catch((error) => {
            this.failedMessage = "Invalid Authentication";
          });
      });
    },
  },
};
</script>
