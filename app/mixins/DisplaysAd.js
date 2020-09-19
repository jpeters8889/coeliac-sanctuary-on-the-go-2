import admob from "nativescript-admob";
import {AD_SIZE} from "nativescript-plugin-firebase/admob/admob";

export default {
    methods: {
        createAd() {
            setTimeout(() => {
                admob.createBanner({
                    iosBannerId: "ca-app-pub-1063051842575021/7584775669",
                    androidBannerId: 'ca-app-pub-1063051842575021/7584775669',
                    size: AD_SIZE.BANNER,
                    margins: {
                        bottom: 0
                    },
                }).then(
                    function () {
                        console.log("admob createBanner done");
                    },
                    function (error) {
                        console.log("admob createBanner error: " + error);
                    }
                )
            }, 1500);
        }
    }
}
