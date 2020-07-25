import React from 'react';
import s from "./test_creation.module.css";
import Task from "../../Main/testList/Task";
import Question_Creation from "./question_creation/question_creation";

class Test_Creation extends React.Component {
    constructor(props) {
        super(props);

        let today = new Date();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

        this.state = {
            title : '',
            img : 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg',
            day : today.getDate(),
            month : today.getMonth() + 1,
            year : today.getFullYear(),
            date : today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear(),
        };

        this.TaskElement = React.createRef();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleMonthChange = this.handleMonthChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        
        this.setState({
            [name]: value
        });

        if (name === 'day') {
            let date = value + '-' + this.state.month + '-' + this.state.year;
            this.setState({
                day : value,
                date : date,
            });
            this.TaskElement.current.update({
                day : value, 
                date : date,
            });
        }


        this.TaskElement.current.update({
            [name]: value
        });
    }

    handleMonthChange(event) {

        let date = event.target.value.split('-');
        let year = date[0];
        let month = date[1];
        
        date = this.state.day + '-' + month + '-' + year;
        
        this.setState({
            year : year,
            month : month,
            date : date,
        });

        this.TaskElement.current.update({
            year : year,
            month : month,
            date : date,
        });
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
                    <Task 
                        ref={this.TaskElement}
                        id={undefined}
                        title={this.state.title}
                        img={this.state.img}
                        date={this.state.date}
                        progress={0}
                        application={undefined}
                        clickable={false}
                    />
                    <div className={s.form}>
                        <div className={s.name}>
                            <div className={s.field}>Название</div>
                            <input name="title" type="text" className={s.text_input} value={this.state.title} onChange={this.handleInputChange}/>
                        </div>
                        <div className={s.description}>
                            <div className={s.field}>Описание</div>
                            <input type="text" className={s.text_input}/>
                        </div>
                        <div className={s.time}>
                            <div className={s.field}>Время выполнения теста</div>
                            <input type="radio" className={s.checkbox} id="no_timer" checked="checked"/>
                            <label for="no_timer">Без ограничений</label>
                            <br/>
                            <input type="radio" className={s.checkbox} id="timer"/>
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
                            <input type="radio" className={s.checkbox} id="no_timer"/>
                            <label for="no_timer">Мгновенная публикация</label>
                            <br/>
                            <input type="radio" className={s.checkbox} id="timer"/>
                            <label for="timer">Запланированная дата</label>
                            <div className={s.select_date}>
                                <input name="day" type="number" className={s.day_picker} value={this.state.day} min="1" max="31" onChange={this.handleInputChange}/>
                                <input name="date" type="month" className={s.month_picker} value={this.state.year + '-' + this.state.month} onChange={this.handleMonthChange}/>
                                <input type="time" className={s.time_picker} value="14:15"  onChange={this.handleInputChange}/>
                            </div>
                            <div className={s.next}>
                                <a href="">Заполнить вопросы &#8250;</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Test_Creation;