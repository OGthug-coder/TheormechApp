import React from 'react';
import s from "./StickerCard.module.css";
import Score from "../../../common/components/score/Score";
import StickerControl from "./StickerControl";
import StickerStatus from "../util/StickerStatus";

class StickerCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            img: props.img,
            name: props.name,
            quote: props.quote,
            description: props.description,
            cost: props.cost,
            status: props.status
        };
    }


    render() {
        return (
            <div className={s.wrapper}>
                <div className={s.card}>
                    <img className={s.img}
                        src={this.state.img}
                        alt="sticker"
                        />
                    <div className={s.content}>
                        <div className={s.name}>
                            {this.state.name}
                        </div>
                        <div className={s.quote}>
                            {'«' + this.state.quote + '»'}
                        </div>
                        <div className={s.description}>
                            <div>Подробнее</div>
                            {this.state.description}
                        </div>
                    </div>
                    <div className={s.control}>
                        <Score score={this.state.cost}/>
                        <div className={s.status}>
                            <StickerControl status={this.state.status} />
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