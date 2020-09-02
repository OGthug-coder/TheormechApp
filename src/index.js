import "core-js/features/map";
import "core-js/features/set";
import React from "react";
import ReactDOM from "react-dom";
import bridge from "@vkontakte/vk-bridge";
import App from "./App";

// Init VK  Mini App
bridge.send("VKWebAppInit")

if (navigator.userAgent.indexOf("iPhone") !== -1) {
    bridge.send("VKWebAppSetViewSettings", {
        "status_bar_style": "light",
    });
} else {
    bridge.send("VKWebAppSetViewSettings", {
        "status_bar_style": "dark",
        "action_bar_color": "none",
    });
}

ReactDOM.render(<App/>, document.getElementById("root"));
// if (process.env.NODE_ENV === "development") {
//     import("./eruda").then(({default: eruda}) => {
//     }); //runtime download
// }
