import NoHistoryFoundException from "../exceptions/NoHistoryFoundException";
import NoUserFoundException from "../exceptions/NoUserFoundException";
import HttpStatus from "./HttpStatus.js";
import bridge from '@vkontakte/vk-bridge';
import Vibration from "../Vibration";
import isUndefined from "../IsUndefined";

class Api {
    constructor() {
        // this.URL = "https://atake.live:8443/v1/";
        this.URL = "http://localhost/v1/";


        this.PARAMS = window.location.search;
        this.ALLOW_VIBRATION = !isUndefined(window.navigator.vibrate);
    }

    requestTime() {
        const url = this.URL + "time";

        return fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => response.json());
    }

    requestTests() {
        const url = this.URL + "tests";

        return fetch(url, {
            method: "GET",
            headers: {
                "params": this.PARAMS,
                "Content-Type": "application/json"
            }
        }).then(response => response.json())
            .catch(e => console.log(e));

    }

    requestTest(id) {
        const url = this.URL + "tests/" + id;
        return fetch(url, {
            method: "GET",
            headers: {
                "params": this.PARAMS,
                "Content-Type": "application/json"
            }
        }).then(response => response.json());
    }

    saveTest(test) {
        let testFormData = new FormData();

        for (const [key, value] of Object.entries(test)) {
            testFormData.append(key, value);
        }

        const url = this.URL + "tests/";
        return fetch(url, {
            method: "POST",
            body: testFormData,
            headers: {
                "params": this.PARAMS,
            }
        }).then(response => response.json());
    }

    updateTest(test) {
        const url = this.URL + "tests/";

        let testFormData = new FormData();

        for (const [key, value] of Object.entries(test)) {
            if (key === 'questions') {
                testFormData.append(key, JSON.stringify(value));
            } else {
                testFormData.append(key, value);
            }
        }

        fetch(url, {
            method: "PATCH",
            body: testFormData,
            headers: {
                "params": this.PARAMS,
            }
        });
    }

    deleteTest(id) {
        const url = this.URL + "tests/" + id;
        return fetch(url, {
            method: "DELETE",
            headers: {
                "params": this.PARAMS,
                "Content-Type": "application/json"
            }
        }).then(response => response.json());
    }

    requestHistory(userId, testId) {
        const url = this.URL + "users/" + userId + "/get_history/" + testId;
        return fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "params": this.PARAMS
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
    }

    vibrateNotification(type) {
        if (navigator.userAgent.indexOf("iPhone") !== -1) {
            bridge.send("VKWebAppTapticNotificationOccurred", {"type": type});
        } else if (this.ALLOW_VIBRATION) {
            switch (type) {
                case Vibration.SUCCESS:
                    window.navigator.vibrate([200, 50, 100])
                    break;
                case Vibration.ERROR:
                    window.navigator.vibrate([200, 50, 200])
                    break;
                default:
                    window.navigator.vibrate(200)
                    break;
            }
        }

    }

    vibrateSelectionChanged() {
        if (navigator.userAgent.indexOf("iPhone") !== -1) {
            bridge.send("VKWebAppTapticSelectionChanged", {});
        } else if (this.ALLOW_VIBRATION) {
            window.navigator.vibrate(100)
        }
    }

    vibrateImpact(type) {
        if (navigator.userAgent.indexOf("iPhone") !== -1) {
            bridge.send("VKWebAppTapticImpactOccurred", {"style": type});
        } else if (this.ALLOW_VIBRATION) {
            window.navigator.vibrate(400)

        }
    }

    requestUserById(id) {
        const url = this.URL + "users/" + id;
        return fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "params": this.PARAMS
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
                "Content-Type": "application/json",
                "params": this.PARAMS
            }
        }).then(response => response.json());

    }


    sendHistoryEvent(questionId, userId, eventCode) {
        const url = this.URL + "users/" + userId + "/send_event/" + questionId;

        return fetch(url, {
            method: "POST",
            body: eventCode,
            headers: {
                "Content-Type": "application/json",
                "params": this.PARAMS
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
                "Content-Type": "application/json",
                "params": this.PARAMS
            }
        }).then(response => response.json());
    }

    buySticker(userId, stickerId) {
        const url = this.URL + "users/" + userId + "/buy_sticker/" + stickerId;

        return fetch(url, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "params": this.PARAMS
            }
        }).then(response => response.json());
    }

    saveSticker(sticker) {
        let stickerFormData = new FormData();

        for (const [key, value] of Object.entries(sticker)) {
            stickerFormData.append(key, value);
        }

        const url = this.URL + "stickers/";
        return fetch(url, {
            method: "POST",
            body: stickerFormData,
            headers: {
                "params": this.PARAMS,
            }
        }).then(data => data.json());
    }

    deleteSticker(id) {
        const url = this.URL + "stickers/" + id;
        return fetch(url, {
            method: "DELETE",
            headers: {
                "params": this.PARAMS,
                "Content-Type": "application/json"
            }
        }).then(response => response.json());
    }

}

export default Api;
