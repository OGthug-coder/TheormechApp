import TestListService from "./testList/service/TestListService";
import Api from "./api/Api";
import ProfileService from "./profile/service/ProfileService";

class Application {
    #testListService;
    #profileService;
    #user;
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

    provideProfileService() {
        if (this.#profileService == null) {
            this.#profileService = new ProfileService(this.provideApi());
        }

        return this.#profileService;
    }

    provideUser() {
        if (this.#user == null) {
            this.#user = this.provideApi().getVkProfile();
        }

        return this.#user;
    }



}

export default Application;