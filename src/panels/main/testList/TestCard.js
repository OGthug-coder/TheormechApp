import React from 'react';

import s from './task.module.css';
import {Link} from "react-router-dom";
import isUndefined from "../../../common/IsUndefined";
import {toDefaultFormat} from "../../../common/convertDate";


class TestCard extends React.Component {
    constructor(props) {
        super(props);

        this.application = props.application;
        this.state = {
            date: this.prepareDate(this.props.date),
            isTouchStarted: false,
            isDelayed: toDefaultFormat(this.props.date) > new Date(),
        }

        this.clickDisabler = true;

        props.progress.then(progress => this.setState({progress: progress}));
    }

    prepareDate = (date) => {
        let dateTime = toDefaultFormat(date);
        return `${dateTime.getDate()}.${dateTime.getMonth() + 1}.${dateTime.getFullYear()}`;
    };

    renderButton = () => {
        if (this.props.editMode) {
            return (
                <Link to={`#`}
                      style={{visibility: "hidden"}}
                      className={`${s.start_button} ${s.disabled}`}>
                    Начать тест
                </Link>
            );
        } else if (isUndefined(this.props.disableButton)) {
            return (
                <Link to={`/TheormechApp/preview/${this.props.id}`}
                      className={s.start_button}>
                    Начать тест
                </Link>
            )
        } else {
            return (
                <Link to={`#`}
                      className={`${s.start_button} ${s.disabled}`}>
                    Начать тест
                </Link>
            )
        }
    };

    onTouchStart = () => {
        this.clickDisabler = true;
        if (!this.state.isTouchStarted) {
            this.setState({isTouchStarted: true});
            this.longPressTimer = setTimeout(this.onLongTouch, 500);
            setTimeout(() => this.setState({isTouchStarted: false}), 1000);
        }
    };

    onTouchEnd = () => {
        if (this.clickDisabler) {
            this.clickDisabler = false;
        }
        this.setState({isTouchStarted: false});
        clearTimeout(this.longPressTimer);
    };

    onLongTouch = () => {
        this.props.onLongClick();
    };

    onClick = () => {
        if (!this.clickDisabler) {
            this.props.onEditClick(this.props.id);
        }
    };

    render() {
        return (
            <div>
                <div
                    className={s.card}
                    onClick={this.props.editMode ? this.onClick : () => {
                    }}
                    onTouchStart={this.onTouchStart}
                    onTouchEnd={this.onTouchEnd}>
                    <img className={s.pic}
                         src={this.props.img}
                         alt={"test"}/>
                    <div className={s.container}>
                        <div className={s.name}>
                            {this.props.title}
                        </div>

                        <div className={s.info}>
                            <div className={s.date}>{this.state.date}</div>
                            <div className={s.progress}>
                                <span className={this.state.progress >= 1 ? s.dot_on : s.dot}/>
                                <span className={this.state.progress >= 2 ? s.dot_on : s.dot}/>
                                <span className={this.state.progress >= 3 ? s.dot_on : s.dot}/>
                            </div>
                        </div>
                    </div>
                </div>
                {this.renderButton()}
                {
                    this.props.editMode ? (
                        <>
                            <div className={s.delete_button}>
                                <div id={this.props.id}
                                     onClick={this.props.onDeleteClick}/>
                            </div>
                            {
                                this.state.isDelayed ? (
                                    <div className={s.status_icon}>
                                        <div/>
                                    </div>
                                ) : ""
                            }
                        </>
                    ) : (
                        ""
                    )
                }
            </div>
        )
    }
}

export default TestCard;