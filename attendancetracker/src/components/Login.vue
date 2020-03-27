<template>
    <div class="login">
      <h1 class="title">Login</h1>
      <div class="field">
      <label class="label">Username</label>
        <div class="control">
           <input class="input" type="text" placeholder="e.g Alex Smith" name="username">
        </div> 
      </div>
    <div class="field">
      <label class="label">Password</label>
      <div class="control">
        <input class="input" type="password" placeholder="e.g. alexsmith@gmail.com" name="password">
      </div>
    </div>
    <div class="login-button">
      <div class="control">
          <button @click="add()">Click Me</button>
      </div>
    </div>
  </div>
  </template>

  <style>
  .field {
    width: 50%; 
    font-family: 
  }
  
  </style>

  <script>
    export default {

        methods: {
          data() {
            return {
              post: {}
            }
          },
            add(){
            let uri = 'http://localhost:4000/login/post';
            this.axios.post(uri, this.post).then(() => {
            this.$router.push({username: 'username'});
            this.$router.push({password: 'password'});
            });
}

            
        }
    }
  </script>
