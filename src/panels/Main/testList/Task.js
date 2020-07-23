import React from 'react';

import s from './task.module.css';
import {Link} from "react-router-dom";


class Task extends React.Component {
    constructor(props) {
        super(props);

        this.application = props.application;
        this.state = {
            id: props.id,
            title: props.title,
            img: props.img,
            date: props.date,
            progress: props.progress,
            clickable: props.clickable,
        }

        this.update = this.update.bind(this);
    }

    update = (data) => {
        this.setState(data)
    };

    render() {
        return (
            <div className={s.field}>
                <div className={s.card}>
                    <img className={s.pic} src={this.state.img}/>
                    <div className={s.name}>
                        {this.state.title}
                    </div>

                    <div className={s.info}>
                        <div className={s.date}>{this.state.date}</div>
                        <div className={s.progress}>
                            <span className={this.state.progress >= 1 ? s.dot_on : s.dot}/>
                            <span className={this.state.progress >= 2 ? s.dot_on : s.dot}/>
                            <span className={this.state.progress >= 3 ? s.dot_on : s.dot}/>
                        </div>
                    </div>


                </div>
                <div className={s.start_button}>
                    <Link to={
                            this.state.clickable
                            ? '/preview' : ''
                        } 
                        className={s.link} 
                        application={this.application}
                    >
                        <div>Начать тест</div>
                    </Link>
                </div>

            </div>
        )
    }
}

export default Task;