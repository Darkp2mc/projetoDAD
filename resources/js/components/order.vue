<template>
  <div>
    <div class="jumbotron">
      <h1>{{ title }}</h1>
    </div>
    <order-list
      :orders="orders"
      :selected-order="currentOrder"
    ></order-list>
    <div
      class="alert alert-success"
      v-if="showSuccess"
    >
      <button
        type="button"
        class="close-btn"
        v-on:click="showSuccess=false"
      >&times;</button>
      <strong>{{ successMessage }}</strong>
    </div>
    <order-edit
      v-if="currentOrder"
      :order="currentOrder"
    ></order-edit>
  </div>
</template>

<script>
import OrderListComponent from './orderList'
import OrderEditComponent from './orderEdit'
export default {
  components: {
    'order-list': OrderListComponent,
    'order-edit': OrderEditComponent,
  },
  data: function () {
    return {
      title: 'List Orders',
      showSuccess: false,
      showFailure: false,
      successMessage: '',
      failMessage: '',
      currentOrder: null,
      orders: [],
      logged: false,
    }
  },
  methods: {
    getOrders: function () {
      axios.get('api/orders')
        .then(response => { this.orders = response.data.data })
    },
  },
  mounted () {
    this.getOrders()
    // Se já existe o array com departamentos no $root.departments
    // Não vale a pena voltar a carregar os departamentos da API:
  }
}
</script>
