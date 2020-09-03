import React from 'react';
import s from "./Input.module.css";

class Input extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: props.value,
            onChange: props.onChange,
        };
    }

    onChange = (e) => {
        this.setState({value: e.target.value});
        this.props.onChange(e.target.value);
    };


    render() {
        return (
            <textarea
                maxLength={70}
                ref={this.props.ref}
                className={s.input}
                value={this.state.value}
                onChange={this.onChange}/>
        )
    }
}

export default Input;