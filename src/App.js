import React from 'react';
import '@vkontakte/vkui/dist/vkui.css';

import Profile from './panels/profile/Profile.js';
import Preview from "./panels/preview/Preview";
import Question from "./panels/question/Question";

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {

        return (
            <>
                <Question />
                {/*<Preview />*/}
                {/*<Profile/>*/}
                {/*<Panel id="profile">*/
                }
                {/*	<PanelHeader>Profile</PanelHeader>*/
                }
                {/*	<Group>*/
                }
                {/*		/!*<CellButton onClick={ () => this.setState({ activePanel: 'tasks' }) }>*!/*/
                }
                {/*		/!*	Go to Tasks*!/*/
                }
                {/*		/!*</CellButton>*!/*/
                }
                {/*	</Group>*/
                }
                {/*</Panel>*/
                }
                {/*<Tasks id='tasks' parent={this}/>*/
                }
            </>
        )
    }
}

export default App;

