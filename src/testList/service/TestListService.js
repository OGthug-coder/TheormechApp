class TestListService {
    constructor(api, user) {
        this.api = api;
        this.user = user;
    }

    getTests() {
        const testsDto = this.api.requestTests();
        let tests = [];
        testsDto.forEach(t => tests.push({
            id: t.id,
            title: t.title,
            img: t.pathToImage,
            date: t.creationDate,
            progress: this.getProgress(t.questions.length, t.id)
        }));

        return tests;
    }

    sort(list) {
        return list.sort(this.compare);
    }

    getProgress(length, id) {
        // let userTests = this.user.usersTests;
        // let activeQuestion = 0;
        // if (userTests.length !== 0) {
        //     // Check if user has started this test
        //     // if so, get the number of the question he stopped
        //     let test = userTests.filter(test => test.id === id);
        //     activeQuestion =
        //         test.length !== 0
        //         && test.question.length > 0
        //             ? test.question.serialNumber
        //             : 0;
        // }
        //
        // const percent = activeQuestion / length;
        // if (percent === 0) {
        //     return 0;
        // } else if (percent === 1) {
        //     return 3;
        // } else if (percent > 0.6) {
        //     return 2;
        // } else if (percent > 0) {
        //     return 1;
        // }
        return 0;
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