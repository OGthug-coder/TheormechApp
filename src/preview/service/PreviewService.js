import TestStatus from "./TestStatus";

class PreviewService {
    constructor(api, repo) {
        this.api = api;
        this.testRepo = repo;
    }

    getTest(id) {
        let test = this.testRepo.get(id);
        if (test === undefined) {
            test = this.api.requestTest(id);
            this.testRepo.push(id, test);
        }

        return test;
    }

    getHistory(testId, userPromise) {
        return userPromise.then(user => this.api.requestHistory(user.id, testId))
    }

    getLastQuestion(history) {
        if (history.length === 0) {
            return -1;
        } else {
        //    TODO: implement me
        }
    }

    getStatus(lastQuestion, maxScore) {
        if (lastQuestion !== undefined && maxScore !== undefined) {
            if (lastQuestion < 0) {
                return TestStatus.UNTOUCHED;
            } else if (lastQuestion >= 0
                && lastQuestion < maxScore) {
                return TestStatus.NOT_FINISHED;
            } else {
                return TestStatus.FINISHED;
            }
        } else {
            return TestStatus.UNTOUCHED;
        }

    }

}

export default PreviewService;