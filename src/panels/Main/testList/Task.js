import React from 'react';

import s from './task.module.css';
import {Link} from "react-router-dom";


class Task extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: props.title,
            img: props.img,
            date: props.date,
            progress: props.progress,
        }
    }

    render() {
        return (
            <div className={s.field}>
                <div className={s.card}>
                    <div className={s.pic}/>
                    <div className={s.name}>
                        {this.state.title}
                    </div>

                    <div className={s.info}>
                        <div className={s.date}>{this.state.date}</div>
                        <div className={s.progress}>
                            <span className={s.dot_on}></span>
                            <span className={s.dot_on}></span>
                            <span className={s.dot}></span>
                        </div>
                    </div>


                </div>
                <div className={s.start_button}>
                    <Link to={'/preview'} className={s.link}>
                        <div>Начать тест</div>
                    </Link>
                </div>

            </div>
        )
    }
}

export default Task;