import AppSettings from "tns-core-modules/application-settings";

export default {
    methods: {
        pushAnalytics() {
            if(AppSettings.getBoolean('enableAnalytics', false) === false) {
                return;
            }

            //
        }
    }
}
