import Vue from 'vue'
import App from './App.vue'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.config.productionTip = false

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import VueAxios from 'vue-axios';
import axios from 'axios';

import VueGoogleCharts from 'vue-google-charts'


Vue.use(VueAxios, axios);
Vue.config.productionTip = false;

Vue.use(VueGoogleCharts)

import Login from './components/Login.vue';
import Calendar from './components/Calendar.vue';
import Register from './components/Register.vue';
import Attendance from './components/Attendance.vue';
import Insights from './components/Insights.vue';
import Attendees from './components/Attendees.vue';
import Clubs from './components/Clubs.vue';

const routes = [
  {
      name: 'login',
      path: '/',
      component: Login
  },
  {
    name: 'calendar',
    path: '/calendar',
    component: Calendar
  },
  {
    name: 'Register',
    path: '/register',
    component: Register
  },
  {
    name: 'attendance',
    path: '/attendance/:id',
    component: Attendance
  },
  {
    name: 'Insights',
    path: '/insights/:method',
    component: Insights
  },
  {
    name: 'Attendees',
    path: '/attendees',
    component: Attendees
  },
  {
    name: 'Clubs',
    path: '/clubs',
    component: Clubs
  },
];

const router = new VueRouter({ mode: 'history', routes: routes});

new Vue(Vue.util.extend({ router }, App)).$mount('#app');