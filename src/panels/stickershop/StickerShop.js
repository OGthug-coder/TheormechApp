import React from 'react';
import BackHeader from "../../common/components/backheader/BackHeader";
import StickerCard from "./fragments/StickerCard";

import s from "./StickerShop.module.css";
import Score from "../../common/components/score/Score";

class StickerShop extends React.Component {
    render() {
        return (
            <div className={s.container}>
                <BackHeader/>
                <div className={s.headline}>
                    <span>Choose your fighter!</span>
                    <Score score={500}/>
                </div>
                <div className={s.sticker_container}>
                    <StickerCard/>
                    <StickerCard/>
                    <StickerCard className={"last"}/>
                </div>
            </div>
        );
    }
}

export default StickerShop;