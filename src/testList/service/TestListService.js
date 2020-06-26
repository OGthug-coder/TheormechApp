class TestListService {
    constructor(api) {
        this.api = api;
    }

    getTests() {
        const testsDto = this.api.requestTests();
        let tests = [];
        testsDto.forEach((t) => tests.push({
            title: t.title,
            //TODO: do image loading
            img: null,
            date: t.creationDate,
            //TODO: return length of test from API
            progress: 1
        }));
        return tests;
    }
}

export default TestListService;