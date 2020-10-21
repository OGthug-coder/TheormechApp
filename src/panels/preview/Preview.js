import React from 'react';

import s from "./Preview.module.css";
import ProgressFragment from "./fragments/ProgressFragment";
import {Link, withRouter} from "react-router-dom";
import QuestionStatus from "../../preview/util/QuestionStatus";
import QuestionItemFragment from "./fragments/QuestionItemFragment";
import PreviewUtil from "../../preview/util/TestStatus";
import TestStatus from "../../preview/util/TestStatus";
import isUndefined from "../../common/IsUndefined";
import getNextQuestionUrl from "../../common/getNextQuestionUrl";
import BackButton from "../../common/components/backbutton/BackButton";
import Answer from "./fragments/Answer";
import Swipe from "react-easy-swipe";


class Preview extends React.Component {
    constructor(props) {
        super(props);

        this.application = props.application;
        this.previewService = this.application.providePreviewService();
        this.testId = props.match.params.testId;

        this.state = {};
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = () => {
        this.previewService.getHistory(this.testId, this.application.provideUser())
            .then(history => {
                this.previewService.getTest(this.testId)
                    .then(testInfo => {
                        testInfo.questions = this.previewService.prepareQuestions(testInfo.questions, this.state.history);
                        this.setState({testInfo: testInfo});
                        this.configureTestTimer(testInfo);

                        const lastQuestion = this.previewService.getLastQuestion(history);
                        this.setState({lastQuestion: lastQuestion});
                        const testStatus = this.previewService.getStatus(lastQuestion, testInfo.questions);
                        this.setState({testStatus: testStatus});

                    });
                this.setState({history: history});

                const currentScore = this.previewService.getCurrentScore(history);
                this.setState({currentScore: currentScore});
            });
    };

    componentWillUnmount() {
        if (!isUndefined(this.testTimerHelper)) {
            this.application.deleteTestTimer();
        }
    }

    configureTestTimer = (test) => {
        this.testTimerHelper = this.application.provideTestTimerHelper(test, this.toResultScreen);
        this.testTimerHelper.subscribe((timer) => this.setState({timer: timer}));
    };

    toResultScreen = () => {
        this.props.history.push("/result/" + this.state.testInfo.id);
    };

    showAnswerWindow = (e) => {
        const id = parseInt(e.currentTarget.attributes.id.nodeValue);
        const question = this.state.testInfo.questions.find(q => q.id === id);
        this.setState({answerWindow: question});
    };

    hideAnswerWindow = () => {
        this.setState({answerWindow: undefined})
    };

    onSwipeEnd = (position, event) => {
        if (!isUndefined(this.state.answerWindow)) {
            setTimeout(this.hideAnswerWindow, 50);
        }
    };


    renderQuestions = () => {
        if (!isUndefined(this.state.testInfo) && !isUndefined(this.state.lastQuestion)) {
            let uniq = []
            let questions = this.state.testInfo.questions.filter(question => {
                if (question.status !== QuestionStatus.UNTOUCHED) {
                    uniq.push(question.serialNumber);
                    return true;
                } else {
                    return false;
                }
            });
            this.state.testInfo.questions.map(question => {
                if (question.serialNumber > this.state.lastQuestion && !uniq.includes(question.serialNumber)) {
                    questions.push(question);
                    uniq.push(question.serialNumber);
                }
                return question;
            })

            questions.sort((o1, o2) => {
                return o1.serialNumber - o2.serialNumber;
            });

            return questions.map(question => {
                return (
                    <li key={question.id}
                        className={s.question_item}>
                        <QuestionItemFragment
                            questionId={question.id}
                            serialNumber={question.serialNumber}
                            status={question.status}
                            onClick={this.showAnswerWindow}/>
                    </li>
                )
            })
        }
    };

    getStatusView = () => {
        if (!isUndefined(this.state.testStatus)) {
            switch (this.state.testStatus) {
                case PreviewUtil.UNTOUCHED:
                    return "Не начато";
                case PreviewUtil.NOT_FINISHED:
                    return "На закончено";
                case PreviewUtil.FINISHED:
                    return "Завершено";
                default:
                    return "Не начато";
            }
        } else {
            return "Не начато";
        }
    };

    getButtonText = () => {
        if (!isUndefined(this.state.testStatus)) {
            switch (this.state.testStatus) {
                case TestStatus.NOT_FINISHED:
                    return "Продолжить";
                default:
                    return "Начать";
            }
        } else {
            return "Начать";
        }
    }

    getNextQuestionLink = () => {
        if (!isUndefined(this.state.testStatus)
            && !isUndefined(this.state.testInfo)
            && !isUndefined(this.state.lastQuestion)) {

            if (this.state.testStatus === TestStatus.FINISHED) {
                return "#";
            } else {
                const url = getNextQuestionUrl(this.state.testInfo, this.state.lastQuestion);
                return isUndefined(url) ? "#" : url;
            }
        }

        return "#";
    }

    render() {
        //Need to insert question status
        const testInfo = this.state.testInfo;

        return (
            <>
                <section className={`${s.preview_wrapper} ${!isUndefined(this.state.answerWindow) ? s.blurred : ""}`}>
                    <img
                        className={s.background}
                        src={!isUndefined(testInfo) ? testInfo.img : ""}
                        alt={"background"}/>

                    <div className={s.sticky_container}>
                        <div className={`${s.back_button}`}>
                            <BackButton/>
                        </div>
                    </div>
                    <section className={s.modal_window}>

                        <div className={s.slider_wrapper}>
                            <div className={s.slider}/>
                        </div>
                        <div className={s.content_wrapper}>
                            <div className={s.title}>
                                {!isUndefined(testInfo) ? testInfo.title : ""}
                            </div>
                            <div className={s.status}>
                                Состояние: {this.getStatusView()}
                            </div>
                            <div className={s.description}>
                                {!isUndefined(testInfo) ? testInfo.description : ""}
                            </div>
                            <div className={s.progress}>
                                <div className={s.progress_title}>
                                    Мой прогресс
                                </div>
                                <ProgressFragment key={[this.state.currentScore, this.state.timer]}
                                                  maxScore={!isUndefined(testInfo) ? testInfo.maxScore : 0}
                                                  currentScore={!isUndefined(this.state.currentScore) ? this.state.currentScore : 0}
                                                  time={!isUndefined(this.state.timer) ? this.state.timer : null}/>
                            </div>
                            <ul className={s.question_list}>
                                {this.renderQuestions()}
                            </ul>
                        </div>
                    </section>
                    <div className={!isUndefined(this.state.testStatus)
                    && this.state.testStatus !== TestStatus.FINISHED ? s.button : s.hidden}>
                        <Link to={this.getNextQuestionLink()}
                              onClick={this.toQuestionScreen}
                              className={s.link}>
                            <div>{this.getButtonText()}</div>
                        </Link>
                    </div>

                </section>
                {!isUndefined(this.state.answerWindow) ?
                    <Answer question={this.state.answerWindow} onClick={this.hideAnswerWindow}/> : ""}
                {
                    !isUndefined(this.state.answerWindow) ?
                        <Swipe onSwipeEnd={this.onSwipeEnd}>
                            <div className={s.screen}/>
                        </Swipe>
                        : ""
                }

            </>
        )
    }
}

export default withRouter(Preview);
