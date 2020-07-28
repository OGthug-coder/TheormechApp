import React from 'react';

import s from './QuestionItemFragment.module.css';
import QuestionStatus from "../../../preview/service/QuestionStatus";

class QuestionItemFragment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            serialNumber: props.serialNumber,
            status: props.status,
            onClick: props.onClick,
        }

        this.loadStatusPic = () => {
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
        }
    }




    render() {
        const serialNumber = this.state.serialNumber;
        return (
            <>
                <div className={s.question_item} >
                    <img className={s.question_status}
                         src={this.loadStatusPic()} >
                    </img>
                    <div className={s.question_body}>
                        <div className={s.title}>
                            Вопрос # {serialNumber !== undefined ? serialNumber : ".."}
                        </div>
                    </div>
                    <button className={s.answer} onClick={this.state.onClick}/>
                </div>
                <div className={s.separator} />
            </>
        )
    }
}

export default QuestionItemFragment;