import React from 'react';
import s from "./TestCreation.module.css";
import Task from "../../main/testList/Task";
import BackHeader from "../../../common/components/backheader/BackHeader";

class TestCreation extends React.Component {
    constructor(props) {
        super(props);

        let today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        this.state = {
            title: 'Введите название',
            img: require('../../../img/admin/test_placeholder.svg'),
            date: today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear(),
        }
    }

    render() {
        return (
            <section className={s.page}>
                    <BackHeader />
                <div className={s.test_card}>
                    <Task id={Math.random()}
                          title={this.state.title}
                          img={this.state.img}
                          date={this.state.date}
                    progress={new Promise(() => 0)}/>
                </div>
            </section>
        )
    }
}

export default TestCreation;