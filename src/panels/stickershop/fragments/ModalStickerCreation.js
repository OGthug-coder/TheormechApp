import React from 'react';
import s from "./ModalStickerCreation.module.css";
import ModalWindow from "../../../common/components/modalwindow/ModalWindow";
import BackButton from "../../../common/components/backbutton/BackButton";
import Input from "../../../common/components/input/Input";
import Score from "../../../common/components/score/Score";


class ModalStickerCreation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className={s.container}>
                <div className={s.sticky_container}>
                    <div className={`${s.back_button}`}>
                        <BackButton disabled onClick={this.onBackClick}/>
                    </div>
                </div>
                <ModalWindow>
                    <div className={s.content}>

                        <div className={s.preview}>
                            <div className={s.preview_logo}/>
                        </div>

                        <button className={s.save_button}>
                            Загрузить фото
                        </button>

                        <div className={s.input_title}>
                            Имя учёного
                        </div>

                        <div className={s.input}>
                            <Input placeholder={''}
                                   maxLength={135}/>
                        </div>

                        <div className={s.input_title}>
                            Описание
                        </div>

                        <div className={s.input}>
                            <Input placeholder={''}
                                   maxLength={135}/>
                        </div>

                        <div className={s.right_answer_choice}>
                            <div>
                                Стоимость
                            </div>
                            <div className={s.select}>
                                <select name="time"
                                        value={0}>
                                    <option value="0">1</option>
                                    <option value="1">2</option>
                                    <option value="2">3</option>
                                    <option value="3">4</option>
                                </select>
                            </div>
                            <Score key={100}
                               score={1}/>
                        </div>

                        <button className={s.save_button}>
                            Сохранить
                        </button>
                    </div>
                </ModalWindow>
            </div>
        );
    }
}

export default ModalStickerCreation;