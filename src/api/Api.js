import bridge from '@vkontakte/vk-bridge';

class Api {

    requestTests() {
        return [
            {
                "id": 5,
                "pathToImage": "https://media.gettyimages.com/photos/abstract-network-background-picture-id836272842?s=612x612",
                "title": "Как приручить интеграл Римана?",
                "description": "descidghd",
                "questions": [
                    {
                        "id": 3,
                        "questionText": "nothing",
                        "pathToImage": "None",
                        "answers": [],
                        "serialNumber": 0
                    }
                ],
                "creationDate": "01-10-2020 00:01:01",
            },
            {
                "id": 4,
                "pathToImage": "https://media.gettyimages.com/photos/technology-abstract-picture-id1148091793?s=612x612",
                "title": "Как приручить интеграл Римана? (новое)",
                "description": "https://image.freepik.com/free-photo/3d-low-poly-abstract-background_1048-9819.jpg",
                "questions": [
                    {
                        "id": 3,
                        "questionText": "nothing",
                        "pathToImage": "None",
                        "answers": [],
                        "serialNumber": 0
                    }
                ],
                "creationDate": "01-12-2020 00:01:01",
            },
            {
                "id": 6,
                "pathToImage": "https://image.freepik.com/free-photo/3d-low-poly-abstract-background_1048-9819.jpg",
                "title": "Знаешь механику?",
                "description": "new_test",
                "questions": [
                    {
                        "id": 4,
                        "questionText": "nothing",
                        "pathToImage": "None",
                        "answers": [],
                        "serialNumber": 0
                    }
                ],
                "creationDate": "02-10-2020 00:02:01",
            },
            {
                "id": 7,
                "pathToImage": "https://image.freepik.com/free-photo/3d-low-poly-abstract-background_1048-9819.jpg",
                "title": "Бор или как создать свой институт",
                "description": "new_test",
                "questions": [
                    {
                        "id": 5,
                        "questionText": "nothing",
                        "pathToImage": "None",
                        "answers": [],
                        "serialNumber": 0
                    }
                ],
                "creationDate": "03-10-2020 00:03:01",
            },
            {
                "id": 8,
                "pathToImage": "https://media.gettyimages.com/photos/abstract-network-background-picture-id836272842?s=612x612",
                "title": "Бор или как создать свой институт (new)",
                "description": "new_test",
                "questions": [
                    {
                        "id": 5,
                        "questionText": "nothing",
                        "pathToImage": "None",
                        "answers": [],
                        "serialNumber": 0
                    }
                ],
                "creationDate": "02-10-2020 00:03:01",
            }
        ]
    }

    getVkProfile() {
        let userDto = bridge.send('VKWebAppGetUserInfo')
            .catch(e => console.log(e));
        const response = {
            bdate: "1.10",
            city: {
                id: 0,
                title: ""
            },
            country: {
                id: 0,
                title: ""
            },
            first_name: "Artyom",
            id: 137239419,
            last_name: "Bakuta",
            photo_100: "https://sun9-12.userapi.com/c857424/v857424321/c3b3d/_n0Y7-aYtwE.jpg?ava=1",
            photo_200: "https://sun9-61.userapi.com/c857424/v857424321/c3b3c/QmbUxDlOVmo.jpg?ava=1",
            photo_max_orig: "https://sun9-34.userapi.com/impf/c857424/v857424321/c3b3a/A-gC15Mizx8.jpg?size=0x0&quality=90&sign=9957305916153e2803f0bb9902588389&ava=1",
            sex: 2,
            timezone: 3,
        };

        return userDto;
    }

    requestUserById(id) {
        const response = [
            {
                "id": 137239419,
                "score": 1,
                "school": null,
                "age": 0,
                "usersTests": [
                    {
                        "id": 1,
                        "test": {
                            "id": 5,
                            "pathToImage": null,
                            "title": "title",
                            "description": "descidghd",
                            "questions": [
                                {
                                    "id": 3,
                                    "questionText": "nothing",
                                    "pathToImage": "None",
                                    "answers": [],
                                    "serialNumber": 0
                                }
                            ],
                            "creationDate": "01-10-2000 00:00:01"
                        },
                        "question": {
                            "id": 3,
                            "questionText": "nothing",
                            "pathToImage": "None",
                            "answers": [],
                            "serialNumber": 0
                        },
                        "start_time": "20-04-2020 01:09:12"
                    }
                ]
            }
        ];
        return new Promise(() => response);
    }
}

export default Api;