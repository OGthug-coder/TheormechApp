import React from 'react';
import s from "./task_panel.module.css";

class Task_Panel extends React.Component {
    constructor(props) {
        super(props);

        let today = new Date();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

        this.state = {
            title : 'Введите название',
            img : '../../../img/admin/No_image.svg',
            date : today.getDate() + '-' +(today.getMonth() + 1) + '-' + today.getFullYear(),
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
                            <span className={s.dot}/>
                            <span className={s.dot}/>
                            <span className={s.dot}/>
                        </div>
                    </div>


                </div>
                <div className={s.start_button}>
                    <div>Продолжить</div>
                </div>

            </div>
        )
    }
}

export default Task_Panel;