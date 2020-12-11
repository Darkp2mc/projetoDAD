<template>
  <div class="table-responsive">
    <h1 style="text-align: center; margin-top: 20px; margin-bottom: auto">
      {{ title }}
    </h1>
    <router-link to="/products" active-class="active">Products</router-link> -
    <router-link to="/login">Login</router-link>
    <a v-if="logged" href="#" @click.prevent="logout">Logout</a>
    <a v-if="logged" href="#" @click.prevent="myself">Myself</a>
    <hr />
    
  </div>
</template>

<style>
    nav cart.router-link-exact-active {
    text-align: center;
    }
</style>

<script>
export default {
    data: function () {
    return {
      title: 'Shopping Cart',
      showSuccess: false,
      showFailure: false,
      successMessage: '',
      failMessage: '',
      currentUser: null,
      users: [],
    }
  },
};
</script>
