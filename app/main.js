import Vue from 'nativescript-vue'
import App from './components/App'
import VueDevtools from 'nativescript-vue-devtools';
import {TNSFontIcon, fonticon} from 'nativescript-fonticon';


if(TNS_ENV !== 'production') {
  Vue.use(VueDevtools)
}

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')


TNSFontIcon.debug = true;
TNSFontIcon.paths = {
  'fa': './assets/all.css',
};
TNSFontIcon.loadCss();

Vue.filter('fonticon', fonticon);

new Vue({
  render: h => h('frame', [h(App)])
}).$start()
