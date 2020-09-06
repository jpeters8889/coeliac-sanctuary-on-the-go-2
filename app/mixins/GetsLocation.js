const geolocation = require("nativescript-geolocation");
const { Accuracy } = require("tns-core-modules/ui/enums");

export default {
    mounted() {
        geolocation.enableLocationRequest();
    },

    methods: {
        getLocation(timeout = 1500) {
            return geolocation.getCurrentLocation({
                    desiredAccuracy: Accuracy.high,
                    maximumAge: 5000,
                    timeout: timeout
                });
        }
    }
}
