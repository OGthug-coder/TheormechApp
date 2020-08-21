import React from 'react';
import TestList from "./testList/TestList";
import Profile from "./Profile/Profile";
import Swipe from 'react-easy-swipe';

import s from './Main.module.css';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.application = props.application;

        this.state = {
            settings_window: false
        };
    }

    onSwipeMove = (position, event) => {
        if (this.state.settings_window)
            this.setState({settings_window: false});
    };

    onSettingsClick = () => {
        this.setState({settings_window: !this.state.settings_window});
    };

    render() {
        return (
            <Swipe
                onSwipeMove={this.onSwipeMove}>
                <div className={s.main_window}>
                    <div className={s.news_wrapper}>
                        <TestList application={this.application} sortBy={'date'}/>
                    </div>
                    <div className={s.profile}>
                        <Profile key={this.state.settings_window}
                                 application={this.application}
                                 settings_window={this.state.settings_window}
                                 onSettingsClick={this.onSettingsClick}/>
                    </div>
                    <div className={s.background}/>
                </div>
            </Swipe>
        )
    }
}

export default Main;