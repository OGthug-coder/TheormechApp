import React from 'react';
import s from "./QuestionListItem.module.css";


class QuestionListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    onDeleteClick = () => {
        this.props.onDelete(this.props.id);
    };

    onEditClick = () => {
        this.props.onEdit(this.props.id);
    };

    render() {
        return (
            <div className={s.question_item}>
                <button onClick={this.onDeleteClick} />
                <div onClick={this.onEditClick}>
                    <span>Вариант 1</span>
                    <span>{this.props.text}</span>
                </div>
                <button onClick={this.onEditClick}/>
            </div>
        )
    }
}

export default QuestionListItem;