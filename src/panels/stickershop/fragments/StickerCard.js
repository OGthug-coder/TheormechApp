import React from 'react';
import s from "./StickerCard.module.css";
import Score from "../../../common/components/score/Score";
import StickerControl from "./StickerControl";
import StickerStatus from "../util/StickerStatus";

class StickerCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.id,
            img: props.img,
            name: props.name,
            quote: props.quote,
            description: props.description,
            cost: props.cost,
            status: props.status,
            onStatusClick: props.onStatusClick,
            onSelect: props.onSelect
        };

    }


    render() {
        const id = this.state.id.toString();
        return (
            <div className={s.wrapper}>
                <div className={s.card}
                     onClick={this.state.status === StickerStatus.AVAILABLE ? this.state.onStatusClick : () => {}}>
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
                        {
                            this.state.status === StickerStatus.LOCKED
                                ?  <Score score={this.state.cost}/>
                                : ""
                        }

                        <div className={s.status}>
                            <StickerControl id={id}
                                            status={this.state.status}/>
                        </div>
                    </div>
                </div>
                <button className={`${s.button} ${this.state.status === StickerStatus.LOCKED ? "" : s.hidden}`}
                        id={id}
                        onClick={this.state.onBuyClick}>
                    Купить
                </button>
            </div>

        );
    }
}

export default StickerCard;