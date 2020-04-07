<template>

    <div id="page">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">

            <button type="button" id="sidebarCollapse" class="btn btn-info">
                <i class="fas fa-align-left"></i>
                <span>Toggle Sidebar</span>
            </button>

        </div>
    </nav>

        <h1>Welcome, {{user}}</h1>
        
        <form @submit.prevent="att">
        <div id="cal">
       <b-calendar v-model="value" locale="en-US" class="cal" selected-variant="danger" width="150vh" hide-header></b-calendar> 
        </div>
        <button class="btn btn-primary">Take/View Attendance</button>
        </form>
  
<!-- Trigger/Open The Modal -->
<h2>Modal Example</h2>

<!-- Trigger/Open The Modal -->
<form @submit.prevent="btnClick">
<button id="myBtn">Open Modal</button>
</form>
<!-- The Modal -->
<div id="myModal" class="modal">

  <!-- Modal content -->
  <div class="modal-content">
    <span class="close" @click="spanClick">&times;</span>
    <p>Some text in the Modal..</p>
  </div>

</div>

  
  <form @submit.prevent="logout">
    <button id="logout"> Log Out </button> 
  </form>


  <form @submit.prevent="addUser">
    <input type="text" id="name" v-model="attendee.name">
    <button>Add User</button>
  </form>
</div>
</template>

<style>
    #cal{
        text-align: center; 
        height: 50vh; 
    }
    .cal {
      height: 500px; 
      border: 1px red; 
    }

    .modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

/* The Close Button */
.close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
</style>
  
  <script> 
    export default {
        mounted() {
            this.checkAccount()

              // Get the modal
              this.modal = document.getElementById("myModal");

              // Get the button that opens the modal
              this.btn = document.getElementById("myBtn");

              // Get the <span> element that closes the modal
              this.span = document.getElementsByClassName("close")[0];

              
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
            alert("SILLY BOII You must select a date!");
          }else{
            this.$router.push({name: 'attendance', params: { id: this.value }});
          }
        },
        addUser(){
          alert(this.attendee.name);
          this.attendee.user = this.user;
          
          let uri = 'http://65.92.152.100:4000/attendance/add';
          this.axios.post(uri, this.attendee).then(() => {
          });
        },
        btnClick() {
          this.modal.style.display = "block";
        },
        spanClick() {
          this.modal.style.display = "none";
        }
      }
    }
  </script>