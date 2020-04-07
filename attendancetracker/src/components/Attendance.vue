<template>

    <div id="whole-page">
      <h1 id="title">Attendance</h1> 
        <div class="attendance">    
         <table id="presences">
         <tr style="border: none">
         <td colspan="3" style="border: none; padding: 5px;">
         <center>Changes are denoted by a coloured row.</center>
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
                  <input type="checkbox" :value="attendee._id" v-model="presentNames" :id="attendee._id + ':p'" @click="test(attendee._id, 'p', $event)">
              </td>
              <td class="absent absentcheckbox" :id="attendee._id + ':acheckbox'" >
                  <input type="checkbox" :value="attendee._id" v-model="absentNames" :id="attendee._id + ':a'" @click="test(attendee._id, 'a', $event)">
              </td>
            </tr>
          </tbody>
          <tr>
              <td class="buttone" colspan="3">
                <form @submit.prevent="postAttendance">
                   <button ><span>Take Attendance</span></button>
                </form>
              </td>
          </tr>
        </table>
        </div>
    </div>
</template>


<style scoped>
  #whole-page {
    font-family: Open Sans, 'Source Sans Pro', sans-serif;
    height: 100vh; 
    width: 100vw; 
    padding: 0; 
    margin: 0; 
    background-color: #f1f5f2;
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
    left: 35vw; 
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
    background-color: 
  }

  .buttone {
    text-align: center; 
    border-bottom: none; 
  }

  .buttone button {
    background-color: #98c1d9; 
    border: 1px #98c1d9; 
    border-radius: 5px; 
    padding: 1vh; 
    padding-left: 2vh; 
    padding-right: 2vh; 
    color: #F7FFFB;
    font-family: Roboto, Open Sans, sans-serif;  
  }

  .buttone button:hover {
    background-color: #A4D0EA; 
  }

</style>
  
  <script>

    export default {
        mounted() {
          this.user = document.cookie.substring(document.cookie.indexOf("=")+1);
          if(document.cookie == ""){
              this.$router.push({name: 'login'});
          }else{
          this.post.user = this.user;
          //alert(this.post.user);
          let uri = 'http://65.92.152.100:4000/attendance/attendees';
          this.axios.post(uri, this.post).then(res => {
          this.attendees = res.data;
          //console.log(this.attendees);
          for(var element of this.attendees){
            //console.log(element);
            if(element.presences.indexOf(this.$route.params.id) > -1){
              this.presentNames.push(element._id);
              //document.getElementById(element + ":pcheckbox").style.backgroundColor = "green";
            }else{
              this.absentNames.push(element._id);
              //document.getElementById(element + ":acheckbox").style.backgroundColor = "red";
            }
            
          }
          //console.log(this.presentNames);
        });
      }
        },
      data() {
        return {
          attendees: [],
          att: {},
          absentNames: [],
          presentNames: [],
          checked: true,
          post: {},
          user: null
        }
      },
      methods: {
        postAttendance(){
          //iterate through all present, then all absent, and get array of that id user, then check for the current day, if it contains delete, and append the date to the correct array
          for(var element of this.presentNames){
            var test = {number: element};
            let uri = 'http://65.92.152.100:4000/attendance/getarr';
            this.axios.post(uri, test).then(res => {
              var arr = res.data.presences;
              arr = arr.filter(e => e !== this.$route.params.id);
              //console.log(arr);
              
              var arr2 = res.data.absenses;
              arr2 = arr2.filter(e => e !== this.$route.params.id);
              //console.log(arr2);

              
              arr.push(this.$route.params.id);
              
              this.post.presences = arr;
              this.post.absenses = arr2;
              //console.log(res.data._id);
              var test2 = {id: res.data._id, presences: arr, absenses: arr2};
              //console.log(test2);
              let url = 'http://65.92.152.100:4000/attendance/post';
              this.axios.post(url, test2).then(res => {
                console.log(res);
                
                /*
                var ldata = {user: this.user};
                let url2 = 'http://65.92.152.100:4000/login/getdates';
                this.axios.post(url2, ldata).then(res => {
                  console.log(res.data);
                  var arrd = res.data.dates;
                  arrd = arrd.filter(e => e !== this.$route.params.id, this.date);
                  var ddata = {dates: arrd, user: this.user};
                  arrd.push(ddata);
                  console.log(arrd);

                  let url3 = 'http://65.92.152.100:4000/login/update';
                  this.axios.post(url3, ddata).then(res => {
                    console.log(res);
                  })
                })
                */

              })
              
            })
          }
          //alert("hello");

          for(var element1 of this.absentNames){
            var test1 = {number: element1};
            let uri1 = 'http://65.92.152.100:4000/attendance/getarr';
            this.axios.post(uri1, test1).then(res => {
              var arrr = res.data.absenses;
              arrr = arrr.filter(e => e !== this.$route.params.id);
              //console.log(arrr);
              
              var arrr2 = res.data.presences;
              arrr2 = arrr2.filter(e => e !== this.$route.params.id);

              
              arrr.push(this.$route.params.id);
              
              this.post.absenses = arrr;
              //console.log(res.data._id);
              var testt2 = {id: res.data._id, presences: arrr2, absenses: arrr};
              //console.log(test2);
              let url1 = 'http://65.92.152.100:4000/attendance/post';
              this.axios.post(url1, testt2).then(res => {
                console.log(res);
                this.$router.push({name: 'calendar'});
              })
              
            })
          }
        },
        test(input, type){
          var letter;
          if(type == "a"){
            //alert(input);
            //console.log(this.presentNames);
            this.presentNames = this.presentNames.filter(e => e !== input);
            //console.log(this.presentNames);
            letter = "p";
            document.getElementById(input + ":acheckbox").style.backgroundColor = "red";
            document.getElementById(input + ":pcheckbox").style.backgroundColor = "#f2f2f2";
          }else{
            this.absentNames = this.absentNames.filter(e => e !== input);
            
            document.getElementById(input + ":pcheckbox").style.backgroundColor = "green";
            document.getElementById(input + ":acheckbox").style.backgroundColor = "#f2f2f2";
            letter = "a";
          }
          document.getElementById(input + ":" + letter).checked = false;
          

          
          
        }
        }
      } 
    
  </script>