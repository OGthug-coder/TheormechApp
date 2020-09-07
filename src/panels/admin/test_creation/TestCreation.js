import React from 'react';
import s from "./TestCreation.module.css";
import Task from "../../main/testList/Task";
import BackHeader from "../../../common/components/backheader/BackHeader";
import Input from "./fragments/Input";

class TestCreation extends React.Component {
    constructor(props) {
        super(props);

        let today = new Date();

        this.state = {
            title: 'Введите название',
            img: require('../../../img/admin/test_placeholder.svg'),
            date: today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear(),
        }
    }

    componentDidMount() {
        // this.state.lastChanged;
    }

    onTitleChange = (value) => {
        this.setState({
            title: value,
        });
    };

    onUploadImage = (e) => {
        const imgFile = URL.createObjectURL(e.target.files[0]);
        this.setState({img: imgFile});
    };

    render() {
        return (
            <>
                <BackHeader/>
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
                            Загрузить фото
                            {/*<img src={}>*/}
                        </div>
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
                            <Input autoResize placeholder={"Введите описание"}/>
                        </div>

                        <label className={s.custom_file_upload}>
                            <input type="file" onChange={this.onUploadImage}/>
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
                                       name={"time_limit"}
                                       id={"no_limit"}
                                       value={"no_limit"}/>
                                <label htmlFor={"no_limit"}>Без ограничений</label>
                            </div>
                            <div className={s.time_limit_item}>
                                <input type={"radio"}
                                       name={"time_limit"}
                                       id={"limited"}
                                       value={"limited"}/>
                                <label htmlFor={"limited"}>С ограничением</label>
                            </div>
                        </div>
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