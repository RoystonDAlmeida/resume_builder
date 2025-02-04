import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify'; // Ensure this is correctly set up

createApp(App)
  .use(vuetify)
  .mount('#app');
