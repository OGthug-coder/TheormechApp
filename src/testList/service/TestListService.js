class TestListService {
    constructor(api) {
        this.api = api;
    }

    getTests() {
        const testsDto = this.api.requestTests();
        let tests = [];
        testsDto.forEach(t => tests.push({
            title: t.title,
            img: t.pathToImage,
            date: t.creationDate,
            progress: this.getProgress(t.active_question, t.length)
        }));

        return tests;
    }


     getProgress(activeQuestion, totalNumber) {
        const percent = activeQuestion / totalNumber;
        if (percent === 0) {
            return 0;
        } else if (percent === 1) {
            return 3;
        } else if (percent > 0.6) {
            return 2;
        } else if (percent > 0) {
            return 1;
        }

    }
}

export default TestListService;