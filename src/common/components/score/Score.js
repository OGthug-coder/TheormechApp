import React from 'react';
import s from "./Score.module.css";

class Score extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            score: props.score
        };
    }
    render() {
        console.log("score rendered");
        return (
            <div className={s.container}>
                <img src={require("../../../img/profile/ic_score.svg")}/>
                <span className={s.score}>{this.state.score}</span>
            </div>
        );
    }
}

export default Score;