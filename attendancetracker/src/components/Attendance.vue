<template>
    <div v-if="attendees.length == 0" id="none">
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


      <h1 id="title">Attendance for {{this.$route.params.id}}</h1>
      <center>You have no members yet! Create some to take attendance.
      <br>
      Chart Loading Please wait...
      </center>

    </div>
        <div v-else>
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


      <h1 id="title">Attendance for {{this.$route.params.id}}</h1> 
      <center style="padding-bottom: 1vh; ">*Note: changes are denoted by a darker coloured row.
  </center>
        <div class="attendance">    
         <table id="presences">
         <tr style="border: none">
         <td colspan="3" style="border: none; padding: 5px;">
         </td>
         </tr>
          <tr>
            <th class="name">Name</th>
            <th class="present">Present</th>
            <th class="absent">Absent</th>
          </tr>
          <tbody id="table">
            <tr v-for="attendee in attendees" :key="attendee._id">
              <input type="hidden" :value="attendee.id"> 
              <td class="name" :id="attendee._id + ':n'">{{ attendee.name }}</td>
              <td class="present presentcheckbox" :id="attendee._id + ':pcheckbox'">
                  <label class="container">
                  <input type="checkbox" :value="attendee._id" v-model="presentNames" :id="attendee._id + ':p'" @click="test(attendee._id, 'p', $event)">
                  <span class="checkmark"></span>
                  </label> 
              </td>
              <td class="absent absentcheckbox" :id="attendee._id + ':acheckbox'" >
                  <label class="container">
                  <input type="checkbox" :value="attendee._id" v-model="absentNames" :id="attendee._id + ':a'" @click="test(attendee._id, 'a', $event)">
                  <span class="checkmark"></span>
                  </label> 
              </td>
            </tr>
          </tbody>
          <tr>
              <td class="buttone" colspan="3">
                <form @submit.prevent="postAttendance">
                   <button ><span>Take Attendance</span></button>
                </form>
              </td>
          </tr>
        </table>
        </div>
    </div>
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

  #none {
    font-family: Open Sans, 'Source Sans Pro', sans-serif;
    height: 100vh;
    width: auto;
    padding: 0;
    margin: 0;
    background-color: #f1f5f2;
    background-attachment: fixed;

  }

  #title{
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

  th {
    padding-top: 2vh;
    padding-bottom: 1vh; 
    font-size: 25px;
    border-bottom: 1px solid #000F08; 
  }

  td {
    padding-top: 3vh; 
    padding-bottom: 3vh; 
    border-bottom: 1px solid #000F08; 
  }

  .name {
    padding-left: 1.25vw; 
    border-right: 1px solid #000F08; 
  }


  .absent, .present {
    text-align: center; 
    width: 20%; 
  }

  .presentcheckbox {
    background-color: #6CD182; 
  }

  .absentcheckbox {
    background-color: #FF7F7F; 
  }

  .buttone {
    text-align: center; 
    border-bottom: none; 
  }

  .buttone button {
    background-color: #3D5A80; 
    border: 1px #3D5A80; 
    border-radius: 5px; 
    padding: 1vh; 
    padding-left: 2vh; 
    padding-right: 2vh; 
    color: white;
    font-family: Roboto, Open Sans, sans-serif;  
  }

  .buttone button:hover {
    background-color: #293D56;
  }
