<template>
  <div>
    <div class="alert alert-success" v-if="showSuccess">
      <button type="button" class="close-btn" v-on:click="showSuccess = false">
        &times;
      </button>
      <strong>{{ successMessage }}</strong>
    </div>

    <product-edit
      v-if="currentProduct"
      :product="currentProduct"
      @product-saved="saveProduct"
      @product-canceled="cancelEdit"
    ></product-edit>

    <product-list
      :products="products"
      :selected-product="currentProduct"
      @edit-click="editProduct"
      @delete-click="deleteProduct"
      @add-click="addToCart"
    ></product-list>

  </div>
</template>

<script>
import ProductListComponent from "./productList";
import ProductEditComponent from "./productEdit";
export default {
  components: {
    "product-list": ProductListComponent,
    "product-edit": ProductEditComponent,
  },
  data: function () {
    return {
      title: "List Products",
      showSuccess: false,
      showFailure: false,
      successMessage: "",
      failMessage: "",
      currentProduct: null,
      welcomePage: false,
      products: [],
      orders: [],
      currentOrders: [],
      cart: [],
    };
  },
  methods: {
    editProduct: function (product) {
      this.currentProduct = product;
      this.showSuccess = false;
    },
    deleteProduct: async function (product) {
      this.fetchOrder(); 
      await axios.delete("api/products/" + product.id).then((response) => {
        this.showSuccess = true;
        this.successMessage = "Product Deleted";
        this.getProducts();
      });
    },
    saveProduct: function (product) {
      this.showSuccess = true;
      this.successMessage = "Product Saved";
      // Copies user properties to this.currentUser
      // without changing this.currentUser reference
      Object.assign(this.currentProduct, product);
      this.currentProduct = null;
    },
    cancelEdit: function (product) {
      this.showSuccess = false;
      // Copies user properties to this.currentUser
      // without changing this.currentUser reference
      Object.assign(this.currentProduct, product);
      this.currentProduct = null;
    },
    getProducts: function () {
      axios.get("api/products").then((response) => {
        this.products = response.data.data;
      }).then((response) => {
        this.$store.commit('setProductList',this.products);
      })
    },
    getOrders: async function(){
      await axios.get("api/order_items").then((response) => {
        this.orders = response.data.data;
        //console.log(this.orders);
      });
    },
    fetchOrder: function(){
      this.getOrders();
      this.orders.forEach(element => {
        console.log("Teste"+element);
      });      
    },
    addToCart: function(product){
      //this.currentProduct = product;
      this.cart.push(product);
      console.log(this.cart);
    }
  },
  mounted() {
    this.getProducts();
  },
};
</script>

