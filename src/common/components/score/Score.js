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
        return (
            <div className={s.container}>
                <img src={require("../../../img/profile/ic_score.svg")} alt={"score"}/>
                <span className={s.score}>{this.state.score}</span>
            </div>
        );
    }
}

export default Score;