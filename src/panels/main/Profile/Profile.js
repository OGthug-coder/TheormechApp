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
        this.props.onSettingsClick();
        setTimeout(() => this.props.history.push('/stickerShop'), 250);
    };

    provideVisibility = () => {
        if (isUndefined(this.props.settings_window)) {
            return s.hidden_no_animation;
        } else {
            return this.props.settings_window === true ?
                 s.settings_window_anim : s.hidden;
        }

    };

    render() {
        let user = this.state.user;
        return (
            <div className={s.profile_card}>
                <div className={s.slider}/>
                
                <div className={s.about}>
                    <Avatar src={!isUndefined(user) ?
                         this.state.user.photo_200 : ""} size={100}/>
                    <div className={s.bio}>
                        <div className={s.surname}>
                            {
                                !isUndefined(user)
                                    ? user.last_name
                                    : ""
                            }
                        </div>
                        <div className={s.name}>
                            {
                                !isUndefined(user)
                                    ? user.first_name
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
                    <a 
                        href={"https://vk.com/theormech"} 
                        target="_blank" rel="noopener noreferrer"
                    >
                        <img src={require("../../../img/profile/ic_tm_logo.png")}
                             alt={"logo"}/>

                    </a>
                    <div className={s.logo_text}>
                        Высшая школа теоретической механики
                    </div>

                    <div
                        className={`${s.settings} ${isUndefined(this.props.settings_window) ||
                             this.props.settings_window === true ? s.active : s.disabled}`}
                        onClick={this.props.onSettingsClick}>
                    </div>
                </div>
                <div className={`${s.settings_window} ${this.provideVisibility()}`}>
                    <SelectWindow data={[
                        {
                            id: 0,
                            value: "Сменить стикер",
                            onClick: this.onStickerClick,
                        },
                        {
                            id: 1,
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