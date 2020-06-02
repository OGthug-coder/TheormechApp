import React from 'react';
import Swipe from 'react-easy-swipe';
import s from './Question.module.css';
import QuestionItemFragment from "./fragments/QuestionItemFragment";

class Question extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            position: 10,
        };

    }

    onClick(e) {
        console.log('pushed');
    }

    onSwipeStart = (event) => {
        console.log('Start swiping...', event);
    }

    onSwipeMove = (position, event) => {

        this.setState({position: position.y});
    }

    onSwipeEnd = (event) => {
        console.log('End swiping...', event);
        this.setState({position: 0});
    }

    render() {
        return (
            <section className={s.question_window}>
                <div className={s.about}>
                    <div className={s.question_number}>
                        Вопрос 12/20
                    </div>
                    <div className={s.timer}>
                        Оставшееся время: <span>14:52</span>
                    </div>
                </div>
                <div className={s.question_card}
                     style={ {top: `${this.state.position}px`} }>
                    <div className={s.question_text}>
                        В каком случае относительная скорость движущихся автомобилей максимальна?
                    </div>
                    <div className={s.answers_container}>
                        <QuestionItemFragment
                            answerType={'str'}
                            answerText={'Автомобили движутся навстречу друг другу'}
                            questionNumber={1}/>
                        <QuestionItemFragment
                            answerType={'str'}
                            answerText={'Догоняют друг друга'}
                            questionNumber={2}/>
                        <QuestionItemFragment
                            answerType={'str'}
                            answerText={'Векторы их скоростей составляют острый угол'}
                            questionNumber={3}/>
                        <QuestionItemFragment
                            answerType={'str'}
                            answerText={'Не знаю'}
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