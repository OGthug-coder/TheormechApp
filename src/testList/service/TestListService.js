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
            progress: 1
        }));
        return tests;
    }

}

export default TestListService;