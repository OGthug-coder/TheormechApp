import QuestionStatus from "../preview/util/QuestionStatus";

const getNextQuestionUrl = (test, lastQuestion) => {

    const currentQuestion = lastQuestion + 1;
    const questions = test.questions;
    const questionList = questions.filter(q => q.serialNumber === currentQuestion);


    if (questionList.length > 0) {
        const started = questionList.filter(q => q.status === QuestionStatus.STARTED);

        if (started.length > 0) {
            return "/question/" + test.id + "/" + questionList[0].id;
        } else {
            const question = questionList[Math.floor(Math.random() * questionList.length)];
            return "/question/" + test.id + "/" + question.id;
        }
    }

    return undefined;
};

export default getNextQuestionUrl;