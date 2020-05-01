import React from 'react';

import s from './news.module.css';
import TestFragment from "./TestFragment";

class News extends React.Component {

    render() {
        return (
            <section className={s.news_container}>
                <TestFragment className={"test_fragment"}/>
                <TestFragment className={"test_fragment"}/>
                <TestFragment className={"test_fragment"}/>
                <TestFragment className={"test_fragment"}/>
                <div className={s.background}>
                    <div />
                    <div />
                    <div />
                </div>
            </section>
        )
    }
}

export default News;