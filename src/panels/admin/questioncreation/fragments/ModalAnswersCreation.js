import React from 'react';
import s from "./ModalAnswersCreation.module.css";
import ModalWindow from "../../../../common/components/modalwindow/ModalWindow";


class ModalAnswersCreation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
          <div className={s.container}>
              <ModalWindow>
                  <div className={s.content}>Hello</div>
              </ModalWindow>
          </div>
        );
    }
}

export default ModalAnswersCreation;