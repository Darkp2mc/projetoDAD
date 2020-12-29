<template>
  <div class="jumbotron">
    <h1>Cook Dashboard</h1>
    <table class="table table-hover">
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Customer</th>
          <th>Started at</th>
          <th>Elapsed time</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        <td>{{ currentOrder.id }}</td>
        <td>{{ currentOrder.customer_id }}</td>
        <td>{{ currentOrder.created_at }}</td>
        <td>{{ currentOrder.updated_at }}</td>
        <td>{{ currentOrder.notes }}</td>
      </tbody>
      <th>Items in order</th>
      <tr>
        <th>Name</th>
        <th>Quantity</th>
        <th>Description</th>
      </tr>
      <tr v-for="item in this.orderItems" :key="item.id">
        <td>{{ item.product_id }}</td>
        <td>{{ item.quantity }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import OrderListComponent from "../orderList";
import OrderEditComponent from "../orderEdit";

export default {
  components: {
    "order-list": OrderListComponent,
    "order-edit": OrderEditComponent,
  },
  data: function () {
    return {
      title: "List Orders",
      showSuccess: false,
      showFailure: false,
      successMessage: "",
      failMessage: "",
      logged: false,
      ordersList: [],
      currentOrder: null,
      users: [],
      orderUser: null,
      currentUser: null,

      orderItemsList: [],
      orderItems: [],
    };
  },
  computed: {
    getUsers() {
      this.users = this.$store.getters.getUsers;
    },
    getCurrentUser() {
      this.currentUser = this.$store.getters.getCurrentUser;
    },
  },
  methods: {
    getOrders: async function () {
      //this.$store.commit("getOrders");
      await axios
        .get("api/order")
        .then((response) => {
          this.ordersList = response.data.data;
          for (var i = 0; i < this.ordersList.length; i++) {
            if (this.ordersList[i].status == "H") {
              this.currentOrder = this.ordersList[i];
              break;
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getOrderItems: async function () {
      await axios.get("api/order_items").then((response) => {
        this.orderItemsList = response.data.data;

        for (var i = this.orderItemsList.length - 1; i >= 0; i--) {
          if (this.orderItemsList[i].order_id == 1908) {
            this.orderItems.push(this.orderItemsList[i]);
          }
          if (this.orderItemsList[i + 1].order_id != 1908) {
            break;
          }
        }
        console.log(this.orderItems);
      });
    },
    /*
    filterOrder: function () {
      this.getCurrentUser;
      for (var i = this.ordersList.length - 1; i >= 0; i--) {
        if (this.ordersList[i].prepared_by !== this.currentUser.id) {
          this.ordersList.splice(i, 1);
        }
      }
    },
    */
  },
  mounted() {
    this.getOrders();
    this.getOrderItems();

    // Se já existe o array com departamentos no $root.departments
    // Não vale a pena voltar a carregar os departamentos da API:
  },
};
</script>

<style scoped>
h1 {
  font-size: 50px;
  text-align: center;
}
h1:hover {
  font-size: 53px;
}
</style>
