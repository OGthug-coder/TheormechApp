import NoUserFoundException from "../exceptions/NoUserFoundException";

class UserService {
    constructor(api) {
        this.api = api;
    }

    getUser() {
        this.api().getVkProfile()
            .then(vkProfile => vkProfile)
            .then(vkProfile => {
                try {
                    let user = this.provideApi().requestUserById(vkProfile.id);
                    return this.mergeUsers(vkProfile, user);
                } catch (e) {
                    if (typeof e === NoUserFoundException) {
                        let user = this.uploadUser(vkProfile);
                        return this.mergeUsers(vkProfile, user);

                    }
                }

            });
    }

    uploadUser(vkUser) {
        const user = {
            id: vkUser.id,
            score: 0,
            bdate: vkUser
        }
    }

    mergeUsers(vkUser, user) {

    }

}

export default UserService;