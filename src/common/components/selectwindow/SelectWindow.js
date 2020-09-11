import React from 'react';
import s from './SelectWindow.module.css';
import isUndefined from "../../IsUndefined";

class SelectWindow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        return (
            <div className={`${s.settings_window}`}>
                <div className={s.settings_item}
                     onClick={this.onStickerClick}>
                    Сменить стикер
                </div>
                <div className={s.settings_item}
                     onClick={this.ondDevButton}>
                    О приложении
                </div>
            </div>
        )
    }
}

export default SelectWindow;