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

    compare(o1, o2) {
        // replace day and month
        let date2 = o2.props['date'].split('-')
        date2 = date2[1] + '-' + date2[0] + '-' + date2[2]
        // replace day and month
        let date1 = o1.props['date'].split('-')
        date1 = date1[1] + '-' + date1[0] + '-' + date1[2]
        return new Date(date2) - new Date(date1);
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
        finished.sort(this.compare);
        unfinished.sort(this.compare);
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