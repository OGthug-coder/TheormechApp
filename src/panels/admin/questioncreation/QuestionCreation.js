import React from 'react';
import BackHeader from "../../../common/components/backheader/BackHeader";
import s from "./QuestionCreation.module.css";
import SelectWindow from "../../../common/components/selectwindow/SelectWindow";
import isUndefined from "../../../common/IsUndefined";
import ModalAnswersCreation from "./fragments/ModalAnswersCreation";
import QuestionListItem from "./fragments/QuestionListItem";
import {withRouter} from 'react-router-dom'
import RightAnswerCode from "../../../preview/util/RightAnswerCode";

const PLACEHOLDER = 'PLACEHOLDER';

class QuestionCreation extends React.Component {
    constructor(props) {
        super(props);

        this.application = props.application;
        this.testEditHelper = this.application.provideTestEditHelper();
        let test = this.testEditHelper.getTest();

        this.state = {
            questions: !isUndefined(test.questions) ? test.questions : [],
            editWindowData: undefined,
            modalAnswerCreation: false,
            latestId: -1,
        };
    }

    componentWillUnmount() {
        this.onSaveClick();
    }

    onAddQuestionClick = () => {
        const questions = this.state.questions;
        questions.push({
            questionText: PLACEHOLDER,
            serialNumber: parseInt(
                this.state.questions.length > 0
                    ? this.state.questions
                        .reduce((accumulator, key) => accumulator.serialNumber > key.serialNumber ? accumulator : key)
                        .serialNumber
                    : -1
            ) + 1,
        });

        this.testEditHelper.updateValue("questions", questions)
        this.setState({questions: questions});
    };

    onEditQuestionClick = (e) => {
        if (isUndefined(this.state.editWindowData)) {
            const bounds = e.currentTarget.getBoundingClientRect();
            const clickData = {
                questionId: e.currentTarget.id,
                top: bounds.top,
                left: bounds.left
            };
            setTimeout(() => this.setState({editWindowData: clickData}), 100);
        }
    };

    onDeleteQuestionClick = (serialNumber) => {
        let questions = this.state.questions
            .filter(question => question.serialNumber !== parseInt(serialNumber));

        this.shiftQuestions(questions, serialNumber);
        this.testEditHelper.updateValue("questions", questions)
        this.setState({questions: questions});
    };

    shiftQuestions = (questions, serialNumber) => {
        const maxSerialNumber = parseInt(this.state.questions
            .reduce((acc, question) => acc.serialNumber > question.serialNumber ? acc : question)
            .serialNumber
        );

        if (maxSerialNumber !== serialNumber) {
            questions.map(q => {
                if (q.serialNumber > serialNumber) {
                    q.serialNumber--;
                }
            });
        }

        return questions;
    };

    onAddQuestionItemClick = (id) => {
        const serialNumber = parseInt(id);
        const needsReplacement = this.state.questions
            .filter(q => q.questionText === PLACEHOLDER && q.serialNumber === serialNumber)
            .length === 1;

        const questions = this.state.questions;

        if (needsReplacement) {
            questions.filter(q => q.serialNumber !== serialNumber);
        }

        let newQuestion = {
            id: this.state.latestId,
            questionText: "",
            answers: [0, 1, 2, 3].map(i => {
                return {
                    serialNumber: i,
                    answer: "",
                    answerType: "text",
                    isRight: i === 0 ? RightAnswerCode.RIGHT_ANSWER : RightAnswerCode.WRONG_ANSWER,
                }
            }),
            explain: "",
            reward: questions.filter(q => q.serialNumber === serialNumber)[0].reward,
            serialNumber: serialNumber,
        };

        questions.push(newQuestion);

        this.testEditHelper.updateValue("questions", questions);
        this.setState({
            questions: questions,
            modalAnswerCreation: newQuestion,
            latestId: this.state.latestId - 1,
        });
    };

    onDeleteQuestionItem = (id) => {
        let serialNumber = 0;

        const questions = this.state.questions.filter(q => {
                if (q.id !== parseInt(id)) {
                    return true
                } else {
                    serialNumber = q.serialNumber;
                    return false
                }
            }
        );

        // Check if there are more questions with serialNumber of deleted question
        // If there is no question with the serial number, shift questions
        const needsShifting = questions.filter(q => q.serialNumber === serialNumber).length === 0;

        if (needsShifting) {
            this.shiftQuestions(questions, serialNumber);
        }

        this.testEditHelper.updateValue("questions", questions);
        this.setState({questions: questions});
    };

