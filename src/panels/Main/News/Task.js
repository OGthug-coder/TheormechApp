import React from 'react';

import s from './task.module.css';
import {Link} from "react-router-dom";


class Task extends React.Component {

    render() {
        return (
            <div className={s.field}>
                <div className={s.card}>
                    <div className={s.pic}/>
                    <div className={s.name}>
                        Как приручить интеграл Римана?
                    </div>

                    <div className={s.info}>
                        <div className={s.date}>28.04.2020</div>
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