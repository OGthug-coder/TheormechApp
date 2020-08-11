import React from 'react';
import BackHeader from "../../common/components/backheader/BackHeader";
import StickerCard from "./fragments/StickerCard";

import s from "./StickerShop.module.css";
import Score from "../../common/components/score/Score";
import StickerStatus from "./util/StickerStatus";
import isUndefined from "../../common/IsUndefined";

class StickerShop extends React.Component {
    constructor(props) {
        super(props);

        this.application = this.props.application;
        this.stickerShopService = this.application.provideStickerShopService();
        this.state = {};
    }

    componentDidMount() {
        this.stickerShopService.getAllStickers().then(stickers => {
            this.application.provideUser().then(user => {
                stickers.map(sticker => {
                    if (sticker.id === user.activeSticker.id) {
                        sticker.status = StickerStatus.ACTIVE;
                    } else if (user.stickers.includes(sticker)) {
                        sticker.status = StickerStatus.AVAILABLE;
                    } else {
                        sticker.status = StickerStatus.LOCKED;
                    }

                    return sticker;
                });
                this.setState({stickers: stickers});
                this.setState({user: user});
            });
        });
    }

    onStatusClick = (event) => {
        if (!isUndefined(this.state.user)) {
            this.stickerShopService.setActiveSticker(this.state.user, event.target.id);
        }
    };

    onBuyClick = (event) => {
        if (!isUndefined(this.state.user)) {
            this.stickerShopService.buySticker(this.state.user, event.target.id);
        }
    };

    renderStickers = () => {
        const stickers = this.state.stickers;
        let stickerComponents = [];
        if (!isUndefined(stickers)) {
            stickers.map(sticker => {
                stickerComponents.push(<StickerCard
                    key={sticker.id}
                    id={sticker.id}
                    img={sticker.img}
                    name={sticker.name}
                    quote={sticker.quote}
                    description={sticker.description}
                    cost={sticker.cost}
                    status={sticker.status}
                    onStatusClick={this.onStatusClick}
                    onBuyClick={this.onBuyClick}/>);
                return sticker;
            })
            return stickerComponents;
        }
    };

    render() {
        return (
            <div className={s.container}>
                <BackHeader/>
                <div className={s.headline}>
                    <span>Choose your fighter!</span>

                    <Score key={this.state.user}
                           score={!isUndefined(this.state.user) ? this.state.user.score : 0}/>
                </div>
                <div className={s.sticker_container}>
                    <div className={s.p}/>
                    {this.renderStickers()}
                    <div className={s.p}/>
                </div>
            </div>
        );
    }
}

export default StickerShop;