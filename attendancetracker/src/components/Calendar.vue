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
        <center>
        <div class="container">
        <div id="" style="width: 35%; float:left; margin:10px;" class="box">
        <h3>Welcome to Attendance Tracker, {{user}}!</h3>
        <ul style="text-align: left;">
          <li><b>-</b> Get started by adding clubs on the <a href="/clubs">"Select Club"</a> page. </li>
          <br>
          <li><b>-</b> Create some club members on the <a href="/attendees">"Manage Club Members"</a> page. </li>
          <br>
          <li><b>-</b> Use the calendar to select a date to take attendance.</li>
          <br>
          <li><b>-</b> A day with attendance taken will be highlighted in blue. </li>
        </ul>
  
        </div>
        
        <div id="" style="width: 60%; float:left; margin:10px;" class="box">
        <form @submit.prevent="att">
        <div id="cal">
        <div v-if="!dates"><center>Calendar loading please wait...</center></div>
        <div v-else>
          <h2>Calendar for {{club.clubname}}</h2>
          <b-calendar v-model="value" locale="en-US" class="cal" selected-variant="primary" width="30vw" :date-info-fn="dateClass">
          <div class="d-flex" dir="ltr">
            <b-button
              size="sm"
              variant="outline-danger"
              v-if="value"
              @click="clearDate"
            >
            Clear date
            </b-button>
            <b-button
              size="sm"
              variant="outline-primary"
              class="ml-auto"
              @click="setToday"
            >
              Set Today
      </b-button>
    </div>
          </b-calendar> 
          </div>
          </div>
        
        <p id="incorrect">Please select a date in the calendar </p>
        <br>
        <div id="buttone"> 
        <button class="btn btn-primary">Take/View Attendance</button>
        </div>
        </form>
        </div>
        <br>
        <br>
        </div>

        <div id="calcontainer" style="width: 70%">
        <h3>{{club.clubname}} Attendance</h3>
        <div v-if="chartData.length == 1"><center>You haven't taken any attendance yet! Take some to view club performance.</center></div>
        <div v-else>
        <GChart type="LineChart" :data="chartData" :options="chartOptions" id="graph" style=""/>
        </div>
        </div>
        
        </center>
        
</div>
</template>

<style scoped>
    #cal, #buttone{
        text-align: center; 
    }
    .cal {
      border: 1px red; 
    }

    h1 {
      font-family: Roboto, Open Sans, sans-serif; 
      color: #3d5a80; 
      padding: 20px;
      text-align: left; 
    }

    #buttone button{
      width: 15vw;
      margin-top: -5vh;  
    }

    #whole-page{
      height: 100%;
      text-align: center;
    }

    #incorrect {
      text-align: center; 
      display: none; 
    }

    #calcontainer{
      background-color: white;
      width: 75%;
      text-align: center;
      padding: 20px;
      border-radius: 10px;
      display: inline-block;
    }
    .box{
    }
    

</style>
  
  <script> 
    export default {
        created() {
            this.checkAccount()

            let url9 = 'http://192.168.1.11:4000/clubs/getbyID';
            this.post.number = this.selected;

            this.axios.post(url9, this.post).then(res => {
              this.club = res.data;

              var ldata = {user: this.club._id};
              let url2 = 'http://192.168.1.11:4000/clubs/getdates';
              this.axios.post(url2, ldata).then(res => {
              
              var datearr = res.data.dates;
              console.log(res.data.dates)
              this.dates = [];
              for(var i =0; i<datearr.length; i++){
                this.dates[i] = datearr[i].date;
                this.chartData[i+1] = [this.dates[i], datearr[i].numPresent];
              }
            })
            })

            
        },
        updated(){
          var body = document.body, html = document.documentElement;
          var height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
          document.getElementById("whole-page").style.height = height + "px";
        },
      data() {
        return {
          value: '',
          context: null,
          selected: {},
          club: {},
          post: {},
          user: null,
          attendee: {}, 
          modal: null, 
          btn: null, 
          span: null,
          dates: null,
          chartData: [
              ["Dates", "Attendances"]
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
        logout() {
            document.cookie = "user= ; expires=Sun, 29 Dec 2019 00:00:00 UTC; path=/;";
            document.cookie = "club= ; expires=Sun, 29 Dec 2019 00:00:00 UTC; path=/;";
            this.$router.push({name: 'login'});
        },
        checkAccount(){
          console.log(document.cookie);
            this.user = document.cookie.substring(document.cookie.indexOf("=")+1, document.cookie.indexOf(";"));
            this.selected = document.cookie.substring(document.cookie.indexOf(";")+7);
            if(document.cookie == ""){
                this.$router.push({name: 'login'});
            }
        },
        att(){
          if(this.value == ''){
            document.getElementById("incorrect").style.display = "block"; 
          }else{
            this.$router.push({name: 'attendance', params: { id: this.value }});
          }
        },
        setToday() {
          const now = new Date()
          this.value = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        },
        clearDate() {
          this.value = ''
        },
        dateClass(ymd, date) {
          var year = 1900 + date.getYear();
          var month = date.getMonth() + 1 + "";
          if(month.length == 1){
            month = "0" + month;
          }

          var day = date.getDate() + "";

          if(day.length == 1){
            day = "0" + day;
          }
          
          var str = year + "-" + month + "-" + day

          return this.dates.includes(str) ? 'table-info' : ''
        }
      }
    }
  </script>