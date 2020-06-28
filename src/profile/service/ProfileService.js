
class ProfileService {
    constructor(api) {
        this.api = api;
    }

    getUser() {
        const userData = this.api.getVkProfile();
        return userData;
    }
}

export default ProfileService;