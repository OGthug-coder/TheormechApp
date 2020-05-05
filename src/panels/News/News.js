import React from 'react';

import s from './news.module.css';
import Task from "./Task";

class News extends React.Component {

    render() {
        return (
            <section className={s.news_container}>
                <Task className={"task"}/>
                <Task className={"task"}/>
                <Task className={"task"}/>
                <Task className={"task"}/>

            </section>
        )
    }
}

export default News;