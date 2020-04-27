import React from 'react';

import s from './ProgressFragment.module.css';

class ProgressFragment extends React.Component {
    constructor(props) {
        super(props);

        this.progressItem = (props) => {
            return (
                <>
                    <div className={s.progress_item__title}>
                        {props.title}
                    </div>
                    <div className={s.progress_item__counter}>
                        <div className={s.progress_item__block}>
                            <div>
                                {props.elements[0]}
                            </div>
                        </div>
                        <div className={s.progress_itme__separator}>
                            {props.separator}
                        </div>
                        <div className={`${s.progress_item__block} ${props.special == null ? '' : s.special}` }>
                            <div>
                                {props.elements[1]}
                            </div>

                        </div>
                    </div>

                </>
            )
        }
    }


    render() {
        return (
            <div className={s.progress}>
                <div className={`${s.progress_item} ${s.score}`}>
                    {this.progressItem({
                            title: "Очки",
                            elements: [15, 20],
                            separator: "/",
                        }
                    )}
                </div>
                <div className={`${s.progress_item} ${s.time}`}>
                    {this.progressItem({
                            title: "Время",
                            elements: [12, 56],
                            separator: "",
                            special: true
                        }
                    )}
                </div>
            </div>

        )
    }
}

export default ProgressFragment;