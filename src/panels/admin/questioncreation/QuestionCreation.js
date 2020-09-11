import React from 'react';
import BackHeader from "../../../common/components/backheader/BackHeader";
import s from "./QuestionCreation.module.css";
import QuestionListItem from "./fragments/QuestionListItem";

class QuestionCreation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editClickData: undefined,
        };
    }


    onAddQuestionClick = () => {
        console.log("onAddQuestionClick");
    };

    onEditQuestionClick = (e) => {
        debugger
        const clickData = {
            questionId: e.currentTarget.id,
            top: e.currentTarget.offsetTop,
            left: e.currentTarget.offsetLeft
        };
        this.setState({editClickData: clickData})
        console.log("onEditQuestionClick");
    };

    onDeleteQuestionItem = () => {
        console.log("onDeleteQuestionItem");
    };

    onEditQuestionItem = () => {
        console.log("onEditQuestionItem");
    };

    onSaveClick = () => {
        console.log("onSaveClick");
    };

    render() {
        return (
            <>
                <BackHeader/>
                <div className={s.container}>
                    <div className={s.header}>
                        Список вопросов
                        <button onClick={this.onAddQuestionClick}/>
                    </div>
                    <div className={s.question_container}>
                        <div className={s.control}>
                            <span>Вопрос №1</span>
                            <button id={1} onClick={this.onEditQuestionClick}/>
                            <div>

                            </div>
                        </div>
                        <div className={s.question_item}>
                            <QuestionListItem onDelete={this.onDeleteQuestionItem}
                                              onEdit={this.onEditQuestionItem}
                                              question={{text: "Автомобили движутс...чыdsfsdfsd"}}/>
                        </div>
                        <div className={s.question_item}>
                            <QuestionListItem onDelete={this.onDeleteQuestionItem}
                                              onEdit={this.onEditQuestionItem}
                                              question={{text: "Автомобили движутс...чыdsfsdfsd"}}/></div>
                        <div className={s.question_item}>
                            <QuestionListItem onDelete={this.onDeleteQuestionItem}
                                              onEdit={this.onEditQuestionItem}
                                              question={{text: "Автомобили движутс...чыdsfsdfsd"}}/></div>
                    </div>
                    <div className={s.question_container}>
                        <div className={s.control}>
                            <span>Вопрос №1</span>
                            <button id={2} onClick={this.onEditQuestionClick}/>
                        </div>
                        <div className={s.question_item}>
                            <QuestionListItem onDelete={this.onDeleteQuestionItem}
                                              onEdit={this.onEditQuestionItem}
                                              question={{text: "Автомобили движутс...чыdsfsdfsd"}}/></div>
                        <div className={s.question_item}>
                            <QuestionListItem onDelete={this.onDeleteQuestionItem}
                                              onEdit={this.onEditQuestionItem}
                                              question={{text: "Автомобили движутс...чыdsfsdfsd"}}/></div>
                        <div className={s.question_item}>
                            <QuestionListItem onDelete={this.onDeleteQuestionItem}
                                              onEdit={this.onEditQuestionItem}
                                              question={{text: "Автомобили движутс...чыdsfsdfsd"}}/></div>
                    </div>
                    <div className={s.question_container}>
                        <div className={s.control}>
                            <span>Вопрос №1</span>
                            <button id={3} onClick={this.onEditQuestionClick}/>
                        </div>
                        <div className={s.question_item}>
                            <QuestionListItem onDelete={this.onDeleteQuestionItem}
                                              onEdit={this.onEditQuestionItem}
                                              question={{text: "Автомобили движутс...чыdsfsdfsd"}}/></div>
                        <div className={s.question_item}>
                            <QuestionListItem onDelete={this.onDeleteQuestionItem}
                                              onEdit={this.onEditQuestionItem}
                                              question={{text: "Автомобили движутс...чыdsfsdfsd"}}/></div>
                        <div className={s.question_item}>
                            <QuestionListItem onDelete={this.onDeleteQuestionItem}
                                              onEdit={this.onEditQuestionItem}
                                              question={{text: "Автомобили движутс...чыdsfsdfsd"}}/></div>
                    </div>
                    <button className={s.save_button}
                            onClick={this.onSaveClick}>
                        Сохранить
                    </button>
                </div>
                <div className={s.edit_window_container}>
                    <div className={s.edit_window}>

                    </div>
                </div>
            </>
        );
    }
}

export default QuestionCreation;