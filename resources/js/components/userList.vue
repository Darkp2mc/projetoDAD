<template>
  <div class="jumbotron">
    <router-link to="/products">Products</router-link>
    <table class="table table-striped">
      <hr />
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Department</th>
          <th>Actions</th>
          <th>Blocked</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="user in users"
          :key="user.id"
          :class="{ active: editingUser === user }"
        >
          <td style="width: 10%">
            <img style="width: 100%" :src="'storage/fotos/' + user.photo_url" />
          </td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.type }}</td>
          <td>{{ user.blocked }}</td>
          <!-- <img :src="'../storage/app/public/fotos/'+user.photo_url"> -->
          <td>
            <a
              class="btn btn-xs btn-primary"
              v-if="user.blocked == 1"
              v-on:click.prevent="unblockUser()"
              >Unblock
            </a>
            <a
              class="btn btn-xs btn-primary"
              v-if="user.blocked == 0"
              v-on:click.prevent="blockUser()"
              >Block
            </a>
            <a class="btn btn-xs btn-primary" v-on:click.prevent="editUser(user)">Edit</a>
            <a class="btn btn-xs btn-danger" v-on:click.prevent="deleteUser(user)">Delete</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ["users", "selectedUser"],
  data: function () {
    return {
      editingUser: null,
      imgError: null,
    };
  },
  watch: {
    selectedUser: function (val) {
      this.editingUser = this.selectedUser;
    },
  },
  computed: {},
  methods: {
    editUser: function (user) {
      this.editingUser = user;
      this.$emit("edit-click", user);
    },
    deleteUser: function (user) {
      this.editingUser = null;
      this.$emit("delete-click", user);
    },
    onImgError() {
      this.imgError = true;
    },
    blockUser: function () {},
    unblockUser: function () {},
  },
};
</script>
