import { render } from '@testing-library/react';
import React, { Component } from 'react'

import PaymentFunc from './PaymentFunc'

import './PaymentPopup.css'

export default function PaymentPopup() {
    const [timer, setTimer] = React.useState(180);
    const id = React.useRef(null);
    const clear = () => {
        window.clearInterval(id.current)
    }
    React.useEffect(() => {
        id.current = window.setInterval(() => {
            setTimer((time) => time - 1)
        }, 1000)
        return () => clear();
    }, [])

    React.useEffect(() => {
        if (timer === 0) {
            clear()
        }

    }, [timer])

    render()
    {
        return (
            <div className="container">
                <div className="flex-Popup">
                    <div className="someText-container">
                        <div className="someText">
                            SOME TEXT IN THIS CONTAİNER
                        </div>
                    </div>

                    <div className="Popup-Input">
                        <div id="divOuter">
                            <div id="divInner">
                                <input id="partitioned" type="text" maxlength="4" />
                            </div>
                        </div>
                    </div>
                    <div className="Popup-Button">
                        <div className="Countdown-Timer">
                            {timer} sn
                        </div>
                        <button className="Popup-Btn">
                            Add
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
