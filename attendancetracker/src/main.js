import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.use(Buefy)
Vue.config.productionTip = false

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import VueAxios from 'vue-axios';
import axios from 'axios';

Vue.use(VueAxios, axios);
Vue.config.productionTip = false;

import Login from './components/Login.vue';
import Calendar from './components/Calendar.vue';
import Register from './components/Register.vue';
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
  }
];

const router = new VueRouter({ mode: 'history', routes: routes});

new Vue(Vue.util.extend({ router }, App)).$mount('#app');