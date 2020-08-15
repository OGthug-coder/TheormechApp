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
                    <div>
                        Ты можешь тратить заработанные  баллы на покупку новых стикеров
                    </div>
                </div>
                <div className={s.controls}>
                    <Link to={"#"}
                          className={s.first_button} >
                        <div>Хочу узнать больше!</div>
                    </Link>
                    <Link to={"#"}
                          className={s.second_button}>
                        <div>Следующий тест</div>
                    </Link>
                </div>
                <div className={s.planet_1} />
                <div className={s.planet_2} />
                <div className={s.planet_3} />

            </div>
        )
    }
}

export default Result;