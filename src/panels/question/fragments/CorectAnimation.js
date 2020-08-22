import React from 'react';
import s from './Animation.module.css';


class CorrectAnimation extends React.Component {

    constructor(props) {
        super(props);


        const confetti = require('canvas-confetti');

        let myConfetti = confetti.create(document.getElementById("canvas"), {
            resize: true,
            useWorker: true
        })

        myConfetti();

    }

    render() {
        return (
            <>
                <canvas className={s.canvas}/>
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2" height="70">
                    <circle className={s.path_circle} fill="#2DC471" stroke="#FFFFFF" strokeWidth="0"
                            strokeMiterlimit="10" cx="65.1" cy="65.1" r="62.1"/>
                    <polyline className={s.path_check} fill="#2DC471" stroke="#FFFFFF" strokeWidth="10"
                              strokeLinecap="round" strokeMiterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 "/>
                </svg>
            </>
        )

    }
}

export default CorrectAnimation;