<template>
<div class="table-responsive">
  <table class="table table-hover">
    <thead>
      <tr>
        <th>Product</th>
        <th>Name</th>
        <th>Type</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="product in products"
        :key="product.id"
        :class="{active: editingProduct === product}"
      >
        <td>{{ product.photo_url }}</td>
        <td>{{ product.name }}</td>
        <td>{{ product.type }}</td>
        <td>{{ product.description }}</td>
        <td>
          <a
            class="btn btn-sm btn-success"
            
          >Adicionar</a>
          <a
            class="btn btn-sm btn-success"
            
          >Remover</a>
          <a
            class="btn btn-xs btn-primary"
            v-on:click.prevent="editProduct(product)"
          >Edit</a>
          <a
            class="btn btn-xs btn-danger"
            v-on:click.prevent="deleteProduct(product)"
          >Delete</a>
        </td>
      </tr>
    </tbody>
  </table>
  </div>
</template>

<script>
export default {
  props: ['products', 'selectedProduct'],
  data: function () {
    return {
      editingProduct: null
    }
  },
  watch: {
    selectedProduct: function (val) {
      this.editingProduct = this.selectedProduct
    }
  },
  methods: {
    editProduct: function (product) {
      this.editingProduct = product
      this.$emit('edit-click', product)
    },
    deleteProduct: function (product) {
      this.editingProduct = null
      this.$emit('delete-click', product)
    }

  },
}
</script>
