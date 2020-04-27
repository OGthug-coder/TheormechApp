import React from 'react';

import s from './QuestionItemFragment.module.css';

class QuestionItemFragment extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <>
                <div className={s.question_item} >
                    <img className={s.question_status}
                         src={require("../../../img/preview/ic_question_status_approve.svg")} >
                    </img>
                    <div className={s.question_body}>
                        <div className={s.title}>
                            Вопрос #..
                        </div>
                        <div className={s.question_preview}>
                            Автомобили движутся...
                        </div>
                    </div>
                    <button className={s.answer} />
                </div>
                <div className={s.separator} />
            </>
        )
    }
}

export default QuestionItemFragment;