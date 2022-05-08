require('./bootstrap');
import Vue from 'vue';
import App from './App.vue';
import router from './routes';
import store from './store'
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
new Vue({
    render: h=>h(App),
    store,
    router,
}).$mount("#app")