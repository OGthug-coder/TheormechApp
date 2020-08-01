import React from 'react';

import s from "./BackButton.module.css";

class BackButton extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
                <button className={s.button} />
            );
    }
}

export default BackButton;