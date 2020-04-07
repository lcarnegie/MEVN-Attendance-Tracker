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

        <h1>Attendance for {{user}}:</h1>
        <form @submit.prevent="att">
        <div id="cal">
          <b-calendar v-model="value" locale="en-US" class="cal" selected-variant="info" width="35vw" hide-header>
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
        <p id="incorrect">Please select a date in the calendar </p>
        <br>
        <div id="buttone"> 
        <button class="btn btn-primary">Take/View Attendance</button>
        </div>
        </form>
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
      height: 100vh;
    }

    #incorrect {
      text-align: center; 
      display: none; 
    }

</style>
  
  <script> 
    export default {
        mounted() {
            this.checkAccount()

              
        },
      data() {
        return {
          value: '',
          context: null,
          user: null,
          attendee: {}, 
          modal: null, 
          btn: null, 
          span: null
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
        }
      }
    }
  </script>