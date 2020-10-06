import React from 'react';

import s from './QuestionItemFragment.module.css';
import QuestionStatus from "../../../preview/util/QuestionStatus";
import isUndefined from "../../../common/IsUndefined";

class QuestionItemFragment extends React.Component {

    loadStatusPic = () => {
        if (this.props.status !== undefined) {
            switch (this.props.status) {
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
        if (!isUndefined(this.props.status)) {
            if (this.props.status === QuestionStatus.STARTED
                || this.props.status === QuestionStatus.UNTOUCHED
                || this.props.status === QuestionStatus.SKIPPED) {
                return false;
            }
        }

        return true;
    };




    render() {
        const serialNumber = this.props.serialNumber;
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
                    <button id={!isUndefined(this.props.questionId) ? this.props.questionId : 0}
                            className={s.answer}
                            onClick={this.props.onClick}
                            disabled={!this.isActive()}/>
                </div>
                <div className={s.separator} />
            </>
        )
    }
}

export default QuestionItemFragment;