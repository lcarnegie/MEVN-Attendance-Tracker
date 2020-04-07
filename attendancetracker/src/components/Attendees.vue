<template>
    <div id="whole-page">

    <div>
  <b-navbar toggleable="lg" type="light" variant="light">
    <b-navbar-brand href="#" style="margin-top: 8px;">Attendance Tracker®</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="/calendar">Calendar</b-nav-item>
        <b-nav-item-dropdown text="Insights">
          <b-dropdown-item href="/insights/id">By Join Date</b-dropdown-item>
          <b-dropdown-item href="/insights/presences">By Presences</b-dropdown-item>
          <b-dropdown-item href="/insights/absences">By Absences</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item href="/attendees">Manage Club Members</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">       

        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template v-slot:button-content>
            <em>{{user}}</em>
          </template>
          <b-dropdown-item @click.prevent="logout">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>




      <h1 style="margin-top: 10px;"> Manage Club Members</h1>
        <table>

            <tr>
                <th>Member Name</th>
            </tr>

            <tr  v-for="attendee in attendees" :key="attendee._id">
                <td>{{attendee.name}}</td>
                <td id= "deletebuttone"><button class="btn btn-danger" @click.prevent="del(attendee._id)">Delete</button></td>
            </tr>
            <tr>
              <td colspan="2" id="buttone">
                <span><b>Add a Member: </b></span>
                <form @submit.prevent="addUser"> 
                <input type="text" id="name" v-model="attendee.name" class="text-input">
                <button id="buttone" class="btn btn-lg btn-primary">Add Member</button>
                </form>
              </td>
            </tr>
        </table>
    </div>
</template>

<style scoped>
#whole-page {
    font-family: Open Sans, 'Source Sans Pro', sans-serif;
    height: 100vh;
    width: auto;
    padding: 0;
    margin: 0;
    background-color: #f1f5f2;
    background-attachment: fixed;

  }

h1 {
  font-family: Roboto, Open Sans, sans-serif; 
  color: #3d5a80; 
  text-align: center; 
}
table {
    table-layout: fixed; 
    border-collapse: collapse; 
    width: 50%; 
    position: absolute; 
    left: 25vw; 
    background-color: white; 
    border-radius: 10px; 
  }

td{
  padding: 1vh;
  border-top: 1px solid #ddd;
}

th{
  padding: 1vh;
}

#deletebuttone {
  text-align: right; 
}

.text-input{
  padding: 10px;
  font-size: 17px;
  border: 1px solid grey;
  border-radius: 5px;
  float: left;
  width: 66%;
  background: #f1f1f1;
}

#buttone {
  margin-left: 0.5vw; 
}


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
          logout() {
            document.cookie = "user= ; expires=Sun, 29 Dec 2019 00:00:00 UTC; path=/;";
            this.$router.push({name: 'login'});
        },
        checkAccount(){
            this.user = document.cookie.substring(document.cookie.indexOf("=")+1);
            if(document.cookie == ""){
                this.$router.push({name: 'login'});
        }
        },
        del(id){
            this.post.id = id;
            //alert(id);
            let uri = 'http://65.92.152.100:4000/attendance/delete';
            this.axios.post(uri, this.post).then(() => {
                location.reload();
            });
        },
        addUser(){
          //alert(this.attendee.name);
          this.attendee.user = this.user;
          
          let uri = 'http://65.92.152.100:4000/attendance/add';
          this.axios.post(uri, this.attendee).then(() => {
              location.reload();
          });
        }
      }
}
</script>