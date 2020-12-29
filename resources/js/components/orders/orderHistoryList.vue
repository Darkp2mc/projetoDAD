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
            <th>Ordered At</th>
            <th>Ended At</th>
            <th>Preperation Time</th>
            <th>Delivery Time</th>
            <th>Total Time</th>
          </tr>
        </thead>
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
