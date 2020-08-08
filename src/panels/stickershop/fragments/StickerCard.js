import React from 'react';
import s from "./StickerCard.module.css";

class StickerCard extends React.Component{
    render() {
        return (
            <div className={s.card}>
                <div className={s.content_container}>
                    <img src={require("../../../img/stickershop/ic_check_mark.svg")} alt={"obtain mark"} />
                    <img src={require("../../../img/profile/hilbert.svg")} alt="sticker" />
                    <div className={s.content}>
                        <div className={s.name}>
                            Девид Гилберт
                        </div>
                        <div className={s.description} >
                            Он стал поэтом — для математика у него не хватало фантазии.
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default StickerCard;