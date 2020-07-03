class QuestionService {
    constructor(api) {
        this.api = api;
    }

    getQuestion() {
        const question = this.api.requestQuestion()
        return question;
    }

}

export default QuestionService;