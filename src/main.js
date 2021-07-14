import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

import vClickOutside from 'v-click-outside';  
Vue.use(vClickOutside);  

import VueClipboard from 'vue-clipboard2';
Vue.use(VueClipboard);
          