import React from 'react';
import s from "./TestCreation.module.css";
import Task from "../../main/testList/Task";
import BackHeader from "../../../common/components/backheader/BackHeader";
import Input from "../../../common/components/input/Input";


class TestCreation extends React.Component {
    constructor(props) {
        super(props);

        this.application = props.application;
        this.testCreationService = this.application.provideTestCreationService();
        this.testEditHelper = this.application.provideTestEditHelper();

        this.state = {
            limited: false,
            delayed: false,
            title: "Введите название",
            description: "",
            img: require('../../../img/admin/test_placeholder.svg'),
            date: new Date().toISOString().substring(0, 19),
        }
    }

    componentDidMount() {}

    componentWillUnmount() {
        console.log("componentWillUnmount")
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
        this.setState({delayed: !this.state.delayed});
    };

    onPublishDateTimeChange = (e) => {
        this.setState({date: e.target.value})
        this.testEditHelper.updateValue('date', e.target.value);
    };

    render() {
        return (
            <>
                <BackHeader />
                <section className={s.page}>
                    <div className={s.test_card}>
                        <Task key={[this.state.title, this.state.img]}
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
                            <Input placeholder={'Введите название'}
                                   maxLength={70}
                                   onChange={this.onTitleChange}/>
                        </div>
                        <div className={s.input_title}>
                            Описание
                        </div>
                        <div className={s.input}>
                            <Input autoResize
                                   onChange={this.onDescriptionChange}
                                   placeholder={"Введите описание"}/>
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
                                       defaultChecked
                                       onChange={this.onTimeModeChange}
                                       name={"time_limit"}
                                       id={"no_limit"}
                                       value={"no_limit"}/>
                                <label htmlFor={"no_limit"}>Без ограничений</label>
                            </div>
                            <div className={s.time_limit_item}>
                                <input type={"radio"}
                                       onChange={this.onTimeModeChange}
                                       name={"time_limit"}
                                       id={"limited"}
                                       value={"limited"}/>
                                <label htmlFor={"limited"}>С ограничением</label>
                                {
                                    this.state.limited
                                        ?
                                        <div className={s.select}>
                                            <select name="time" onChange={this.onTestTimeChange}>
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
                                       defaultChecked
                                       onChange={this.onPublishDelay}
                                       name={"delayed"}
                                       id={"no_delay"}
                                       value={"no_delay"}/>
                                <label htmlFor={"no_delay"}>Мгновенная </label>
                            </div>
                            <div className={`${s.time_limit_item} ${s.publish_delay_item}`}>
                                <input type={"radio"}
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
                    <div className={s.next}>
                        <div>Заполнить вопросы</div>
                        <div className={s.chevron}/>
                    </div>
                </section>
            </>
        )
    }
}

export default TestCreation;