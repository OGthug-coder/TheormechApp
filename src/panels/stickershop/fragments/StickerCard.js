import React from 'react';
import s from "./StickerCard.module.css";
import Score from "../../../common/components/score/Score";
import StickerControl from "./StickerControl";
import StickerStatus from "../util/StickerStatus";
import UserRoles from "../../../common/UserRoles";

class StickerCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            scoreFocus: parseInt(props.scoreFocus) === props.id
        };

    }

    sendData = () => {
        this.props.onDeleteClick(this.props.id);
    }

    render() {
        const id = this.props.id.toString();

        return (
            <div className={s.wrapper}>
                <div id={this.props.id}
                     className={s.card}
                     onClick={this.props.status === StickerStatus.AVAILABLE ?
                         this.props.onSelect : () => {
                     }}>

                    {this.props.onEditMode !=  UserRoles.ADMIN ? 
                        (<div className={s.delete_button} onClick={this.sendData}/>)
                    : ""}

                    <img className={s.img}
                         src={this.props.img}
                         alt="sticker"
                    />
                    <div className={s.content}>
                        <div className={s.name}>
                            {this.props.name}
                        </div>
                        <div className={s.quote}>
                            {'«' + this.props.quote + '»'}
                        </div>
                        <div className={s.description}>
                            <div>Подробнее</div>
                            {this.props.description}
                        </div>
                    </div>
                    <div className={s.control}>
                        {
                            this.props.status === StickerStatus.LOCKED
                                ? <Score key={this.state.scoreFocus}
                                         score={this.props.cost}
                                         focus={this.state.scoreFocus}/>
                                : ""
                        }

                        <div className={s.status}>
                            <StickerControl status={this.props.status}/>
                        </div>
                    </div>
                </div>
                <button 
                    className={`${s.button} ${this.props.status === StickerStatus.LOCKED ?
                         "" : s.hidden}`}
                    id={id}
                    onClick={this.props.onBuyClick}>
                        Купить
                </button>
            </div>

        );
    }
}

export default StickerCard;