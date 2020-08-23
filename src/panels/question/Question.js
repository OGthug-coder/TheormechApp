import React from 'react';
import {withRouter} from 'react-router-dom';
import s from './Question.module.css';
import BackButton from "../../common/components/backbutton/BackButton";
import isUndefined from "../../common/IsUndefined";
import RightAnswerCode from "../../preview/util/RightAnswerCode";
import getNextQuestionUrl from "../../common/getNextQuestionUrl";
import QuestionStatus from "../../preview/util/QuestionStatus";
import HttpStatus from "../../common/api/HttpStatus";
import AnswerItemFragment from "./fragments/AnswerItemFragment";
import CorrectAnimation from "./fragments/CorectAnimation"
import IncorrectAnimation from "./fragments/IncorrectAnimation"
import Vibration from "../../common/Vibration";

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
        // this.questionService.getQuestion(this.state.questionId)
        //     .then(question => this.setState({question: question}));
        this.downloadData();
    }

    downloadData = () => {
        this.questionService.getTest(this.state.testId)
            .then(test => {
                const question = test.questions.find(q => q.id === this.state.questionId);
                this.questionService.startQuestion(question.id);
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
        this.questionService.passQuestion(this.state.questionId).then(response => {
            if (response.status === HttpStatus.OK) {
                setTimeout(() => {
                    this.setState({status: Status.IN_PROGRESS});
                    this.startNextQuestion(QuestionStatus.PASSED);
                    this.setState({animation: undefined})
                }, 1000);
            } else {

            }
        });
        this.setState({status: Status.PASSED});
    };

    onWrongAnswer = () => {
        this.setState({animation: 'incorrect'})
        this.questionService.vibrate(Vibration.ERROR);
        this.questionService.failQuestion(this.state.questionId).then(response => {
            if (response.status === HttpStatus.OK) {
                setTimeout(() => {
                    this.setState({status: Status.IN_PROGRESS});
                    this.startNextQuestion(QuestionStatus.PASSED);
                    this.setState({animation: undefined})
                }, 1000);
            } else {

            }
        });
        this.setState({status: Status.FAILED});
    };

    onSkip = () => {
        this.questionService.vibrate(Vibration.WARNING);
        this.questionService.skipQuestion(this.state.questionId).then(response => {
            if (response.status === HttpStatus.OK) {
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
                const qId = parseInt(url.split("/")[3]);
                this.setState({questionId: qId});
                this.downloadData();
            } else {
                this.props.history.replace("/result/" + this.state.testId);
            }
        }
    };

    // onClick(e) {
    //     console.log('pushed');
    // }

    onSwipeStart = (event) => {
    };

    onSwipeMove = (position, event) => {
        this.setState({position: position.y});
    };

    onSwipeEnd = (event) => {
        const start = this.state._position;
        const id = setInterval(start < 0 ? backAnimationDown : backAnimationUp, 1, this);
        let speed = Math.abs(start) / 83.82916675;
        let time = 0;

        function backAnimationDown(context) {
            let pos = context.state._position;
            time += 0.01;
            if (Math.abs(pos) <= 10) {
                clearInterval(id);
            } else {
                let move = nextMove(time) * speed;
                context.setState({_on: pos + move});
            }
        }

        function backAnimationUp(context) {
            let pos = context.state._position;
            if (pos < 0) {
                clearInterval(id);
            } else {
                context.setState({_position: pos - speed});
            }
        }

        const nextMove = (t) => 1 - t * t * t * t * t;
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
                        {/*Оставшееся время: <span>14:52</span>*/}
                    </div>
                </div>
                <div className={`${s.question_card} `}
                     style={{
                         top: `${this.state._position}px`
                     }}>
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
                                Счёт: <span className={s.score}>{!isUndefined(question) ? question.reward : 0}</span>
                            </div>
                        </div>
                        <div className={s.next_question}
                             onClick={this.state.status === Status.IN_PROGRESS ? this.onSkip : () => {
                             }}>
                            <div>Следующий</div>
                            <div className={s.chevron}/>
                        </div>

                    </div>

                    {/*TODO: implement swipes*/}
                    {/*<Swipe*/}
                    {/*    onSwipeStart={this.onSwipeStart}*/}
                    {/*    onSwipeMove={this.onSwipeMove}*/}
                    {/*    onSwipeEnd={this.onSwipeEnd}>*/}
                    {/*    <button className={s.slider}/>*/}
                    {/*</Swipe>*/}

                    <div className={s.wave_card}/>
                </div>
                <div className={`${s.wave_card} ${s.external_waves}`}/>
            </section>
        )
    }
}

export default withRouter(Question);