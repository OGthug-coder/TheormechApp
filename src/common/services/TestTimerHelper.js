import EventCodeDto from "../../preview/util/EventCodeDto";
import {NO_TIMER, NOT_STARTED} from "./Timer";
import {toDefaultFormat} from "../convertDate";

export default class TestTimerHelper {
    /**
     * Only one instance in the application. Delete this when exiting Preview or Question.
     *
     * @param test
     * @param callback - function runs when time is up
     * @param api
     * @param userPromise
     */
    constructor(test, callback, api, userPromise) {
        this.test = test;
        this.callback = callback;
        this.api = api;
        this.userPromise = userPromise;

        if (this.test.timeToComplete === null
            || this.test.timeToComplete === "null") {
            this.startEventTimer = Promise.resolve(NO_TIMER);
        } else {
            this.getStartEventTime();
        }
    }

    getStartEventTime = () => {
        this.startEventTimer = this.userPromise.then(user => {
            return this.api.requestHistory(user.id, this.test.id)
                .then(history => {
                    const historyEvent = history.filter(event => event.question.serialNumber === 0
                        && event.eventCode === EventCodeDto.STARTED);

                    this.lastEvent = this.getLastEvent(history);
                    this.history = history;
                    this.user = user;

                    if (historyEvent.length === 1) {
                        return historyEvent[0].date;
                    } else {
                        return NOT_STARTED;
                    }
                });
        });
    };

    subscribe = (callback) => {
        const timePromise = this.api.requestTime();
        return this.startEventTimer.then(startTime => {
            if (startTime === NO_TIMER) {
                return NO_TIMER;
            } else if (startTime === NOT_STARTED) {
                callback(this.test.timeToComplete);
            } else {
                return timePromise.then(currentTimeMillis => {
                    let remain = new Date(currentTimeMillis) - toDefaultFormat(startTime);
                    // Getting seconds
                    let [minutes, seconds] = this.test.timeToComplete.split(":");

                    minutes = parseInt(minutes);
                    seconds = parseInt(seconds);

                    let delay = (minutes * 60 + seconds) * 1000 - remain;
                    return this.processDelay(delay, callback);
                })
            }
        });
    };

    processDelay = (delay, callback) => {
        // if a deadline is already missed
        if (delay > 0) {

            delay = Math.round(delay / 1000);
            let minutes = Math.floor(delay / 60);
            let seconds = delay % 60;

            callback(`${minutes}:${seconds}`);

            const interval = setInterval(() => {
                seconds--;
                if (seconds < 0) {
                    seconds = 59;
                    minutes--;
                }
                // time is up
                if (minutes < 0) {
                    this.finishTest();
                    clearInterval(interval);
                } else {
                    callback(`${minutes}:${seconds}`);
                }

            }, 1000);
            this.subscription = interval;

            return interval;
        } else {
            this.finishTest();
        }
    };

    finishTest = () => {
        let isFinished = false;
        if (this.lastEvent.length > 0) {
            isFinished = this.lastEvent
                .filter(event => event.eventCode !== EventCodeDto.STARTED)
                .length > 0;
        }

        if (!isFinished) {
            let lastEventNumber = -1;

            let lastEvent = this.history
                .reduce((acc, event) => acc.question.serialNumber > event.question.serialNumber ? acc : event);
            if (lastEvent.eventCode !== EventCodeDto.STARTED) {
                lastEventNumber = lastEvent.question.serialNumber;
            } else {
                lastEventNumber = lastEvent.question.serialNumber;
                // Test progress stopped on unanswered question
                // skip it before others
                // this.api.sendHistoryEvent(lastEvent.question.id, this.user.id, EventCodeDto.SKIPPED);
            }

            // Skip all other questions
            // this.test.questions
            //     .forEach(q => {
            //         if (q.serialNumber > lastEventNumber) {
            //             this.api.sendHistoryEvent(q.id, this.user.id, EventCodeDto.SKIPPED);
            //             lastEventNumber++;
            //         }
            //     });

            const lastQuestion = this.test.questions
                .reduce((acc, q) => acc.serialNumber >= q.serialNumber ? acc : q);

            this.api.sendHistoryEvent(lastQuestion.id, this.user.id, EventCodeDto.SKIPPED);
            this.callback();
        }
    };

    getLastEvent = (history) => {
        const maxSerialNumber = this.test.questions
            .reduce((acc, q) => acc.serialNumber > q.serialNumber ? acc : q)
            .serialNumber;

        return history.filter(event => event.question.serialNumber === maxSerialNumber);
    };

    clear = () => {
        clearInterval(this.subscription)
    };
}

