import React from 'react'

import PopupWrapper from '../PopupWrapper/PopupWrapper'
import activationClosePage from './activationClosePage'
import './PaymentPopup.css'

export default class activationPopup extends React.Component {
    timer = 0

    showDeletePaymentPopup = (deleteAddressId) => {
        this.setState({ showDeletePaymentPopup: true, deleteAddressId })
    }

    hideDeletePaymentPopup = (payment) => {
        this.setState({ showDeletePaymentPopup: true, payment: payment ?? this.state.payment })
    }

    state = {
        time: {},
        seconds: 180,
        payment: [],

        showDeletePaymentPopup: false,

        deleteAddressId: null
    }

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

    onOutsideClick = (event) => {
        if (event.target !== event.currentTarget) {
            return
        }
        else {
            this.hideDeletePaymentPopup()
        }

    }

    onCloseClick = (event) => {
        this.hideDeletePaymentPopup()
    }

    render() {
        return (
            <PopupWrapper onOutsideClick={this.onOutsideClick} onCloseClick={this.onCloseClick} className={this.props.isSmall} >
                {
                    this.state.showDeletePaymentPopup && <activationClosePage deleteAddressId={this.state.deleteAddressId} hideDeletePaymentPopup={this.hideDeletePaymentPopup} />
                }
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
                            <button className='btn btn-primary btn-lg btn-block' onClick={this.onConfirm}>Evet</button>
                        </div>
                    </div>
                </div>
            </PopupWrapper>
        )
    }
}


