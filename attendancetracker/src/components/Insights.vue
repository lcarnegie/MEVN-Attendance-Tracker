<template>
    <div>
        <table id="presences">
          <tr>
            <th class="name">Name</th>
            <th class="present">Presences</th>
            <th class="absent">Absences</th>
          </tr>
          <tbody id="table">
            <tr v-for="attendee in attendees" :key="attendee._id">
              <input type="hidden" :value="attendee.id"> 
              <td>{{ attendee.name }}</td>
              <td>{{attendee.presences.length}}</td>
              <td>{{attendee.absenses.length}}</td>
            </tr>
          </tbody>
        </table>

        <div v-if="chartData.length == 1">Chart Loading Please wait...</div>
        <div v-else><GChart type="BarChart" :data="chartData" :options="chartOptions" /></div>


    </div>
</template>

<style>

</style>

<script>


export default {
        mounted() {
            
            this.user = document.cookie.substring(document.cookie.indexOf("=")+1);
            if(document.cookie == ""){
                this.$router.push({name: 'login'});
            }
            
            if(this.$route.params.method == "id"){
                this.getAttById();
            }else if(this.$route.params.method == "presences"){
                this.getAttByPresences();
                
            }else if(this.$route.params.method == "absences"){
                this.getAttByAbsenses();
                
            }
            console.log(this.$route.params.method)

            
        },
      data() {
        return {
          attendees: [],
          user: "",
          chartData: [
              ["User", "Attendances"]
          ],
          chartOptions: {
        chart: {
          title: "Company Performance",
          subtitle: "Sales, Expenses, and Profit: 2014-2017"
        }
        }
        }
      },
      methods: {
          getAttById(){
            var data = {user: this.user};
            let uri = 'http://65.92.152.100:4000/attendance/getById';
            this.axios.post(uri, data).then(res => {
                console.log(res);
                this.attendees = res.data;

                for(var i = 0; i < this.attendees.length; i++){
                this.chartData[i+1] = [this.attendees[i].name, parseInt(this.attendees[i].presences.length, 10)]
                }
          });
          },
          getAttByPresences(){
              var data = {user: this.user};
            let uri = 'http://65.92.152.100:4000/attendance/getById';
            this.axios.post(uri, data).then(res => {
                console.log(res);
                this.attendees = res.data;
                this.attendees.sort(function(a, b){return b.presences.length - a.presences.length});

                for(var i = 0; i < this.attendees.length; i++){
                this.chartData[i+1] = [this.attendees[i].name, parseInt(this.attendees[i].presences.length, 10)]
                }
                //console.log(this.chartData)
          });
          },
          getAttByAbsenses(){
              var data = {user: this.user};
            let uri = 'http://65.92.152.100:4000/attendance/getById';
            this.axios.post(uri, data).then(res => {
                console.log(res);
                this.attendees = res.data;
                this.attendees.sort(function(a, b){return b.absenses.length - a.absenses.length});

                for(var i = 0; i < this.attendees.length; i++){
                this.chartData[i+1] = [this.attendees[i].name, parseInt(this.attendees[i].presences.length, 10)]
                }
          });
      }
    }
}
</script>