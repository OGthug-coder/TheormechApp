import React from 'react';
import s from "./QuestionListItem.module.css";


class QuestionListItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            question: props.question,
            onDelete: props.onDelete,
            onEdit: props. onEdit,
        };
    }

    render() {
        const question = this.state.question;
        return (
            <div className={s.question_item}>
                <button onClick={this.state.onDelete} />
                <div onClick={this.state.onEdit}>
                    <span>Вариант 1</span>
                    <span>{question.text}</span>
                </div>
                <button onClick={this.state.onEdit}/>
            </div>
        )
    }
}

export default QuestionListItem;