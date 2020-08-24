import React from 'react';

import s from './QuestionItemFragment.module.css';
import QuestionStatus from "../../../preview/util/QuestionStatus";
import isUndefined from "../../../common/IsUndefined";

class QuestionItemFragment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questionId: props.questionId,
            serialNumber: props.serialNumber,
            status: props.status,
            onClick: props.onClick,
        }
    }

    loadStatusPic = () => {
        if (this.state.status !== undefined) {
            switch (this.state.status) {
                case QuestionStatus.PASSED:
                    return require("../../../img/preview/ic_question_status_approve.svg");
                case QuestionStatus.FAILED:
                    return require("../../../img/preview/ic_question_status_decline.svg");
                default:
                    return require("../../../img/preview/ic_question_status_untouched.svg");
            }
        } else {
            return require("../../../img/preview/ic_question_status_untouched.svg");
        }
    };

    isActive = () => {
        if (!isUndefined(this.state.status)) {
            if (this.state.status === QuestionStatus.STARTED
                || this.state.status === QuestionStatus.UNTOUCHED
                || this.state.status === QuestionStatus.SKIPPED) {
                return false;
            }
        }

        return true;
    };




    render() {
        const serialNumber = this.state.serialNumber;
        return (
            <>
                <div className={s.question_item} >
                    <img className={s.question_status}
                         src={this.loadStatusPic()}
                         alt={"question status"}>
                    </img>
                    <div className={s.question_body}>
                        <div className={s.title}>
                            Вопрос # {serialNumber !== undefined ? serialNumber + 1 : ".."}
                        </div>
                    </div>
                    <button id={!isUndefined(this.state.questionId) ? this.state.questionId : 0}
                            className={s.answer}
                            onClick={this.state.onClick}
                            disabled={!this.isActive()}/>
                </div>
                <div className={s.separator} />
            </>
        )
    }
}

export default QuestionItemFragment;