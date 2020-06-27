import React from 'react';

import s from './testList.module.css';
import Task from "./Task";

class TestList extends React.Component {
    constructor(props) {
        super(props);
        this.application = props.application;
        this.testListService = this.application.provideTestListService();

        this.state = {
            sortBy: props.socket,
            tests: []
        }

    }

    componentDidMount() {
        this.setState({tests: this.testListService.getTests()})
    }

    prepareList() {
        let finished = [];
        let unfinished = [];

        this.state.tests.map(test => {
            if (test.progress === 3) {
                finished.push(
                    <Task title={test.title}
                          img={test.img}
                          date={test.date.split(' ')[0]}
                          progress={test.progress}
                    />)
            } else {
                unfinished.push(
                    <Task title={test.title}
                          img={test.img}
                          date={test.date.split(' ')[0]}
                          progress={test.progress}
                    />
                )
            }
        });
        finished = this.testListService.sort(finished)
        unfinished = this.testListService.sort(unfinished)
        return unfinished.concat(finished);
    }


    render() {
        return (
            <section className={s.news_container}>
                {this.prepareList()}
            </section>
        )
    }
}

export default TestList;