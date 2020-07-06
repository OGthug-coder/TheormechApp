import TestListService from "./testList/service/TestListService";
import Api from "./api/Api";
import ProfileService from "./profile/service/ProfileService";
import PreviewService from "./preview/service/PreviewService";
import TestRepo from "./testrepo/TestRepo";

class Application {
    #testListService;
    #profileService;
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
            this.#user = this.provideApi().getVkProfile()
                .then(vk_profile => vk_profile.id)
                .then(id => {
                    let user = this.provideApi().requestUserById(id);
                    return user;
                });
        }

        return this.#user;
    }


}

export default Application;