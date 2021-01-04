<template>
  <div class="jumbotron">
    <h4>Food Home Chat</h4>
    <div>
      Message<input
        type="text"
        class="msgInputs"
        v-model="msgText"
        @keypress.enter="sendMsgText"
      />
      <a v-if="this.sendingToUser == true">
        User ID
        <input
          name="userID"
          type="text"
          class="userIDInputs"
          v-model="destinationID"
          @keypress.enter="sendMsgText"
        />
      </a>
      <div class="div-radio">
        Send message to:
        <input
          v-on:click="closeUserIdInput"
          type="radio"
          id="destination_all"
          value="everybody"
          v-model="msgDestination"
        />
        <label for="destination_all">Everybody</label>

        <input
          v-on:click="openUserIdInput"
          type="radio"
          id="destination_user"
          value="user"
          v-model="msgDestination"
        />
        <label for="destination_all">User</label>

        <a v-if="this.getCurrentUser.type != 'C' && this.getCurrentUser != null">
          <input
            v-on:click="closeUserIdInput"
            type="radio"
            id="destination_delivery"
            value="delivery"
            v-model="msgDestination"
          />
          <label for="destination_delivery">Delivery Users</label>

          <input
            v-on:click="closeUserIdInput"
            type="radio"
            id="destination_cook"
            value="cook"
            v-model="msgDestination"
          />
          <label for="destination_cook">Cook Users</label>

          <input
            v-on:click="closeUserIdInput"
            type="radio"
            id="destination_manager"
            value="manager"
            v-model="msgDestination"
          />
          <label for="destination_manager">Managers</label>
        </a>
      </div>
    </div>
    <div>
      <textarea rows="4" class="msgInputs" v-model="allMsgText">
      Global Chat
      </textarea>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      msgText: "",
      allMsgText: "",
      msgDestination: "",
      users: [],
      sendingToUser: false,

      destinationID: "",
      destinationName: "",
    };
  },
  computed: {
    getCurrentUser: function () {
      return this.$store.getters.getCurrentUser;
    },
  },
  methods: {
    async sendMsgText() {
      await axios.get("api/users/" + this.destinationID).then((response) => {
        console.log(response);
        this.destinationName = response.data.data.name;
      });
      var payload = {
        user: this.getCurrentUser,
        destination: this.msgDestination,
        message: this.msgText,
        destinationUser: { id: this.destinationID, name: this.destinationName },
      };
      switch (payload.destination) {
        case "everybody":
          this.$socket.emit("global_message", payload);
          break;
        case "user":
          this.$socket.emit("private_message", payload);
          break;
        case "delivery":
          await this.getUsers("ED");
          await this.sendMessageToTypeUser();
          break;
        case "cook":
          await this.getUsers("EC");
          await this.sendMessageToTypeUser();
          break;
        case "manager":
          await this.getUsers("EM");
          await this.sendMessageToTypeUser();
          break;
      }
      this.users = [];
      this.msgText = "";
      this.destinationID = "";
    },
    getUsers: async function (tipo) {
      await axios.get("api/users").then((response) => {
        this.users = response.data.data;
      });
      await this.users.forEach((element) => {
        if (element.type == tipo) {
          for (var i = this.users.length - 1; i >= 0; i--) {
            if (this.users[i].type !== tipo) {
              this.users.splice(i, 1);
            }
          }
        }
      });
      //console.log(this.users);
    },
    sendMessageToTypeUser: async function() {
      await this.users.forEach((element) => {
        var payload = {
          user: this.getCurrentUser,
          destination: this.msgDestination,
          message: this.msgText,
          destinationUser: { id: element.id, name: element.name },
        };
        this.$socket.emit("private_message", payload);
      });
    },
    getDestinationUser: async function () {
      await axios.get("api/users/" + this.destinationID).then((response) => {
        console.log(response);
        return response.data.data.name;
      });
    },
    openUserIdInput: function () {
      this.sendingToUser = true;
    },
    closeUserIdInput: function () {
      this.sendingToUser = false;
    },
  },
  sockets: {
    global_message(payload) {
      console.log(payload);
      var newLine = payload.user ? payload.user.name : "(Anonymous)";
      newLine += " said: " + payload.message + "\n";
      this.allMsgText += newLine;
    },
  },
};
</script>

<style scoped>
.msgInputs {
  width: 100%;
}
.userIDInputs {
  width: 100%;
}
.div-radio {
  margin-top: 10px;
  margin-bottom: 2px;
}
input[type="radio"] {
  margin-left: 10px;
}
</style>
