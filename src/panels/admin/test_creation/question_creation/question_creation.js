import React from 'react';
import s from "./question_creation.module.css";


class Question_Creation extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <section>
            <div className={s.card}>
                <div className={s.container}>
                    <div className={s.slider}></div>
                    <div className={s.text}>
                        <div className={s.title}>Вопрос</div>
                        <input className={s.text_input}/>
                    </div>
                    <div className={s.variants}>
                        <div className={s.title}>Варианты ответов</div>
                        <input className={s.text_input}/>
                        <input className={s.text_input}/>
                        <input className={s.text_input}/>
                        <input className={s.text_input}/>
                    </div>
                    <div className={s.correct_answer}>
                        <div className={s.title}>Верный ответ</div>
                        <select>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                        </select>
                    </div>
                    <div className={s.text}>
                        <div className={s.title}>Пояснение</div>
                        <input className={s.text_input}/>
                    </div>
                    <div className={s.load}>
                        <div className={s.title}>Загрузить фото</div>
                        <img className={s.pic} src="https://lh3.googleusercontent.com/proxy/-NwgyJVu8ym8vOoa7gctTnzM8tdc9TVEZw_XaQUh9yu_NJlIEuJFTedEA7AnQJXELjUBrqlEVSGlcRvtl260-AGsb9MLIzsYhXEi4Q"/>
                        <div className={s.photo_meta}>IMG_3043.png</div>
                    </div>
                    <div className={s.save}>Сохранить</div>
                </div>
            </div>
        </section>
        );
    };
}

export default Question_Creation;