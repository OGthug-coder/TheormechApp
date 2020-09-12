import React from 'react';

import s from './testList.module.css';
import Task from "./Task";
import {withRouter} from "react-router-dom";
import isUndefined from "../../../common/IsUndefined";

class TestList extends React.Component {
    constructor(props) {
        super(props);
        this.application = props.application;
        this.testListService = this.application.provideTestListService();

        this.state = {
            sortBy: props.socket,
            tests: [],
            isTouchStarted: false,
            editMode: false
        }

        console.log(navigator.userAgent)
    }

    componentDidMount() {
        this.fetchTests();
    }

    onTouchStart = () => {
        if (!this.state.isTouchStarted) {
            this.setState({isTouchStarted: true});
            this.longPressTimer = setTimeout(this.onLongTouch, 500);
            setTimeout(() => this.setState({ isTouchStarted: false}), 1000);
        }
    };

    onLongTouch = () => {
        console.log("onLongTouch");
        this.setState({editMode: !this.state.editMode});
    };

    onTouchEnd = () => {
        this.setState({touchStarted: false});
        clearTimeout(this.longPressTimer);
    };

    fetchTests = () => {
        this.testListService.getTests()
            .then(tests => {
                this.setState({tests: tests})
            });
    };

    prepareList() {
        let tests = [];

        this.state.tests.map(test => tests.push(
            <Task key={[test.id, this.state.editMode]}
                  id={test.id}
                  title={test.title}
                  img={test.img}
                  date={test.date.split(' ')[0]}
                  progress={test.progress}
                  application={this.application}
                  onTouchStart={this.onTouchStart}
                  onTouchEnd={this.onTouchEnd}
                  editMode={this.state.editMode}
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

export default withRouter(TestList);