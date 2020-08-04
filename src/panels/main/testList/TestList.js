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
        this.testListService.getTests()
            .then(tests => {
                this.setState({tests: tests})
            });
    }

    prepareList() {
        let tests = [];

        this.state.tests.map(test => tests.push(
            <Task key={test.id}
                  id={test.id}
                  title={test.title}
                  img={test.img}
                  date={test.date.split(' ')[0]}
                  progress={test.progress}
                  application={this.application}
            />));
        tests = this.testListService.sort(tests)
        return tests
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