import React from 'react';

import s from './testList.module.css';
import Task from "./Task";

class TestList extends React.Component {
    constructor(props) {
        super(props);
        this.application = props.application;

        this.testListService = this.application.provideTestListService();
    }

    bindData() {
        const tests = this.testListService.getTests();
        console.log(tests);
    }


    render() {
        this.bindData();
        return (
            <section className={s.news_container}>
                <Task className={"task"}/>
                <Task className={"task"}/>
                <Task className={"task"}/>
                <Task className={"task"}/>

            </section>
        )
    }
}

export default TestList;