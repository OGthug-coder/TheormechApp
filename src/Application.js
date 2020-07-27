import TestListService from "./testList/service/TestListService";
import Api from "./common/api/Api";
import ProfileService from "./profile/service/ProfileService";
import QuestionService from "./question/service/QuestionService";
import NoUserFoundException from "./common/exceptions/NoUserFoundException";
import UserService from "./common/services/UserService";

class Application {
    #testListService;
    #profileService;
    #questionService;
    #userService;
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
            this.#user = this.provideUserService().getUser();
        }

        return this.#user;
    }

    provideUserService() {
        if (this.#userService === undefined) {
            this.#userService = new UserService(this.provideApi());
        }

        return this.#userService;
    }

    provideQuestionService() {
        if (this.#questionService == null) {
            this.#questionService = new QuestionService(this.provideApi());
        }

        return this.#questionService;
    }


}

export default Application;