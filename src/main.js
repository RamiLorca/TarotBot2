import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
import router from './router/index'
import Vuetify from 'vuetify'
import axios from 'axios'
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/dist/vuetify.min.css'; 


Vue.config.productionTip = false

axios.defaults.baseURL = 'https://tarotbotbackend-production.up.railway.app';

Vue.use(Vuetify);

new Vue({
  store,
  router,
  vuetify: new Vuetify(),
  render: h => h(App),
}).$mount('#app')
