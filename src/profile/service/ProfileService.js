
class ProfileService {
    constructor(api) {
        this.api = api;
    }

    getUser() {
        const userData = this.api.getVkProfile();
        return userData;
    }

    subscribe() {
        this.api.subscribeToGroup();
    }
}

export default ProfileService;