import TestListService from "./testList/service/TestListService";
import Api from "./api/Api";

class Application {
    constructor() {
        this.testListService = null;
        this.api = null;
    }

    provideTestListService() {
        if (this.testListService === null) {
            this.testListService = new TestListService(this.provideApi());
        }

        return this.testListService;
    }

    provideApi() {
        if (this.api === null) {
            this.api = new Api();
        }

        return this.api;
    }
}

export default Application;