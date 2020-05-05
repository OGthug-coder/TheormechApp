import React from 'react';
import '@vkontakte/vkui/dist/vkui.css';

import News from './panels/News/News.js';
import Profile from "./panels/profile/Profile";

import s from './App.module.css';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};

    }

    render() {
        return (
            <>
                <div className={s.main_window}>
                    <div className={s.news_wrapper}>
                        <News/>
                    </div>

                    <div className={s.profile}>
                        <Profile/>
                    </div>
                    <div className={s.background}>
                        <div />
                        <div />
                        <div />
                    </div>
                </div>

            </>

        )
    }

}

export default App;

