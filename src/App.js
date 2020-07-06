import React from 'react';
import '@vkontakte/vkui/dist/vkui.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import s from './App.module.css';
import Preview from "./panels/preview/Preview";
import Main from "./panels/Main/Main";
import Question from "./panels/question/Question";
import Application from "./Application";


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
                        <Question/>
                    </Route>
                    <Route
                        path={'/preview/:testId'}
                        render={({ match }) => <Preview match={match} application={this.application}/>}
                    />
                    <Route excect path={'/'}>
                        <div className={s.main_window}>
                            <Main application={this.application}/>
                        </div>
                    </Route>
                </Switch>
            </Router>

        )
    }

}

export default App;