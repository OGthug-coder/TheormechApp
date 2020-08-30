import React from 'react';

import s from './Result.module.css';
import { withRouter } from "react-router-dom";
import isUndefined from "../../common/IsUndefined";

class Result extends React.Component {
    constructor(props) {
        super(props);

        this.application = props.application;
        this.testId = parseInt(props.match.params.testId);
        this.resultService = this.application.provideResultService();
        this.state = {};

        this.tips = [
            "Ты можешь тратить заработанные баллы на покупку новых стикеров",
            "Купить новые стикеры можно в профиле",
            "За неправильный ответ вы потеряете очки, но пропуская вопрос, вы ничего не теряете",
            "Баллы за тест начисляется только по его завершению",
            "Пройти тест ещё раз нельзя",
            "Посмотреть правильный ответ и его объяснение можно на вкладке с информацией о тесте",
            "У пропущенных вопросов нельзя посмотреть решение",
            "Старайтесь не ошибаться, чтобы получить большее количество баллов за тест",
            "Если не знаете ответа, то лучше пропустить вопрос. Но всегда можно пойти на риск",
            "Если вы пропустите все вопросы, то пройти тест заново все равно будет нельзя"
        ]



    }

    componentDidMount() {
        this.application.deleteUser();
        this.resultService.getData(this.testId)
            .then(data => this.setState({data: data}));
    }

    toTestList = () => {
        this.props.history.go(-2);
    };

    toTestPreview = () => {
        this.props.history.go(-1)
    };

    getTip = () => {
        return this.tips[Math.floor(Math.random() * this.tips.length)]
    };

    render() {
        const data = this.state.data;
        return (
            <div className={s.result_window}>
                <div className={s.result_bubble}>
                    <div>Твой результат</div>
                    <div className={s.percent}>{!isUndefined(data) ? data.percent : 0}%</div>
                    <div>{`${!isUndefined(data) ? data.current : 0}/${!isUndefined(data) ? data.max : 0}`}</div>
                </div>
                <div className={s.tip}>
                    <img alt={"tip"}
                         src={require("../../img/result/ic_bulb.svg")}/>
                    <div>
                        {this.getTip()}
                    </div>
                </div>
                <div className={s.controls}>
                    <div onClick={this.toTestPreview}
                          className={s.first_button}>
                        <div>Хочу узнать больше!</div>
                    </div>
                    <div onClick={this.toTestList}
                          className={s.second_button}>
                        <div>Следующий тест</div>
                    </div>
                </div>
                <div className={s.planet_1}/>
                <div className={s.planet_2}/>
                <div className={s.planet_3}/>
            </div>
        )
    }
}

export default withRouter(Result);