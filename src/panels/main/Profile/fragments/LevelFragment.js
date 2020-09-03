import React from 'react';

import s from './LevelFragment.module.css';
import isUndefined from "../../../../common/IsUndefined";

class LevelFragment extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sticker: props.sticker,
        };
    }

    render() {
        const sticker = this.state.sticker;
        return (
            <div className={s.level_wrapper}>
                <div className={s.dignity}>
                    <svg width="39" height="38" viewBox="0 0 39 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.4741 3.28856L19.7766 3.19844C23.7322 2.07888 27.0605 3.29372 29.154 6.27431L29.2922 6.47707L29.552 6.58196C35.0459 8.87103 35.9471 14.5237 33.4652 18.8354C34.7986 20.585 35.0804 22.3223 34.4005 23.9293C33.9606 24.9692 33.2355 25.7792 32.2411 26.542L32.188 26.5804L32.1948 26.8445C32.2251 30.3577 30.3213 32.1624 27.5204 32.1966C26.7459 33.7544 25.4133 34.7547 23.6026 35.1179C21.9906 35.4413 20.5728 35.1367 19.4485 34.2374C17.2678 35.8709 13.4728 35.2213 11.5489 32.5434L11.3634 32.2682L11.3135 32.2669C8.05644 32.1268 6.35062 29.9931 6.65101 27.007L6.67918 26.765L6.59468 26.7229C4.55183 25.6068 3.5992 23.0643 4.24119 20.6508L4.31911 20.3833C4.51587 19.7621 4.80084 19.1992 5.16585 18.7025C2.77742 14.8896 3.90018 8.44461 9.24129 6.75332L9.45097 6.69015L9.72046 6.35448C9.94577 6.075 10.146 5.8361 10.3513 5.60499C12.7906 2.85904 15.6276 1.81662 19.4741 3.28856ZM20.6841 5.48723L20.6824 32.002C21.2929 32.7153 22.0403 32.9372 23.097 32.7253C23.8966 32.5649 24.4946 32.2263 24.9264 31.6745C23.5919 30.9825 22.8355 29.59 22.6912 27.6694C22.6407 26.9966 23.1595 26.4113 23.85 26.3621C24.5405 26.3129 25.1412 26.8183 25.1917 27.4911C25.3006 28.941 25.7615 29.5487 26.6556 29.6892C28.8462 30.0335 29.9466 29.1419 29.6457 26.1126C29.6021 25.6742 29.8042 25.2469 30.1745 24.9943C31.1358 24.3387 31.7831 23.7063 32.0826 22.9983C32.3522 22.3611 32.3139 21.6704 31.8396 20.8545C30.0429 22.4235 27.4587 23.2638 25.9695 22.6529C25.3315 22.3911 25.032 21.6749 25.3007 21.0532C25.5693 20.4315 26.3044 20.1397 26.9425 20.4014C27.5583 20.6541 29.8811 19.686 30.8942 18.2433C33.2662 14.8654 32.6799 10.2205 28.0365 8.62742C27.758 8.53187 27.523 8.3436 27.3731 8.09579C25.9247 5.70284 23.6663 4.71183 20.6841 5.48723ZM12.247 7.2037L11.8868 7.6248L11.175 8.51345C10.9992 8.73368 10.7513 8.88863 10.4726 8.95253C6.69311 9.81901 5.69624 14.3087 7.09171 17.0578C8.69163 16.2089 10.8355 15.9707 13.3428 16.5158C14.0185 16.6627 14.444 17.3156 14.2933 17.974C14.1425 18.6323 13.4725 19.047 12.7968 18.9001C9.39357 18.1601 7.32743 19.1695 6.71474 21.1037C6.20778 22.7042 6.90826 24.3428 8.20965 24.755L8.39078 24.8035C9.0853 24.9563 9.50992 25.6414 9.32542 26.3114C8.65915 28.7311 9.53117 29.9692 12.0317 29.82C12.5524 29.789 13.0383 30.0753 13.2519 30.5389C14.2911 32.7941 17.1974 33.2433 18.1783 32.049L18.175 5.42466C15.6505 4.5788 13.9605 5.27477 12.247 7.2037ZM10.8475 21.5365C12.2415 22.0458 13.3701 22.8271 14.2072 23.8759C15.0646 24.9499 15.5206 26.2535 15.5797 27.7495C15.6063 28.4236 15.067 28.991 14.3752 29.017C13.6834 29.0429 13.101 28.5175 13.0744 27.8434C13.0349 26.8413 12.7514 26.0311 12.2282 25.3757C11.6848 24.6949 10.9398 24.1792 9.96717 23.8238C9.31893 23.5869 8.99048 22.8829 9.23358 22.2513C9.47667 21.6196 10.1992 21.2996 10.8475 21.5365ZM25.663 10.8099C26.0382 12.069 26.5452 12.905 27.1435 13.3508C27.7165 13.7778 28.5512 13.9723 29.6978 13.8952C30.3885 13.8488 30.987 14.3567 31.0347 15.0297C31.0823 15.7027 30.561 16.2859 29.8703 16.3323C28.1572 16.4474 26.7239 16.1134 25.6206 15.2913C24.5425 14.4881 23.7676 13.2103 23.2553 11.491C23.0623 10.8431 23.4448 10.1655 24.1097 9.97743C24.7745 9.78935 25.47 10.162 25.663 10.8099ZM15.9623 8.66837C16.634 8.83198 17.0423 9.49513 16.8744 10.1496C16.5506 11.4115 15.8629 12.3832 14.8241 12.9905C13.8882 13.5376 12.8516 13.8131 11.7386 13.8131C11.0462 13.8131 10.485 13.2662 10.485 12.5916C10.485 11.9171 11.0462 11.3702 11.7386 11.3702C12.4005 11.3702 12.9909 11.2133 13.5342 10.8957C13.9745 10.6383 14.2729 10.2168 14.4421 9.55709C14.6101 8.90265 15.2907 8.50476 15.9623 8.66837Z" fill="black"/>
                    </svg>
                    <div>
                        Да ты {!isUndefined(sticker) ? sticker.name : ""}
                    </div>
                </div>
                <div className={s.quote}>
                    {!isUndefined(sticker) ? sticker.quote : ""}

                </div>
                <div className={s.sticker_wrapper}>
                    <div className={s.cloud}/>
                    <div className={s.cloud}/>
                    <div className={s.cloud}/>
                    <img className={s.sticker}
                         src={!isUndefined(sticker) ? sticker.img : ""}
                         alt={"sticker"}
                    />
                </div>
            </div>
        )
    }
}

export default LevelFragment;