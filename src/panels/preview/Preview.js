import React from 'react';
import ModalFragment from "./fragments/ModalFragment";


class Preview extends React.Component{
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <section className={"preview-wrapper"}>
                <div className={"background-image"}>
                    <img src={require("../../img/preview/ic_preview_background.svg")} alt={"background"} />
                </div>
                <ModalFragment />
            </section>
        )
    }
}

export default Preview;
