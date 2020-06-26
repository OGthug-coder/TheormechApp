import React from 'react';
import News from "./News/News";
import Profile from "./Profile/Profile";

import s from './Main.module.css';

class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <div className={s.news_wrapper}>
                    <News/>
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