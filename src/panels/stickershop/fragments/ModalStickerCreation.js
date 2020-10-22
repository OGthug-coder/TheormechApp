import React from 'react';
import s from "./ModalStickerCreation.module.css";
import ModalWindow from "../../../common/components/modalwindow/ModalWindow";
import BackButton from "../../../common/components/backbutton/BackButton";
import Input from "../../../common/components/input/Input";
import Score from "../../../common/components/score/Score";


class ModalStickerCreation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cost: 1,
            file: null,
            filename: '',
            img: require('../../../img/stickershop/noimage.svg'),
            name: '',
            description: '',
            quote: '',
        };
    }
    onBackClick = () => {
        this.props.onBackClick();
    };

    onStickerPriceChange = (value) => {
        this.setState({
            cost: parseInt(value) + 1,
        });
    };

    uploadFile = (e) => {
        console.log(e.target.files[0]);
        this.setState({
            file: e.target.files[0],
            filename: e.target.files[0].name,
            img: URL.createObjectURL(e.target.files[0]),
        })
        //this.setState({filename: this.fileInput.current.files[0].name});
    }

    onNameChange = (value) => {
        this.setState({name: value});
    };

    onDescriptionChange = (value) => {
        this.setState({description: value});
    };

    onQuoteChange = (value) => {
        this.setState({quote: value});
    }

    sendData = () => {
        const data = {
            img: this.state.file,
            name: this.state.name,
            description: this.state.description,
            quote: this.state.quote,
            cost: this.state.cost,
        }
        
        this.props.onSaveClick(data);
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
                            <img 
                                class={s.preview_logo}
                                src={this.state.img}
                                alt={"sticker pic"}
                            />
                        </div>

                        <div className={s.input_frame}>
                            <div className={s.input_button}>
                                <label className={s.input_label}>
                                    Загрузить фото
                                    <input 
                                        className={s.input_file} 
                                        type="file" 
                                        name="pic"
                                        accept="image/*" 
                                        onChange={this.uploadFile}
                                    />
                                </label>
                            </div>
                            <span className={s.filename}>{this.state.filename}</span>
                        </div>

                        <div className={s.input_title}>
                            Имя учёного
                        </div>

                        <div className={s.input}>
                            <Input placeholder={this.state.name}
                                   maxLength={135}
                                   onChange={this.onNameChange}/>
                        </div>

                        <div className={s.input_title}>
                            Описание
                        </div>

                        <div className={s.input}>
                            <Input placeholder={this.state.description}
                                   maxLength={150}
                                   onChange={this.state.onDescriptionChange}/>
                        </div>

                        <div className={s.input_title}>
                            Цитата
                        </div>

                        <div className={s.input}>
                            <Input placeholder={this.state.quote}
                                   maxLength={90}
                                   onChange={this.onQuoteChange}/>
                        </div>

                        <div className={s.right_answer_choice}>
                            <div>
                                Стоимость
                            </div>
                            <div className={s.select}>
                                <select name="cost"
                                        value={this.state.cost - 1}
                                        onChange={(e) => this.onStickerPriceChange(e.target.value)}>
                                    <option value="0">1</option>
                                    <option value="1">2</option>
                                    <option value="2">3</option>
                                    <option value="3">4</option>
                                </select>
                            </div>
                            <Score key={100}
                               score={this.state.cost}/>
                        </div>

                        <button 
                            className={s.save_button}
                            onClick={this.sendData}
                        >
                            Сохранить
                        </button>
                    </div>
                </ModalWindow>
            </div>
        );
    }
}

export default ModalStickerCreation;