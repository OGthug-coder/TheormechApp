import React from 'react';

import s from './Profile.module.css';
import LevelFragment from "./LevelFragment";


class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.application = props.application;
        this.profileService = this.application.provideProfileService();

        this.state = {};
    }

    componentDidMount() {
        this.application.provideUser().then(
            user => this.setState({user: user})
        );
    }


    render() {
        return (
            <div className={s.profile_card}>
                <div className={s.slider}/>
                <div className={s.about}>
                    <img src={require("../../../img/profile/1.png")} alt='user photo'/>
                    <div className={s.bio}>
                        <div className={s.name}>
                            {
                                this.state.user !== undefined
                                    ? this.state.user.first_name + " " + this.state.user.last_name
                                    : ""
                            }

                        </div>
                        <div>
                            Студент теормеха
                        </div>
                        <div className={s.city}>
                            {
                                this.state.user !== undefined
                                && this.state.user.city.title != ''
                                    ? this.state.user.city.title
                                    : "Планета Земля"
                            }
                        </div>
                    </div>
                </div>
                <LevelFragment className={"level_fragment"}/>
                <div className={s.logo}>
                    <img src={require("../../../img/profile/ic_tm_logo.svg")} alt={"logo"}/>
                    <div>
                        Высшая школа теоретической механики
                    </div>
                </div>
            </div>

        )
    }
}

export default Profile;