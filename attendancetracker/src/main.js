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

import HelloWorld from './components/HelloWorld.vue';
import Login from './components/Login.vue';
import Home from './components/Home.vue';

const routes = [
  {
      name: 'home',
      path: '/',
      component: HelloWorld
  },
  {
      name: 'login',
      path: '/login',
      component: Login
  },
  {
    name: 'calendar',
    path: '/calendar',
    component: Home
  }
];

const router = new VueRouter({ mode: 'history', routes: routes});

new Vue(Vue.util.extend({ router }, App)).$mount('#app');