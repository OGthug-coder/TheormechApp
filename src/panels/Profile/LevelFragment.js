import React from 'react';

import s from './level.module.css';

class LevelFragment extends React.Component {

    render() {
        return (
            <div className={s.level_wrapper}>
                <div className={s.dignity}>
                    <img src={require("../../img/brain_outline_28.svg")}/>
                    <div>
                        Да ты Стив Джобс!
                    </div>
                </div>
                <div className={s.quote}>
                    Компьютер — это самый удивительный инструмент, с каким я когда-либо сталкивался. Это велосипед для
                    нашего сознания.
                </div>
                <div className={s.sticker_wrapper}>
                    <div className={s.cloud}/>
                    <div className={s.cloud}/>
                    <div className={s.cloud}/>
                    <img className={s.sticker} src={require("../../img/Steve.svg")}/>
                </div>
            </div>
        )
    }
}

export default LevelFragment;