import React from 'react';

import s from './testList.module.css';
import TestCard from "./TestCard";
import {Link, withRouter} from "react-router-dom";
import isUndefined from "../../../common/IsUndefined";
import UserRoles from "../../../common/UserRoles";

class TestList extends React.Component {
    constructor(props) {
        super(props);
        this.application = props.application;
        this.testListService = this.application.provideTestListService();

        this.state = {
            sortBy: props.socket,
            tests: [],
            isTouchStarted: false,
            editMode: props.editMode,
        }
    }

    componentDidMount() {
        this.application.provideUser()
            .then(user => this.setState({user: user}))

        this.fetchTests();
    }

    onTouchStart = () => {
        if (!this.state.isTouchStarted) {
            this.setState({isTouchStarted: true});
            this.longPressTimer = setTimeout(this.onLongTouch, 500);
            setTimeout(() => this.setState({isTouchStarted: false}), 1000);
        }
    };

    onLongTouch = () => {
        if (!isUndefined(this.state.user) && this.state.user.role === UserRoles.ADMIN) {
            this.setState({editMode: !this.state.editMode});
        }
    };

    onTouchEnd = () => {
        this.setState({isTouchStarted: false});
        clearTimeout(this.longPressTimer);
    };

    onEditClick = (id) => {
        console.log("onEditClick " + id);
    };

    onDeleteClick = (e) => {
        this.testListService.deleteTest(e.currentTarget.id)
            .then(tests => this.setState({tests: tests}));
    };

    fetchTests = () => {
        this.testListService.getTests()
            .then(tests => {
                this.setState({tests: tests})
            });
    };

    onAddClick = () => {
        this.setState({editMode: !this.state.editMode});
        this.application.createTestEditHelper({});
    };

    prepareList() {
        let tests = [];

        this.state.tests.map(test => tests.push(
            <TestCard key={[test.id, this.state.editMode]}
                      id={test.id}
                      title={test.title}
                      img={test.img}
                      date={test.date.split(' ')[0]}
                      progress={test.progress}
                      application={this.application}
                      onTouchStart={this.onTouchStart}
                      onTouchEnd={this.onTouchEnd}
                      editMode={this.state.editMode}
                      onDeleteClick={this.onDeleteClick}
                      onEditClick={this.onEditClick}
            />));
        tests = this.testListService.sort(tests)

        return tests
    }


    render() {
        return (
            <section className={s.news_container}>
                {this.prepareList()}
                {
                    this.state.editMode ? (
                        <Link to={"/createNewTest/"}
                              className={s.add_button}
                              onClick={this.onAddClick}/>
                    ) : ""
                }
            </section>
        )
    }
}

export default withRouter(TestList);