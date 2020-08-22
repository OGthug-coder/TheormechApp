import React from 'react';
import s from "./Score.module.css";
import isUndefined from "../../IsUndefined";

class Score extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            focus: props.focus,
            score: props.score
        };
    }
    render() {
        return (
            <div className={`${s.container} ${this.state.focus ? s.focus : ""}`}>
                <img src={require("../../../img/profile/ic_score.svg")} alt={"score"}/>
                <span className={s.score}>{this.state.score}</span>
            </div>
        );
    }
}

export default Score;