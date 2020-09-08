import React from 'react';
import BackHeader from "../../../common/components/backheader/BackHeader";
import s from "./QuestionCreation.module.css";
import QuestionListItem from "./fragments/QuestionListItem";

class QuestionCreation extends React.Component {
    constructor(props) {
        super(props);
    }

    onAddQuestionClick = () => {
        console.log("onAddQuestionClick")
    };

    onEditQuestionClick = () => {
        console.log("onEditQuestionClick")
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
                        </div>
                        <div className={s.question_item}>
                            <QuestionListItem question={{text: "Автомобили движутс...чыdsfsdfsd"}}/>
                        </div>
                        <div className={s.question_item}>
                            <QuestionListItem question={{text: "Автомобили движутс..."}}/>
                        </div>
                        <div className={s.question_item}>
                            <QuestionListItem question={{text: "Автомобили движутс..."}}/>
                        </div>

                    </div>
                </div>
            </>
        );
    }
}

export default QuestionCreation;