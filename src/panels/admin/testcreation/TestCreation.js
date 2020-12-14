import React from 'react';
import s from "./TestCreation.module.css";
import TestCard from "../../main/testList/TestCard";
import BackHeader from "../../../common/components/backheader/BackHeader";
import Input from "../../../common/components/input/Input";
import isUndefined from "../../../common/IsUndefined";
import {toDefaultFormat} from "../../../common/convertDate";
import {withRouter} from "react-router-dom";
import Select from "../../../common/components/select/Select";


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
            this.props.history.push("/TheormechApp/createQuestions")
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
                                        <Select 
                                            name={"time"}
                                            value={this.state.timeToComplete}
                                            onChange={this.onTestTimeChange}
                                            options={{
                                                "1:0" : "01:00",
                                                "2:0" : "02:00",
                                                "3:0" : "03:00",
                                                "4:0" : "04:00",
                                                "5:0" : "05:00",
                                                "6:0" : "06:00",
                                                "7:0" : "07:00",
                                                "8:0" : "08:00",
                                                "9:0" : "09:00",
                                                "10:0" : "10:00",
                                                "15:0" : "15:00",
                                                "20:0" : "20:00",
                                                "25:0" : "25:00",
                                                "30:0" : "30:00",
                                                "35:0" : "35:00",
                                                "40:0" : "40:00",
                                                "45:0" : "45:00",
                                                "50:0" : "50:00",
                                                "55:0" : "55:00",
                                                "60:0" : "60:00",
                                            }}
                                        /> 
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