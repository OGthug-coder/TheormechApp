import React from 'react';
import s from "./BackButton.module.css";
import { withRouter } from 'react-router-dom';
import isUndefined from "../../IsUndefined";

class BackButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            path: props.path,
            disabled: !isUndefined(props.disabled)
        };
    }

    onClick = () => {
        this.props.history.push(this.state.path);
    };

    render() {
        return (
            <button
                className={s.button}
                onClick={!this.state.disabled ? this.onClick : () => ""}/>
        );
    }
}

export default withRouter(BackButton);