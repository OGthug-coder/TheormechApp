import React from 'react';
import '@vkontakte/vkui/dist/vkui.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Preview from "./panels/preview/Preview";

import Question from "./panels/question/Question";
import Application from "./Application";
import StickerShop from "./panels/stickershop/StickerShop";

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
                    <Route
                        excect path={'/question/:testId/:questionId'}
                        render={({match}) => <Question match={match} application={this.application}/>}
                    />
                    <Route
                        excect path={'/preview/:testId'}
                        render={({match}) => <Preview match={match} application={this.application}/>}
                    />
                    {/*<Route excect path={'/'}>*/}
                    {/*    <div className={s.main_window}>*/}
                    {/*        /!*<Main application={this.application}/>*!/*/}
                    {/*    </div>*/}
                    {/*</Route>*/}
                    <Route exact path={'/'}
                           render={({match}) => <StickerShop match={match} application={this.application}/>}/>
                </Switch>
            </Router>

        )
    }

}

export default App;