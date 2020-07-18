import React from 'react';
import '@vkontakte/vkui/dist/vkui.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import s from './App.module.css';
import Preview from "./panels/preview/Preview";
import Main from "./panels/Main/Main";
import Question from "./panels/question/Question";
import Application from "./Application";
import Test_Creation from "./panels/admin/test_creation/test_creation";

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};
        this.application = new Application();

    }

    render() {
        return (

            <Router>
                <Switch>
                    <Route path={'/question'}>
                        <Question application={this.application}/>
                    </Route>
                    <Route path={'/preview'}>
                        <Preview/>
                    </Route>
                    <Route path={'/admin'}>
                        <Test_Creation/>
                    </Route>
                    <Route path={'/'}>
                        <div className={s.main_window}>
                            <Main application={this.application} />
                        </div>
                    </Route>
                </Switch>

            </Router>

        )
    }

}

export default App;