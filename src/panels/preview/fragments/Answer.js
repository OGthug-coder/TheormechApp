import React from 'react';

import s from "./Answer.module.css";
import isUndefined from "../../../common/IsUndefined";
import RightAnswerCode from "../../../preview/util/RightAnswerCode";

class Answer extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            question: props.question,
            onClick: props.onClick,
        };
    }

    getRightAnswer = () => {
        if (!isUndefined(this.state.question)) {
            return this.state.question.answers.find(answer => answer.isRight === RightAnswerCode.RIGHT_ANSWER).answer;
        }

    }

    render() {
        const question = this.state.question;
        return (
            <div className={s.answer_block}>
                <div className={s.head}>
                    <div className={s.question_label}>
                        <img src={require("../../../img/answer/question.png")}
                             width="24"
                             height="24"
                             alt={"question mark"}/>
                    </div>
                    <button className={s.exit} onClick={this.state.onClick} />
                </div>
                <div className={s.question}>{!isUndefined(question) ? question.questionText : ""}</div>
                <div className={s.ans_title}>Правильный ответ:</div>
                <div className={s.ans}>{this.getRightAnswer()}</div>
                <div className={s.explanation_title}>Почему?</div>
                <div className={s.explanation}>{!isUndefined(question) ? question.explain : ""}</div>
            </div>
        )
    }
}

export default Answer;
