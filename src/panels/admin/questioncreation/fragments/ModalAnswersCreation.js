import React from 'react';
import s from "./ModalAnswersCreation.module.css";
import ModalWindow from "../../../../common/components/modalwindow/ModalWindow";
import Input from "../../../../common/components/input/Input";
import BackButton from "../../../../common/components/backbutton/BackButton";


class ModalAnswersCreation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: ""
        };
    }

    onQuestionTextChange = (value) => {

    };

    onAnswerTextChange = (value, id) => {

    };

    onExplainTextChange = (value) => {

    };

    onSaveClick = () => {

    };

    render() {
        return (
            <div className={s.container}>
                <div className={s.sticky_container}>
                    <div className={`${s.back_button}`}>
                        <BackButton disabled onClick={this.props.onBackClick}/>
                    </div>
                </div>
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
                            <div>
                                Верный ответ
                            </div>
                            <div className={s.select}>
                                <select name="time" onChange={this.onTestTimeChange}>
                                    <option value="0">1</option>
                                    <option value="1">2</option>
                                    <option value="2">3</option>
                                    <option value="3">4</option>
                                </select>
                            </div>
                        </div>
                        <div className={s.input_title}>
                            Варианты ответов
                        </div>
                        <Input placeholder={this.state.title}
                               maxLength={285}
                               onChange={this.onExplainTextChange}/>
                        <button className={s.save_button}
                                onClick={this.onSaveClick}>
                            Сохранить
                        </button>
                    </div>
                </ModalWindow>
            </div>
        );
    }
}

export default ModalAnswersCreation;