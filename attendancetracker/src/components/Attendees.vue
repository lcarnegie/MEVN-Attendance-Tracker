<template>
    <div>
        <table>

            <tr>
                <th>Name </th>
                <th>Delete</th>
            </tr>

            <tr v-for="attendee in attendees" :key="attendee._id">
                <td>{{attendee.name}}</td>
                <td> <form @submit.prevent="del" ><input type="hidden" :value="attendee._id"><button>Delete</button></form> </td>
            </tr>
        </table>
    <br>
        <form @submit.prevent="addUser">
            <input type="text" id="name" v-model="attendee.name">
            <button>Add User</button>
        </form>
    </div>
</template>

<style>

</style>

<script>
export default {
        mounted() {
            this.checkAccount();
          this.post.user = this.user;
          //alert(this.post.user);
          let uri = 'http://65.92.152.100:4000/attendance/attendees';
          this.axios.post(uri, this.post).then(res => {
          this.attendees = res.data;
          console.log(this.attendees);
          });

        },
      data() {
        return {
          user: null,
          attendees: [],
          post: {},
          attendee: {}
        }
      },
      methods: {
        checkAccount(){
            this.user = document.cookie.substring(document.cookie.indexOf("=")+1);
            if(document.cookie == ""){
                this.$router.push({name: 'login'});
        }
        },
        del(){

        },
        addUser(){
          alert(this.attendee.name);
          this.attendee.user = this.user;
          
          let uri = 'http://65.92.152.100:4000/attendance/add';
          this.axios.post(uri, this.attendee).then(() => {
              location.reload();
          });
        }
      }
}
</script>