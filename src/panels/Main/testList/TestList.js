import React from 'react';

import s from './testList.module.css';
import Task from "./Task";

class TestList extends React.Component {
    constructor(props) {
        super(props);
        this.application = props.application;

        this.testListService = this.application.provideTestListService();
    }


    render() {
        const tests = this.testListService.getTests();
        return (
            <section className={s.news_container}>
                {tests.map(test => <Task title={test.title}
                        img={test.img}
                        date={test.date}
                        progress={test.progress}>
                    </Task>
                )}
                {/*<Task/>*/}
                {/*<Task/>*/}
                {/*<Task/>*/}
                {/*<Task/>*/}

            </section>
        )
    }
}

export default TestList;