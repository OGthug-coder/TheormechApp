import NoHistoryFoundException from "../../common/exceptions/NoHistoryFoundException";
import EventCodeDto from "../../preview/util/EventCodeDto";

class TestListService {
    constructor(api, user, testRepo) {
        this.api = api;
        this.user = user;
        this.testRepo = testRepo;

        this.setLightStatusBarStyle();
    }

    setLightStatusBarStyle() {
        this.api.setStatusBarStyle("light");
    }

    getTests() {
        const tests = this.api.requestTests().then(testsDto => {
            return this.user.then(user => {
                let tests = [];

                testsDto.map(t => {
                    tests.push({
                        id: t.id,
                        title: t.title,
                        img: t.img,
                        date: t.date,
                        progress: this.getProgress(t.questions, t.id, user.id)
                    })
                    return t;
                });
                return tests;
            });
        });
        // Adding tests to the repo
        tests.then(tests => tests.map(test => this.testRepo.push(test)))
        return tests;
    }

    sort(list) {
        return list.sort(this.compare);
    }

    getProgress(questions, testId, userId) {
        try {
            return this.api.requestHistory(userId, testId)
                .then(data => {
                    if (data.length > 0) {
                        const filtered = data.filter(e => e.eventCode !== EventCodeDto.STARTED);
                        if (filtered.length === 0) {
                            return 0;
                        }

                        const activeQuestion = filtered.reduce((prev, curr) => prev.question.serialNumber > curr.question.serialNumber ? prev : curr)
                            .question.serialNumber + 1;
                        const max = questions.reduce((prev, curr) => prev.serialNumber > curr.serialNumber ? prev : curr)
                            .serialNumber + 1;
                        const percent = activeQuestion / max;

                        if (percent === 0) {
                            return 0;
                        } else if (percent === 1) {
                            return 3;
                        } else if (percent > 0.6) {
                            return 2;
                        } else if (percent > 0) {
                            return 1;
                        }
                    } else {
                        return 0
                    }
                });
        } catch (e) {
            if (e instanceof NoHistoryFoundException) {
                return 0;
            }
        }
    }

    compare(o1, o2) {
        // replace day and month
        let date2 = o2.props['date'].split('-')
        date2 = date2[1] + '-' + date2[0] + '-' + date2[2]
        // replace day and month
        let date1 = o1.props['date'].split('-')
        date1 = date1[1] + '-' + date1[0] + '-' + date1[2]
        return new Date(date2) - new Date(date1);
    }
}

export default TestListService;