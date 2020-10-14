import React from 'react';
import s from './ModalWindow.module.css';


class ModalWindow extends React.Component {

    render() {
        return (
            <div className={s.window}>
                <div className={s.slider_wrapper}>
                    <div className={s.slider}/>
                </div>
                {this.props.children}
            </div>
        );
    }
}

export default ModalWindow;