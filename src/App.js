import React from 'react';
import '@vkontakte/vkui/dist/vkui.css';


import Swipe from 'react-easy-swipe';
import News from './panels/News/News.js';
import Profile from "./panels/profile/Profile";

import s from './App.module.css';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    onSwipeMove(position, event) {
        console.log(`Moved ${position.x} pixels horizontally`, event);
        console.log(`Moved ${position.y} pixels vertically`, event);
    }

    render() {

        return (
            <div className={s.main_window}>
                <div className={s.news_wrapper}>
                    <News/>
                </div>

                <div className={s.profile_swipe}>
                    <Swipe onSwipeMove={this.onSwipeMove}>
                        <Profile />
                    </Swipe>
                </div>

            </div>
        )
    }
}

export default App;

