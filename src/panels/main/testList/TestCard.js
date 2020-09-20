import React from 'react';

import s from './task.module.css';
import {Link} from "react-router-dom";
import isUndefined from "../../../common/IsUndefined";


class TestCard extends React.Component {
    constructor(props) {
        super(props);

        this.application = props.application;

        this.state = {
            id: props.id,
            title: props.title,
            img: props.img,
            date: props.date,
            onTouchStart: props.onTouchStart,
            onTouchEnd: props.onTouchEnd,
            editMode: props.editMode,
            onDeleteClick: props.onDeleteClick,
            onEditClick: props.onEditClick,
        }

        this.clickDisabler = true;

        props.progress.then(progress => this.setState({progress: progress}));
    }

    renderButton = () => {
        if (this.state.editMode) {
            return (
                <Link to={`#`}
                      style={{visibility: "hidden"}}
                      className={`${s.start_button} ${s.disabled}`}>
                    Начать тест
                </Link>
            );
        } else if (isUndefined(this.props.disableButton)) {
            return (
                <Link to={`/preview/${this.state.id}`}
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
        this.state.onTouchStart();
    };

    onTouchEnd = () => {
        if (this.clickDisabler) {
            this.clickDisabler = false;
        }
        this.state.onTouchEnd();
    };

    onClick = () => {
        if (!this.clickDisabler) {
            this.state.onEditClick(this.state.id);
        }
    };

    render() {
        return (
            <div>
                <div
                     className={s.card}
                     onClick={this.state.editMode ? this.onClick : () => {}}
                     onTouchStart={this.onTouchStart}
                     onTouchEnd={this.onTouchEnd}>
                    <img className={s.pic}
                         src={this.state.img}
                         alt={"test"}/>
                    <div className={s.container}>
                        <div className={s.name}>
                            {this.state.title}
                        </div>

                        <div className={s.info}>
                            <div className={s.date}>{this.state.date}</div>
                            <div className={s.progress}>
                                <span className={this.state.progress >= 1 ? s.dot_on : s.dot}/>
                                <span className={this.state.progress >= 2 ? s.dot_on : s.dot}/>
                                <span className={this.state.progress >= 3 ? s.dot_on : s.dot}/>
                            </div>
                        </div>
                        {
                            this.state.editMode ? (
                                <>
                                    <div id={this.state.id}
                                         className={s.delete_button}
                                         onClick={this.state.onDeleteClick}/>
                                    <div className={s.status_icon}/>
                                </>
                            ) : (
                                ""
                            )
                        }
                    </div>
                </div>
                {this.renderButton()}
            </div>
        )
    }
}

export default TestCard;