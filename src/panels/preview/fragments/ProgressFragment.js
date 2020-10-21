import React from 'react';

import s from './ProgressFragment.module.css';
import {NO_TIMER} from "../../../common/services/Timer";

const INFINITY_SIGN = require('../../../img/preview/ic_infinity_sign.svg');

class ProgressFragment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timeM: props.time === null ? 0 : props.time.toString().split(":")[0],
            timeS: props.time === null ? 0 : props.time.toString().split(":")[1]
        }

        this.progressItem = (progressItemData) => {
            if (progressItemData === NO_TIMER) {
                return (
                    <>
                        <div className={s.progress_item__title}>
                            {progressItemData.title}
                        </div>
                        <div className={s.progress_item__counter}>
                            <img src={INFINITY_SIGN} alt={'infinity'}/>
                        </div>

                    </>
                )
            } else {
                return (
                    <>
                        <div className={s.progress_item__title}>
                            {progressItemData.title}
                        </div>
                        <div className={s.progress_item__counter}>
                            <div className={s.progress_item__block}>
                                <div>
                                    {progressItemData.elements[0]}
                                </div>
                            </div>
                            <div className={s.progress_itme__separator}>
                                {progressItemData.separator}
                            </div>
                            <div
                                className={`${s.progress_item__block} ${progressItemData.special == null ? '' : s.special}`}>
                                <div>
                                    {progressItemData.elements[1]}
                                </div>

                            </div>
                        </div>

                    </>
                )
            }
        }
    }


    render() {
        return (
            <div className={s.progress}>
                <div className={`${s.progress_item} ${s.score}`}>
                    {this.progressItem({
                            title: "Очки",
                            elements: [this.props.currentScore, this.props.maxScore],
                            separator: "/",
                        }
                    )}
                </div>
                <div className={`${s.progress_item} ${s.time}`}>
                    {this.progressItem({
                            title: "Время",
                            elements: [this.state.timeM, this.state.timeS],
                            separator: ":",
                            special: true
                        }
                    )}
                </div>
            </div>

        )
    }
}

export default ProgressFragment;