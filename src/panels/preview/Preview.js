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
        this.previewService.getTest(this.testId)
            .then(testInfo => this.setState({testInfo: testInfo}));
    }


    render() {
        const testInfo = this.state.testInfo;
        console.log(testInfo);
        return (
            <section className={s.preview_wrapper}>
                <div className={s.background}>
                    <img
                        src={testInfo !== undefined ? testInfo.img : ""}
                        alt={"background"}
                        height={"400"}/>
                </div>
                <ModalFragment
                    key={testInfo}
                    onClick={this.show_answer_window}
                    testInfo={testInfo}/>
                {this.state.show_answer_window ? <Answer onClick={this.hide_answer_window}/> : ""}

            </section>
        )
    }
}

export default Preview;
