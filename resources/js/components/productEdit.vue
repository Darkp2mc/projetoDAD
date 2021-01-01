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
        placeholder="Product name"
        value=""
      />
      <label for="inputType">Type</label>
      <input
        type="text"
        class="form-control"
        v-model="product.type"
        name="type"
        id="inputType"
        placeholder="Product Type"
        value=""
      />
      <label for="inputDescription">Description</label>
      <input
        type="text"
        class="form-control"
        v-model="product.description"
        name="description"
        id="inputDescription"
        placeholder="Product Description"
        value=""
      />
      
      <label for="inputPrice">Price</label>
      <input
        type="text"
        class="form-control"
        v-model="product.price"
        name="price"
        id="inputPrice"
        placeholder="Product Price"
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
  props: ['product'],
  methods: {
    saveProduct: function () {
      axios.put('api/products/' + this.product.id, this.product)
        .then(response => {
          console.log(response)
          Object.assign(this.product, response.data.data)
          this.$emit('product-saved', this.product)
          alert("Product saved");
          console.log(response)
        })
    },
    
    cancelEdit: function () {
      axios.get('api/products/' + this.product.id)
        .then(response => {
          // Copy object properties from response.data.data to this.user
          // without creating a new reference
          Object.assign(this.product, response.data.data)
          this.$emit('product-canceled', this.product)
          alert("Product canceled");
        })
    }


  }
}
</script>
