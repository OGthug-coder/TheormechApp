import React from 'react';

import s from './Result.module.css';
import {Link} from "react-router-dom";

class Result extends React.Component {
    render() {
        return (
            <div className={s.result_window}>

                <div className={s.result_bubble}>
                        <div>Твой результат</div>
                        <div className={s.percent}>95%</div>
                        <div>19/20</div>
                </div>
                <div className={s.tip}>
                    <img alt={"tip"}
                    src={require("../../img/result/ic_bulb.svg")}/>
                </div>
                <div className={s.controls}>
                    <Link to={"#"}>
                        Хочу узнать больше!
                    </Link>
                    <Link to={"#"}>
                        Следующий тест
                    </Link>
                </div>

            </div>
        )
    }
}

export default Result;