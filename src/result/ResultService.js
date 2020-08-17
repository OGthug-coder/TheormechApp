import isUndefined from "../common/IsUndefined";
import HistoryUtil from "../common/services/HistoryUtil";

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
                    const score = HistoryUtil.getCurrentScore(history);
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


}

export default ResultService;