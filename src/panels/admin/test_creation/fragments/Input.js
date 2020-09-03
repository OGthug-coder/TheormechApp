import React from 'react';
import s from "./Input.module.css";

class Input extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: "",
            placeholder: props.placeholder,
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
                placeholder={this.state.placeholder}
                onChange={this.onChange}/>
        )
    }
}

export default Input;