import Vue from 'nativescript-vue'
import App from './components/App'
import {TNSFontIcon, fonticon} from 'nativescript-fonticon';
import { isAndroid, isIOS } from "tns-core-modules/platform";

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


