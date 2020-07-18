import React from 'react';
import ModalFragment from "./fragments/ModalFragment";
import Answer from "./fragments/Answer";

import s from "./Preview.module.css";

class Preview extends React.Component {
    constructor(props) {
        super(props);

        this.application = props.application;

        this.state = {
            show_answer_window: false,
        };

        this.show_answer_window = () => {
            this.setState({show_answer_window: true})
        };

        this.hide_answer_window = () => {
            this.setState({show_answer_window: false})
        };
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
                <ModalFragment onClick={this.show_answer_window}/>
                {this.state.show_answer_window ? <Answer onClick={this.hide_answer_window}/> : ""}

            </section>
        )
    }
}

export default Preview;
