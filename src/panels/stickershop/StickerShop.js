import React from 'react';
import BackHeader from "../../common/components/backheader/BackHeader";
import StickerCard from "./fragments/StickerCard";

import s from "./StickerShop.module.css";

class StickerShop extends React.Component {
    render() {
        return (
            <div className={s.container}>
                <BackHeader/>
                <div className={s.headline}>
                    <span>Choose your fighter!</span>
                    <div>
                        <img src={require("../../img/profile/ic_score.svg")}/>
                        <span className={s.score}>500</span>
                    </div>
                </div>
                <div className={s.sticker_container}>
                    <StickerCard/>
                    <StickerCard/>
                    <StickerCard/>
                </div>
            </div>
        );
    }
}

export default StickerShop;