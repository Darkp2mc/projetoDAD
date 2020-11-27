<template>
  <div class="jumbotron">
    <h2>Edit Product</h2>
    <div class="form-group">
      <label for="inputName">Name</label>
      <input
        type="text"
        class="form-control"
        v-model="product.name"
        name="name"
        id="inputName"
        placeholder="Fullname"
        value=""
      />
    </div>
    <div class="form-group">
      <a
        class="btn btn-default"
        v-on:click.prevent="saveProduct()"
      >Save</a>
      <a
        class="btn btn-default"
        v-on:click.prevent="cancelEdit()"
      >Cancel</a>
    </div>
  </div>
</template>

<script>
export default {
  props: ['products'],
  methods: {
    saveProduct: function () {
      axios.put('api/products/' + this.product.name, this.product)
        .then(response => {
          // Copy object properties from response.data.data to this.user
          // without creating a new reference
          Object.assign(this.product, response.data.data)
          this.$emit('product-saved', this.product)
        })
    },
    cancelEdit: function () {
      axios.get('api/products/' + this.product.name)
        .then(response => {
          // Copy object properties from response.data.data to this.user
          // without creating a new reference
          Object.assign(this.product, response.data.data)
          this.$emit('product-canceled', this.product)
        })
    }
  }
}
</script>
