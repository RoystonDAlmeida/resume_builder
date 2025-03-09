import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify'; // Ensure this is correctly set up
import router from './router';

const app = createApp(App);

app.provide('root', app);

app
  .use(vuetify)
  .use(router)
  .mount('#app');