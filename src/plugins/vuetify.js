// src/plugins/vuetify.js
import { createVuetify } from 'vuetify';
import 'vuetify/styles'; // Ensure you are using css-loader
import '@mdi/font/css/materialdesignicons.css'; // Import Material Design Icons CSS

// Import components and directives
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    iconfont: 'mdi', // Specify 'mdi' for Material Design Icons
  },
});

export default vuetify;
