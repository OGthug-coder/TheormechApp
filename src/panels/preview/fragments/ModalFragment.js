import React from "react";
import s from './ModalFragment.module.css';
import ProgressFragment from "./ProgressFragment";
import QuestionItemFragment from "./QuestionItemFragment";
import {Link} from "react-router-dom";
import PreviewUtil from "../../../preview/service/TestStatus";
import QuestionStatus from "../../../preview/service/QuestionStatus";

class ModalFragment extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            testInfo: props.testInfo,
            onClick: props.onClick,
            className: props.className,
            history: props.history,
            lastQuestion: props.lastQuestion,
            testStatus: this.getStatusView(props.testStatus),
        };

    }

    getStatusView(testStatus) {
        switch (testStatus) {
            case PreviewUtil.UNTOUCHED:
                return "Не начато";
            case PreviewUtil.NOT_FINISHED:
                return "На закончено";
            case PreviewUtil.FINISHED:
                return "Завершено";
        }
    }

    renderQuestions() {
        if (this.state.testInfo !== undefined && this.state.lastQuestion !== undefined) {
            let uniq = []

            let questions = this.state.testInfo.questions.filter(question => question.status !== QuestionStatus.UNTOUCHED);
            this.state.testInfo.questions.map(question => {
                if (question.serialNumber > this.state.lastQuestion && !uniq.includes(question.serialNumber)) {
                    questions.push(question);
                    uniq.push(question.serialNumber);
                }
            })

            questions.sort((o1, o2) => {
                return o1.serialNumber - o2.serialNumber;
            });
            return questions.map(question => {
                return (
                    <li className={s.question_item}>
                        <QuestionItemFragment
                            serialNumber={question.serialNumber}
                            status={question.status}
                            onClick={this.state.onClick}/>
                    </li>
                )
            })
        }
    }


    render() {
        const testInfo = this.state.testInfo;
        return (
            <section className={`${s.modal_window} ${this.state.className ? s.blur : ""}`}>
                <div className={s.slider_wrapper}>
                    <div className={s.slider}/>
                </div>
                <div className={s.content_wrapper}>
                    <div className={s.title}>
                        {testInfo !== undefined ? testInfo.title : ""}
                    </div>
                    <div className={s.status}>
                        Состояние: {this.state.testStatus}
                    </div>
                    <div className={s.description}>
                        {testInfo !== undefined ? testInfo.description : ""}
                    </div>
                    <div className={s.progress}>
                        <div>
                            Мой прогресс
                        </div>
                        <ProgressFragment maxScore={testInfo !== undefined ? testInfo.maxScore : 0} currentScore={1}
                                          time={testInfo !== undefined ? testInfo.timeToComplete : null}/>
                    </div>
                    <ul className={s.question_list}>
                        {this.renderQuestions()}
                    </ul>

                </div>
                <div className={s.button}>
                    <Link to={'/question'} className={s.link}>
                        <div> Пройти тест</div>
                    </Link>
                </div>
            </section>
        )
    }

}

export default ModalFragment;