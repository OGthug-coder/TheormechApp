import React from 'react';

import s from './QuestionItemFragment.module.css';

class QuestionItemFragment extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            answerType: props.answerType,
            answerText: props.answerText,
            questionNumber: props.questionNumber,
        }

    }

    render() {
        const numberMap = {
            1: 'a',
            2: 'b',
            3: 'c',
            4: 'd'
        };

        return (

            
            <div className={s.answer_item}>
                <div className={s.number}>
                    {numberMap[this.state.questionNumber]}
                </div>
                {
                    this.state.answerType === 'str' ?
                        (<div className={s.text}>
                            {this.state.answerText}
                        </div>) : ''
                }
            </div>
        )
    }

}
export default QuestionItemFragment;