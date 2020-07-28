import React from 'react';
import ModalFragment from "./fragments/ModalFragment";
import Answer from "./fragments/Answer";

import s from "./Preview.module.css";

class Preview extends React.Component {
    constructor(props) {
        super(props);

        this.application = props.application
        this.previewService = this.application.providePreviewService();
        this.testId = props.match.params.testId;

        this.state = {
            show_answer_window: false,
        };


        this.show_answer_window = () => {
            this.setState({show_answer_window: true})
        };

        this.hide_answer_window = () => {
            this.setState({show_answer_window: false})
        };
    }

    componentDidMount() {
        this.previewService.getHistory(this.testId, this.application.provideUser())
            .then(history => {
                this.previewService.getTest(this.testId)
                    .then(testInfo => {
                        testInfo.questions = this.previewService.prepareQuestions(testInfo.questions, this.state.history);
                        this.setState({testInfo: testInfo})
                    });

                this.setState({history: history});
                this.setState({lastQuestion: this.previewService.getLastQuestion(history)});
            });

    }

    render() {
        //Need to insert question status
        const testInfo = this.state.testInfo;

        return (
            <section className={s.preview_wrapper}>
                <div className={s.background}>
                    <img
                        src={testInfo !== undefined ? testInfo.img : ""}
                        alt={"background"}
                        height={"400"}/>
                </div>
                <ModalFragment
                    key={[testInfo, this.state.lastQuestion]}
                    onClick={this.show_answer_window}
                    testInfo={testInfo}
                    lastQuestion={this.state.lastQuestion}
                    history={this.state.history}
                    testStatus={this.previewService.getStatus(this.state.lastQuestion,
                        testInfo !== undefined ? testInfo.maxScore : undefined)}/>
                {this.state.show_answer_window ? <Answer onClick={this.hide_answer_window}/> : ""}

            </section>
        )
    }
}

export default Preview;
