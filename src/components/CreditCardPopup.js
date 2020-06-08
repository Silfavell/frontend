import React from 'react'
import axios from 'axios'
import VanillaToasts from 'vanillatoasts'

import PopupWrapper from './PopupWrapper'

class NewCreditCardPopup extends React.Component {

    state = {
        cardAlias: 'Alias',
        cardHolderName: 'Holder',
        cardNumber: '5526080000000006',
        expireYear: '2023',
        expireMonth: '09',
        cvc2: '555'
    }

    onAliasChange = (event) => {
        this.setState({ cardAlias: event.target.value })
    }

    onCardHolderNameChange = (event) => {
        this.setState({ cardHolderName: event.target.value })
    }

    onCardNoChange = (event) => {
        this.setState({ cardNumber: event.target.value })
    }

    onExpireMonthChange = (event) => {
        this.setState({ expireMonth: event.target.value })
    }

    onExpireYearChange = (event) => {
        this.setState({ expireYear: event.target.value })
    }

    onCvcChange = (event) => {
        this.setState({ cvc2: event.target.value })
    }

    onSaveClick = () => {
        const {
            cardAlias,
            cardNumber,
            cardHolderName,
            expireMonth,
            expireYear,
            // cvc2
        } = this.state

        axios.post(`${process.env.REACT_APP_API_URL}/user/payment-card`, {
            card: {
                cardAlias,
                cardHolderName,
                cardNumber,
                expireMonth,
                expireYear,
                // cvc2
            }
        }).then(({ status }) => {
            if (status === 200) {
                VanillaToasts.create({
                    title: 'Kredi kartı kayıt edildi.',
                    positionClass: 'topRight',
                    type: 'success',
                    timeout: 3 * 1000
                })

                this.props.hideCreditCardPopup()
            }
        }).catch((err) => {
            VanillaToasts.create({
                title: err.response.data.error,
                positionClass: 'topRight',
                type: 'error',
                timeout: 3 * 1000
            })

            this.props.hideCreditCardPopup()
        })
    }

    onOutsideClick = (event) => {
        if (event.target !== event.currentTarget) {
            return
        }

        this.props.hideCreditCardPopup()
    }

    onCloseClick = (event) => {
        this.props.hideCreditCardPopup()
    }


    render() {
        const {
            cardAlias,
            cardHolderName,
            cardNumber,
            expireMonth,
            expireYear,
            cvc2
        } = this.state

        return (
            <PopupWrapper onOutsideClick={this.onOutsideClick} onCloseClick={this.onCloseClick}>
                <div className='col-md-12'>
                    <div className='m-3 p-lg-5'>

                        <div className='form-group row'>
                            <div className='col-md-12'>
                                <label htmlFor='cardAlias' className='text-black'>Card Alias <span className='text-danger'>*</span></label>
                                <input
                                    onChange={this.onAliasChange}
                                    type='text'
                                    className='form-control'
                                    id='cardAlias'
                                    name='cardAlias'
                                    value={cardAlias}
                                />
                            </div>
                        </div>

                        <div className='form-group row'>
                            <div className='col-md-12'>
                                <label htmlFor='cardHolderName' className='text-black'>Kart üzerindeki isim <span className='text-danger'>*</span></label>
                                <input
                                    onChange={this.onCardHolderNameChange}
                                    type='text'
                                    className='form-control'
                                    id='cardHolderName'
                                    name='cardHolderName'
                                    value={cardHolderName}
                                />
                            </div>
                        </div>

                        <div className='form-group row'>
                            <div className='col-md-12'>
                                <label htmlFor='cardNumber' className='text-black'>Kart No <span className='text-danger'>*</span></label>
                                <input
                                    onChange={this.onCardNoChange}
                                    type='text'
                                    className='form-control'
                                    id='cardNumber'
                                    name='cardNumber'
                                    value={cardNumber}
                                />
                            </div>
                        </div>

                        <div className='form-group row'>
                            <div className='col-md-6'>
                                <label htmlFor='expireMonth' className='text-black'>Expire Month <span className='text-danger'>*</span></label>
                                <input
                                    onChange={this.onExpireMonthChange}
                                    type='text'
                                    className='form-control'
                                    id='expireMonth'
                                    name='expireMonth'
                                    value={expireMonth}
                                />
                            </div>
                            <div className='col-md-6'>
                                <label htmlFor='expireYear' className='text-black'>Expire Year <span className='text-danger'>*</span></label>
                                <input
                                    onChange={this.onExpireYearChange}
                                    type='text'
                                    className='form-control'
                                    id='expireYear'
                                    name='expireYear'
                                    value={expireYear}
                                />
                            </div>
                        </div>

                        <div className='form-group row'>
                            <div className='col-md-12'>
                                <label htmlFor='cvc2' className='text-black'>CVC2 <span className='text-danger'>*</span></label>
                                <input
                                    onChange={this.onCvcChange}
                                    type='text'
                                    className='form-control'
                                    id='cvc2'
                                    name='cvc2'
                                    value={cvc2}
                                />
                            </div>
                        </div>

                        <div className='form-group row'>
                            <div className='col-lg-12'>
                                <button className='btn btn-primary btn-lg btn-block' onClick={this.onSaveClick}>Kartı Kaydet</button>
                            </div>
                        </div>
                    </div>
                </div>
            </PopupWrapper>
        )
    }
}

export default NewCreditCardPopup