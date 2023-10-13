import { createApp } from 'vue';
import App from './App.vue';
import router from './router/routes';
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'


import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App);

app.use(pinia)
app.use(router);
app.mount('#app');
