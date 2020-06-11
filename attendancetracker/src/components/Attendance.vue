<template>
    <div v-if="attendees.length == 0" id="none">
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


      <h1 id="title">{{club.clubname}} Attendance for {{this.$route.params.id}}</h1> 
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
                   <center><button class="button btn btn-success"><span>Take Attendance</span></button> <a href="/calendar" class="button btn btn-danger">Cancel</a></center>
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
</style>
  
  <script>
  

    export default {
        mounted() {
          this.user = document.cookie.substring(document.cookie.indexOf("=")+1, document.cookie.indexOf(";"));
          this.selected = document.cookie.substring(document.cookie.indexOf(";")+7);
          if(document.cookie == ""){
              this.$router.push({name: 'login'});
          }else{
          
          let url9 = 'http://192.168.1.11:4000/clubs/getbyID';
          this.post2.number = this.selected;

          this.axios.post(url9, this.post2).then(res => {
          this.club = res.data;

          this.post.user = this.club._id;
          let uri = 'http://192.168.1.11:4000/attendance/attendees';
          this.axios.post(uri, this.post).then(res => {
          this.attendees = res.data;
          for(var element of this.attendees){
            if(element.presences.indexOf(this.$route.params.id) > -1){
              this.presentNames.push(element._id);
            }else{
              this.absentNames.push(element._id);
            }
          }
        });
          })
          
          
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
          selected: {},
          club: {},
          post2: {},
          presentNames: [],
          checked: true,
          post: {},
          user: null
        }
      },
      methods: {
        logout() {
            document.cookie = "user= ; expires=Sun, 29 Dec 2019 00:00:00 UTC; path=/;";
            document.cookie = "club= ; expires=Sun, 29 Dec 2019 00:00:00 UTC; path=/;";
            this.$router.push({name: 'login'});
        },
        postAttendance(){
          //iterate through all present, then all absent, and get array of that id user, then check for the current day, if it contains delete, and append the date to the correct array
          for(var element of this.presentNames){
            var test = {number: element};
            let uri = 'http://192.168.1.11:4000/attendance/getarr';
            this.axios.post(uri, test).then(res => {
              var arr = res.data.presences;
              arr = arr.filter(e => e !== this.$route.params.id);
              
              var arr2 = res.data.absenses;
              arr2 = arr2.filter(e => e !== this.$route.params.id);

              
              arr.push(this.$route.params.id);
              
              this.post.presences = arr;
              this.post.absenses = arr2;

              var test2 = {id: res.data._id, presences: arr, absenses: arr2};

              let url = 'http://192.168.1.11:4000/attendance/post';
              this.axios.post(url, test2).then(res => {
                console.log("Arr: " + res);
                
                // start of user updating
            
                var ldata = {user: this.club._id};
                let url2 = 'http://192.168.1.11:4000/clubs/getdates';
                this.axios.post(url2, ldata).then(res => {
                  //console.log(res.data);
                  var arrd = res.data.dates;
                  //arrd = arrd.filter(e => e !== this.$route.params.id, this.date);
                  for(var i = 0; i<arrd.length; i++){
                    if(arrd[i].date == this.$route.params.id){
                      arrd[i] = null;
                    }
                  }

                  arrd = arrd.filter(function (el) {
                    return el != null;
                  });
                  
                  var ddata = {date: this.$route.params.id, numPresent: this.presentNames.length};
                  arrd.push(ddata);
                  //console.log(arrd);

                  var userPostData = {dates: arrd, user: this.club._id}

                  let url3 = 'http://192.168.1.11:4000/clubs/update';
                  this.axios.post(url3, userPostData).then(res => {
                    //console.log("URL 3");
                    console.log(res);
                    this.$router.push({name: 'calendar'});
                  })
                })

              })
              
            })
          }
          
          if(this.absentNames.length != 0){
            //alert("absences")
            for(var element1 of this.absentNames){
            var test1 = {number: element1};
            let uri1 = 'http://192.168.1.11:4000/attendance/getarr';
            this.axios.post(uri1, test1).then(res => {
              var arrr = res.data.absenses;
              arrr = arrr.filter(e => e !== this.$route.params.id);
              
              var arrr2 = res.data.presences; 
              arrr2 = arrr2.filter(e => e !== this.$route.params.id);

              arrr.push(this.$route.params.id);
              
              this.post.absenses = arrr;

              var testt2 = {id: res.data._id, presences: arrr2, absenses: arrr};

              let url1 = 'http://192.168.1.11:4000/attendance/post';
              this.axios.post(url1, testt2).then(res => {
                console.log("Arr2: " + res);
                
              })
              
            })
          }
            // start of user updating
            
                var ldata = {user: this.club._id};
                let url2 = 'http://192.168.1.11:4000/clubs/getdates';
                this.axios.post(url2, ldata).then(res => {
                  //console.log(res.data);
                  var arrd = res.data.dates;
                  //arrd = arrd.filter(e => e !== this.$route.params.id, this.date);
                  for(var i = 0; i<arrd.length; i++){
                    if(arrd[i].date == this.$route.params.id){
                      arrd[i] = null;
                    }
                  }

                  arrd = arrd.filter(function (el) {
                    return el != null;
                  });
                  
                  var ddata = {date: this.$route.params.id, numPresent: this.presentNames.length};
                  arrd.push(ddata);
                  console.log(arrd);

                  var userPostData = {dates: arrd, user: this.club._id}

                  let url3 = 'http://192.168.1.11:4000/clubs/update';
                  this.axios.post(url3, userPostData).then(res => {
                    console.log("URL 3");
                    console.log(res);
                    this.$router.push({name: 'calendar'});
                  })
                })



          }
        },
        test(input, type){
          var letter;
          if(type == "a"){

            this.presentNames = this.presentNames.filter(e => e !== input);

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