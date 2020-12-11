<template>
<div class="jumbotron">
  <router-link to="/products">Products</router-link>
  <table class="table table-striped">
    
    <hr/>
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Department</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="user in users"
        :key="user.id"
        :class="{active: editingUser === user}"
      >
        <td>{{ user.name }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.type }}</td>
        <td>
          <a
            class="btn btn-xs btn-primary"
            v-on:click.prevent="editUser(user)"
          >Edit</a>
          <a
            class="btn btn-xs btn-danger"
            v-on:click.prevent="deleteUser(user)"
          >Delete</a>
        </td>
      </tr>
    </tbody>
  </table>
  </div>
</template>

<script>
export default {
  props: ['users', 'selectedUser'],
  data: function () {
    return {
      editingUser: null
    }
  },
  watch: {
    selectedUser: function (val) {
      this.editingUser = this.selectedUser
    }
  },
  methods: {
    editUser: function (user) {
      this.editingUser = user
      this.$emit('edit-click', user)
    },
    deleteUser: function (user) {
      this.editingUser = null
      this.$emit('delete-click', user)
    }
  },
}
</script>
