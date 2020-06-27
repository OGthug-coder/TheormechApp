import React from 'react';
import TestList from "./testList/TestList";
import Profile from "./Profile/Profile";

import s from './Main.module.css';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.application = props.application;
    }

    render() {
        return (
            <>
                <div className={s.news_wrapper}>
                    <TestList application={this.application} sortBy={'date'}/>
                </div>
                <div className={s.profile}>
                    <Profile/>
                </div>
                <div className={s.background}>
                    <div/>
                    <div/>
                    <div/>
                </div>
            </>
        )
    }
}

export default Main;