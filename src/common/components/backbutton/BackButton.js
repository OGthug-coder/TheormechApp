import React from 'react';
import s from "./BackButton.module.css";
import { withRouter } from 'react-router-dom';
import isUndefined from "../../IsUndefined";

class BackButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            disabled: !isUndefined(props.disabled)
        };
    }

    onClick = () => {
        if (!isUndefined(this.props.onClick)) {
            this.props.onClick();
        }

        if (!this.state.disabled) {
            this.props.history.goBack();
        }
    };

    render() {
        return (
            <button
                className={s.button}
                onClick={this.onClick}/>
        );
    }
}

export default withRouter(BackButton);