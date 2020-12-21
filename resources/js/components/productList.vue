<template>
  <div class="jumbotron">
    <div class="table-responsive">
      [ <router-link to="/cart">Cart</router-link> ]
      <router-link v-if="this.logged != true" to="/login">Login</router-link>
      <div v-if="this.logged == true">
        <a href="#/products" v-on:click.prevent="logout">Logout</a> -
        <router-link to="/myself">Myself</router-link>
      </div>
      <hr />
      <table class="table table-hover">
        <thead>
          <tr>
            <th>Product</th>
            <th>Name</th>
            <th>Type</th>
            <th>Description</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="product in products"
            :key="product.id"
            :class="{ active: editingProduct === product }"
          >
            <!-- <img :src="'../storage/app/public/fotos/'+product.photo_url"> -->
            <td>{{ product.name }}</td>
            <td>{{ product.type }}</td>
            <td>{{ product.description }}</td>
            <td>{{ product.price }}€</td>
            <td>
              <a class="btn btn-sm btn-success" v-on:click.prevent="addProduct(product)"
                >Adicionar</a
              >
              <a
                class="btn btn-sm btn-success"
                v-on:click.prevent="removeProduct(product)"
                >Remover</a
              >
              <a
                class="btn btn-xs btn-primary"
                v-if="checkManager()"
                v-on:click.prevent="editProduct(product)"
                >Edit</a
              >
              <a
                class="btn btn-xs btn-danger"
                v-if="checkManager()"
                v-on:click.prevent="deleteProduct(product)"
                >Delete</a
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: ["products", "selectedProduct", "user"],
  data: function () {
    return {
      editingProduct: null,
      logged: null,
      currentUser: null,
    };
  },
  watch: {
    selectedProduct: function (val) {
      this.editingProduct = this.selectedProduct;
    },
  },
  methods: {
    editProduct: function (product) {
      this.editingProduct = product;
      this.$emit("edit-click", product);
    },
    deleteProduct: function (product) {
      this.editingProduct = null;
      this.$emit("delete-click", product);
    },
    addProduct: function (product) {
      this.$emit("add-click", product);
    },
    removeProduct: function (product) {
      this.$emit("remove-click", product);
    },
    myself() {
      axios
        .get("/api/users/me")
        .then((response) => {
          console.log("User currently logged:");
          this.currentUser = response.data;
          this.logged = true;
          console.dir(response.data);
        })
        .catch((error) => {
          console.log("Invalid Request");
          return false;
        });
    },
    logout() {
      axios
        .post("/api/logout")
        .then((response) => {
          this.logged = false;
          console.log("User has logged out");
        })
        .catch((error) => {
          console.log("Invalid Logout");
        });
    },
    checkValidUser() {
      if (this.currentUser == null) {
        return false;
      }
      return true;
    },
    checkManager() {
      if (this.checkValidUser()) {
        if (this.currentUser.type == "EM") {
          return true;
        }
      }
      return false;
    },
  },
  mounted: async function () {
    await axios
      .get("/api/users/me")
      .then((response) => {
        console.log("User currently logged:");
        console.dir(response.data);
        this.logged = true;
        this.currentUser = response.data;
      })
      .catch((error) => {
        this.currentUser = null;
        console.log("Invalid Request");
      });
    //console.log("this.logged = "+this.logged);
  },
};
</script>
