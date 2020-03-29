<template>
  <form @submit.prevent="add">
    <div class="login">
      <h1 class="title">Register</h1>
      <div class="field">
      <label class="label">Username</label>
        <div class="control">
           <input type="text" class="form-control" v-model="post.user">
        </div> 
      </div>
    <div class="field">
      <label class="label">Password</label>
      <div class="control">
        <input type="password" class="form-control" v-model="post.pass">
      </div>
    </div>
    <div class="login-button">
      <div class="control">
          <button>Click Me</button>
      </div>
    </div>
  </div>
</form>
  </template>

  <style>
  .field {
    width: 50%; 
    font-family: 
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
            let uri = 'http://65.92.152.100:4000/login/add';
            this.axios.post(uri, this.post).then(res => {
              if(!res.data.user){
                alert("Success! Account Created!");
                this.$router.push({name: ''});
              }else{
               alert("That Username Already Exists!");
              }
            });
            }
        }
    }
  </script>
