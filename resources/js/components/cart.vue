<template>
  <div class="table-responsive">
    <h1 style="text-align: center; margin-top: 20px; margin-bottom: auto">
      {{ title }}
    </h1>
    <router-link to="/products" active-class="active">Products</router-link> -
    <router-link to="/login">Login</router-link>
    <a v-if="$root.logged" href="#" @click.prevent="logout">Logout</a>
    <a v-if="logged" href="#" @click.prevent="myself">Myself</a>
    <hr />

    <table class="table table-hover">
      <thead>
        <tr>
          <th>Product</th>
          <th>Quantity</th>
          <th>Price per unit</th>
          <th>Sub-total</th>
        </tr>
        <tr
            v-for="(item,index) in cart" :key="item.id"
          >
          <td>{{item.product.name}}</td>
          <td>
            <div style="text-align: center; width:50%;">
            <div>
              <a
                class="btn btn-sm btn-success"
                v-on:click.prevent="addItem(item,index)"
                >^
              </a>
            </div>
            <div>{{item.quantity}}</div>
            <div>
              <a
                class="btn btn-sm btn-success"
                v-on:click.prevent="removeItem(item,index)"
                >v
              </a>
            </div>
          </div>
          </td>
          <td>{{item.product.price}}€</td>
          <td>{{Math.round((item.subTotal + Number.EPSILON) * 100) / 100}}€</td>
          <td>
            <a
              class="btn btn-sm btn-success"
              v-on:click.prevent="removeFromCart(item)"
              >Remover</a
            >
          </td>
        </tr>
        <tr>
          <th>Total:</th>
          <th></th>
          <th></th>
          <th>{{Math.round((total + Number.EPSILON) * 100) / 100}}€</th>
          <th></th>
        </tr>
      </thead>
    </table>
  </div>
</template>

<style>
nav cart.router-link-exact-active {
  text-align: center;
}
</style>

<script>

export default {
  components: {
  },
  data: function () {
    return {
      title: "Shopping Cart",
      showSuccess: false,
      showFailure: false,
      successMessage: "",
      logged: null,
      failMessage: "",
      currentUser: null,
      cart: null,
      item: [],
      total: 0,
    };
  },
  mounted: async function () {
    await axios
      .get("/api/users/me")
      .then((response) => {
        console.log("User currently logged:");
        console.dir(response.data);
        this.logged = true;
        this.currentUser = response.data;
        this.getCart();
      })
      .catch((error) => {
        this.currentUser = null;
        console.log("Invalid Request");
      });
  },
  methods: {
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
    getCart: function(){
      this.$store.commit("getShoppingCart");
      for (var i = this.$store.state.shoppingCart.length - 1; i >= 0; i--) {
        if(this.$store.state.shoppingCart[i].currentUserId == this.currentUser.id){
          this.cart = this.$store.state.shoppingCart[i].orderItem;
          break;
        }
      }
      this.calculateTotal();
    },
    calculateTotal: function(){
      for (var i = this.cart.length - 1; i >= 0; i--) {
        this.total += this.cart[i].subTotal;
      }
    },
    addItem: function(item,id){
      this.cart[id].quantity++;
      this.cart[id].subTotal += parseFloat(this.cart[id].product.price);
      this.total += parseFloat(this.cart[id].product.price);
      this.$store.commit("changeItemQuantity",{"item":this.cart[id],"id":id, "currentUserId": this.currentUser.id});
      
    },
    removeItem: function(item,id){
      this.cart[id].quantity--;
      this.cart[id].subTotal -= parseFloat(this.cart[id].product.price)
      this.total -= parseFloat(this.cart[id].product.price);
      this.$store.commit("changeItemQuantity",{"item":this.cart[id],"id":id, "currentUserId": this.currentUser.id});
    },
    removeFromCart: function(item){

    }
  },
};
</script>
