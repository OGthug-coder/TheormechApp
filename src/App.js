import React from 'react';
import { View, Panel, PanelHeader, Group, CellButton } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

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
        		<Panel id="tasks">
          			<PanelHeader>Tasks</PanelHeader>
          			<Group>
            			<CellButton onClick={ () => this.setState({ activePanel: 'profile' }) }>
              				Go to Profile
            			</CellButton>
          			</Group>
        		</Panel>
        	</View>

		)
	}
}

export default App;

