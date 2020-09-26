import React from 'react';
import '@vkontakte/vkui/dist/vkui.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Preview from "./panels/preview/Preview";

import Question from "./panels/question/Question";
import Application from "./Application";
import StickerShop from "./panels/stickershop/StickerShop";
import Main from "./panels/main/Main";
import Result from "./panels/result/Result";
import TestCreation from "./panels/admin/testcreation/TestCreation";
import QuestionCreation from "./panels/admin/questioncreation/QuestionCreation";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
        this.application = new Application();
    }

    render() {
        return (
            <Router>
                <Route exact path={'/createQuestions'}
                       render={({match}) => <QuestionCreation match={match} application={this.application}/>}
                />
                <Route exact path={'/testEditing'}
                       render={({match}) => <TestCreation match={match} application={this.application}/>}
                />
                <Route exact path={'/result/:testId'}
                       render={({match}) => <Result match={match} application={this.application}/>}
                />
                <Route exact path={'/question/:testId/:questionId'}
                       render={({match}) => <Question match={match} application={this.application}/>}
                />
                <Route exact path={'/preview/:testId'}
                       render={({match}) => <Preview match={match} application={this.application}/>}
                />
                <Route exact path={'/stickerShop'}
                       render={({match}) => <StickerShop match={match} application={this.application}/>}
                />
                <Route exact path={'/'}
                       render={({match}) => <Main match={match} application={this.application}/>}
                />

            </Router>
        )
    }

}

export default App;