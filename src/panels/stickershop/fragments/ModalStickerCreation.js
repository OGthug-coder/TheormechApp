import React from 'react';
import s from "./ModalStickerCreation.module.css";
import ModalWindow from "../../../common/components/modalwindow/ModalWindow";
import BackButton from "../../../common/components/backbutton/BackButton";
import Input from "../../../common/components/input/Input";
import Score from "../../../common/components/score/Score";
import Select from "../../../common/components/select/Select";


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
            btnWarning: false,
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
        this.setState({
            file: e.target.files[0],
            filename: e.target.files[0].name,
            img: URL.createObjectURL(e.target.files[0]),
            btnWarning: false,
        })
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
        if (this.state.file !== null) {

            const data = {
            img: this.state.file,
            name: this.state.name,
            description: this.state.description,
            quote: this.state.quote,
            cost: this.state.cost,
            }

            this.props.onSaveClick(data);
        } else {
            this.setState({btnWarning: true});
        }
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
                                className={s.preview_logo}
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
                                   maxLength={50}
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
                                   maxLength={110}
                                   onChange={this.onQuoteChange}/>
                        </div>

                        <div className={s.right_answer_choice}>
                            <div>
                                Стоимость
                            </div>
                            <Select 
                                name={"cost"} 
                                value={this.state.cost - 1}
                                onChange={(e) => this.onStickerPriceChange(e.target.value)}
                                options={{
                                    "0" : 1,
                                    "1" : 2,
                                    "2" : 3,
                                    "3" : 4,
                                    "4" : 5
                                }}
                            />
                            <Score key={100}
                               score={this.state.cost}/>
                        </div>

                        {
                            this.state.btnWarning ? (
                            <p className={s.warningText}>
                                Загрузите фото
                            </p>
                            ) : ""
                        }
                        
                        <button 
                            className={`${s.save_button} ${this.state.btnWarning ? s.btnWarning : ""}`}
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