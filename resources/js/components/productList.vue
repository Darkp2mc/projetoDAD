<template>
  <div class="jumbotron">
    <div class="table-responsive">
      <router-link v-if="this.$store.state.logged != true" to="/login">Login</router-link>
      <router-link
        class="h2"
        v-if="
          this.$store.state.logged == true && this.$store.state.currentUser.type == 'EC'
        "
        to="/cook"
        >Cook Dashboard</router-link
      >
      
      <div v-if="this.$store.state.logged == true">
        <h3
          style="
            position: absolute;
            margin-top: 30px;
            float: right;
            right: -18px;
            top: 0px;
          "
        >
          <img
            style="width: 15%; border-radius: 50%"
            :src="'storage/fotos/' + this.$store.state.currentUser.photo_url"
          />
          {{ this.$store.state.currentUser.name }}
          
        </h3>
        
        <a href="#/products" v-on:click.prevent="logout">Logout</a> -
        <router-link to="/myself">Myself</router-link>
      </div>
      <router-link to="/cart" v-if="this.$store.state.logged == true">Cart - </router-link>
      <router-link to="/orders" v-if="this.$store.state.logged == true">Orders</router-link>
      <hr />
      <div class="form-group">
        <label for="department_id">Type:</label>
        <select class="form-control" v-model="selectedType">
          <option v-for="type in types" :key="type.name">{{ type.name }}</option>
        </select>
      </div>
      <div class="form-group">
        <form
          class="searchBarProducts"
          action="/action_page.php"
          style="margin: auto; max-width: 300px"
        >
          <input
            type="text"
            v-model="productNameSearch"
            placeholder="Search name.."
            name="search2"
          />
          <button type="submit" v-on:click.prevent="search">
            <i class="fa fa-search"></i>
          </button>
        </form>
      </div>
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
          <!-- v-for="product in $store.state.productList" -->
          <tr
            v-for="product in $store.state.productList"
            :key="product.id"
            :class="{ active: editingProduct === product }"
          >
            <td style="width: 10%">
              <img style="width: 100%" :src="'storage/products/' + product.photo_url" />
            </td>
            <td>{{ product.name }}</td>
            <td>{{ product.type }}</td>
            <td>{{ product.description }}</td>
            <td>{{ product.price }}€</td>
            <td>
              <a class="btn btn-sm btn-success" v-on:click.prevent="addToCart(product)"
                >Adicionar</a
              >
              <a
                class="btn btn-sm btn-success"
                v-on:click.prevent="removeFromCart(product)"
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
      productNameSearch: null,
      selectedType: null,
      types: [
        { id: 1, name: "hot dish" },
        { id: 2, name: "cold dish" },
        { id: 3, name: "drink" },
        { id: 4, name: "dessert" },
        { id: 5, name: "None" },
      ],
      productsList: (this.productsList = [...this.$store.state.productList]),
      pagination: {
        options: [200, 100, 50, 25, 10, 1],
        perPage: 10,
        totalPages: 1,
        currentPage: 1,
        totalShownIndexes: 5,
      },
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
    addToCart: function (product) {
      //this.$emit("add-click", product);
      if (this.currentUser != null) {
        this.$store.commit("setShoppingCart", {
          product: product,
          currentUserId: this.currentUser.id,
          
        });
        this.$emit("add-click",product);
      }
    },
    removeFromCart: function (product) {
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
    logout: async function () {
      await axios
        .post("/api/logout")
        .then((response) => {
          this.$store.state.logged = false;
          this.$store.commit("setCurrentUser", "");
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
    search: function () {
      this.productsList = [...this.products];
      this.filterType();
      if (this.productNameSearch != null) {
        for (var i = this.productsList.length - 1; i >= 0; i--) {
          if (
            !this.productsList[i].name
              .toLowerCase()
              .includes(this.productNameSearch.toLowerCase())
          ) {
            this.productsList.splice(i, 1);
          }
        }
      }
      this.$store.commit("setProductList", this.productsList);
    },
    filterType: function () {
      if (this.selectedType != null && this.selectedType != 'None')
        for (var i = this.productsList.length - 1; i >= 0; i--) {
          if (this.productsList[i].type !== this.selectedType) {
            this.productsList.splice(i, 1);
          }
        }
    },
    showList() {
      var modal = document.getElementById("shoppingList");
      var btn = document.getElementById("show");
      btn.onclick = function () {
        modal.style.display = "block";
      };
      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      };
    },
  },
  computed: {
    getCurrentUser() {
      return this.$store.getters.getCurrentUser;
      this.currentUser = this.$store.getters.getCurrentUser;
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
        this.currentUser = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    //console.log("this.logged = "+this.logged);
  },
};
</script>
