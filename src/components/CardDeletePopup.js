import React from 'react'
import axios from 'axios'
import VanillaToasts from 'vanillatoasts'

import PopupWrapper from './PopupWrapper'

class CardDeletePopup extends React.Component {

    onConfirm = () => {
        axios.put(`${process.env.REACT_APP_API_URL}/user/payment-card`, {
            cardToken: this.props.deleteCardToken
        }).then(({ status }) => {
            if (status === 200) {
                VanillaToasts.create({
                    title: 'Kart silindi',
                    positionClass: 'topRight',
                    type: 'success',
                    timeout: 3 * 1000
                })

                this.props.hideDeleteCardPopup()
            }
        }).catch((error) => {
            this.props.hideDeleteCardPopup()
        })
    }

    onOutsideClick = (event) => {
        if (event.target !== event.currentTarget) {
            return
        }

        this.props.hideDeleteCardPopup()
    }

    onCloseClick = (event) => {
        this.props.hideDeleteCardPopup()
    }

    render() {
        return (
            <PopupWrapper onOutsideClick={this.onOutsideClick} onCloseClick={this.onCloseClick}>
                <div className='col-md-12'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <div className='p-lg-5'>
                                <div className='form-group row mb-5'>
                                    <div className='col-lg-12'>
                                        <span className='text-black h5'>Kartınızın silinmesini onaylıyor musunuz?</span>
                                    </div>
                                </div>
                                <div className='form-group row'>
                                    <div className='col-lg-6 ml-auto'>
                                        <button className='btn btn-primary btn-lg btn-block' onClick={this.onConfirm}>Evet</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </PopupWrapper>
        )
    }
}

export default CardDeletePopup