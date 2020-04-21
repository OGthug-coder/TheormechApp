import React from 'react';
import { View, Panel, PanelHeader, Group, CellButton, Div, UsersStack } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import test1 from './img/test1.jpg'
import test2 from './img/test2.jpg'
import test3 from './img/test3.jpg'

import Profile from './panels/Profile/Profile.js'
import Tasks from './panels/Tasks/Tasks.js'

class App extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			activePanel: 'profile',
		};
	}

	render() {

		return (

			<View activePanel={this.state.activePanel}>
        		<Panel id="profile">
          			<PanelHeader>Profile</PanelHeader>
          			<Group>
            			<CellButton onClick={ () => this.setState({ activePanel: 'tasks' }) }>
              				Go to Tasks
            			</CellButton>
          			</Group>
        		</Panel>
        		<Tasks id='tasks' parent={this}/>
        	</View>

		)
	}
}

	export default App;

