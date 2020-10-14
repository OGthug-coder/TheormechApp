import React from 'react';
import s from "./TestCreation.module.css";
import TestCard from "../../main/testList/TestCard";
import BackHeader from "../../../common/components/backheader/BackHeader";
import Input from "../../../common/components/input/Input";
import isUndefined from "../../../common/IsUndefined";
import {toDefaultFormat} from "../../../common/convertDate";
import {withRouter} from "react-router-dom";

class TestCreation extends React.Component {
    constructor(props) {
        super(props);

        this.application = props.application;
        this.testCreationService = this.application.provideTestCreationService();
        this.testEditHelper = this.application.provideTestEditHelper();

        const test = this.testEditHelper.getTest();

        this.state = {
            limited: this.testCreationService.getLimitation(test),
            timeToComplete: test.timeToComplete,
            delayed: this.testCreationService.getDelay(test),
            date: !isUndefined(test.date)
                ? toDefaultFormat(test.date).toISOString().substring(0, 19)
                : new Date().toISOString().substring(0, 19),
            title: !isUndefined(test) && !isUndefined(test.title) ? test.title : "Введите название",
            description: !isUndefined(test) && !isUndefined(test.description)
                ? test.description
                : "Введите описание",
            img: !isUndefined(test) && !isUndefined(test.img)
                ? test.img
                : require('../../../img/admin/test_placeholder.svg'),
        }
    }

    componentWillUnmount() {
        if (!this.state.limited
            && this.state.timeToComplete !== null
            && this.state.timeToComplete !== "null") {
            this.testEditHelper.updateValue("timeToComplete", null);
        }
        this.testEditHelper.sendChanges();
    }

    onTitleChange = (value) => {
        this.setState({title: value});
        this.testEditHelper.updateValue("title", value)
    };

    onDescriptionChange = (value) => {
        this.setState({description: value})
        this.testEditHelper.updateValue("description", value)
    };

    onUploadImage = (e) => {
        const imgFile = URL.createObjectURL(e.target.files[0]);
        this.setState({img: imgFile});
        this.testEditHelper.updateValue('img', e.target.files[0]);
    };

    onTimeModeChange = () => {
        this.setState({limited: !this.state.limited});
    };

    onTestTimeChange = (e) => {
        this.setState({timeToComplete: e.target.value})
        this.testEditHelper.updateValue('timeToComplete', e.target.value);

    };

    onPublishDelay = () => {
        if (this.state.delayed === true) {
            const date = new Date().toISOString().substring(0, 19)
            this.setState({
                date: date,
                delayed: !this.state.delayed
            })
            this.testEditHelper.updateValue('date', date);
        } else {
            this.setState({delayed: !this.state.delayed});
        }
    };

    onPublishDateTimeChange = (e) => {
        this.setState({date: e.target.value})
        this.testEditHelper.updateValue('date', e.target.value);
    };

    onQuestionEditClick = () => {
        if (this.state.title !== "Введите название" && this.state.title !== '') {
            this.props.history.push("/createQuestions")
        }
    };

    render() {
        return (
            <>
                <BackHeader/>
                <section className={s.page}>
                    <div className={s.test_card}>
                        <TestCard key={[this.state.title, this.state.img]}
                                  disableButton
                                  id={Math.random()}
                                  title={this.state.title}
                                  img={this.state.img}
                                  date={this.state.date}
                                  progress={new Promise(() => 0)}/>
                    </div>
                    <form>
                        <div className={s.input_title}>
                            Название
                        </div>
                        <div className={s.input}>
                            <Input placeholder={this.state.title}
                                   maxLength={70}
                                   onChange={this.onTitleChange}/>
                        </div>
                        <div className={s.input_title}>
                            Описание
                        </div>
                        <div className={s.input}>
                            <Input autoResize
                                   onChange={this.onDescriptionChange}
                                   placeholder={this.state.description}/>
                        </div>

                        <label className={s.custom_file_upload}>
                            <input type="file"
                                   accept="image/*"
                                   onChange={this.onUploadImage}/>
                            <div>
                                Загрузить фото
                            </div>
                        </label>

                        <div className={s.input_title}>
                            Время выполнения теста
                        </div>
                        <div className={s.time_limit}>
                            <div className={s.time_limit_item}>
                                <input type={"radio"}
                                       onChange={this.onTimeModeChange}
                                       checked={!this.state.limited}
                                       name={"time_limit"}
                                       id={"no_limit"}
                                       value={"no_limit"}/>
                                <label htmlFor={"no_limit"}>Без ограничений</label>
                            </div>
                            <div className={s.time_limit_item}>
                                <input type={"radio"}
                                       checked={this.state.limited}
                                       onChange={this.onTimeModeChange}
                                       name={"time_limit"}
                                       id={"limited"}
                                       value={"limited"}/>
                                <label htmlFor={"limited"}>С ограничением</label>
                                {
                                    this.state.limited
                                        ?
                                        <div className={s.select}>
                                            <select name="time"
                                                    value={this.state.timeToComplete}
                                                    onChange={this.onTestTimeChange}>
                                                <option value="15">15</option>
                                                <option value="30">30</option>
                                                <option value="45">45</option>
                                                <option value="60">60</option>
                                            </select>
                                            минут
                                        </div>
                                        : ""
                                }

                            </div>
                        </div>
                        <div className={s.input_title}>
                            Публикация
                        </div>
                        <div className={s.time_limit}>
                            <div className={s.time_limit_item}>
                                <input type={"radio"}
                                       checked={!this.state.delayed}
                                       onChange={this.onPublishDelay}
                                       name={"delayed"}
                                       id={"no_delay"}
                                       value={"no_delay"}/>
                                <label htmlFor={"no_delay"}>Мгновенная </label>
                            </div>
                            <div className={`${s.time_limit_item} ${s.publish_delay_item}`}>
                                <input type={"radio"}
                                       checked={this.state.delayed}
                                       onChange={this.onPublishDelay}
                                       name={"delayed"}
                                       id={"delayed"}
                                       value={"delayed"}/>
                                <label htmlFor={"delayed"}>Запланированная </label>
                            </div>
                        </div>
                        {
                            this.state.delayed
                                ?
                                <input type={"datetime-local"}
                                       onChange={this.onPublishDateTimeChange}
                                       value={this.state.date}
                                       min={new Date().toISOString().substring(0, 19)}/>
                                : ""
                        }
                    </form>
                    <div className={s.next}
                         onClick={this.onQuestionEditClick}>
                        <div>Заполнить вопросы</div>
                        <div className={s.chevron}/>
                    </div>
                </section>
            </>
        )
    }
}

export default withRouter(TestCreation);