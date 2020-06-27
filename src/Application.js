import TestListService from "./testList/service/TestListService";
import Api from "./api/Api";

class Application {
    #testListService;
    #api;

    provideTestListService() {
        if (this.#testListService == null) {
            this.#testListService = new TestListService(this.provideApi());
        }

        return this.#testListService;
    }

    provideApi() {
        if (this.#api == null) {
            this.#api = new Api();
        }

        return this.#api;
    }
}

export default Application;