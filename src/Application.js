import TestListService from "./testList/service/TestListService";
import ProfileService from "./profile/service/ProfileService";
import QuestionService from "./question/service/QuestionService";
import UserService from "./common/services/UserService";
import PreviewService from "./preview/service/PreviewService";
import TestRepo from "./common/testrepo/TestRepo";
import Api from "./common/api/Api";

class Application {
    #testListService;
    #profileService;
    #questionService;
    #userService;
    #user;
    #api;
    #previewService;
    #testRepo;

    provideTestRepo() {
        if (this.#testRepo === undefined) {
            this.#testRepo = new TestRepo();
        }

        return this.#testRepo;
    }

    provideTestListService() {
        if (this.#testListService === undefined) {
            this.#testListService = new TestListService(this.provideApi(), this.provideUser(), this.provideTestRepo());
        }

        return this.#testListService;
    }

    provideApi() {
        if (this.#api === undefined) {
            this.#api = new Api();
        }

        return this.#api;
    }

    provideProfileService() {
        if (this.#profileService === undefined) {
            this.#profileService = new ProfileService(this.provideApi());
        }

        return this.#profileService;
    }

    providePreviewService() {
        if (this.#previewService === undefined) {
            this.#previewService = new PreviewService(this.provideApi(), this.provideTestRepo());
        }

        return this.#previewService;
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