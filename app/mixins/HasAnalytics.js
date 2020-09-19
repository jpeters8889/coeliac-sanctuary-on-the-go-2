const AppSettings = require("tns-core-modules/application-settings");
import * as firebase from "nativescript-plugin-firebase";

export default {
    methods: {
        logAnalyticEvent(key, params = []) {
            if (AppSettings.getBoolean('enableAnalytics', true) === false) {
                return;
            }

            firebase.analytics.logEvent({
                key: key,
                parameters: params
            });
        },

        pushScreenView(screen, additionalParams = []) {
            this.logAnalyticEvent('page_view', [
                {
                    key: 'page_id',
                    value: screen,
                },
                ...additionalParams
            ]);
        },

        pushModalView(modal, additionalParams = []) {
            this.logAnalyticEvent('modal_view', [
                {
                    key: 'modal_id',
                    value: modal,
                },
                ...additionalParams
            ]);
        }
    }
}
