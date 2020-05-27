import React from 'react';

import s from "./Answer.module.css";

class Answer extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            onClick: props.onClick,
        };
    }

    render() {
        return (
            <div className={s.answer_block}>
                <div className={s.head}>
                    <div className={s.question_label}>
                        <img src={require("../../img/answer/question.png")} width="24" height="24" />
                    </div>
                    <button className={s.exit} onClick={this.state.onClick} />
                </div>
                <div className={s.question}>В каком случае относительная скорость движущихся автомобилей максимальна?</div>
                <div className={s.ans_title}>Правильный ответ:</div>
                <div className={s.ans}>Автомобили движутся навстречу друг другу</div>
                <div className={s.explanation_title}>Почему?</div>
                <div className={s.explanation}>Потому что lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
            </div>
        )
    }
}

export default Answer;
