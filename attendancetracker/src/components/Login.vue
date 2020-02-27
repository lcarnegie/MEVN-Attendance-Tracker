<template>
    <div class="login-box">
      <h1 class="title">Login</h1>
      <div class="field">
      <label class="label">Name</label>
        <div class="control">
           <input class="input" type="text" placeholder="e.g Alex Smith">
        </div>
      </div>

    <div class="field">
      <label class="label">Email</label>
      <div class="control">
        <input class="input" type="email" placeholder="e.g. alexsmith@gmail.com">
      </div>
    </div>
      </div>
  </template>

  <script>
    export default {
        data(){
        return {
          post:{}
        }
    },
    methods: {
      login(){
          let uri = 'http://localhost:4000/posts/add';
          this.axios.post(uri, this.post).then(() => {
          this.$router.push({name: 'posts'});
      });
}
    }
  }
</script>
  