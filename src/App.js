import React from 'react';
import '@vkontakte/vkui/dist/vkui.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import s from './App.module.css';
import Preview from "./panels/preview/Preview";
import Main from "./panels/Main/Main";

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};

    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route path={'/TheormechApp'}>
                        <div className={s.main_window}>
                            <Main/>
                        </div>
                    </Route>
                    <Route path={'/preview'}>
                        <Preview/>
                    </Route>
                </Switch>

            </Router>

        )
    }

}

export default App;

