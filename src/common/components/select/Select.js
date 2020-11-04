import React from 'react';
import s from "./Select.module.css";


class Select extends React.Component {
    constructor(props){
        super(props);
    }

    renderOptions = (options) => {
        let optionList = [];
        for (let i in options) {
            optionList.push(
                <option value={i}>{options[i]}</option>
            );
        }
        return optionList;
    }

    render(){
        return (
            <div className={s.select}>
                <select name={this.props.name}
                        value={this.props.value}
                        onChange={this.props.onChange}>
                    {this.renderOptions(this.props.options)}
                </select>
            </div>
        );
    }
}

export default Select;