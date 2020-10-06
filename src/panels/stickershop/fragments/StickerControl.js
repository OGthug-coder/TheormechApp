import React from 'react';
import StickerStatus from "../util/StickerStatus";

class StickerControl extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let path;
        switch (this.props.status) {
            case StickerStatus.ACTIVE:
                path = require("../../../img/stickershop/ic_check_mark.svg");
                break;
            case StickerStatus.AVAILABLE:
                path = require("../../../img/stickershop/ic_circle.svg");
                break;
            default:
                path = require("../../../img/stickershop/ic_locked.svg");
                break;
        }

        return (
            <img src={path}
                 alt={"obtain mark"}/>
        )
    }
}

export default StickerControl;