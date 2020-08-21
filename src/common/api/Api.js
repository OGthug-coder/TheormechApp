import NoHistoryFoundException from "../exceptions/NoHistoryFoundException";
import NoUserFoundException from "../exceptions/NoUserFoundException";
import HttpStatus from "./HttpStatus.js";
import bridge from '@vkontakte/vk-bridge';

class Api {
    constructor() {
        this.URL = "https://atake.live:8443/v1/";
    }

    requestTests() {
        const url = this.URL + "tests";

        return fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => response.json())
            .catch(e => console.log(e));

    }

    subscribeToGroup() {
        bridge.send("VKWebAppJoinGroup", {"group_id": 8812367});
    }

    //dark or light
    setStatusBarStyle(style) {
        bridge.send("VKWebAppSetViewSettings", {"status_bar_style": style, "action_bar_color": "none"});
    }

    requestTest(id) {
        const url = this.URL + "tests/" + id;
        return fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => response.json());
    }

    requestHistory(userId, testId) {
        const url = this.URL + "users/" + userId + "/get_history/" + testId;
        return fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => response.json())
            .catch(e => {
                if (e.status === HttpStatus.NOT_FOUND) {
                    throw NoHistoryFoundException();
                }
            });
    }

    getVkProfile() {
        return bridge.send('VKWebAppGetUserInfo')
            .catch(e => console.log(e));
        // const response = {
        //     bdate: "1.10",
        //     city: {
        //         id: 0,
        //         title: "Санкт-Петербург"
        //     },
        //     country: {
        //         id: 0,
        //         title: ""
        //     },
        //     first_name: "Артем",
        //     id: 137239419,
        //     last_name: "Бакута",
        //     photo_100: "https://sun9-12.userapi.com/c857424/v857424321/c3b3d/_n0Y7-aYtwE.jpg?ava=1",
        //     photo_200: "https://sun9-61.userapi.com/c857424/v857424321/c3b3c/QmbUxDlOVmo.jpg?ava=1",
        //     photo_max_orig: "https://sun9-34.userapi.com/impf/c857424/v857424321/c3b3a/A-gC15Mizx8.jpg?size=0x0&quality=90&sign=9957305916153e2803f0bb9902588389&ava=1",
        //     sex: 2,
        //     timezone: 3,
        // };
        //
        // return new Promise((resolve) => {
        //     setTimeout(() => resolve(response), 200);
        // });
    }

    vibrate(type) {
        bridge.send("VKWebAppTapticNotificationOccurred", {"type": type});
    }

    requestUserById(id) {
        const url = this.URL + "users/" + id;
        return fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => response.json())
            .then(data => {
                if (data.status === HttpStatus.NOT_FOUND) {
                    return Promise.reject(new NoUserFoundException("Couldn't get user from " + url));
                } else {
                    return data;
                }
            });

    }

    addUser(user) {
        const url = this.URL + "users/" + user.id;

        return fetch(url, {
            method: "PUT",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => response.json());

    }

    requestQuestion(testId) {
        const url = this.URL + "tests/" + testId;

        return fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => response.json());
    }

    sendHistoryEvent(questionId, userId, eventCode) {
        const url = this.URL + "users/" + userId + "/send_event/" + questionId;

        return fetch(url, {
            method: "POST",
            body: eventCode,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    requestStickers() {
        const url = this.URL + "stickers";

        return fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => response.json())
    }

    setActiveSticker(userId, stickerId) {
        const url = this.URL + "users/" + userId + "/set_active_sticker/" + stickerId;

        return fetch(url, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => response.json());
    }

    buySticker(userId, stickerId) {
        const url = this.URL + "users/" + userId + "/buy_sticker/" + stickerId;

        return fetch(url, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => response.json());
    }


}

export default Api;