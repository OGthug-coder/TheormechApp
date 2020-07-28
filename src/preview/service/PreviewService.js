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

}

export default PreviewService;