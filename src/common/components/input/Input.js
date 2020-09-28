import React from 'react';
import s from "./Input.module.css";
import isUndefined from "../../IsUndefined";


class Input extends React.Component {
    constructor(props) {
        super(props);

        this.textAreaRef = React.createRef();

        this.state = {
            id: props.rows,
            rows: !isUndefined(props.rows) ? props.rows : 3,
            value: props.placeholder,
            maxLength: props.maxLength,
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
            if (!isUndefined(this.state.id)) {
                this.state.onChange(value, this.state.id);
            } else {
                this.state.onChange(value);
            }
        }
    };


    render() {
        return (
            <>
                <textarea
                    id={!isUndefined(this.state.id) ? this.state.id : ''}
                    rows={this.state.rows}
                    maxLength={this.state.maxLength}
                    ref={this.textAreaRef}
                    className={s.input}
                    value={this.state.value}
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