import React from 'react';

import s from './ProfileFragment.module.css';
import LevelFragment from "./LevelFragment";


class Profile extends React.Component {

    render() {
        return (
            <section className={s.profile_container}>
                <div className={s.profile_card}>
                    <div className={s.slider}></div>
                    <div className={s.about}>
                        <img src={require("../../img/profile/1.png")} alt='user photo'/>
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
                    </div>
                    <LevelFragment className={"level_fragment"} />
                    <div className={s.logo}>
                        <img src={require("../../img/profile/ic_tm_logo.svg")} alt={"logo"}/>
                        <div>
                            Высшая школа теоретической механики
                        </div>
                    </div>
                </div>
                <div className={s.background}>
                    <div />
                    <div />
                </div>
            </section>
        )
    }
}

export default Profile;