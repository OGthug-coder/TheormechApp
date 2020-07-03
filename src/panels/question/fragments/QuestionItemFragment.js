import React from 'react';

import s from './QuestionItemFragment.module.css';

class QuestionItemFragment extends React.Component {
    constructor(props) {
        super(props);

        this.application = props.application;
        this.questionService = this.application.provideQuestionService();

        this.state = {
            answerType: props.answerType,
            questionNumber: props.questionNumber,
        }

    }

    componentDidMount() {
        this.questionService.getQuestion()
            .then(question => this.setState({answers: question.answers}));
    }

    render() {
        const numberMap = {
            1: 'a',
            2: 'b',
            3: 'c',
            4: 'd'
        };

        return (

            
            <div className={s.answer_item}>
                <div className={s.number}>
                    {numberMap[this.state.questionNumber]}
                </div>
                {
                    this.state.answerType === 'str' ?
                        (<div className={s.text}>
                            {
                                this.state.answers !== undefined
                                    ? this.state.answers[this.state.questionNumber - 1] : ""
                            }
                        </div>) : ''
                }
            </div>
        )
    }

}
export default QuestionItemFragment;