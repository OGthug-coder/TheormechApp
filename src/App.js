import React from 'react';
import '@vkontakte/vkui/dist/vkui.css';

import News from './panels/News/News.js';
import Profile from "./panels/profile/Profile";

import s from './App.module.css';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showed: false,
            deltaPosition: {
                x: 0, y: 0
            }
        };

    }

    handleDrag = (e, ui) => {
        const {x, y} = this.state.deltaPosition;
        console.log({x, y})

        this.setState({

            deltaPosition: {
                x: x + ui.deltaX,
                y: y + ui.deltaY,
            }
        });
    };

    onStart = () => {
        this.setState({activeDrags: ++this.state.activeDrags});
    };

    onStop = () => {
        const position = this.state.deltaPosition

        if (Math.abs(position.x) > 100) {
            this.setState({showed: true});
        } else {
            this.setState({showed: false});
        }

        this.setState({activeDrags: --this.state.activeDrags});
    };

    render() {
        return (
            <div className={s.main_window}>
                <div className={s.news_wrapper}>
                    <News/>
                </div>

                <div className={`${s.profile} ${this.state.showed ? s.showed : s.hidden}`}>
                    <Profile/>
                </div>

            </div>
            // <div className={s.profile_swipe}>
            //     <Draggable
            //         axis="x"
            //         scale={1}
            //         onStart={this.onStart}
            //         onDrag={this.handleDrag}
            //         onStop={this.onStop}>
            //         <div>
            //             <div className="handle">Drag from here</div>
            //             <div>This readme is really dragging on...</div>
            //         </div>
            //     </Draggable>
            // </div>

        )
    }
}

export default App;

