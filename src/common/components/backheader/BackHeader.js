import React from 'react';
import s from "./BackHeader.module.css";
import { withRouter } from 'react-router-dom';
import isUndefined from "../../IsUndefined";

class BackHeader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            disabled: !isUndefined(props.disabled)
        };
    }
    render() {
        return (
            <div className={s.header}>
                <button className={s.exit_button}
                        onClick={!this.state.disabled ? this.props.history.goBack : ""}/>

            </div>
        );
    }
}

export default withRouter(BackHeader);