<template>
  <div>
    <div class="jumbotron">
      <h1>{{ title }}</h1>
    </div>
    <user-list
      :users="users"
      :selected-user="currentUser"
      @edit-click="editUser"
      @delete-click="deleteUser"
    ></user-list>
    <div
      class="alert alert-success"
      v-if="showSuccess"
    >
      <button
        type="button"
        class="close-btn"
        v-on:click="showSuccess=false"
      >&times;</button>
      <strong>{{ successMessage }}</strong>
    </div>
    <user-edit
      v-if="currentUser"
      :user="currentUser"
      :departments="departments"
      @user-saved="saveUser"
      @user-canceled="cancelEdit"
    ></user-edit>
  </div>
</template>

<script>
import UserListComponent from './userList'
import UserEditComponent from './userEdit'
export default {
  components: {
    'user-list': UserListComponent,
    'user-edit': UserEditComponent,
  },
  data: function () {
    return {
      title: 'Manager Dashboard',
      showSuccess: false,
      showFailure: false,
      successMessage: '',
      failMessage: '',
      currentUser: null,
      users: [],
      logged: false,
      departments: []
    }
  },
  methods: {
    editUser: function (user) {
      this.currentUser = user
      this.showSuccess = false
    },
    deleteUser: function (user) {
      axios.delete('api/users/' + user.id)
        .then(response => {
          this.showSuccess = true
          this.successMessage = 'User Deleted'
          this.getUsers()
        })
    },
    saveUser: function (user) {
      this.showSuccess = true
      this.successMessage = 'User Saved'
      // Copies user properties to this.currentUser
      // without changing this.currentUser reference
      Object.assign(this.currentUser, user)
      this.currentUser = null
    },
    cancelEdit: function (user) {
      this.showSuccess = false
      // Copies user properties to this.currentUser
      // without changing this.currentUser reference
      Object.assign(this.currentUser, user)
      this.currentUser = null
    },
    getUsers: async function () {
      await axios.get('api/users')
        .then(response => { this.users = response.data.data })
      console.log(this.users)
    },
  },
  mounted () {
    this.getUsers()
    // Se já existe o array com departamentos no $root.departments
    // Não vale a pena voltar a carregar os departamentos da API:
  }
}
</script>

<style scoped>
  h1 {
  font-size: 50px;
  text-align: center;
  margin-bottom: 0%;
}
h1:hover {
  font-size: 53px;
}
</style>
