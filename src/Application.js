import TestListService from "./testList/TestListService";
import ProfileService from "./profile/service/ProfileService";
import QuestionService from "./question/QuestionService";
import UserService from "./common/services/UserService";
import PreviewService from "./preview/PreviewService";
import TestRepo from "./common/testrepo/TestRepo";
import Api from "./common/api/Api";
import isUndefined from "./common/IsUndefined";
import StickerShopService from "./stickershop/StickerShopService";
import ResultService from "./result/ResultService";
import TestCreationService from "./testcreation/TestCreationService";
import TestEditHelper from "./common/services/TestEditHelper";
import TestTimer from "./common/services/TestTimer";

class Application {
    #testListService;
    #profileService;
    #stickerShopService;
    #questionService;
    #userService;
    #resultService;
    #user;
    #api;
    #previewService;
    #testRepo;
    #testCreationService;
    #testEditHelper;
    #testTimer;

    provideTestRepo() {
        if (isUndefined(this.#testRepo)) {
            this.#testRepo = new TestRepo();
        }

        return this.#testRepo;
    }

    provideTestListService() {
        if (isUndefined(this.#testListService)) {
            this.#testListService = new TestListService(this.provideApi(), this.provideUser(), this.provideTestRepo());
        }

        return this.#testListService;
    }

    provideApi() {
        if (isUndefined(this.#api)) {
            this.#api = new Api();
        }

        return this.#api;
    }

    provideProfileService() {
        if (isUndefined(this.#profileService)) {
            this.#profileService = new ProfileService(this.provideApi());
        }

        return this.#profileService;
    }

    provideStickerShopService() {
        if (isUndefined(this.#stickerShopService)) {
            this.#stickerShopService = new StickerShopService(this.provideApi());
        }

        return this.#stickerShopService;
    }

    providePreviewService() {
        if (isUndefined(this.#previewService)) {
            this.#previewService = new PreviewService(this.provideApi(), this.provideTestRepo());
        }

        return this.#previewService;
    }


    provideUser() {
        if (isUndefined(this.#user)) {
            this.#user = this.provideUserService().getUser();
        }
        return this.#user;
    }

    deleteUser() {
        this.#user = undefined;
    }

    provideUserService() {
        if (isUndefined(this.#userService)) {
            this.#userService = new UserService(this.provideApi());
        }

        return this.#userService;
    }

    provideQuestionService() {
        if (isUndefined(this.#questionService)) {
            this.#questionService = new QuestionService(this.provideApi(), this.provideTestRepo(), this.provideUser());
        }

        return this.#questionService;
    }

    provideResultService() {
        if (isUndefined(this.#resultService)) {
            this.#resultService = new ResultService(this.provideApi(), this.provideUser());
        }

        return this.#resultService;
    }

    provideTestCreationService() {
        if (isUndefined(this.#testCreationService)) {
            this.#testCreationService = new TestCreationService(this.provideApi());
        }

        return this.#testCreationService;
    }

    createTestEditHelper(test) {
        this.#testEditHelper = new TestEditHelper(this.provideApi(), test);
    }

    provideTestEditHelper() {
        return this.#testEditHelper;
    }

    deleteTestEditHelper() {
        this.#testEditHelper = undefined;
    }

    provideTestTimer(test, callback) {
        if (isUndefined(this.#testTimer)) {
            this.#testTimer = new TestTimer(test, callback, this.provideApi(), this.provideUser());
        }

        return this.#testTimer;
    }

    deleteTestTimer() {
        if (!isUndefined(this.#testTimer)) {
            this.#testTimer.clear();
            this.#testTimer = undefined;
        }
    }
}

export default Application;