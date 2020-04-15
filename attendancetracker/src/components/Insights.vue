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
          <b-dropdown-item @click.prevent="logout()">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>



    <h1 style="margin-top: 10px;">{{ header }}</h1>
        <div v-if="chartData.length == 1"><center>You have no members yet! Add some to get insights. <br>Chart Loading, please wait...</center></div>
        <div v-else>
        <center>
        <GChart style="max-width: 70%;" type="ColumnChart" :data="chartData" :options="chartOptions" id="graph" /></center></div>
        <br>
        <center>
        <table id="presences">
          <tr>
            <th class="name">Name</th>
            <th class="present">Presences</th>
            <th class="absent">Absences</th>
          </tr>
          
          <tbody id="table">
            <tr v-for="attendee in attendees" :key="attendee._id">
              <td align="left">{{ attendee.name }}</td>
              <td align="center">{{attendee.presences.length}}</td>
              <td align="center">{{attendee.absenses.length}}</td>
            </tr>
          </tbody>
        </table>
        </center>
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

  }

table {
    table-layout: fixed; 
    border-collapse: collapse; 
    width: 50%; 
    background-color: white; 
    border-radius: 10px; 
    border: none;
    
  } 

h1 {
  font-family: Roboto, Open Sans, sans-serif; 
  color: #3d5a80; 
  text-align: center; 
}

td{
  padding: 1vh;
  border-top: 1px solid #ddd;
}

th{
  padding: 1vh;
}

  #graph{
    max-width: 40%;
    border-radius: 20px;
    
  }

  .present, .absent {
    text-align: center; 
  }

</style>

<script>


export default {
        mounted() {
            this.user = document.cookie.substring(document.cookie.indexOf("=")+1);
            if(document.cookie == ""){
                this.$router.push({name: 'login'});
           }
            
            if(this.$route.params.method == "id"){
                this.header = "Join Date (Left to Right)";
                this.getAttById();
            }else if(this.$route.params.method == "presences"){
                this.header = "Most Presences";
                this.getAttByPresences();
                
            }else if(this.$route.params.method == "absences"){
                 this.header = "Most Absences";
                this.getAttByAbsenses();
                
            }
            console.log(this.$route.params.method)

            
        },
      data() {
        return {
          attendees: [],
          user: "",
          header: "",
          chartData: [
              ["User", "Attendances"]
          ],
            chartOptions: {
              chart: {
              title: "Club Performance",
              width: 100, 
              height: 400
            }
          }
        }
      },
      methods: {
          getAttById(){
            var data = {user: this.user};
            let uri = 'http://localhost:4000/attendance/getById';
            this.axios.post(uri, data).then(res => {
                console.log(res);
                this.attendees = res.data;

                for(var i = 0; i < this.attendees.length; i++){
                this.chartData[i+1] = [this.attendees[i].name, parseInt(this.attendees[i].presences.length, 10)]
                }
                console.log(this.chartData);
          });
          },
          getAttByPresences(){
              var data = {user: this.user};
            let uri = 'http://localhost:4000/attendance/getById';
            this.axios.post(uri, data).then(res => {
                console.log(res);
                this.attendees = res.data;
                this.attendees.sort(function(a, b){return b.presences.length - a.presences.length});

                for(var i = 0; i < 5; i++){
                this.chartData[i+1] = [this.attendees[i].name, parseInt(this.attendees[i].presences.length, 10)]
                }
                //console.log(this.chartData)
          });
          },
          getAttByAbsenses(){
              var data = {user: this.user};
            let uri = 'http://localhost:4000/attendance/getById';
            this.axios.post(uri, data).then(res => {
                console.log(res);
                this.attendees = res.data;
                this.attendees.sort(function(a, b){return b.absenses.length - a.absenses.length});

                for(var i = 0; i < 5; i++){
                this.chartData[i+1] = [this.attendees[i].name, parseInt(this.attendees[i].absenses.length, 10)]
                }
          });
      }
    }
}
</script>