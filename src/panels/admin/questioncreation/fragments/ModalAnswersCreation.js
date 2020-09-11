import React from 'react';
import s from "./ModalAnswersCreation.module.css";
import ModalWindow from "../../../../common/components/modalwindow/ModalWindow";
import Input from "../../../../common/components/input/Input";


class ModalAnswersCreation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    onQuestionTextChange = (value) => {

    };

    render() {
        return (
          <div className={s.container}>
              <ModalWindow>
                  <div className={s.content}>
                      <div className={s.input_title}>
                          Вопрос
                      </div>
                      <div className={s.input}>
                          <Input placeholder={this.state.title}
                                 maxLength={135}
                                 onChange={this.onQuestionTextChange}/>
                      </div>
                  </div>
              </ModalWindow>
          </div>
        );
    }
}

export default ModalAnswersCreation;