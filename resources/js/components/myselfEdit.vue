<template>
  <div>
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    <div class="card" style="width: 30%">
      <img
        class="card-img-top"
        alt="Card image cap"
        style="border-radius: 3%; margin: auto; width: 70%; margin-top: 30px"
        :src="'storage/fotos/' + getCurrentUser.photo_url"
      />
      <div class="card-body">
        <div class="form-group">
          <label for="inputName">Name</label>
          <input
            type="text"
            class="form-control"
            v-model="getCurrentUser.name"
            name="name"
            id="inputName"
            placeholder="Fullname"
            value=""
          />
        </div>
        <div class="form-group">
          <label for="inputEmail">Email</label>
          <input
            type="email"
            class="form-control"
            v-model="getCurrentUser.email"
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
            v-model="getCurrentUser.password"
            name="password"
            id="inputPassword"
            value=""
          />
        </div>

        <div>
          <label for="inputRepeatedPassword">Repeat password</label>
          <input
            type="password"
            class="form-control"
            name="repeatedPassword"
            id="inputRepeatedPassword"
            value=""
          />
        </div>
        <br />
        <div class="form-group">
          <label for="inputPhoto">Photo</label>
          <input
            type="file"
            accept="image/*"
            @change="uploadImage($event)"
            id="file-input"
          />
        </div>
        <button class="w3-button w3-green" style="width:100%;" v-on:click.prevent="saveUser()">Save</button>
        <button class="w3-button w3-red" style="width:100%;" v-on:click.prevent="cancelEdit()">Cancel</button>
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["user"],
  methods: {
    saveUser: function () {
      axios
        .put("api/users/" + getCurrentUser.id, getCurrentUser.user)
        .then((response) => {
          // Copy object properties from response.data.data to this.user
          // without creating a new reference
          Object.assign(this.user, response.data.data);
          this.$emit("user-saved", this.user);
        });
    },
    cancelEdit: function () {
      this.$router.push("/me");
    },
    uploadImage(event) {
      const URL = "api/users/" + getCurrentUser.id;

      let data = new FormData();
      data.append(getCurrentUser, "photo_url");
      data.append("file", event.target.files[0]);

      let config = {
        header: {
          "Content-Type": "image/png",
        },
      };

      axios.put(URL, data, config).then((response) => {
        console.log("image upload response > ", response);
      });
    },
  },
  computed: {
    getCurrentUser() {
      return this.$store.getters.getCurrentUser;
    },
  },
};
</script>

<style>

.card {
  margin: auto;
}

</style>
