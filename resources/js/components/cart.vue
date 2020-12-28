<template>
  <div class="table-responsive">
    <h1 style="text-align: center; margin-top: 20px; margin-bottom: auto">
      {{ title }}
    </h1>
    <router-link to="/products" active-class="active">Products</router-link> -
    <router-link v-if="this.logged != true" to="/login">Login</router-link>
    <div v-if="this.logged == true">
      <a href="#/products" v-on:click.prevent="logout">Logout</a> -
      <router-link to="/myself">Myself</router-link>
    </div>
    <table class="table table-hover" >
      <thead>
        <tr>
          <th>Product</th>
          <th style="text-align: center; width:20%;">Quantity</th>
          <th>Price per unit</th>
          <th>Sub-total</th>
          <th></th>
        </tr>
        <tr
            v-for="(item,index) in cart" :key="item.id"
          >
          <td>{{item.product.name}}</td>
          <td style="text-align: center; width:20%;">
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
          </td>
          <td>{{item.product.price}}€</td>
          <td>{{Math.round((item.subTotal + Number.EPSILON) * 100) / 100}}€</td>
          <td>
            <a
              class="btn btn-sm btn-success"
              v-on:click.prevent="removeFromCart(item,index)"
              >Remove</a
            >
          </td>
        </tr>
        <tr>
          <th>Total:</th>
          <th></th>
          <th></th>
          <th>{{Math.round((total + Number.EPSILON) * 100) / 100}}€</th>
          <th>
            <a
              class="btn btn-sm btn-success"
              v-on:click.prevent="removeAll()"
              >Remove All</a>
          </th>
        </tr>
      </thead>
    </table>
    <div>
      <a
        class="btn btn-primary btn-block"
        v-on:click.prevent="makeOrder()"
        >Make Order</a>
    </div>
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
      cart: [],
      item: [],
      total: 0,
      order: [],
      orderItem: []
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
      if (this.cart[id].quantity > 1) {
        this.cart[id].quantity--;
        this.cart[id].subTotal -= parseFloat(this.cart[id].product.price)
        this.total -= parseFloat(this.cart[id].product.price);
        this.$store.commit("changeItemQuantity",{"item":this.cart[id],"id":id, "currentUserId": this.currentUser.id});
      }
    },
    removeFromCart: function(item,id){
      this.total -= this.cart[id].subTotal;
      this.cart.splice(id,1);
      this.$store.commit("removeItemFromCart",{"item":this.cart[id],"id":id, "currentUserId": this.currentUser.id});
    },
    removeAll: function(){
      this.total = 0;
      this.cart = [];
      this.$store.commit("removeAllItemsFromCart", this.currentUser.id);
    },
    makeOrder: function(){
      this.$confirm("Are you sure that you want to make this order?","",'warning').then(() => {
        this.$prompt("Additional comments:").then((text) => {
          var currentdate = new Date();
          this.order = {'status': 'H', 
                        'customer_id': parseInt(this.currentUser.id), 
                        'notes': text, 
                        'total_price': Math.round((this.total + Number.EPSILON) * 100) / 100, 
                        'date': currentdate.getFullYear() + '-' + currentdate.getMonth() + '-' + currentdate.getDate(), 
                        'opened_at':  currentdate.getFullYear()+'-'+currentdate.getMonth()+'-'+currentdate.getDate()+' '+currentdate.getHours()+":"+currentdate.getMinutes()+":"+currentdate.getSeconds(), 
                        'current_status_at': currentdate.getFullYear()+'-'+currentdate.getMonth()+'-'+currentdate.getDate()+' '+currentdate.getHours()+":"+currentdate.getMinutes()+":"+currentdate.getSeconds()}
          axios.post("api/order",this.order)
               .then((response) => {
                  this.makeOrderItems(response.data.id);
                  this.removeAll();
                });
        });
      });
    },
    makeOrderItems: function(orderId){
      for (var i = this.cart.length - 1; i >= 0; i--) {
        this.orderItem = [];
        this.orderItem = {'order_id': orderId,
                          'product_id': this.cart[i].product.id,
                          'quantity': this.cart[i].quantity,
                          'unit_price': this.cart[i].product.price,
                          'sub_total_price': this.cart[i].subTotal}
        axios.post("api/order_items",this.orderItem);
      }
    }
  },
};
</script>
