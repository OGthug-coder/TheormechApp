import React from 'react';
import ModalFragment from "./fragments/ModalFragment";

import s from "./Preview.module.css";

class Preview extends React.Component{
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <section className={s.preview_wrapper}>
                <div className={s.background}>
                    <img
                        src={require("../../img/preview/ic_preview_background.svg")}
                        alt={"background"}
                        height={'700'}/>
                </div>
                <ModalFragment />
            </section>
        )
    }
}

export default Preview;
