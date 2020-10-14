import React from 'react';
import s from './ConfirmModal.module.css';

class ConfirmModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: this.props.text,
            onApprove: this.props.onApprove,
            onCancel: this.props.onCancel,
        };
    }

    render() {
        return (
            <>
                <div className={s.modal}>
                    <div>
                        {this.state.text}
                    </div>
                    <div className={s.controls}>
                        <button className={s.approve}
                                onClick={this.state.onApprove}>
                            Да
                        </button>
                        <button className={s.cancel}
                                onClick={this.state.onCancel}>
                            Отмена
                        </button>
                    </div>
                </div>

            </>
        );
    }

}

export default ConfirmModal;