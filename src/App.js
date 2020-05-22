import React from 'react';
import '@vkontakte/vkui/dist/vkui.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import s from './App.module.css';
import Preview from "./panels/preview/Preview";
import Main from "./panels/Main/Main";
import Question from "./panels/question/Question";


class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};

    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route path={'/preview'}>
                        <Preview/>
                    </Route>
                    <Route path={'/'}>
                        <div className={s.main_window}>
                            <Main/>
                        </div>
                    </Route>
                </Switch>

            </Router>
        )
    }

}

export default App;

