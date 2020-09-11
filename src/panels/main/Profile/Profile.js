import React from 'react';

import s from './Profile.module.css';
import LevelFragment from "./fragments/LevelFragment";
import {Avatar} from "@vkontakte/vkui";
import isUndefined from "../../../common/IsUndefined";
import Score from "../../../common/components/score/Score";
import {withRouter} from "react-router-dom";
import AboutWindow from "./fragments/AboutWindow";
import SelectWindow from "../../../common/components/selectwindow/SelectWindow";


class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.application = props.application;
        this.profileService = this.application.provideProfileService();
        this.state = {
            settings_window: props.settings_window,
            onSettingsClick: props.onSettingsClick,
            aboutDev: false,
        };

    }

    ondDevButton = () => {
        this.setState({aboutDev: !this.state.aboutDev});
    };

    componentDidMount() {
        this.fetchUser();
    }

    fetchUser = () => {
        this.application.provideUser()
            .then(user => this.setState({user: user}));
    };

    onStickerClick = () => {
        this.state.onSettingsClick();
        setTimeout(() => this.props.history.push('/stickerShop'), 250);
    };

    provideVisibility = () => {
        if (isUndefined(this.state.settings_window)) {
            return s.hidden_no_animation;
        } else {
            return this.state.settings_window === true ? s.settings_window_anim : s.hidden;
        }

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
                               sticker={!isUndefined(user) ? user.activeSticker : undefined}/>
                <div className={s.logo}>
                    <a href={"https://vk.com/theormech"} target="_blank" rel="noopener noreferrer">
                        <img src={require("../../../img/profile/ic_tm_logo.png")}
                             alt={"logo"}/>

                    </a>
                    <div className={s.logo_text}>
                        Высшая школа теоретической механики
                    </div>

                    <div
                        className={`${s.settings} ${isUndefined(this.state.settings_window) || this.state.settings_window === true ? s.active : s.disabled}`}
                        onClick={this.state.onSettingsClick}>
                    </div>
                </div>
                <div className={`${s.settings_window} ${this.provideVisibility()}`}>
                    <SelectWindow data={[
                        {
                            value: "Сменить стикер",
                            onClick: this.onStickerClick,
                        },
                        {
                            value: "О приложении",
                            onClick: this.ondDevButton,
                        }
                    ]}/>
                </div>
                {this.state.aboutDev ? <AboutWindow onExitClick={this.ondDevButton}/> : ""}
            </div>
        )
    }
}

export default withRouter(Profile);