import React from 'react';

import s from './LevelFragment.module.css';

class LevelFragment extends React.Component {

    render() {
        return (
            <div className={s.level_wrapper}>
                <div className={s.dignity}>
                    <img src={require("../../../img/profile/brain_outline_28.svg")} alt={"brain_icon"}/>
                    <div>
                        Да ты Дэвид Гилберт!
                    </div>
                </div>
                <div className={s.quote}>
                    Он стал поэтом — для математика у него не хватало фантазии.
                </div>
                <div className={s.sticker_wrapper}>
                    <div className={s.cloud}/>
                    <div className={s.cloud}/>
                    <div className={s.cloud}/>
                    <img className={s.sticker}
                         src={require("../../../img/profile/hilbert.svg")}
                        alt={"sticker"}
                    />
                </div>
            </div>
        )
    }
}

export default LevelFragment;