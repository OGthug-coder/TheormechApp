import React from 'react';

import s from './task.module.css';


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
                <button className={s.start_button}>Начать тест</button>
            </div>
        )
    }
}

export default Task;