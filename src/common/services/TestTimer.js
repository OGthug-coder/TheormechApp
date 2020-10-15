import EventCodeDto from "../../preview/util/EventCodeDto";

const NO_TIMER = 'NO_TIMER';

export default class TestTimer {
    constructor(test, callback, api, userPromise) {
        this.test = test;
        this.callback = callback;
        this.api = api;
        this.userPromise = userPromise;
        this.subscription = [];

        if (this.test.timeToComplete === null
            || this.test.timeToComplete === "null") {
            this.startEventTimer = NO_TIMER;
        } else {
            this.getStartEventTime();
        }
    }

    getStartEventTime = () => {
        this.userPromise.then(user => {
            this.api.requestHistory(user.id, this.test.id)
                .then(history => {
                    const historyEvent = history.filter(event => event.question.serialNumber === 0
                        && event.eventCode === EventCodeDto.STARTED);
                    this.startEventTimer = historyEvent.date;
                });
        });
    };

    subscribe = (callback) => {
        if (this.startEventTimer === NO_TIMER) {
            return null;
        }

        let timer = 0;
        const interval = setInterval(() => {
            timer++;
            callback('10:' + timer);
        },1000);
        this.subscription.push(interval);

        return interval;
    };

    unsubscribe = (sub) => {
        clearInterval(sub);
    };

    clear = () => {
        clearInterval(this.subscription);
    };
}