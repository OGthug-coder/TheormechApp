import React from 'react';

import s from './testList.module.css';
import Task from "./Task";
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
        this.setState({touchStarted: false});
        clearTimeout(this.longPressTimer);
    };

    onDeleteClick = (e) => {
        console.log("onDeleteClick \n id=" + e.currentTarget.id);
    };

    fetchTests = () => {
        this.testListService.getTests()
            .then(tests => {
                this.setState({tests: tests})
            });
    };
    
    onAddClick = () => {
      this.setState({editMode: !this.state.editMode});
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
                  onDeleteClick={this.onDeleteClick}
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