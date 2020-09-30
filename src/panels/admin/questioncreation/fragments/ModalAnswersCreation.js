import React from 'react';
import s from "./ModalAnswersCreation.module.css";
import ModalWindow from "../../../../common/components/modalwindow/ModalWindow";
import Input from "../../../../common/components/input/Input";
import BackButton from "../../../../common/components/backbutton/BackButton";
import isUndefined from "../../../../common/IsUndefined";
import RightAnswerCode from "../../../../preview/util/RightAnswerCode";


class ModalAnswersCreation extends React.Component {
    constructor(props) {
        super(props);

        this.prepareAnswers(props.question);

        this.state = {
            title: "",
            question: props.question,
            rightAnswer: !isUndefined(props.question.answers)
                ? props.question.answers.filter(a => a.isRight === RightAnswerCode.RIGHT_ANSWER)[0].serialNumber
                : 0,
        };
    }

    prepareAnswers = (question) => {
        if (!isUndefined(question.answers)) {
            let counter = 0;
            question.answers.map(a => {
                a.serialNumber = counter++;
            });
        }
    };

    onQuestionTextChange = (value) => {

    };

    onAnswerTextChange = (value, id) => {

    };

    onExplainTextChange = (value) => {

    };

    onSaveClick = () => {

    };

    renderAnswers = () => {
        if (!isUndefined(this.state.question.answers)) {
            return this.state.question.answers
                .sort((a1, a2) => a1.serialNumber - a2.serialNumber)
                .map(answer => (
                    <div className={s.input}>
                        <Input id={answer.id}
                               autoResize
                               placeholder={answer.answer}
                               rows={1}
                               maxLength={80}
                               onChange={this.onAnswerTextChange}/>
                    </div>
                ));
        } else {
            return [0, 1, 2, 3].map(id => (
                <div className={s.input}>
                    <Input id={id}
                           rows={1}
                           placeholder={""}
                           maxLength={80}
                           onChange={this.onAnswerTextChange}/>
                </div>
            ));
        }
    };

    render() {
        const question = this.state.question;

        return (
            <div className={s.container}>
                <div className={s.sticky_container}>
                    <div className={`${s.back_button}`}>
                        <BackButton disabled onClick={this.props.onBackClick}/>
                    </div>
                </div>
                <ModalWindow>
                    <div className={s.content}>
                        <div className={s.input_title}>
                            Вопрос
                        </div>
                        <div className={s.input}>
                            <Input placeholder={!isUndefined(question.questionText) ? question.questionText : ""}
                                   maxLength={135}
                                   onChange={this.onQuestionTextChange}/>
                        </div>
                        <div className={s.input_title}>
                            Варианты ответов
                        </div>

                        {this.renderAnswers()}

                        <div className={s.right_answer_choice}>
                            <div>
                                Верный ответ
                            </div>
                            <div className={s.select}>
                                <select name="time" value={this.state.rightAnswer} onChange={this.onTestTimeChange}>
                                    <option value="0">1</option>
                                    <option value="1">2</option>
                                    <option value="2">3</option>
                                    <option value="3">4</option>
                                </select>
                            </div>
                        </div>
                        <div className={s.input_title}>
                            Объяснение
                        </div>
                        <Input placeholder={this.state.title}
                               maxLength={285}
                               onChange={this.onExplainTextChange}/>
                        <button className={s.save_button}
                                onClick={this.onSaveClick}>
                            Сохранить
                        </button>
                    </div>
                </ModalWindow>
            </div>
        );
    }
}

export default ModalAnswersCreation;