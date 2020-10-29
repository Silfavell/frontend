import { render } from '@testing-library/react';
import React from 'react'

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
                    <div className="Clock">
                        <div className="Countdown-Timer">
                            Time left : {timer}
                        </div>
                    </div>
                    <div className="Popup-Input">
                        <PaymentFunc></PaymentFunc>
                    </div>
                    <div className="Popup-Button">
                        <button className="Popup-Btn">
                            Add
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
