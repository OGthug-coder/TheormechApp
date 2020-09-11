import React from 'react';
import s from "./ModalAnswersCreation.module.css";
import ModalWindow from "../../../../common/components/modalwindow/ModalWindow";
import Input from "../../../../common/components/input/Input";


class ModalAnswersCreation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    onQuestionTextChange = (value) => {

    };

    onAnswerTextChange = (value, id) => {

    };

    render() {
        return (
            <div className={s.container}>
                <ModalWindow>
                    <div className={s.content}>
                        <div className={s.input_title}>
                            Вопрос
                        </div>
                        <div className={s.input}>
                            <Input placeholder={this.state.title}
                                   maxLength={135}
                                   onChange={this.onQuestionTextChange}/>
                        </div>
                        <div className={s.input_title}>
                            Варианты ответов
                        </div>
                        <div className={s.input}>
                            <Input id={0}
                                   placeholder={this.state.title}
                                   rows={1}
                                   maxLength={80}
                                   onChange={this.onAnswerTextChange}/>
                        </div>
                        <div className={s.input}>
                            <Input id={1}
                                   placeholder={this.state.title}
                                   rows={1}
                                   maxLength={80}
                                   onChange={this.onAnswerTextChange}/>
                        </div>
                        <div className={s.input}>
                            <Input id={2}
                                   placeholder={this.state.title}
                                   rows={1}
                                   maxLength={80}
                                   onChange={this.onAnswerTextChange}/>
                        </div>
                        <div className={s.input}>
                            <Input id={3}
                                   placeholder={this.state.title}
                                   rows={1}
                                   maxLength={80}
                                   onChange={this.onAnswerTextChange}/>
                        </div>

                        <div className={s.right_answer_choice}>
                            <div className={s.input_title}>
                                Верный ответ
                            </div>
                            <div className={s.select}>
                                <select name="time" onChange={this.onTestTimeChange}>
                                    <option value="15">15</option>
                                    <option value="30">30</option>
                                    <option value="45">45</option>
                                    <option value="60">60</option>
                                </select>
                            </div>
                        </div>

                    </div>
                </ModalWindow>
            </div>
        );
    }
}

export default ModalAnswersCreation;