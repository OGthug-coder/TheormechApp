import TestListService from "./testList/service/TestListService";
import Api from "./api/Api";
import ProfileService from "./profile/service/ProfileService";
import QuestionService from "./question/service/QuestionService";
import NoUserFoundException from "./exceptions/NoUserFoundException";

class Application {
    #testListService;
    #profileService;
    #questionService;
    #user;
    #api;

    provideTestListService() {
        if (this.#testListService == null) {
            this.#testListService = new TestListService(this.provideApi(), this.provideUser());
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
        if (this.#user === undefined) {
            this.#user = this.provideApi().getVkProfile()
                .then(vk_profile => vk_profile.id)
                .then(id => {
                    let user = this.provideApi().requestUserById(id);
                    return user;
                });
        }

        return this.#user;
    }

    provideQuestionService() {
        if (this.#questionService == null) {
            this.#questionService = new QuestionService(this.provideApi());
        }

        return this.#questionService;
    }


}

export default Application;