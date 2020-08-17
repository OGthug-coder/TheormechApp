import EventCodeDto from "../../preview/util/EventCodeDto";
import HistoryUtil from "../../common/services/HistoryUtil";
import TestStatus from "../../preview/util/TestStatus";

class QuestionService {
    constructor(api, repo, user) {
        this.api = api;
        this.testRepo = repo;
        this.user = user;
    }

    getHistory(testId) {
        return this.user.then(user => this.api.requestHistory(user.id, testId));
    }

    getTest(id) {
        let test = this.testRepo.get(id);
        if (test === undefined) {
            test = this.api.requestTest(id);
            this.testRepo.push(id, test);
        }

        return test;
    }

    isFinished(history, questions) {
        const lastQuestion = HistoryUtil.getLastQuestion(history);
        return HistoryUtil.getStatus(lastQuestion, questions) === TestStatus.FINISHED;
    }

    startQuestion(questionId) {
        return this.user.then(user => this.api.sendHistoryEvent(questionId, user.id, EventCodeDto.STARTED));
    }

    failQuestion(questionId) {
        return this.user.then(user => this.api.sendHistoryEvent(questionId, user.id, EventCodeDto.FAILED));
    }

    passQuestion(questionId) {
        return this.user.then(user => this.api.sendHistoryEvent(questionId, user.id, EventCodeDto.PASSED));
    }

    skipQuestion(questionId) {
        return this.user.then(user => this.api.sendHistoryEvent(questionId, user.id, EventCodeDto.SKIPPED));
    }

}

export default QuestionService;