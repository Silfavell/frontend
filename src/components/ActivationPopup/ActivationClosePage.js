import React, { Component } from 'react'

import PopupWrapper from '../PopupWrapper/PopupWrapper'

export default class ActivationClosePage extends Component {
    render() {
        return (
            <PopupWrapper onOutsideClick={this.onOutsideClick} onCloseClick={this.onCloseClick} className={this.props.isSmall} >
                <div style={{ width: '100%', height: '50vh' }}>
                    Deneme12345678901
                </div>
            </PopupWrapper>
        )
    }
}
