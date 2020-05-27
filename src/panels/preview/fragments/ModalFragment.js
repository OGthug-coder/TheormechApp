import React from "react";
import s from './ModalFragment.module.css';
import ProgressFragment from "./ProgressFragment";
import QuestionItemFragment from "./QuestionItemFragment";
import {Link} from "react-router-dom";

class ModalFragment extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            onClick: props.onClick,
            className: props.className
        };

    }

    render() {
        return (
            <section className={`${s.modal_window} ${this.state.className ? s.blur : ""}`}>
                <div className={s.slider_wrapper}>
                    <div className={s.slider}></div>
                </div>
                <div className={s.content_wrapper}>
                    <div className={s.title}>
                        Как приручить интеграл Римана?
                    </div>
                    <div className={s.status}>
                        Состояние: Не завершено
                    </div>
                    <div className={s.description}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing pariatur. Excepteurproident,
                        sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </div>
                    <div className={s.progress}>
                        <div>
                            Мой прогресс
                        </div>
                        <ProgressFragment/>
                    </div>
                    <ul className={s.question_list}>
                        <li className={s.question_item}>
                            <QuestionItemFragment onClick={this.state.onClick}/>
                        </li>
                        <li className={s.question_item}>
                            <QuestionItemFragment onClick={this.state.onClick}/>
                        </li>
                        <li className={s.question_item}>
                            <QuestionItemFragment onClick={this.state.onClick}/>
                        </li>
                        <li className={s.question_item}>
                            <QuestionItemFragment onClick={this.state.onClick}/>
                        </li>
                        <li className={s.question_item}>
                            <QuestionItemFragment onClick={this.state.onClick}/>
                        </li>
                    </ul>

                </div>
                <div className={s.button}>
                        <Link to={'/question'} className={s.link}>
                            <div> Пройти тест </div>
                        </Link>
                </div>
            </section>
        )
    }

}

export default ModalFragment;