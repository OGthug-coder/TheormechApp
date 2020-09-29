import React from 'react';
import s from "./QuestionListItem.module.css";


class QuestionListItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.id,
            text: props.text,
            onDelete: props.onDelete,
            onEdit: props.onEdit,
        };
    }

    onDeleteClick = () => {
        this.state.onDelete(this.state.id);
    };

    onEditClick = () => {
        this.state.onEdit(this.state.id);
    };

    render() {
        return (
            <div className={s.question_item}>
                <button onClick={this.onDeleteClick} />
                <div onClick={this.onEditClick}>
                    <span>Вариант 1</span>
                    <span>{this.state.text}</span>
                </div>
                <button onClick={this.onEditClick}/>
            </div>
        )
    }
}

export default QuestionListItem;