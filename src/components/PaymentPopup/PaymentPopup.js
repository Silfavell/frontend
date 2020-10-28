import React from 'react'

import PopupWrapper from '../PopupWrapper/PopupWrapper'
import './PaymentPopup.css'

export default class PaymentPopup extends React.Component {
    state = { time: {}, seconds: 180 }

    timer = 0

    secondsToTime = (secs) => {
        const hours = Math.floor(secs / (60 * 60))

        const divisorForMinutes = secs % (60 * 60)
        const minutes = Math.floor(divisorForMinutes / 60)

        const divisorForSeconds = divisorForMinutes % 60
        const seconds = Math.ceil(divisorForSeconds)

        const obj = {
            'h': hours,
            'm': minutes,
            's': seconds
        }
        return obj
    }

    componentDidMount = () => {
        const timeLeftVar = this.secondsToTime(this.state.seconds)
        this.setState({ time: timeLeftVar })
    }

    startTimer = () => {
        if (this.timer === 0 && this.state.seconds > 0) {
            this.timer = setInterval(this.countDown, 1000)
        }
    }

    countDown = () => {
        const seconds = this.state.seconds - 1
        this.setState({
            time: this.secondsToTime(seconds),
            seconds: seconds,
        })

        if (seconds === 0) {
            clearInterval(this.timer)
        }
    }
    /* OnClickOlayları
    onOutsideClick = (event) => {
        if (event.target !== event.currentTarget) {
            return
        }

        this.props.hideSaveAddressPopup()
    }

    onCloseClick = (event) => {
        this.props.hideSaveAddressPopup()
    }
    */

    render() {
        return (
            <PopupWrapper onOutsideClick={this.onOutsideClick} onCloseClick={this.onCloseClick}>
                <div className='container'>
                    <div className='flex-Popup'>
                        <div className='someText-container'>
                            <div className='someText'>
                                Lütfen telefonunuza gönderilen kodu giriniz
                        </div>
                        </div>

                        <div className='Popup-Input'>
                            <div id='divOuter'>
                                <div id='divInner'>
                                    <input id='partitioned' type='text' maxlength='4' />
                                </div>
                            </div>
                        </div>
                        <div className='Popup-Button'>
                            <div className='Countdown-Timer'>
                                <div onChange={this.startTimer()}>
                                    0{this.state.time.m}:{this.state.time.s}
                                </div>
                            </div>
                            <button className='btn btn-primary btn-lg btn-block'>Evet</button>
                        </div>
                    </div>
                </div>
            </PopupWrapper>
        )
    }
}


