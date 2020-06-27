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

    sort(list) {
        return list.sort(this.compare);
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