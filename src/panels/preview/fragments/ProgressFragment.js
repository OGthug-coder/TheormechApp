import React from 'react';

import s from './progress.module.css';

class ProgressFragment extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={s.progress_item}>
                Очки
            </div>

        )
    }
}

export default ProgressFragment;