import React from 'react';
import s from "./BackHeader.module.css";
import {withRouter} from 'react-router-dom';
import isUndefined from "../../IsUndefined";

class BackHeader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            disabled: !isUndefined(props.disabled),
        };
    }

    onBackClick = () => {
        if (!this.state.disabled) {
            if (!isUndefined(this.props.onClick)) {
                this.props.onClick();
            }
            this.props.history.goBack();
        }
    };

    render() {
        return (
            <div style={this.props.style} className={s.header}>
                <button
                    className={s.exit_button}
                    onClick={this.onBackClick}/>
            </div>
        );
    }
}

export default withRouter(BackHeader);