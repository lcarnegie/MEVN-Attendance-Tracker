<template>
<div id="whole-page">
    <div id="register">
      <form @submit.prevent="add" id="login-form">
        <div class="login-form">
          <h1 class="title">Register</h1>
          <div class="field">
          <label class="label">Club Name (No spaces)</label>
            <div class="control">
              <input type="text" v-model="post.user" class="text-input">
            </div> 
          </div>
          <div class="field">
            <label class="label">Email</label>
              <div class="control">
                <input type="email" v-model="post.email" class="text-input">
              </div> 
            </div>
        <div class="field">
          <label class="label">Password</label>
          <div class="control">
            <input type="password" v-model="post.pass" class="text-input">
          </div>
        </div>
        <div>
          <p id="reminder">Please ensure all fields are filled in, and that your passwords match</p> 
        </div>
        <div class="login-button">
          <div class="control">
              <button class="buttone" style="width: 60%"><span>Create Account</span></button><a href="/" class="buttone button" style="color: white; width: 30%"><span>Login</span></a>
        </div>
        </div> 
      </div>
    </form>
  </div> 
</div>
  </template>

  <style scoped>
  #whole-page {
    font-family: Open Sans, 'Source Sans Pro', sans-serif;
    background-color: #f1f5f2;
  }

  #register {
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
  font-weight: 550; 
}


.title{
  font-size: 30px;
  font-weight: 100;
  letter-spacing: 0.5px;
  color: #3d5a80;
  font-family: Roboto, Open Sans, Sans-serif;
  font-weight: bold; 
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
  width: 300px;
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

#reminder { 
  display: none; 
  color: red;
  font-style: italic;
  font-size: 20px;
  font-family: Arial;
  text-align: center;
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
            if(this.post.user != "" || this.post.email != "" || this.post.pass != ""){ 
            let uri = 'http://localhost:4000/login/add';
            this.axios.post(uri, this.post).then(res => {
              console.log(res);
              if(!res.data.user){
                alert("Success! Account Created!");
                this.$router.push({name: 'login'});
              }else{
                alert("Error username already in use!")
              }
            });
            
            }else{
              alert("Fields must not be empty!")
            }
        }
    }
  }
  </script>
