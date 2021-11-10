import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import axios from 'axios';
import { noti } from '@/composable/toast';

axios.defaults.baseURL = 'http://127.0.0.1:8000/api/';
axios.defaults.headers.common['Accept'] = 'application/json';


window.axios = axios;
window.noti = noti;
window.$appName = 'Rascolly';
createApp(App).use(store).use(router, axios).mount('#app');