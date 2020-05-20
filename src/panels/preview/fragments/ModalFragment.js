import React from "react";
import s from './ModalFragment.module.css';
import ProgressFragment from "./ProgressFragment";
import QuestionItemFragment from "./QuestionItemFragment";

class ModalFragment extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <section className={s.modal_window}>
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
                            <QuestionItemFragment/>
                        </li>
                        <li className={s.question_item}>
                            <QuestionItemFragment/>
                        </li>
                        <li className={s.question_item}>
                            <QuestionItemFragment/>
                        </li>
                        <li className={s.question_item}>
                            <QuestionItemFragment/>
                        </li>
                        <li className={s.question_item}>
                            <QuestionItemFragment/>
                        </li>
                    </ul>

                </div>
                <div className={s.button}>
                    <button>
                        Пройти тест
                    </button>
                </div>
            </section>
        )
    }

}

export default ModalFragment;