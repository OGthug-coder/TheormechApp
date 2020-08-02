import React from 'react';
import s from './Question.module.css';
import Swipe from 'react-easy-swipe';
import QuestionItemFragment from "./fragments/QuestionItemFragment";
import BackButton from "../../common/components/BackButton/BackButton";
import isUndefined from "../../common/IsUndefined";
import RightAnswerCode from "../../preview/service/RightAnswerCode";

class Question extends React.Component {
    constructor(props) {
        super(props);

        this.application = props.application;
        this.questionService = this.application.provideQuestionService();
        this.questionId = parseInt(props.match.params.questionId);
        this.testId = parseInt(props.match.params.testId);

        this.state = {
            _position: 10,
        };
    }

    componentDidMount() {
        // this.questionService.getQuestion(this.questionId)
        //     .then(question => this.setState({question: question}));
        this.questionService.getTest(this.testId)
            .then(test => {
                const question = test.questions.find(q => q.id === this.questionId);
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
                });
                this.setState({questionsLength: uniqQuestions.length});
            });
    }

    prepareList = () => {
        if (!isUndefined(this.state.question)) {
            let list = [];

            this.state.question.answers.map(answer => {
                list.push(
                    <QuestionItemFragment
                        answerType={'str'}
                        answerText={answer.answer}
                        onRightAnswer={this.onRightAnswer}
                        onWrongAnswer={this.onWrongAnswer}
                        isRightAnswer={answer.isRight === RightAnswerCode.RIGHT_ANSWER}
                    />
                );
            });
            return list;
        }
    }

    onRightAnswer = () => {
        console.log("right");
        this.questionService.passQuestion(this.questionId);
    }

    onWrongAnswer = () => {
        console.log("wrong");
        debugger
        this.questionService.failQuestion(this.questionId);
    }

    onSkip = () => {
        this.questionService.skipQuestion(this.questionId);
    }

    onClick(e) {
        console.log('pushed');
    }

    onSwipeStart = (event) => {
    }

    onSwipeMove = (position, event) => {
        this.setState({position: position.y});
    }

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
    }


    render() {
        const question = this.state.question;
        return (
            <section className={s.question_window}>
                <div className={s.sticky_container}>
                    <div className={s.back_button}>
                        <BackButton/>
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
                    <div className={s.question_text}>
                        {!isUndefined(question) ? question.questionText : ""}
                    </div>
                    <section className={s.answers_container}>
                        {!isUndefined(question) ? this.prepareList() : []}
                    </section>
                    <div className={s.control}>
                        <div className={s.score_container}>
                            Счёт: <span className={s.score}>{!isUndefined(question) ? question.reward : 0}</span>
                        </div>
                        <a href="#" className={s.next_question}>
                            {/*TODO change to icon*/}
                            Следующий &raquo;
                        </a>
                    </div>

                    {/*TODO: implement swipes*/}
                    {/*<Swipe*/}
                    {/*    onSwipeStart={this.onSwipeStart}*/}
                    {/*    onSwipeMove={this.onSwipeMove}*/}
                    {/*    onSwipeEnd={this.onSwipeEnd}>*/}
                    {/*    <button className={s.slider}/>*/}
                    {/*</Swipe>*/}

                    <div className={s.wave_card}>
                        <div className={s.wave_one}/>
                        <div className={s.wave_two}/>
                    </div>
                </div>
                <div className={s.wave}>
                    <div className={s.wave_one}/>
                    <div className={s.wave_two}/>
                </div>
            </section>
        )
    }
}

export default Question;