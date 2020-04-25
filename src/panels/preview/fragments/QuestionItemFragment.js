import React from 'react';

import s from './questionItem.module.css';

class QuestionItemFragment extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className={s.question_item} >
                Вопрос
            </div>
        )
    }
}

export default QuestionItemFragment;