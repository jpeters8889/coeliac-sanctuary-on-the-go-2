import Vue from 'nativescript-vue'
import App from './components/App'
import VueDevtools from 'nativescript-vue-devtools';
import {TNSFontIcon, fonticon} from 'nativescript-fonticon';
import { isAndroid, isIOS } from "tns-core-modules/platform";


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

if (isIOS) {
  GMSServices.provideAPIKey('AIzaSyA5JYk5L0_9TQ7Y7N9IZd2-uACHKjdHvX4');
}


Vue.registerElement('MapView', () => require('nativescript-google-maps-sdk').MapView);

new Vue({
  render: h => h('frame', [h(App)]),
}).$start()


