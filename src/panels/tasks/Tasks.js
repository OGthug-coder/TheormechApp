import React from 'react';
import {CellButton, Div, Group, Panel, PanelHeader, UsersStack} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import test1 from '../../img/test1.jpg'
import test2 from '../../img/test2.jpg'
import test3 from '../../img/test3.jpg'


class Tasks extends React.Component {

    constructor(props) {

        super(props);

        this.state = {};
    }

    render() {

        return (
            <Panel id="tasks">
                <PanelHeader>Tasks</PanelHeader>
                <Div id='tasks'>
                    <Group>
                        <CellButton onClick={() => this.props.parent.setState({activePanel: 'profile'})}>
                            Go to Profile
                        </CellButton>
                    </Group>
                    <Div>
                        <div style={{
                            backgroundImage: 'linear-gradient(135deg, #f24973 0%, #3948e6 100%)',
                            height: 200,
                            display: 'flex',
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                            paddingBottom: '6px',
                            borderRadius: 12
                        }}>
                            <UsersStack
                                photos={[
                                    test1,
                                    test2,
                                    test3,
                                ]}
                                style={{color: "#fff"}}
                            >Учавствовали 2 176 человек</UsersStack>
                        </div>
                    </Div>
                    <Div>
                        <div style={{
                            backgroundImage: 'linear-gradient(135deg, #f24973 0%, #3948e6 100%)',
                            height: 200,
                            display: 'flex',
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                            paddingBottom: '6px',
                            borderRadius: 12
                        }}>
                            <UsersStack
                                photos={[
                                    test1,
                                    test2,
                                    test3,
                                ]}
                                style={{color: "#fff"}}
                            >Учавствовали 2 176 человек</UsersStack>
                        </div>
                    </Div>
                </Div>
            </Panel>

        )
    }
}

export default Tasks;
