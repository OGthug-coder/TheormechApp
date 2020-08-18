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
                stickers = this.prepareStickers(stickers, user);
                this.setState({stickers: stickers});
                this.setState({user: user});
            });
        });
    }

    prepareStickers = (stickers, user) => {
        const ids = user.stickers.map(s => s.id);
        stickers.map(sticker => {
            if (sticker.id === user.activeSticker.id) {
                sticker.status = StickerStatus.ACTIVE;
            } else if (ids.includes(sticker.id)) {
                sticker.status = StickerStatus.AVAILABLE;
            } else {
                sticker.status = StickerStatus.LOCKED;
            }

            return sticker;
        });

        return stickers;
    };

    onSelect = (event) => {
        if (!isUndefined(this.state.user)) {
            this.stickerShopService.setActiveSticker(this.state.user.id, event.currentTarget.id)
                .then(user => {
                    this.application.deleteUser();

                    user.first_name = this.state.user.first_name;
                    user.last_name = this.state.user.last_name;
                    user.photo_200 = this.state.user.photo_200;

                    const stickers = this.prepareStickers(this.state.stickers, user);
                    this.setState({stickers: stickers})
                })
        }
    };

    onBuyClick = (event) => {
        if (!isUndefined(this.state.user)) {
            if (this.state.user.score >= this.state.stickers.find(s => s.id === event.target.id).cost) {
                this.stickerShopService.buySticker(this.state.user.id, event.target.id)
                    .then(user => {
                        this.application.deleteUser();

                        user.first_name = this.state.user.first_name;
                        user.last_name = this.state.user.last_name;
                        user.photo_200 = this.state.user.photo_200;

                        this.setState({user: user});

                        const stickers = this.prepareStickers(this.state.stickers, user);
                        this.setState({stickers: stickers})
                    });
            } else {
                console.log("not enough money");
            }
        }
    };

    renderStickers = () => {
        const stickers = this.state.stickers;
        let stickerComponents = [];
        if (!isUndefined(stickers)) {
            stickers.map(sticker => {
                stickerComponents.push(
                    <StickerCard
                        key={[sticker.id, sticker.status]}
                        id={sticker.id}
                        img={sticker.img}
                        name={sticker.name}
                        quote={sticker.quote}
                        description={sticker.description}
                        cost={sticker.cost}
                        status={sticker.status}
                        onSelect={this.onSelect}
                        onBuyClick={this.onBuyClick}/>
                );
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
                    <Score key={!isUndefined(this.state.user) ? this.state.user.score : ""}
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