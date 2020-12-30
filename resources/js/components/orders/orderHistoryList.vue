<template>
  <div class="jumbotron">
    <div class="table-responsive">
      <div class="form-group">
      </div>
      <div class="form-group">
        
      </div>
      <h3>Orders History:</h3>
      <table class="table table-hover">
        <thead>
          <tr>
            <th>Items</th>
            <th>Notes</th>
            <th>Total Price</th>
            <th>Ordered At</th>
            <th>Delivered/Cancelled At</th>
            <th>Preparation Time</th>
            <th>Delivery Time</th>
            <th>Total Time</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="order in items"
            :key="order.id"
          >
            <td>
              <table>
                <tr
                  v-for="item in order.items"
                  :key="item.id"
                >
                  <td >{{item}}</td>
                </tr>
              </table>
            </td>
            <td>{{ order.order.notes }}</td>
            <td>{{ order.order.total_price }}€</td>
            <td>{{ order.order.opened_at }}</td>
            <td>{{ order.order.closed_at }}</td>
            <td v-if="order.order.preparation_time != null">{{ order.order.preparation_time }}s</td>
            <td v-if="order.order.preparation_time == null">Not yet prepared</td>
            <td v-if="order.order.delivery_time != null">{{ order.order.delivery_time }}s</td>
            <td v-if="order.order.delivery_time == null">Not yet delivered</td>
            <td v-if="order.order.total_time != null">{{ order.order.total_time }}s</td>
            <td v-if="order.order.total_time == null">Not yet ended</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  props: ["orders"],
  data: function () {
    return {
      items: [],
      products: [],
    };
  },
  watch:{
    orders: function(){
       this.getItems();
    }
  },
  methods: {
    getItems: async function(){
      await axios.get("api/products").then((response) => {
        this.products = response.data.data;
      })
      await axios.get("api/order_items").then((response) => {
        for (var i = 0; i < this.orders.length ; i++) {
          this.items.push({'items':[],'order':this.orders[i]});
          for (var j = response.data.data.length - 1; j >= 0; j--) {
            if (response.data.data[j].order_id == this.orders[i].id) {
              for (var k = this.products.length - 1; k >= 0; k--) {
                if (this.products[k].id == response.data.data[j].product_id) {
                  this.items[i].items.push(this.products[k].name)
                }
              }
            }
          }
        }
      });
      console.log(this.items)
    }
  },

  mounted: function () {
    this.getItems();
  },
};
</script>
