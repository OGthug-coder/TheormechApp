import React from 'react';
import s from "./ModalAnswersCreation.module.css";
import ModalWindow from "../../../../common/components/modalwindow/ModalWindow";
import Input from "../../../../common/components/input/Input";
import BackButton from "../../../../common/components/backbutton/BackButton";
import RightAnswerCode from "../../../../preview/util/RightAnswerCode";
import Select from "../../../../common/components/select/Select";


class ModalAnswersCreation extends React.Component {
    constructor(props) {
        super(props);

        this.prepareAnswers(props.question);
        this.state = {
            reward: props.question.reward,
            questionText: props.question.questionText,
            answers: props.question.answers,
            explain: props.question.explain !== null ? props.question.explain : "",
            rightAnswer: props.question.answers.filter(a => a.isRight === RightAnswerCode.RIGHT_ANSWER)[0].serialNumber,
        };
    }

    prepareAnswers = (question) => {
        let counter = 0;
        question.answers.forEach(a => {
            a.serialNumber = counter++;
        });
    };

    onQuestionTextChange = (value) => {
        this.setState({questionText: value});
    };

    onAnswerTextChange = (value, id) => {
        const answers = this.state.answers;
        answers.forEach(a => {
            if (a.serialNumber === parseInt(id)) {
                a.answer = value
            }
        });
        this.setState({answers: answers});
    };

    onExplainTextChange = (value) => {
        this.setState({explain: value});
    };

    onTestTimeChange = (value) => {
        const answers = this.state.answers;
        answers.forEach(a => {
            if (a.serialNumber === parseInt(value)) {
                a.isRight = 1;
            } else {
                a.isRight = 0;
            }
        });
        this.setState({
            answers: answers,
            rightAnswer: value,
        });
    };

    onRewardChange = (value) => {
        this.setState({reward: parseInt(value)});
    };

    onSaveClick = () => {
        const question = {
            questionText: this.state.questionText,
            explain: this.state.explain,
            id: this.props.question.id,
            reward: this.state.reward,
            serialNumber: this.props.question.serialNumber,
            answers: this.state.answers
        };

        this.props.updateQuestion(question);
    };

    onBackClick = () => {
        this.onSaveClick();
        this.props.onBackClick();
    };

    renderAnswers = () => {
        if (this.props.question.answers.length > 0) {
            return this.props.question.answers
                .sort((a1, a2) => a1.serialNumber - a2.serialNumber)
                .map(answer => (
                    <div className={s.input}>
                        <Input id={answer.serialNumber}
                               key={this.state.answers}
                               autoResize
                               placeholder={answer.answer}
                               rows={1}
                               maxLength={80}
                               onChange={this.onAnswerTextChange}/>
                    </div>
                ));
        }
    };

    render() {
        return (
            <div className={s.container}>
                <div className={s.sticky_container}>
                    <div className={`${s.back_button}`}>
                        <BackButton disabled onClick={this.onBackClick}/>
                    </div>
                </div>
                <ModalWindow>
                    <div className={s.content}>
                        <div className={s.input_title}>
                            Вопрос
                        </div>
                        <div className={s.input}>
                            <Input placeholder={this.state.questionText}
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
                            <Select 
                                name={"time"}
                                value={this.state.rightAnswer}
                                onChange={(e) => this.onTestTimeChange(e.target.value)}
                                options={{
                                    "0" : 1,
                                    "1" : 2,
                                    "2" : 3,
                                    "3" : 4,
                                    "4" : 5
                                }}
                            />
                        </div>
                        <div className={s.input_title}>
                            Объяснение
                        </div>
                        <Input placeholder={this.state.explain}
                               maxLength={285}
                               onChange={this.onExplainTextChange}/>

                        <div className={s.input_title}>
                            Награда
                        </div>
                        <div className={s.input}>
                            <Input placeholder={this.state.reward}
                                   rows={1}
                                   onChange={this.onRewardChange}/>
                        </div>
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