<template>
  <div>
    <div class="alert alert-success" v-if="showSuccess">
      <button type="button" class="close-btn" v-on:click="showSuccess = false">
        &times;
      </button>
      <strong>{{ successMessage }}</strong>
    </div>

    <orderPreparing-list
      :orders="filteredPreparing"
    ></orderPreparing-list>
    <orderDelivering-list
      :orders="filteredDelivering"
    ></orderDelivering-list>
    <orderHistory-list
      :orders="orders"
    ></orderHistory-list>
  </div>
</template>

<script>
  import OrderPreparingListComponent from "./orderPreparingList";
  import OrderHistoryListComponent from "./orderHistoryList";
  import OrderDeliveringListComponent from "./orderDeliveringList";
  export default {
    components: {
      "orderPreparing-list": OrderPreparingListComponent,
      "orderHistory-list": OrderHistoryListComponent,
      "orderDelivering-list": OrderDeliveringListComponent
    },
    data: function () {
      return {
        title: "Orders' List",
        showSuccess: false,
        showFailure: false,
        successMessage: "",
        failMessage: "",
        welcomePage: false,
        orders: [],
        filteredPreparing: [],
        filteredDelivering: [],
        currentUser: null,
      };
    },
    methods: {
      getOrders: function(){
         axios.get("api/order").then((response) => {
          for (var i = response.data.data.length - 1; i >= 0; i--) {
            if (response.data.data[i].customer_id == this.currentUser.id){
              this.orders.push(response.data.data[i])
            }
          }
          this.filterOrders()
        })
      },
      myself: function() {
        axios
          .get("/api/users/me")
          .then((response) => {
            this.logged = true;
            this.currentUser = response.data;
          })
          .catch((error) => {
            console.log("Invalid Request");
          });
      },
      filterOrders: function(){
        for (var i = this.orders.length - 1; i >= 0; i--) {
          if (this.orders[i].status === 'P') {
            this.filteredPreparing.push(this.orders[i])
          }
          else if (this.orders[i].status === 'T') {
            this.filteredDelivering.push(this.orders[i])
          }
        }
      },
    },
    mounted() {
      this.myself();
      this.getOrders();

    },
  };
</script>
