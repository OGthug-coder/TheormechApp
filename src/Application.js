import TestListService from "./testList/service/TestListService";
import ProfileService from "./profile/service/ProfileService";
import QuestionService from "./question/service/QuestionService";
import UserService from "./common/services/UserService";
import PreviewService from "./preview/service/PreviewService";
import TestRepo from "./common/testrepo/TestRepo";
import Api from "./common/api/Api";
import isUndefined from "./common/IsUndefined";
import StickerShopService from "./stickershop/StickerShopService";

class Application {
    #testListService;
    #profileService;
    #stickerShopService;
    #questionService;
    #userService;
    #user;
    #api;
    #previewService;
    #testRepo;

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
        if (!isUndefined(this.#stickerShopService)) {
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


}

export default Application;