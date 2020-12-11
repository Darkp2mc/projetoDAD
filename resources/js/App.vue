<template>
  <div id="menuOptions" class="index">
    <router-view></router-view>
    <hr />
  </div>
</template>

<script>
import LayoutComponent from "./components/layout";
import ProductComponent from "./components/product";
import WelcomeComponent from "./components/welcome";
import UserComponent from "./components/user";
import CartComponent from "./components/cart";

export default {
  components: {
    layout: LayoutComponent,
    user: UserComponent,
    product: ProductComponent,
    cart: CartComponent,
  }
};
</script>
