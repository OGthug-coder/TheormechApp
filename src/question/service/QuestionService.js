import EventCodeDto from "../../preview/service/EventCodeDto";

class QuestionService {
    constructor(api, repo, user) {
        this.api = api;
        this.testRepo = repo;
        this.user = user;
    }

    getTest(id) {
        let test = this.testRepo.get(id);
        if (test === undefined) {
            test = this.api.requestTest(id);
            this.testRepo.push(id, test);
        }

        return test;
    }

    startQuestion(questionId) {
        this.user.then(user => this.api.sendHistoryEvent(questionId, user.id, EventCodeDto.STARTED));
    }

    failQuestion(questionId) {
        this.user.then(user => this.api.sendHistoryEvent(questionId, user.id, EventCodeDto.FAILED));
    }

    passQuestion(questionId) {
        this.user.then(user => this.api.sendHistoryEvent(questionId, user.id, EventCodeDto.PASSED));
    }

    skipQuestion(questionId) {
        this.user.then(user => this.api.sendHistoryEvent(questionId, user.id, EventCodeDto.SKIPPED));

    }

}

export default QuestionService;