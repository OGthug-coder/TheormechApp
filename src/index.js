import "core-js/features/map";
import "core-js/features/set";
import React from "react";
import ReactDOM from "react-dom";
import bridge from "@vkontakte/vk-bridge";
import App from "./App";


ReactDOM.render(<App/>, document.getElementById("root"));
// if (process.env.NODE_ENV === "development") {
//   import("./eruda").then(({ default: eruda }) => {}); //runtime download
// }

// Init VK  Mini App
bridge.send("VKWebAppInit")
bridge.send("VKWebAppSetViewSettings", {
    "status_bar_style": "light",
    "action_bar_color": "none"
});
