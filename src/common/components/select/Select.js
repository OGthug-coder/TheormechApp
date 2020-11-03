import React from 'react';
import s from "./Select.module.css";


class Select extends React.Component {
    constructor(props){
        super(props);
    }

    renderOptions = (number) => {
        let options = [];
        for (let i = 0; i < number; i++){
            options.push(
                <option value={i.toString()}>{i + 1}</option>
            );
        }
        return options;
    }

    render(){
        return (
            <div className={s.select}>
                <select name={this.props.name}
                        value={this.props.value}
                        onChange={this.props.onChange}>
                    {this.renderOptions(this.props.numOptions)}
                </select>
            </div>
        );
    }
}

export default Select;