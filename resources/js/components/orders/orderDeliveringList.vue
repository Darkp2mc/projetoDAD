<template>
  <div class="jumbotron">
    <div class="table-responsive">
      <div class="form-group">
      </div>
      <div class="form-group">
        
      </div>
      <h3>Orders Being Delivered:</h3>
      <table class="table table-hover">
        <thead>
          <tr>
            <th>Items</th>
            <th>Notes</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="order in orders"
            :key="order.id"
          >
            <td>items</td>
            <td>{{ order.notes }}</td>
            <td>{{ order.total_price }}</td>
            </td>
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
    };
  },
  methods: {
  },

  mounted: function () {
  },
};
</script>
