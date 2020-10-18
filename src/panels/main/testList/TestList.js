import React from 'react';

import s from './testList.module.css';
import TestCard from "./TestCard";
import {withRouter} from "react-router-dom";
import isUndefined from "../../../common/IsUndefined";
import UserRoles from "../../../common/UserRoles";
import ConfirmModal from "../../../common/components/confirmmodal/ConfirmModal";

class TestList extends React.Component {
    constructor(props) {
        super(props);
        this.application = props.application;
        this.testListService = this.application.provideTestListService();

        this.state = {
            sortBy: props.socket,
            tests: [],
            editMode: props.editMode,
            confirmDeletion: false,
        }
    }

    componentDidMount() {
        this.application.provideUser()
            .then(user => this.setState({user: user}))

        this.fetchTests();
    }

    onEditClick = (id) => {
        this.setState({editMode: !this.state.editMode});
        const test = this.testListService.getTestFromRepo(id);
        this.application.createTestEditHelper(test);

        this.props.history.push("/testEditing");
    };

    onLongClick = () => {
        if (!isUndefined(this.state.user) && this.state.user.role === UserRoles.ADMIN) {
            this.setState({editMode: !this.state.editMode});
        }
    };

    onDeleteClick = (e) => {
        this.setState({confirmDeletion: e.currentTarget.id})
    };

    onDeleteApprove = (e) => {
        console.log('onDeleteApprove');
        this.testListService.deleteTest(this.state.confirmDeletion)
            .then(tests => this.setState({tests: tests}));
        this.setState({confirmDeletion: false});
    };

    onDeleteCancel = (e) => {
        console.log('onDeleteCancel');
        this.setState({confirmDeletion: false})
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

        this.props.history.push("/testEditing");
    };

    prepareList() {
        let tests = [];

        this.state.tests.map(test => tests.push(
            <TestCard key={[test.id, this.state.editMode]}
                      id={test.id}
                      title={test.title}
                      img={test.img}
                      date={test.date}
                      progress={test.progress}
                      application={this.application}
                      onLongClick={this.onLongClick}
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
                        <div className={s.add_button}
                             onClick={this.onAddClick}/>
                    ) : ""
                }
                {
                    this.state.confirmDeletion !== false ? (
                        <div className={s.confirm_modal_container}>
                            <div className={s.confirm_modal}>
                                <ConfirmModal text={'Вы уверены, что хотите удалить тест?'}
                                              onApprove={this.onDeleteApprove}
                                              onCancel={this.onDeleteCancel}/>
                            </div>
                        </div>
                    ) : ""
                }

            </section>
        )
    }
}

export default withRouter(TestList);