import React from 'react';
import s from "./test_creation.module.css";
import Task_Panel from "./Task_Panel";

class Test_Creation extends React.Component {
    constructor(props) {
        super(props);

        let today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        this.test = {
            title : 'Введите название',
            img : '',
            date : today.getDate() + '-' +(today.getMonth() + 1) + '-' + today.getFullYear(),
        }
    }

    render() {
        return (
            <section className={s.page}>
                <div className={s.header}>
                        <div className={s.back}>
                            <a href="">&#8249;</a>    
                        </div>
                        <div className={s.close}>
                            <a href="">&#215;</a>    
                        </div>
                </div>
                <div className={s.container}>
                    <div className={s.title}>Создание нового теста</div>
                    <Task_Panel/>
                    <div className={s.form}>
                        <div className={s.name}>
                            <div className={s.field}>Название</div>
                            <input type="text" className={s.text_input}/>
                        </div>
                        <div className={s.description}>
                            <div className={s.field}>Описание</div>
                            <input type="text" className={s.text_input}/>
                        </div>
                        <div className={s.time}>
                            <div className={s.field}>Время выполнения теста</div>
                            <input type="checkbox" className={s.checkbox} id="no_timer"/>
                            <label for="no_timer">Без ограничений</label>
                            <br/>
                            <input type="checkbox" className={s.checkbox} id="timer"/>
                            <label for="timer">
                                С ограничением &nbsp;
                                <select>
                                    <option>30</option>
                                    <option>15</option>
                                    <option>60</option>
                                </select>
                                &nbsp; минут
                            </label>
                        </div>
                        <div className={s.date}>
                            <div className={s.field}>Публикация</div>
                            <input type="checkbox" className={s.checkbox} id="no_timer"/>
                            <label for="no_timer">Мгновенная публикация</label>
                            <br/>
                            <input type="checkbox" className={s.checkbox} id="timer"/>
                            <label for="timer">Запланированная дата</label>
                            <div className={s.select_date}>
                                <input type="number" className={s.day_picker} min="1" max="31" value="30"/>
                                <input type="month" className={s.month_picker} value="2020-04"/>
                                <input type="time" className={s.time_picker} value="14:15"/>
                            </div>
                        </div>
                        <div className={s.next}>
                            <a href="">Заполнить вопросы &#8250;</a>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Test_Creation;