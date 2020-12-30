<template>
  <div id="menuOptions" class="index">
    <router-view></router-view>
    <hr />
  </div>
</template>

<script>
import LayoutComponent from "./components/layout";
import ProductComponent from "./components/product";
import OrderComponent from "./components/orders/order";
import WelcomeComponent from "./components/welcome";
import UserComponent from "./components/user";
import CartComponent from "./components/cart";
import RegisterComponent from './components/register'

export default {
  components: {
    layout: LayoutComponent,
    user: UserComponent,
    product: ProductComponent,
    cart: CartComponent,
    register: RegisterComponent,
    order: OrderComponent
  }
};
</script>
