<template>
  <div class="table-responsive">
    <h1 style="text-align: center; margin-top: 20px; margin-bottom: auto">
      {{ title }}
    </h1>
    <router-link to="/products" active-class="active">Products</router-link> -
    <a id="text" href="#/welcome" v-on:click="logout()">Logout</a>
    <a class="editProfile" href="#/edit_profile">Edit profile</a>
    <hr />

    <figure class="snip1344">
      <img
        :src="'storage/fotos/' + this.user.photo_url"
        alt="profile-sample1"
        class="background"
      /><img
        :src="'storage/fotos/' + this.user.photo_url"
        alt="profile-sample1"
        class="profile"
      />
      <figcaption>
        <h3>
          {{ this.user.name }}<span>{{ this.user.type }}</span
          ><span>{{ this.user.email }}</span>
        </h3>
        <div class="icons">
          <a href="#"><i class="ion-social-reddit-outline"></i></a
          ><a href="#"> <i class="ion-social-twitter-outline"></i></a
          ><a href="#"> <i class="ion-social-vimeo-outline"></i></a>
        </div>
      </figcaption>
    </figure>
  </div>
</template>

<style>
.editProfile{
  float:right;
  margin-right: 30px;
}

nav cart.router-link-exact-active {
  text-align: center;
}

@import url(https://fonts.googleapis.com/css?family=Open+Sans:300,400,600);
@import url(https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css);

.center {
  margin: auto;
  width: 50%;
  padding: 10px;
}

.snip1344 {
  font-family: "Open Sans", Arial, sans-serif;
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 40%;
  position: relative;
  overflow: hidden;
  min-width: 230px;
  max-width: 315px;
  color: #ffffff;
  text-align: center;
  line-height: 1.4em;
  background-color: #141414;
}
.snip1344 * {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-transition: all 0.25s ease;
  transition: all 0.25s ease;
}
.snip1344 .background {
  
  width: 100%;
  vertical-align: top;
  opacity: 0.2;
  -webkit-filter: grayscale(100%) blur(10px);
  filter: grayscale(100%) blur(10px);
  -webkit-transition: all 2s ease;
  transition: all 2s ease;
}
.snip1344 figcaption {
  
  width: 100%;
  padding: 15px 25px;
  position: absolute;
  left: 0;
  top: 50%;
}
.snip1344 .profile {
  
  border-radius: 50%;
  position: absolute;
  bottom: 50%;
  left: 50%;
  max-width: 100px;
  opacity: 1;
  box-shadow: 3px 3px 20px rgba(0, 0, 0, 0.5);
  border: 2px solid rgba(255, 255, 255, 0.5);
  -webkit-transform: translate(-50%, 0%);
  transform: translate(-50%, 0%);
}
.snip1344 h3 {
  
  margin: 0 0 5px;
  font-weight: 400;
}
.snip1344 h3 span { 
  display: block;
  font-size: 0.6em;
  color: #f39c12;
  opacity: 0.75;
}
.snip1344 i {
  padding: 10px 5px;
  display: inline-block;
  font-size: 32px;
  color: #ffffff;
  text-align: center;
  opacity: 0.65;
}
.snip1344 a {
  
  text-decoration: none;
}
.snip1344 i:hover {
  opacity: 1;
  -webkit-transition: all 0.35s ease;
  transition: all 0.35s ease;
}
.snip1344:hover .background,
.snip1344.hover .background {
  -webkit-transform: scale(1.3);
  transform: scale(1.3);
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
    logout: async function () {
      await axios
        .post("/api/logout")
        .then((response) => {
          this.$store.commit('setCurrentUser',"");
          this.user = null;
          this.logged = false;
          console.log("User has logged out");
        })
        .catch((error) => {
          console.log("Invalid Logout");
        });
    },
  },
  
   mounted: async function () {
    /*
    this.$store.watch(() => this.$store.state.currentUser, async () => {
      //do your code here 
      console.log( this.$store.state.currentUser)
      this.logged = true;
      this.currentUser = this.$store.state.currentUser;
    });
    */
    await axios
      .get("/api/users/me")
      .then((response) => {
        console.log("User currently logged:");
        console.dir(response.data);
        this.logged = true;
        this.user = response.data;
      })
      .catch((error) => {
        this.currentUser = null;
        console.log("Invalid Request");
      });
    //console.log("this.logged = "+this.logged);
  },
  
};
</script>
