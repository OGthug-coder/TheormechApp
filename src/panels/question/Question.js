import React from 'react';
import {withRouter} from 'react-router-dom';
import s from './Question.module.css';
import BackButton from "../../common/components/backbutton/BackButton";
import isUndefined from "../../common/IsUndefined";
import RightAnswerCode from "../../preview/util/RightAnswerCode";
import getNextQuestionUrl from "../../common/getNextQuestionUrl";
import QuestionStatus from "../../preview/util/QuestionStatus";
import AnswerItemFragment from "./fragments/AnswerItemFragment";
import CorrectAnimation from "./fragments/CorectAnimation"
import IncorrectAnimation from "./fragments/IncorrectAnimation"
import Vibration from "../../common/Vibration";
import {NO_TIMER} from "../../common/services/Timer";

class Status {
    static IN_PROGRESS = 0;
    static SKIPPED = 1;
    static FAILED = 2;
    static PASSED = 3;
}

class Question extends React.Component {
    constructor(props) {
        super(props);

        this.application = props.application;
        this.questionService = this.application.provideQuestionService();

        this.state = {
            status: Status.IN_PROGRESS,
            questionId: parseInt(props.match.params.questionId),
            testId: parseInt(props.match.params.testId),
            _position: 10,
            animation: undefined,
        };
    }

    componentDidMount() {
        this.downloadData();
    }

    componentWillUnmount() {
        if (!isUndefined(this.testTimerHelper)) {
            this.application.deleteTestTimer();
        }
    }

    downloadData = () => {
        this.questionService.getTest(this.state.testId)
            .then(test => {
                const question = test.questions.find(q => q.id === this.state.questionId);
                this.questionService.startQuestion(question.id).then(status => {
                    if (status.ok) {
                        this.configureTestTimer(test)
                    }
                });
                this.setState({question: question});
                this.setState({test: test});

                let uniqQuestions = [];
                let uniqNumbers = [];
                const allQuestions = test.questions;

                allQuestions.map(q => {
                    if (!uniqNumbers.includes(q.serialNumber)) {
                        uniqNumbers.push(q.serialNumber);
                        uniqQuestions.push(q);
                    }
                    return q;
                });
                this.setState({questionsLength: uniqQuestions.length});

            });
    };

    configureTestTimer = (test) => {
        if (isUndefined(this.testTimerHelper)) {
            this.testTimerHelper = this.application.provideTestTimerHelper(test, this.toResultScreen);
            this.testTimerHelper
                .subscribe((timer) => this.setState({timer: timer}));
        }
    };

    toResultScreen = () => {
        this.props.history.replace("/TheormechApp/result/" + this.state.testId);
    };

    prepareList = () => {
        if (!isUndefined(this.state.question)) {
            let list = [];

            this.state.question.answers.map(answer => {
                list.push(
                    <AnswerItemFragment
                        disabled={this.state.status !== Status.IN_PROGRESS}
                        key={answer.id}
                        answerType={'str'}
                        answerText={answer.answer}
                        onRightAnswer={this.onRightAnswer}
                        onWrongAnswer={this.onWrongAnswer}
                        isRightAnswer={answer.isRight === RightAnswerCode.RIGHT_ANSWER}
                    />
                );
                return answer;
            });
            return list;
        }
    }

    onRightAnswer = () => {
        this.setState({animation: 'correct'});
        this.questionService.vibrate(Vibration.SUCCESS);

        this.questionService.passQuestion(this.state.questionId).then(status => {
            if (status.ok) {
                setTimeout(() => {
                    this.setState({status: Status.IN_PROGRESS});
                    this.setState({animation: undefined})
                    this.startNextQuestion(QuestionStatus.PASSED);
                }, 1000);
            } else {
                //    TODO
            }
        });
        this.setState({status: Status.PASSED});
    };

    onWrongAnswer = () => {
        this.setState({animation: 'incorrect'})
        this.questionService.vibrate(Vibration.ERROR);

        this.questionService.failQuestion(this.state.questionId).then(status => {
            if (status.ok) {
                setTimeout(() => {
                    this.setState({status: Status.IN_PROGRESS});
                    this.setState({animation: undefined})
                    this.startNextQuestion(QuestionStatus.PASSED);
                }, 1000);
            } else {
                //    TODO

            }
        });
        this.setState({status: Status.FAILED});
    };

    onSkip = () => {
        this.questionService.vibrate(Vibration.WARNING);
        this.questionService.skipQuestion(this.state.questionId).then(status => {
            if (status.ok) {
                this.setState({status: Status.IN_PROGRESS});
                this.startNextQuestion(QuestionStatus.SKIPPED);
            } else {
                //    TODO
            }
        });
        this.setState({status: Status.SKIPPED});

    };


    startNextQuestion(status) {
        if (!isUndefined(this.state.test)
            && !isUndefined(this.state.question)) {
            const test = this.state.test;
            test.questions.map(q => {
                if (q.id === this.state.questionId) {
                    q.status = status;
                }
                return q;
            });

            const url = getNextQuestionUrl(this.state.test, this.state.question.serialNumber);
            if (!isUndefined(url)) {
                let splitted = url.split("/");
                const qId = parseInt(splitted[splitted.length - 1]);
                this.setState({questionId: qId});
                this.downloadData();
            } else {
                this.props.history.replace("/TheormechApp/result/" + this.state.testId);
            }
        }
    };

    render() {
        const question = this.state.question;
        return (
            <section className={s.question_window}>
                <div className={s.sticky_container}>
                    <div className={s.back_button}>
                        <BackButton disabled={this.state.status !== Status.IN_PROGRESS ? true : undefined}/>
                    </div>
                </div>
                <div className={s.about}>
                    <div className={s.question_number}>
                        {
                            !isUndefined(question)
                                ? 'Вопрос ' + (question.serialNumber + 1) + '/' + this.state.questionsLength : ""
                        }
                    </div>
                    <div className={s.timer}>
                        {
                            this.state.timer === NO_TIMER
                                ? ""
                                : (
                                    <>
                                        Оставшееся время: <span>{this.state.timer}</span>
                                    </>
                                )

                        }
                    </div>

                </div>
                <div className={`${s.question_card} `}>
                    {this.state.animation === undefined
                        ?
                        <div className={s.question_text}>
                            {!isUndefined(question) ? question.questionText : ""}
                        </div>
                        :
                        <div className={s.animation_container}>
                            {this.state.animation === 'correct' ? <CorrectAnimation/> : ""}
                            {this.state.animation === 'incorrect' ? <IncorrectAnimation/> : ""}
                        </div>
                    }
                    <section className={s.answers_container}>
                        {!isUndefined(question) ? this.prepareList() : []}
                    </section>
                    <div className={s.control}>
                        <div className={s.score_container}>
                            <div>
                                Очки: <span className={s.score}>{!isUndefined(question) ? question.reward : 0}</span>
                            </div>
                        </div>
                        <div className={s.next_question}
                             onClick={this.state.status === Status.IN_PROGRESS ? this.onSkip : () => {
                             }}>
                            <div>Следующий</div>
                            <div className={s.chevron}/>
                        </div>
                    </div>

                    <div className={s.wave_card}/>
                </div>
                <div className={`${s.wave_card} ${s.external_waves}`}/>
            </section>
        )
    }
}

export default withRouter(Question);