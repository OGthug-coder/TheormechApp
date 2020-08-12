import React from 'react';

import s from './LevelFragment.module.css';
import isUndefined from "../../../common/IsUndefined";

class LevelFragment extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sticker: props.sticker,
            onClick: props.onClick
        };
    }

    render() {
        const sticker = this.state.sticker;
        return (
            <div className={s.level_wrapper}
                 onClick={this.state.onClick}>
                <div className={s.dignity}>
                    <img src={require("../../../img/profile/brain_outline_28.svg")} alt={"brain_icon"}/>
                    <div>
                        Да ты {!isUndefined(sticker) ? sticker.name : ""}
                    </div>
                </div>
                <div className={s.quote}>
                    {!isUndefined(sticker) ? sticker.quote : ""}
                </div>
                <div className={s.sticker_wrapper}>
                    <div className={s.cloud}/>
                    <div className={s.cloud}/>
                    <div className={s.cloud}/>
                    <img className={s.sticker}
                        // src={!isUndefined(sticker) ? sticker.img : ""}
                         src={"https://upload.wikimedia.org/wikipedia/commons/1/1b/Square_200x200.png"}
                         alt={"sticker"}
                    />
                </div>
            </div>
        )
    }
}

export default LevelFragment;