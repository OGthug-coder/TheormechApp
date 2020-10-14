import QuestionStatus from "./util/QuestionStatus";
import EventCodeDto from "./util/EventCodeDto";
import HistoryUtil from "../common/services/HistoryUtil";

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
        } else {
            test = new Promise((resolve, err) => resolve(test));
        }

        return test;
    }

    getHistory(testId, userPromise) {
        return userPromise.then(user => this.api.requestHistory(user.id, testId))
    }

    getLastQuestion(history) {
        return HistoryUtil.getLastQuestion(history);
    }

    getStatus(lastQuestion, questions) {
       return HistoryUtil.getStatus(lastQuestion, questions);
    }

    prepareQuestions(questions, history) {
        if (questions !== undefined && history !== undefined) {
            if (history.length === 0) {
                return questions.map(question => {
                    question.status = QuestionStatus.UNTOUCHED;
                    return question;
                });
            } else {
                return questions.map(question => {
                    let historyEvents = history.filter(historyEvent => historyEvent.question.id === question.id);

                    if (historyEvents.length > 0) {
                        historyEvents.sort((e1, e2) => HistoryUtil.compare(e1.date, e2.date));

                        let status;
                        switch (historyEvents[0].eventCode) {
                            case EventCodeDto.STARTED:
                                status = QuestionStatus.STARTED;
                                break;
                            case EventCodeDto.FAILED:
                                status = QuestionStatus.FAILED;
                                break;
                            case EventCodeDto.PASSED:
                                status = QuestionStatus.PASSED;
                                break;
                            case EventCodeDto.SKIPPED:
                                status = QuestionStatus.SKIPPED;
                                break;
                            default:
                                status = undefined;
                                break;
                        }
                        question.status = status;
                        return question;
                    } else {
                        question.status = QuestionStatus.UNTOUCHED;
                        return question;
                    }
                })
            }
        }
    }

    getCurrentScore(history) {
        return HistoryUtil.getCurrentScore(history);
    }
}

export default PreviewService;