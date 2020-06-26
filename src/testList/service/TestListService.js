class TestListService {
    constructor(api) {
        this.api = api;
    }

    getTests() {
        return this.api.requestTests();
    }
}

export default TestListService;