import isUndefined from "../common/IsUndefined";

class ResultService {
    constructor(api, user) {
        this.api = api;
        this.user = user;
    }

    getData(testId) {
        if (!isUndefined(testId)) {
            return this.user.then(user => {
                const testPromise = this.api.requestTest(testId);
                const historyPromise = this.api.requestHistory(user.id, testId);
                let data = {};
                return Promise.all([testPromise, historyPromise]).then(([test, history]) => {
                    const score = this.getCurrentScore(history);
                    data = {
                        current: score,
                        max: test.maxScore,
                        percent: Math.round(score / test.maxScore * 100)
                    };
                    return data;
                });
            });
        }

    }

    getCurrentScore(history) {
        const sortedHistory = history.sort((e1, e2) => this.compare(e1.date, e2.date));
        if (sortedHistory.length > 0) {
            return sortedHistory[0].score;
        } else {
            return 0;
        }
    }

    compare = (o1, o2) => {
        let date = o2.split(" ");
        let [day, month, year] = date[0].split("-");
        let [hour, minute, second] = date[1].split(":");
        const dateTime2 = new Date(year, month - 1, day, hour, minute, second);

        date = o1.split(" ");
        [day, month, year] = date[0].split("-");
        [hour, minute, second] = date[1].split(":");
        const dateTime1 = new Date(year, month - 1, day, hour, minute, second);

        return dateTime2 - dateTime1;
    };
}

export default ResultService;