<template>
  <div id="whole-page">
    <h1 id="title">Club Attendance Tracker</h1>
    <div id="login">
      <form @submit.prevent="add" id="login-form">
        <div class="login-form">
          <h1 class="title">Club Login</h1>
          <div class="field">
          <label class="label">Username</label>
            <div class="control">
              <input type="text" v-model="post.user" class="text-input">
            </div> 
          </div>
        <div class="field">
          <label class="label">Password</label>
          <div class="control">
            <input type="password" v-model="post.pass" class="text-input">
          </div>
        </div>
        <div>
          <p id="incorrect">Username/Password Incorrect</p> 
        </div>
        <div class="login-button">
          <div class="control">
              <button class="buttone"><span>Log in </span></button> <a href="/register" class="buttone button" style="color: white"><span>Register</span></a>
          </div>
        </div>
      </div>
    </form>
  </div> 
</div>
  </template>

  <style scoped>

  #title{
    font-family: Open Sans, Roboto, sans-serif; 
    color: #3d5a80; 
    background-color: #f1f5f2;
    text-align: center;
    position: relative;
    top: 75px; 
  }
  #whole-page {
    font-family: Open Sans, 'Source Sans Pro', sans-serif;
    background-color: #f1f5f2;
  }

  #login {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  }

.login-form{
  background-color: white;
  padding: 40px;
  border-radius: 15px;
  width: 500px;
}

#incorrect{
    display: none; 
    color: red;
    font-style: italic;
    font-size: 20px;
    font-family: Arial;
    text-align: center;
}

.text-input{
  width: 100%;
  padding: 12px 20px;
  margin-top: -5px;
  box-sizing: border-box;
  border: 3px solid #ccc;
  -webkit-transition: 0.3s;
  transition: 0.3s;
  outline: none;
}

input:focus {
  border: 3px solid #555555;
}

.label{
  font-size: 18px;
  color: #555555;
  font-family: Roboto, Open Sans, Sans-serif;
}


.title{
  font-size: 30px;
  font-weight: 100;
  letter-spacing: 0.5px;
  color: #555555;
  font-family: Roboto, Open Sans, Sans-serif;
}

.control{
  text-align: center;
}

.buttone {
  display: inline-block;
  border-radius: 4px;
  background-color: #98c1d9;
  border: none;
  color: #FFFFFF;
  text-align: center;
  font-size: 28px;
  padding: 10px;
  width: 140px;
  transition: all 0.5s;
  cursor: pointer;
  margin: 5px;
}

.buttone span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}

.buttone span:after {
  content: '\00bb';
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.5s;
}

.buttone:hover span {
  padding-right: 25px;
}

.buttone:hover span:after {
  opacity: 1;
  right: 0;
}

  
  </style>

  <script>
    export default {
      data() {
            return {
              post: {}
            }
          },
        methods: {
            add(){
            let uri = 'http://192.168.1.11:4000/login/post';
            this.axios.post(uri, this.post).then(res => {
              if(!res.data){
                 document.getElementById("incorrect").style.display = "block"; 
                 document.getElementsByClassName("text-input")[0].style.border = "3px solid red"; 
                 document.getElementsByClassName("text-input")[1].style.border = "3px solid red"; 
              }else{
                document.getElementById("incorrect").style.display = "none"; 
                
                document.cookie = "user="+res.data.user;

                let url = 'http://192.168.1.11:4000/clubs/getone';
                  this.axios.post(url, this.post).then(res2 => {
                    console.log(res2);
                    document.cookie = "club=" + res2.data._id + ";";
                    this.$router.push({name: 'calendar'});
                })
              }
            });
          }
        }
    }
  </script>