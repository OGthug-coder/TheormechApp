import React from 'react';
import Swipe from 'react-easy-swipe';
import s from './Question.module.css';
import QuestionItemFragment from "./fragments/QuestionItemFragment";

class Question extends React.Component {
    constructor(props) {
        super(props);

        this.application = props.application;
        this.questionService = this.application.provideQuestionService();

        this.state = {
            position: 10
        };
    }

    componentDidMount() {
        this.questionService.getQuestion()
            .then(question => this.setState({question: question}));
    }

    onClick(e) {
        console.log('pushed');
    }

    onSwipeStart = (event) => {
        this.state.question !== undefined ? console.log(this.state.question.answers[0]) : console.log('kek');
        console.log('Start swiping...', event);
    }

    onSwipeMove = (position, event) => {

        this.setState({position: position.y});
    }

    onSwipeEnd = (event) => {
        console.log('End swiping...', event);
        const start = this.state.position;
        const id = setInterval(start < 0 ? backAnimationDown : backAnimationUp, 1, this);
        let speed = Math.abs(start) / 83.82916675;
        let time = 0;

        function backAnimationDown(context) {
            let pos = context.state.position;
            time += 0.01;
            console.log(time);
            if (Math.abs(pos) <= 10) {
                clearInterval(id);
            } else {
                let move = nextMove(time) * speed;
                console.log(move);
                context.setState({position: pos + move});
            }
        }

        function backAnimationUp(context) {
            let pos = context.state.position;
            if (pos < 0) {
                clearInterval(id);
            } else {
                context.setState({position: pos - speed});
            }
        }

        const nextMove = (t) => 1 - t*t*t*t*t;
    }


    render() {
        return (
            <section className={s.question_window}>
                <div className={s.about}>
                    <div className={s.question_number}>
                        {
                            this.state.question !== undefined
                                ? this.state.question.serialNumber : ""
                        }
                    </div>
                    <div className={s.timer}>
                        Оставшееся время: <span>14:52</span>
                    </div>
                </div>
                <div className={`${s.question_card} `}
                    style={{
                        top: `${this.state.position}px`
                    }}>
                    <div className={s.question_text}>
                        {
                            this.state.question !== undefined
                                ? this.state.question.questionText : ""
                        }
                    </div>
                    <div className={s.answers_container}>
                        <QuestionItemFragment
                            answerType={'str'}
                            application={this.application}
                            questionNumber={1}/>
                        <QuestionItemFragment
                            answerType={'str'}
                            application={this.application}
                            questionNumber={2}/>
                        <QuestionItemFragment
                            answerType={'str'}
                            application={this.application}
                            questionNumber={3}/>
                        <QuestionItemFragment
                            answerType={'str'}
                            application={this.application}
                            questionNumber={4}/>
                    </div>
                    <div className={s.control}>
                        <div className={s.score_container}>
                            Счёт: <span className={s.score}>10</span>
                        </div>
                        <a href="#" className={s.next_question}>
                            Следующий &raquo;
                        </a>
                    </div>
                    <Swipe
                        onSwipeStart={this.onSwipeStart}
                        onSwipeMove={this.onSwipeMove}
                        onSwipeEnd={this.onSwipeEnd}>
                        <button className={s.slider}/>
                    </Swipe>

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