</style>
  
  <script>
  

    export default {
        mounted() {
          this.user = document.cookie.substring(document.cookie.indexOf("=")+1);
          if(document.cookie == ""){
              this.$router.push({name: 'login'});
          }else{
          this.post.user = this.user;
          //alert(this.post.user);
          let uri = 'http://65.92.152.100:4000/attendance/attendees';
          this.axios.post(uri, this.post).then(res => {
          this.attendees = res.data;
          //console.log(this.attendees);
          for(var element of this.attendees){
            //console.log(element);
            if(element.presences.indexOf(this.$route.params.id) > -1){
              this.presentNames.push(element._id);
              //document.getElementById(element + ":pcheckbox").style.backgroundColor = "green";
            }else{
              this.absentNames.push(element._id);
              //document.getElementById(element + ":acheckbox").style.backgroundColor = "red";
            }
            
          }
          
          //console.log(this.presentNames);
        });
      }
        },
        updated(){
          var body = document.body, html = document.documentElement;
          var height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
          document.getElementById("whole-page").style.height = height + "px";
        },
      data() {
        return {
          attendees: [],
          att: {},
          absentNames: [],
          presentNames: [],
          checked: true,
          post: {},
          user: null,
          dismissSecs: 10,
          dismissCountDown: 0,
          showDismissibleAlert: false
        }
      },
      methods: {
        logout() {
            document.cookie = "user= ; expires=Sun, 29 Dec 2019 00:00:00 UTC; path=/;";
            this.$router.push({name: 'login'});
        },
        postAttendance(){
          //iterate through all present, then all absent, and get array of that id user, then check for the current day, if it contains delete, and append the date to the correct array
          for(var element of this.presentNames){
            var test = {number: element};
            let uri = 'http://65.92.152.100:4000/attendance/getarr';
            this.axios.post(uri, test).then(res => {
              var arr = res.data.presences;
              arr = arr.filter(e => e !== this.$route.params.id);
              //console.log(arr);
              
              var arr2 = res.data.absenses;
              arr2 = arr2.filter(e => e !== this.$route.params.id);
              //console.log(arr2);

              
              arr.push(this.$route.params.id);
              
              this.post.presences = arr;
              this.post.absenses = arr2;
              //console.log(res.data._id);
              var test2 = {id: res.data._id, presences: arr, absenses: arr2};
              //console.log(test2);
              let url = 'http://65.92.152.100:4000/attendance/post';
              this.axios.post(url, test2).then(res => {
                console.log(res);
                
                /*
                var ldata = {user: this.user};
                let url2 = 'http://65.92.152.100:4000/login/getdates';
                this.axios.post(url2, ldata).then(res => {
                  console.log(res.data);
                  var arrd = res.data.dates;
                  arrd = arrd.filter(e => e !== this.$route.params.id, this.date);
                  var ddata = {dates: arrd, user: this.user};
                  arrd.push(ddata);
                  console.log(arrd);

                  let url3 = 'http://65.92.152.100:4000/login/update';
                  this.axios.post(url3, ddata).then(res => {
                    console.log(res);
                  })
                })
                */

              })
              
            })
          }
          //alert("hello");

          for(var element1 of this.absentNames){
            var test1 = {number: element1};
            let uri1 = 'http://65.92.152.100:4000/attendance/getarr';
            this.axios.post(uri1, test1).then(res => {
              var arrr = res.data.absenses;
              arrr = arrr.filter(e => e !== this.$route.params.id);
              //console.log(arrr);
              
              var arrr2 = res.data.presences; 
              arrr2 = arrr2.filter(e => e !== this.$route.params.id);

              
              arrr.push(this.$route.params.id);
              
              this.post.absenses = arrr;
              //console.log(res.data._id);
              var testt2 = {id: res.data._id, presences: arrr2, absenses: arrr};
              //console.log(test2);
              let url1 = 'http://65.92.152.100:4000/attendance/post';
              this.axios.post(url1, testt2).then(res => {
                console.log(res);
                this.$router.push({name: 'calendar'});
              })
              
            })
          }
        },
        test(input, type){
          var letter;
          if(type == "a"){
            //alert(input);
            //console.log(this.presentNames);
            this.presentNames = this.presentNames.filter(e => e !== input);
            //console.log(this.presentNames);
            letter = "p";
            document.getElementById(input + ":acheckbox").style.backgroundColor = "red";
            document.getElementById(input + ":pcheckbox").style.backgroundColor = "#6CD182";
          }else{
            this.absentNames = this.absentNames.filter(e => e !== input);
            
            document.getElementById(input + ":pcheckbox").style.backgroundColor = "green";
            document.getElementById(input + ":acheckbox").style.backgroundColor = "#FF7F7F";
            letter = "a"; 
          }
          document.getElementById(input + ":" + letter).checked = false;
        }
        }
      } 
    
  </script>