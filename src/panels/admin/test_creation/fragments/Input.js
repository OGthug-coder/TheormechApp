import React from 'react';
import s from "./Input.module.css";
import isUndefined from "../../../../common/IsUndefined";


class Input extends React.Component {
    constructor(props) {
        super(props);

        this.textAreaRef = React.createRef();

        this.state = {
            value: "",
            maxLength: props.maxLength,
            placeholder: props.placeholder,
            onChange: props.onChange,
        };
    }

    onChange = (e) => {
        const value = e.target.value;
        this.setState({value: value});

        if (!isUndefined(this.props.autoResize)) {
            this.textAreaRef.current.style.height = "";
            this.textAreaRef.current.style.height = Math.min(120, this.textAreaRef.current.scrollHeight) + "px";
        }

        if (!isUndefined(this.props.onChange)) {
            this.props.onChange(value);
        }
    };


    render() {
        return (
            <>
                <textarea
                    maxLength={this.state.maxLength}
                    ref={this.textAreaRef}
                    className={s.input}
                    value={this.state.value}
                    placeholder={this.state.placeholder}
                    onChange={this.onChange}/>
                {
                    !isUndefined(this.state.maxLength)
                    ?
                    <div className={s.counter}>
                        {`${this.state.value.length} / ${this.state.maxLength}`}
                    </div>
                    : ""
                }

            </>
        )
    }
}

export default Input;