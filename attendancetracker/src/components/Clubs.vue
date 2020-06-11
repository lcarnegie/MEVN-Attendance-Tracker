<template>
    <div id="whole-page">

    <div>
  <b-navbar toggleable="lg" type="light" variant="light">
    <b-navbar-brand href="#" style="margin-top: 8px;">Attendance Tracker</b-navbar-brand>

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
        <b-nav-item href="/clubs">Select Club</b-nav-item>
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




      <h1 style="margin-top: 10px;"> Manage Clubs</h1>
        <table>

            <tr>
                <th>Club Name (# Days)</th>
            </tr>

            <tr  v-for="club in clubs" :key="club._id">
                <td><span v-if="selected == club._id"><b>{{club.clubname}} ({{club.dates.length}})</b></span> <span v-else>{{club.clubname}} ({{club.dates.length}})</span> </td>
                <td id= "deletebuttone"><button class="btn btn-success" @click.prevent="sel(club._id)">Select</button> <button class="btn btn-danger" @click.prevent="del(club._id)">Delete</button></td>
            </tr>
            <tr>
              <td colspan="2" id="buttone">
                <span><b>Add a Club: </b></span>
                <form @submit.prevent="addUser"> 
                <input type="text" id="name" v-model="club.name" class="text-input">
                <button id="buttone" class="btn btn-lg btn-primary">Add Club</button>
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
          let uri = 'http://192.168.1.11:4000/clubs/clubs';
          this.axios.post(uri, this.post).then(res => {
          this.clubs = res.data;
          //console.log(this.clubs);
          });

        },
      data() {
        return {
          user: null,
          clubs: [],
          post: {},
          club: {},
          selected: {},
        }
      },
      methods: {
          logout() {
            document.cookie = "user= ; expires=Sun, 29 Dec 2019 00:00:00 UTC; path=/;";
            document.cookie = "club= ; expires=Sun, 29 Dec 2019 00:00:00 UTC; path=/;";
            this.$router.push({name: 'login'});
        },
        checkAccount(){
            this.user = document.cookie.substring(document.cookie.indexOf("=")+1, document.cookie.indexOf(";"));
            this.selected = document.cookie.substring(document.cookie.indexOf(";")+7);
            console.log(this.selected);
            if(document.cookie == ""){
                this.$router.push({name: 'login'});
        }
        },
        del(id){
            this.post.id = id;
            //alert(id);
            if(this.post.id == this.selected){
                alert("You cannot delete your selected club!")
            }else{
            let uri = 'http://192.168.1.11:4000/clubs/delete';
            if(this.clubs.length != 1){
            this.axios.post(uri, this.post).then(() => {
                location.reload();
            });
            }else{
                alert("You must have at least one club!");
            }
            }
        },
        addUser(){
          //alert(this.attendee.name);
          this.club.user = this.user;
          this.club.clubname = this.club.name;
          
          let uri = 'http://192.168.1.11:4000/clubs/add';
          this.axios.post(uri, this.club).then(() => {
              location.reload();
          });
        },
        sel(id){
            document.cookie = "club= " + id + ";";
            location.reload();
        },
      }
}
</script>