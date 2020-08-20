import React from 'react';

import s from './Profile.module.css';
import LevelFragment from "./LevelFragment";
import {Avatar} from "@vkontakte/vkui";
import isUndefined from "../../../common/IsUndefined";
import Score from "../../../common/components/score/Score";
import {withRouter} from "react-router";


class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.application = props.application;
        this.profileService = this.application.provideProfileService();

        this.state = {};
    }

    componentDidMount() {
        this.application.provideUser()
            .then(user => this.setState({user: user}));
    }

    onStickerClick = () => {
        this.props.history.push('/stickerShop');
    };

    onLogoClick = () => {
        window.location.assign('https://vk.com/theormech');
    };


    render() {
        let user = this.state.user;
        return (
            <div className={s.profile_card}>
                <div className={s.slider}/>
                <div className={s.about}>
                    <Avatar src={!isUndefined(user) ? this.state.user.photo_200 : ""} size={100}/>
                    <div className={s.bio}>
                        <div className={s.name}>
                            {
                                !isUndefined(user)
                                    ? user.first_name + " " + user.last_name
                                    : ""
                            }
                        </div>
                        <div>
                            Студент теормеха
                        </div>
                        <div className={s.score}>
                            <Score key={user}
                                   score={!isUndefined(user) ? user.score : 0}/>
                        </div>
                    </div>
                </div>
                <LevelFragment key={user}
                               sticker={!isUndefined(user) ? user.activeSticker : undefined}
                               onClick={this.onStickerClick}/>
                <div className={s.logo}
                    onClick={this.onLogoClick}>
                    <img src={require("../../../img/profile/ic_tm_logo.svg")} alt={"logo"}/>
                    <div>
                        Высшая школа теоретической механики
                    </div>
                </div>
            </div>

        )
    }
}

export default withRouter(Profile);