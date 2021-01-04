<template>
  <div class="jumbotron">
    <br />
    <br />
    <h1>Cook Dashboard</h1>
    <div v-if="this.currentOrder == null">
      <h2>Waiting for a new order...</h2>
    </div>
    <div v-if="this.currentOrder != null">
      <table class="table table-hover">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Started at</th>
            <th>Elapsed time</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <td>{{ currentOrder.id }}</td>
          <td>{{ orderUser.name }}</td>
          <td>{{ currentOrder.opened_at }}</td>
          <td>{{ currentOrder.updated_at }}</td>
          <td>{{ currentOrder.notes }}</td>
          <button class="btn btn-success" v-if="!this.isPrepared" v-on:click="prepareOrder">Prepare</button>
          <button
            class="btn btn-success"
            v-if="this.isPrepared == true"
            v-on:click="finishOrder"
          >
            Ready
          </button>
        </tbody>
        <th>Items in order</th>
        <tr>
          <th>Product</th>
          <th>Name</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
        <tr v-for="item in this.orderProducts" :key="item.id">
          <td style="width: 10%">
            <img style="width: 100%" :src="'storage/products/' + item.photo_url" />
          </td>
          <td>{{ item.name }}</td>
          <td>{{ item.type }}</td>
          <td>{{ item.description }}</td>
        </tr>
      </table>
    </div>
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
      isPrepared: false,

      users: [],
      orderUser: null,
      currentUser: null,

      orderItemsList: [],
      orderItems: [],

      productsList: (this.productsList = [...this.$store.state.productList]),
      orderProducts: [],

      delivers: [],
    };
  },
  computed: {
    getUsers() {
      this.users = this.$store.getters.getUsers;
    },
    getCurrentUser() {
      this.currentUser = this.$store.getters.getCurrentUser;
    },
    getProductsList() {
      this.productsList = this.$store.getters.getProductList;
    },
  },
  methods: {
    getOrders: async function () {
      //this.$store.commit("getOrders");
      await axios.get("api/order").then((response) => {
        this.ordersList = response.data.data;
        for (var i = 0; i < this.ordersList.length; i++) {
          if (this.ordersList[i].status == "P") {
            this.isPrepared = true
            this.currentOrder = this.ordersList[i];
            break;
          }
          if(this.ordersList[i].status == "H" ){
            this.currentOrder = this.ordersList[i];
            break;
          }
        }
      });
      await this.getOrderItems();
      await this.getItemInfo();
      await this.getCostumerInfo();
    },
    getOrderItems: async function () {
      await axios.get("api/order_items").then((response) => {
        this.orderItemsList = response.data.data;

        for (var i = this.orderItemsList.length - 1; i >= 0; i--) {
          if (this.orderItemsList[i].order_id == this.currentOrder.id) {
            this.orderItems.push(this.orderItemsList[i]);
            if (this.orderItemsList[i - 1].order_id != this.currentOrder.id) {
              break;
            }
          }
        }
      });
    },
    getItemInfo: function () {
      this.orderItems.forEach((element) => {
        for (var i = 0; i < this.productsList.length - 1; i++) {
          if (element.product_id == this.productsList[i].id) {
            this.orderProducts.push(this.productsList[i]);
          }
        }
      });
    },
    getCostumerInfo: async function () {
      await axios.get("/api/users/" + this.currentOrder.customer_id).then((response) => {
        this.orderUser = response.data.data;
      });
    },
    prepareOrder: async function () {
      this.currentOrder.status = "P";
      await axios.put("api/order/" + this.currentOrder.id, this.currentOrder);
      this.isPrepared = true;
    },
    finishOrder_outdated: async function () {
      var currentdate = new Date();
      this.getCurrentUser;
      this.currentOrder.status = "R";
      this.currentOrder.prepared_by = this.currentUser.id;
      this.currentOrder.current_status_at =
        currentdate.getFullYear() +
        "-" +
        currentdate.getMonth() +
        "-" +
        currentdate.getDate() +
        " " +
        currentdate.getHours() +
        ":" +
        currentdate.getMinutes() +
        ":" +
        currentdate.getSeconds();

      await axios
        .put("/api/order/" + this.currentOrder.id, this.currentOrder)
        .then((response) => {
          //console.log(this.currentOrder)
          //console.log(response);
          Object.assign(this.currentOrder, response.data.data);
        });
      this.currentOrder = null;
      this.$forceUpdate();
    },

    finishOrder: async function () {
      await this.$confirm(
        "Are you sure that you want to confirm this order?",
        "",
        "warning"
      ).then(() => {
        var currentdate = new Date();
        //pegar nos cooks
        axios
          .get("api/users")
          .then((response) => {
            this.delivers = response.data.data;
          })
          .then(() => {
            this.filterDelivers();
            //comparar os available_at (se nao for null)
            //ordenar o array
            this.delivers.sort(function (a, b) {
              return (
                parseFloat(Date.parse(a.available_at)) -
                parseFloat(Date.parse(b.available_at))
              );
            });

            if (this.delivers.length != 0) {
              // Se houverem delivers disponíveis

              this.currentOrder.status = "R";
              this.currentOrder.delivered_by = this.delivers[0].id; // Atualizar na base de dados o valor de quem vai preparar a order

              var payload = {
                // Informação necessária para a notificação
                user: { name: "Food@Home" },
                message: "A new order has arrived!",
                destination: "delivery",
                destinationUser: { id: this.delivers[0].id, name: this.delivers[0].name },
              };

              this.delivers[0].available_at = null; // O Cook fica indisponivel neste momento
              axios.put("api/users/" + this.delivers[0].id, this.delivers[0]); // Essa informação é atualizada na base de dados
              axios.put("api/order/"+this.currentOrder.id,this.currentOrder); // Order é atualizada
              this.$socket.emit("private_message", payload); // É enviada uma notificação ao user a dizer que recebeu uma nova order

              alert("Order confirmed! Delivering...");
            } else {
              // Se não houverem Cooks disponíveis, a order é guardada na base de dados, mas não é guardada com
              // prepared_by e o available_at dos Cooks não são atualizados.
              alert("No delivers available at the moment. Order is waiting...");
            }
          });
      });
    },
    filterDelivers: function () {
      for (var i = this.delivers.length - 1; i >= 0; i--) {
        if (
          this.delivers[i].type != "ED" ||
          (this.delivers[i].type == "ED" &&
            (this.delivers[i].available_at == null || this.delivers[i].blocked == 1))
        ) {
          this.delivers.splice(i, 1);
        }
      }
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
  mounted: function () {
    this.getOrders();

    // Se já existe o array com departamentos no $root.departments
    // Não vale a pena voltar a carregar os departamentos da API:
  },
};
</script>

<style scoped>
h1 {
  font-size: 50px;
  text-align: center;
  margin-bottom: 5%;
}
h1:hover {
  font-size: 53px;
}
h2 {
  position: relative;
  font-size: 50px;
  text-align: center;
  margin-bottom: 5%;
  color: white;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
}
</style>
