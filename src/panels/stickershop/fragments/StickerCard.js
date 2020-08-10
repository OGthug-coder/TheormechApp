import React from 'react';
import s from "./StickerCard.module.css";
import Score from "../../../common/components/score/Score";
import StickerControl from "./StickerControl";
import StickerStatus from "../util/StickerStatus";

class StickerCard extends React.Component {
    render() {
        return (
            <div className={s.wrapper}>
                <div className={s.card}>
                    <img src={require("../../../img/profile/hilbert.svg")} alt="sticker"/>
                    <div className={s.content}>
                        <div className={s.name}>
                            Девид Гилберт
                        </div>
                        <div className={s.quote}>
                            {'«' + 'Он стал поэтом — для математика у него не хватало фантазии' + '»'}
                        </div>
                        <div className={s.description}>
                            <div>Подробнее</div>
                            Немецкий математик, внёс значительный вклад в развитие многих областей математики. Лауреат
                            премии имени Н. И. Лобачевского
                        </div>
                    </div>
                    <div className={s.control}>
                        <Score score={175}/>
                        <div className={s.status}>
                            <StickerControl status={StickerStatus.LOCKED} />
                        </div>
                    </div>
                </div>
                <button className={s.button}>
                    Купить
                </button>
            </div>

        );
    }
}

export default StickerCard;