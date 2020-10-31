import React from 'react';
import BackHeader from "../../common/components/backheader/BackHeader";
import StickerCard from "./fragments/StickerCard";

import s from "./StickerShop.module.css";
import Score from "../../common/components/score/Score";
import StickerStatus from "./util/StickerStatus";
import isUndefined from "../../common/IsUndefined";
import Vibration from "../../common/Vibration";
import UserRoles from "../../common/UserRoles";
import ModalStickerCreation from "./fragments/ModalStickerCreation";
import ConfirmModal from "../../common/components/confirmmodal/ConfirmModal";


class StickerShop extends React.Component {
    constructor(props) {
        super(props);

        this.application = this.props.application;
        this.stickerShopService = this.application.provideStickerShopService();
        this.state = {
            scoreFocus: undefined,
            modalStickerCreation: false,
            confirmModal: false,
        };

    }

    componentDidMount() {
        this.stickerShopService.getAllStickers().then(stickers => {
            this.application.provideUser().then(user => {
                stickers = this.prepareStickers(stickers, user);
                this.setState({
                    stickers: stickers,
                    user: user
                });
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
            this.stickerShopService.vibrate()
            this.stickerShopService.setActiveSticker(this.state.user.id, event.currentTarget.id)
                .then(user => {
                    this.application.deleteUser();

                    const stickers = this.prepareStickers(this.state.stickers, user);
                    this.setState({stickers: stickers})
                })
        }
    }

    onBuyClick = (event) => {
        if (!isUndefined(this.state.user)) {
            const cost = this.state.stickers.find(s => s.id === parseInt(event.target.id)).cost;
            if (this.state.user.score >= cost) {
                this.application.deleteUser();
                this.stickerShopService.buySticker(this.state.user.id, event.target.id)
                    .then(user => {
                        user.first_name = this.state.user.first_name;
                        user.last_name = this.state.user.last_name;
                        user.photo_200 = this.state.user.photo_200;

                        this.setState({user: user});

                        const stickers = this.prepareStickers(this.state.stickers, user);
                        this.setState({stickers: stickers})
                    });
            } else {
                this.stickerShopService.vibrateImpact(Vibration.IMPACT_HEAVY);
                this.setState({scoreFocus: event.target.id})
                setTimeout(() => this.setState({scoreFocus: undefined}), 300)
            }
        }
    }

    renderStickers = () => {
        const stickers = this.state.stickers;
        let stickerComponents = [];
        if (!isUndefined(this.state.user) && !isUndefined(stickers)) {
            stickers.map(sticker => {
                stickerComponents.push(
                    <StickerCard
                        key={[sticker.id, sticker.status, this.state.scoreFocus]}
                        id={sticker.id}
                        img={sticker.img}
                        name={sticker.name}
                        quote={sticker.quote}
                        description={sticker.description}
                        cost={sticker.cost}
                        status={sticker.status}
                        onSelect={this.onSelect}
                        onBuyClick={this.onBuyClick}
                        scoreFocus={this.state.scoreFocus}
                        onEditMode={this.state.user.role}
                        onDeleteClick={this.showConfirmModal}/>
                );
                return sticker;
            })

            return stickerComponents;
        }
    }

    addNewSticker = () => {
        this.setState({modalStickerCreation: true});
    }

    onSaveClick = (sticker) => {
        if (!isUndefined(this.state.user)) {
            this.setState({modalStickerCreation: false});
            this.stickerShopService.saveSticker(sticker).then(
                data => {
                    const stickers = this.prepareStickers(data, this.state.user);
                    this.setState({stickers: stickers});
                }
            )
        }
    }

    closeConfirmModal = () => {
        this.setState({
            confirmModal: false,
            activeStickerId: null,
        });
    }

    onDeleteClick = () => {
        this.stickerShopService.deleteSticker(this.state.activeStickerId).then(
            data => {
                const stickers = this.prepareStickers(data, this.state.user);
                this.setState({stickers: stickers});
            }
        );

        this.closeConfirmModal();
    }

    showConfirmModal = (id) => {
        this.setState({
            confirmModal: true,
            activeStickerId: id,
        });
    }


    render() {
        return (
            <>
                <BackHeader
                    style={this.state.modalStickerCreation ? {filter: "blur(2px)"} : {}}
                />
                <div
                    className={s.container}
                    style={this.state.modalStickerCreation ? {filter: "blur(2px)"} : {}}
                >
                    <div className={s.headline}>
                        <span>Choose your fighter!</span>
                        <Score key={!isUndefined(this.state.user) ? this.state.user.score : ""}
                               score={!isUndefined(this.state.user) ? this.state.user.score : 0}/>
                    </div>
                    <div className={s.sticker_container}>
                        <div className={s.p}/>

                        {this.renderStickers()}

                        {!isUndefined(this.state.user) && this.state.user.role === UserRoles.ADMIN ?
                            <div className={s.wrapper} onClick={this.addNewSticker}>
                                <div className={s.content}/>
                            </div> :
                            ''
                        }

                        <div className={s.p}/>
                    </div>
                </div>
                {
                    this.state.modalStickerCreation
                        ? (
                            <div className={s.window}>
                                <ModalStickerCreation
                                    onSaveClick={this.onSaveClick}
                                    onBackClick={() => this.setState({modalStickerCreation: false})}
                                />
                            </div>
                        )
                        : ""
                }
                {
                    this.state.confirmModal ?
                        (
                            <div className={s.confirm_modal_container}>
                                <div className={s.confirm_modal}>
                                    <ConfirmModal text={'Вы уверены, что хотите удалить стикер?'}
                                                  onApprove={this.onDeleteClick}
                                                  onCancel={this.closeConfirmModal}/>
                                </div>
                            </div>
                        )
                        : ""
                }
            </>
        );
    }
}

export default StickerShop;