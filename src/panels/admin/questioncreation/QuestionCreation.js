import React from 'react';
import BackHeader from "../../../common/components/backheader/BackHeader";
import s from "./QuestionCreation.module.css";
import SelectWindow from "../../../common/components/selectwindow/SelectWindow";
import isUndefined from "../../../common/IsUndefined";
import ModalAnswersCreation from "./fragments/ModalAnswersCreation";
import QuestionListItem from "./fragments/QuestionListItem";

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
        };
    }

    onAddQuestionClick = () => {
        console.log("onAddQuestionClick");
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

        console.log("onEditQuestionClick");
    };

    onDeleteQuestionClick = (e) => {
        console.log("onDeleteQuestionClick");
    };

    onAddQuestionItemClick = (id) => {
        console.log("onAddQuestionItemClick");
    };

    onDeleteQuestionItem = (id) => {
        console.log("onDeleteQuestionItem with id=" + id);
    };

    onEditQuestionItem = (id) => {
        console.log("onEditQuestionItem with id=" + id);
    };

    onSaveClick = () => {
        console.log("onSaveClick");
    };

    renderEditWindow = () => {
        if (!isUndefined(this.state.editWindowData)) {
            return (
                <div className={s.edit_window_container}
                     onClick={this.onCloseEditWindowClick}>
                    <div className={s.edit_window} style={{
                        top: this.state.editWindowData.top - 70,
                        left: this.state.editWindowData.left - window.screen.width * 0.65
                    }}>
                        <SelectWindow data={[
                            {
                                id: 0,
                                value: "Добавить вариант",
                                onClick: this.onAddQuestionItemClick,
                            },
                            {
                                id: 1,
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
        console.log("onCloseEditWindowClick");
    };

    renderQuestions = () => {
        if (!isUndefined(this.state.questions)) {
            const questions = this.prepareQuestions(this.state.questions);

            return Object.keys(questions)
                .sort((k1, k2) => parseInt(k1) - parseInt(k2))
                .map(key => (
                    <div key={key} className={s.question_container}>
                        <div className={s.control}>
                            <span>Вопрос №{key + 1}</span>
                            <button id={parseInt(key)} onClick={this.onEditQuestionClick}/>
                        </div>
                        {
                            questions[key].map(q => (
                                    <div key={q.id} className={s.question_item}>
                                        <QuestionListItem key={q.id}
                                                          onDelete={this.onDeleteQuestionItem}
                                                          onEdit={this.onEditQuestionItem}
                                                          id={q.id}
                                                          text={q.questionText}/>
                                    </div>
                                )
                            )
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

        questions.map(q => {
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
                <BackHeader style={this.state.modalAnswerCreation ? {filter: "blur(2px)"} : {}}/>
                <div className={`${s.container} ${this.state.modalAnswerCreation ? s.blur : ""}`}>
                    <div className={s.header}>
                        Список вопросов
                        <button onClick={this.onAddQuestionClick}/>
                    </div>
                    {this.renderQuestions()}
                    {/*<div className={s.question_container}>*/}
                    {/*    <div className={s.control}>*/}
                    {/*        <span>Вопрос №1</span>*/}
                    {/*        <button id={1} onClick={this.onEditQuestionClick}/>*/}
                    {/*    </div>*/}
                    {/*    <div className={s.question_item}>*/}
                    {/*        <QuestionListItem onDelete={this.onDeleteQuestionItem}*/}
                    {/*                          onEdit={this.onEditQuestionItem}*/}
                    {/*                          question={{text: "Автомобили движутс...чыdsfsdfsd"}}/>*/}
                    {/*    </div>*/}
                    {/*    <div className={s.question_item}>*/}
                    {/*        <QuestionListItem onDelete={this.onDeleteQuestionItem}*/}
                    {/*                          onEdit={this.onEditQuestionItem}*/}
                    {/*                          question={{text: "Автомобили движутс...чыdsfsdfsd"}}/></div>*/}
                    {/*    <div className={s.question_item}>*/}
                    {/*        <QuestionListItem onDelete={this.onDeleteQuestionItem}*/}
                    {/*                          onEdit={this.onEditQuestionItem}*/}
                    {/*                          question={{text: "Автомобили движутс...чыdsfsdfsd"}}/></div>*/}
                    {/*</div>*/}
                    {/*<div className={s.question_container}>*/}
                    {/*    <div className={s.control}>*/}
                    {/*        <span>Вопрос №1</span>*/}
                    {/*        <button id={2} onClick={this.onEditQuestionClick}/>*/}
                    {/*    </div>*/}
                    {/*    <div className={s.question_item}>*/}
                    {/*        <QuestionListItem onDelete={this.onDeleteQuestionItem}*/}
                    {/*                          onEdit={this.onEditQuestionItem}*/}
                    {/*                          question={{text: "Автомобили движутс...чыdsfsdfsd"}}/></div>*/}
                    {/*    <div className={s.question_item}>*/}
                    {/*        <QuestionListItem onDelete={this.onDeleteQuestionItem}*/}
                    {/*                          onEdit={this.onEditQuestionItem}*/}
                    {/*                          question={{text: "Автомобили движутс...чыdsfsdfsd"}}/></div>*/}
                    {/*    <div className={s.question_item}>*/}
                    {/*        <QuestionListItem onDelete={this.onDeleteQuestionItem}*/}
                    {/*                          onEdit={this.onEditQuestionItem}*/}
                    {/*                          question={{text: "Автомобили движутс...чыdsfsdfsd"}}/></div>*/}
                    {/*</div>*/}
                    {/*<div className={s.question_container}>*/}
                    {/*    <div className={s.control}>*/}
                    {/*        <span>Вопрос №1</span>*/}
                    {/*        <button id={3} onClick={this.onEditQuestionClick}/>*/}
                    {/*    </div>*/}
                    {/*    <div className={s.question_item}>*/}
                    {/*        <QuestionListItem onDelete={this.onDeleteQuestionItem}*/}
                    {/*                          onEdit={this.onEditQuestionItem}*/}
                    {/*                          question={{text: "Автомобили движутс...чыdsfsdfsd"}}/></div>*/}
                    {/*    <div className={s.question_item}>*/}
                    {/*        <QuestionListItem onDelete={this.onDeleteQuestionItem}*/}
                    {/*                          onEdit={this.onEditQuestionItem}*/}
                    {/*                          question={{text: "Автомобили движутс...чыdsfsdfsd"}}/></div>*/}
                    {/*    <div className={s.question_item}>*/}
                    {/*        <QuestionListItem onDelete={this.onDeleteQuestionItem}*/}
                    {/*                          onEdit={this.onEditQuestionItem}*/}
                    {/*                          question={{text: "Автомобили движутс...чыdsfsdfsd"}}/></div>*/}
                    {/*</div>*/}
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
                                <ModalAnswersCreation/>
                            </div>
                        )
                        : ""
                }
            </>
        );
    }
}

export default QuestionCreation;