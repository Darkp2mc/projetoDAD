<template>
  <div class="jumbotron">
    <h2>Register</h2>
    <div class="form-group">
      <label for="inputFullName">Full name</label>
      <input
        type="text"
        class="form-control"
        v-model="credentials.name"
        name="name"
        id="inputName"
        placeholder="Full name"
        value=""
      />
    </div>
    <div class="form-group">
      <label for="inputEmail">Email</label>
      <input
        type="text"
        class="form-control"
        v-model="credentials.email"
        name="email"
        id="inputEmail"
        placeholder="Email address"
        value=""
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
        placeholder="Password"
        value=""
      />
    </div>
    <div class="form-group">
      <label for="inputAddress">Address</label>
      <input
        type="text"
        class="form-control"
        v-model="credentials.address"
        name="address"
        id="inputEmail"
        placeholder="Address"
        value=""
      />
    </div>
    <div class="form-group">
      <label for="inputAddress">Phone number</label>
      <input
        type="text"
        class="form-control"
        v-model="credentials.phone"
        name="phone"
        id="inputPhone"
        placeholder="Phone number"
        value=""
      />
    </div>
    <div class="form-group">
      <label for="inputNIF">NIF (Optional)</label>
      <input
        type="text"
        class="form-control"
        v-model="credentials.nif"
        name="nif"
        id="inputNIF"
        placeholder="NIF"
        value=""
      />
    </div>
    <div class="form-group">
      <label for="inputPhoto">Photo (Optional)</label>
      <input
        type="photo"
        class="form-control"
        v-model="credentials.photo_url"
        name="photo"
        id="inputPhoto"
      />
    </div>
    <div class="form-group">
      <a class="btn btn-default" v-on:click.prevent="register()">Confirm</a>
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
        name: "",
        email: "",
        password: "",
        photo_url: "",
        address: "",
        phone: "",
        nif: "",
      },
      failedMessage: "",
      logged: false,
      welcomePage: false,
    };
  },
  methods: {
    cancel: function (){
      this.$router.push("/welcome");
    },
    register() {
      console.dir(this.credentials);
      //mudar de página depois do login: this.$router.push('/products')
      axios.get("/sanctum/csrf-cookie").then((response) => {
        axios
          .post("/api/register", this.credentials)
          .then((response) => {
            console.log(this.credentials);
            /*console.log("User has logged in");
            this.$router.push("/products");
            this.logged = true;
            console.dir(response.data);
            this.$store.commit("setAuthentication", true);*/
          })
          .catch((error) => {
			  if(this.logged == false){
			    this.failedMessage = "Registration failed";
			}
          });
      });
    },
  },
};
</script>
