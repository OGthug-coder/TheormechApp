import React from 'react';
import s from './SelectWindow.module.css';

class SelectWindow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: props.data
        };
    }

    render() {
        return (
            <div className={`${s.settings_window}`}>
                {
                    this.state.data.map(item => {
                        return (
                            <div key={item.id}
                                 id={item.id}
                                 className={s.settings_item}
                                 onClick={item.onClick}>
                                {item.value}
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default SelectWindow;