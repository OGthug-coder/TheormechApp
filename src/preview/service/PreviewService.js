import TestStatus from "./TestStatus";
import QuestionStatus from "./QuestionStatus";
import EventCodeDto from "./EventCodeDto";

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
            const sortedHistory = history.filter(e => e.eventCode !== EventCodeDto.STARTED);
            if (sortedHistory.length > 0) {
                return sortedHistory
                    .reduce((prev, current) => current.question.serialNumber > prev.question.serialNumber ? current : prev)
                    .question
                    .serialNumber;
            } else {
                return -1;
            }
        }
    }

    getStatus(lastQuestion, questions) {
        if (lastQuestion !== undefined && questions !== undefined && questions.length > 0) {
            const max = questions.reduce((prev, current) => prev.serialNumber > current.serialNumber ? prev : current).serialNumber;

            if (lastQuestion < 0) {
                return TestStatus.UNTOUCHED;
            } else if (lastQuestion >= 0
                && lastQuestion < max) {
                return TestStatus.NOT_FINISHED;
            } else {
                return TestStatus.FINISHED;
            }
        } else {
            return TestStatus.UNTOUCHED;
        }

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
                        historyEvents.sort((e1, e2) => this.compare(e1.date, e2.date));

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

export default PreviewService;