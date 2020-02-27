import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'

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
  }
];

const router = new VueRouter({ mode: 'history', routes: routes});

new Vue(Vue.util.extend({ router }, App)).$mount('#app');