    onEditQuestionItem = (id) => {
        const q = this.state.questions.filter(q => q.id === id);
        this.setState({modalAnswerCreation: q[0]});
    };

    onSaveClick = () => {
        this.testEditHelper.sendChanges();
    };

    onBackClick = () => {
        this.testEditHelper.sendChanges();
    };

    renderEditWindow = () => {
        if (!isUndefined(this.state.editWindowData)) {
            return (
                <div className={s.edit_window_container}
                     onClick={this.onCloseEditWindowClick}>
                    <div className={s.edit_window} style={{
                        top: this.state.editWindowData.top - 70,
                        left: this.state.editWindowData.left - window.innerWidth * 0.65
                    }}>
                        <SelectWindow data={[
                            {
                                id: this.state.editWindowData.questionId,
                                value: "Добавить вариант",
                                onClick: this.onAddQuestionItemClick,
                            },
                            {
                                id: this.state.editWindowData.questionId,
                                value: "Удалить вопрос",
                                onClick: this.onDeleteQuestionClick,
                            }
                        ]}/>
                    </div>
                </div>
            )
        }
        return "";
    };

    onCloseEditWindowClick = () => {
        this.setState({editWindowData: undefined});
    };

    updateQuestion = (question) => {
        let questions = this.state.questions;
        questions = questions.filter(q => q.id !== question.id);
        questions.map(q => {
            if (q.serialNumber === question.serialNumber) {
                q.reward = question.reward;
                return q;
            }
        });

        questions.push(question);
        
        this.testEditHelper.updateValue("questions", questions);
        this.setState({questions: questions});
    };

    renderQuestions = () => {
        if (!isUndefined(this.state.questions)) {
            const questions = this.prepareQuestions(this.state.questions);

            return Object.keys(questions)
                .sort((k1, k2) => parseInt(k1) - parseInt(k2))
                .map(key => (
                    <div key={key} className={s.question_container}>
                        <div className={s.control}>
                            <span>Вопрос №{parseInt(key) + 1}</span>
                            <button id={parseInt(key)} onClick={this.onEditQuestionClick}/>
                        </div>
                        {
                            questions[key].map(q => (
                                q.questionText !== PLACEHOLDER ? (
                                    <div key={q.id} className={s.question_item}>
                                        <QuestionListItem key={q.id}
                                                          onDelete={this.onDeleteQuestionItem}
                                                          onEdit={this.onEditQuestionItem}
                                                          id={q.id}
                                                          text={q.questionText}/>
                                    </div>
                                ) : ""
                            ))
                        }


                    </div>
                ));
        } else {
            return (
                <div className={s.question_container}>
                    <div className={s.control}>
                        <span>Вопрос №1</span>
                        <button id={1} onClick={this.onEditQuestionClick}/>
                    </div>
                </div>
            );
        }
    };

    prepareQuestions = (questions) => {
        const sortedQuestions = {};

        questions.forEach(q => {
            if (isUndefined(sortedQuestions[q.serialNumber])) {
                sortedQuestions[q.serialNumber] = [];
                sortedQuestions[q.serialNumber].push(q);
            } else {
                sortedQuestions[q.serialNumber].push(q);
            }
        });
        return sortedQuestions;
    };


    render() {
        return (
            <>
                <BackHeader key={this.state.modalAnswerCreation}
                            onClick={this.onBackClick}
                            style={this.state.modalAnswerCreation ? {filter: "blur(2px)"} : {}}/>
                <div className={`${s.container} ${this.state.modalAnswerCreation ? '' : ""}`}>
                    <div className={s.header}
                         style={this.state.modalAnswerCreation ? {filter: "blur(2px)"} : {}}>
                        Список вопросов
                        <button onClick={this.onAddQuestionClick}/>
                    </div>
                    {
                        this.renderQuestions()
                    }
                    <button className={s.save_button}
                            onClick={this.onSaveClick}>
                        Сохранить
                    </button>
                </div>
                {this.renderEditWindow()}
                {
                    this.state.modalAnswerCreation
                        ? (
                            <div className={s.answers_window}>
                                <ModalAnswersCreation key={this.state.modalAnswerCreation}
                                                      question={this.state.modalAnswerCreation}
                                                      onBackClick={() => this.setState({modalAnswerCreation: false})}
                                                      updateQuestion={this.updateQuestion}/>
                            </div>
                        )
                        : ""
                }
            </>
        );
    }
}

export default withRouter(QuestionCreation);