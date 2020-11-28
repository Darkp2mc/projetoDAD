<template>
  <div>
    <div class="jumbotron">
      <h1>{{ title }}</h1>
    </div>

    <product-list
      :products="products"
      :selected-product="currentProduct"
      @edit-click="editProduct"
      @delete-click="deleteProduct"
    ></product-list>

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

    <product-edit
      v-if="currentProduct"
      :product="currentProduct"
      @product-saved="saveProduct"
      @product-canceled="cancelEdit"
    ></product-edit>
  
  </div>
</template>

<script>
import ProductListComponent from './productList'
import ProductEditComponent from './productEdit'
export default {
  components: {
    'product-list': ProductListComponent,
    'product-edit': ProductEditComponent,
  },
  data: function () {
    return {
      title: 'List Products',
      showSuccess: false,
      showFailure: false,
      successMessage: '',
      failMessage: '',
      currentProduct: null,
      products: []
    }
  },
  methods: {
    editProduct: function (product) {
      this.currentProduct = product
      this.showSuccess = false
    },
    deleteProduct: function (product) {
      axios.delete('api/products/' + product.id)
        .then(response => {
          this.showSuccess = true
          this.successMessage = 'Product Deleted'
          this.getProducts()
        })
    },
    saveProduct: function (product) {
      this.showSuccess = true
      this.successMessage = 'Product Saved'
      // Copies user properties to this.currentUser
      // without changing this.currentUser reference
      Object.assign(this.currentProduct, product)
      this.currentProduct = null
    },
    cancelEdit: function (product) {
      this.showSuccess = false
      // Copies user properties to this.currentUser
      // without changing this.currentUser reference
      Object.assign(this.currentProduct, product)
      this.currentProduct = null
    },
    getProducts: function () {
      axios.get('api/products')
        .then(response => { this.products = response.data.data })
    }
  },
  mounted () {
    this.getProducts()
    // Se já existe o array com departamentos no $root.departments
    // Não vale a pena voltar a carregar os departamentos da API:
    /*
    if (this.$root.products.length === 0) {
      axios.get('api/products')
        .then(response => {
          this.$root.products = response.data.data
          this.products = this.$root.products
        })
    } else {
      this.products = this.$root.products
    }
    */
  }
}
</script>
