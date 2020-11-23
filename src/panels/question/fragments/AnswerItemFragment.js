import React from 'react';

import s from './AnswerItemFragment.module.css';

class AnswerItemFragment extends React.Component {
  
    getOnClick = () => {
        if (!this.props.disabled) {
            return this.props.isRightAnswer ? this.props.onRightAnswer : this.props.onWrongAnswer;
        } else {
            return () => {};
        }
    };

    render() {
        return (
            <div className={s.answer_item} onClick={this.getOnClick()}>
                {
                    this.props.answerType === 'str' ?
                        (<div className={s.text} >
                            {this.props.answerText}
                        </div>) : ''
                }
            </div>

        )
    }

}
export default AnswerItemFragment;