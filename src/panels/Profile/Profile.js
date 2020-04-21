import React from 'react';

import s from './profile.module.css';
import LevelFragment from "./LevelFragment";


class Profile extends React.Component {

    render() {
        return (
            <div>
                <div className={s.profile_card}>
                    <div className={s.slider}> </div>
                    <div className={s.about}>
                        <img src={require("../../img/1.png")} alt='user photo' />
                        <div className={s.bio}>
                            <div className={s.name}>
                                Бакута Артём
                            </div>
                            <div>
                                Студент теормеха
                            </div>
                            <div className={s.city}>
                                Санкт-Петербург
                            </div>
                        </div>
                        <LevelFragment />
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile;