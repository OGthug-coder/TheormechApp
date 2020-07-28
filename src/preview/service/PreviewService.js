import PreviewUtil from "./TestStatus";
import QuestionStatus from "./QuestionStatus";

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
            return history
                .reduce((prev, current) => current.serialNumber > prev.serialNumber ? current : prev)
                .serialNumber;
        }
    }

    getStatus(lastQuestion, maxScore) {
        if (lastQuestion !== undefined && maxScore !== undefined) {
            if (lastQuestion < 0) {
                return PreviewUtil.UNTOUCHED;
            } else if (lastQuestion >= 0
                && lastQuestion < maxScore) {
                return PreviewUtil.NOT_FINISHED;
            } else {
                return PreviewUtil.FINISHED;
            }
        } else {
            return PreviewUtil.UNTOUCHED;
        }

    }

    prepareQuestions(questions, history) {
        if (questions !== undefined && history !== undefined) {
            if (history.length === 0) {
                return questions.map(question => {
                    question.status = QuestionStatus.UNTOUCHED
                    return question;
                });
            } else {
                //    TODO: implement me
            }
        }
    }

}

export default PreviewService;