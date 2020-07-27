import NoUserFoundException from "../exceptions/NoUserFoundException";

class UserService {
    constructor(api) {
        this.api = api;
    }

    getUser() {
        return this.api.getVkProfile()
            .then(vkProfile => vkProfile)
            .then(vkProfile => {
                return this.api.requestUserById(vkProfile.id)
                    .then(user => {
                        return this.mergeUsers(vkProfile, user)
                    })
                    .catch(e => {
                        if (e instanceof NoUserFoundException) {
                            let user = this.uploadUser(vkProfile);
                            return this.mergeUsers(vkProfile, user);
                        }
                    })

            });
    }

    uploadUser(vkUser) {
        const user = {
            id: vkUser.id,
            score: 0,
            bdate: vkUser.bdate !== undefined ? vkUser.bdate : null,
            role: "user"
        };
        this.api.addUser(user);
        return user;
    }

    mergeUsers(vkUser, user) {
        user.photo_200 = vkUser.photo_200;
        user.first_name = vkUser.first_name;
        user.last_name = vkUser.last_name;
        return user;
    }

}

export default UserService;