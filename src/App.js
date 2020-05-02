import React from 'react';
import '@vkontakte/vkui/dist/vkui.css';


import Profile from './panels/Profile/Profile.js'
import News from './panels/News/News.js'
import Preview from "./panels/preview/Preview";


class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {

        return (
            <>
                <Preview />
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

