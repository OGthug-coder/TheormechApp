
class ProfileService {
    constructor(api) {
        this.api = api;
    }

    getUser() {
        const userData = this.api.getVkProfile();
        userData.then()

        return userData;
    }
}

export default ProfileService;