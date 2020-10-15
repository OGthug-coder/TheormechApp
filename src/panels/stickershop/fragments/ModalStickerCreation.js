import React from 'react';
import s from "./ModalStickerCreation.module.css";
import ModalWindow from "../../../common/components/modalwindow/ModalWindow";
import BackButton from "../../../common/components/backbutton/BackButton";
import Input from "../../../common/components/input/Input";
import Score from "../../../common/components/score/Score";


class ModalStickerCreation extends React.Component {

    constructor(props) {
        super(props);
        this.fileInput = React.createRef();
        this.state = {
            price: 0,
            file: '',
        };
    }

    onSaveClick = () => {

    };

    onBackClick = () => {
        this.onSaveClick();
        this.props.onBackClick();
    };

    onStickerPriceChange = (value) => {
        this.setState({
            price: value,
        });
    };

    uploadFile = () => {
        this.setState({file: this.fileInput.current.files[0].name});
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

                        <div className={s.input_frame}>
                            <div className={s.input_button}>
                                <label className={s.input_label}>
                                    Загрузить фото:
                                    <input 
                                        className={s.input_file} 
                                        type="file" 
                                        name="pic" 
                                        ref={this.fileInput}
                                        onChange={this.uploadFile}
                                    />
                                </label>
                            </div>
                            <span className={s.filename}>{this.state.file}</span>
                        </div>

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
                                   maxLength={150}/>
                        </div>

                        <div className={s.input_title}>
                            Цитата
                        </div>

                        <div className={s.input}>
                            <Input placeholder={''}
                                   maxLength={90}/>
                        </div>

                        <div className={s.right_answer_choice}>
                            <div>
                                Стоимость
                            </div>
                            <div className={s.select}>
                                <select name="price"
                                        value={this.state.price}
                                        onChange={(e) => this.onStickerPriceChange(e.target.value)}>
                                    <option value="0">1</option>
                                    <option value="1">2</option>
                                    <option value="2">3</option>
                                    <option value="3">4</option>
                                </select>
                            </div>
                            <Score key={100}
                               score={parseInt(this.state.price) + 1}/>
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